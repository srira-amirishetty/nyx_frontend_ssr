import React, { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { MdOutlineNewspaper } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { TbPhysotherapist } from "react-icons/tb";
import classNames from "@nyx-frontend/main/utils/classNames";
import { MdOutlineElectricBolt } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { MdCurrencyExchange } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCampaignSummary, getExternalCampaigns, getRecomdationsData, updRecomdationsData, analyzeImageWithAI } from "@nyx-frontend/main/services/admanagerServices";
import { analyticsApi } from "../../campulse/services/api";
import { ChevronDown, Plus, Check, X, CircleDot } from "lucide-react";

export const Recommendations = ({
  Workspacename,
  campaignDetails,
}: any) => {
  const router = useRouter();
  const [tabs, setTabs] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<any>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [performance, setPerformance] = useState<any>({});
  const [imageAnalysis, setImageAnalysis] = useState<any>(null);
  const [kwLoading, setkwLoading] = useState(false)
  const [channelWiseData, setChannelWiseData] = useState<any>(null)

  const {
    data: recomdations,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getProduct2", activeTab],
    enabled: !!channelWiseData && campaignDetails?.data[0].status && (campaignDetails?.data[0].status == "PAUSED" || campaignDetails?.data[0].status == "UNDER_REVIEW" || campaignDetails?.data[0].status == "ACTIVE"),
    queryFn: () => {
      if (activeTab || activeTab == 0) {
        let data = tabs[activeTab]
        let resDate = channelWiseData.date ?? []
        let resLocation = channelWiseData.location ?? []
        let resAge = channelWiseData.age ?? []
        // Group data by date first for historical_data
        let historical_data = resDate.reduce((acc, entry) => {
          if (!entry.platform || !entry.query_date) return acc;

          const timestamp = entry.query_date + "T00:00:00Z";

          if (!acc[timestamp]) {
            acc[timestamp] = {
              timestamp,
              metrics: {
                impressions: 0,
                clicks: 0,
                spent: 0,
                ctr: 0,
                cpc: 0,
                cpm: 0,
                conversions: 0
              },
              channel_breakdown: {}
            };
          }

          // Add to channel breakdown
          acc[timestamp].channel_breakdown[entry.platform] = {
            impressions: entry.impressions || 0,
            clicks: entry.clicks || 0,
            spent: entry.spend || 0,
            ctr: entry.ctr || 0,
            cpc: entry.cpc || 0,
            cpm: entry.cpm || 0
          };

          // Update total metrics
          const metrics = acc[timestamp].metrics;
          metrics.impressions += entry.impressions || 0;
          metrics.clicks += entry.clicks || 0;
          metrics.spent += entry.spend || 0;
          metrics.conversions += entry.conversions || 0;

          // Calculate derived metrics
          if (metrics.impressions > 0) {
            metrics.ctr = metrics.clicks / metrics.impressions;
            metrics.cpm = (metrics.spent / metrics.impressions) * 1000;
          }
          if (metrics.clicks > 0) {
            metrics.cpc = metrics.spent / metrics.clicks;
          }

          return acc;
        }, {});

        // Convert to array and sort by timestamp
        historical_data = Object.values(historical_data).sort((a: any, b: any) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        // Calculate channel_wise_data by aggregating metrics per platform
        let channel_wise_data = {};

        // First group data by platform
        const platformData = resDate.reduce((acc, entry) => {
          if (!entry.platform) return acc;

          if (!acc[entry.platform]) {
            acc[entry.platform] = {
              impressions: [],
              clicks: [],
              spend: [],
              ctr: [],
              cpc: [],
              cpm: []
            };
          }

          acc[entry.platform].impressions.push(entry.impressions || 0);
          acc[entry.platform].clicks.push(entry.clicks || 0);
          acc[entry.platform].spend.push(entry.spend || 0);
          acc[entry.platform].ctr.push(entry.ctr || 0);
          acc[entry.platform].cpc.push(entry.cpc || 0);
          acc[entry.platform].cpm.push(entry.cpm || 0);

          return acc;
        }, {});

        // Calculate aggregates for each platform
        type PlatformData = {
          impressions: number[];
          clicks: number[];
          spend: number[];
          ctr: number[];
          cpc: number[];
          cpm: number[];
        };

        Object.entries(platformData as Record<string, PlatformData>).forEach(([platform, data]) => {
          const totalImpressions = data.impressions.reduce((sum, val) => sum + val, 0);
          const totalClicks = data.clicks.reduce((sum, val) => sum + val, 0);
          const totalSpend = data.spend.reduce((sum, val) => sum + val, 0);

          // Calculate averages
          const avgCTR = (totalClicks / totalImpressions) * 100; // Convert to percentage
          const avgCPC = totalSpend / totalClicks;
          const avgCPM = (totalSpend / totalImpressions) * 1000;

          channel_wise_data[platform] = {
            "Impressions": totalImpressions,
            "Clicks": totalClicks,
            "Total Spent": Math.round(totalSpend).toLocaleString(),
            "Total Budget": campaignDetails?.data[0].totalBudget,
            "add_frequency": 3.2,
            "Click Through Rate": `${avgCTR.toFixed(2)}%`,
            "Average CPC": parseFloat(avgCPC.toFixed(2)),
            "Average CPM": parseFloat(avgCPM.toFixed(2))
          };
        });

        let segmentedData = {}
        campaignDetails?.data.map((item) => {
          let platformName = item.platform.platformName == "Facebook" || item.platform.platformName == "Instagram" ? "Meta" : item.platform.platformName
          let locationData = resLocation.filter((it: any) => it.ad_group_id == item.admanager_user_campaign_targeting[activeTab].ad_group_id && it.platform == platformName)
          let ageData = resAge.filter((it: any) => it.ad_group_id == item.admanager_user_campaign_targeting[activeTab].ad_group_id && it.platform == platformName)
          
          // Group location data by user_location_city
          const locationSpecificData = locationData.reduce((acc: any, item: any) => {
            const city = item.user_location_city;
            if (city) {
              const existingCity = acc.find((entry: any) => entry.location === city);
              if (existingCity) {
                // Aggregate metrics if city already exists
                existingCity.metrics.impressions += item.impressions || 0;
                existingCity.metrics.clicks += item.clicks || 0;
                existingCity.metrics.spend += item.spend || 0;
                existingCity.metrics.conversions += item.conversions || 0;
              } else {
                // Add new city entry
                acc.push({
                  location: city,
                  metrics: {
                    impressions: item.impressions || 0,
                    clicks: item.clicks || 0,
                    spend: item.spend || 0,
                    conversions: item.conversions || 0,
                    ctr: item.ctr || 0,
                    cpc: item.cpc || 0,
                    cpm: item.cpm || 0
                  }
                });
              }
            }
            return acc;
          }, []);

          // Group age data by age
          const ageSpecificData = ageData.reduce((acc: any, item: any) => {
            const age = item.age;
            if (age) {
              const existingAge = acc.find((entry: any) => entry.age_group === age);
              if (existingAge) {
                // Aggregate metrics if age group already exists
                existingAge.metrics.impressions += item.impressions || 0;
                existingAge.metrics.clicks += item.clicks || 0;
                existingAge.metrics.spend += item.spend || 0;
                existingAge.metrics.conversions += item.conversions || 0;
              } else {
                // Add new age group entry
                acc.push({
                  age_group: age,
                  metrics: {
                    impressions: item.impressions || 0,
                    clicks: item.clicks || 0,
                    spend: item.spend || 0,
                    conversions: item.conversions || 0,
                    ctr: item.ctr || 0,
                    cpc: item.cpc || 0,
                    cpm: item.cpm || 0
                  }
                });
              }
            }
            return acc;
          }, []);

          if (!segmentedData[platformName]) {
            segmentedData[platformName] = [
              {
                "tg_id": item.admanager_user_campaign_targeting[activeTab].tg_id,
                "ad_group_ids": item.admanager_user_campaign_targeting[activeTab].ad_group_id,
                "language": ["english"],
                "location_specific_data": locationSpecificData,
                "age_specific_data": ageSpecificData,
              }
            ]
          }
        })

        let body = {
          "campaign_id": campaignDetails?.data[0].campaignId,
          "ad_group_ids": campaignDetails?.data.map((item) => item.admanager_user_campaign_targeting[activeTab].ad_group_id),
          "industry": campaignDetails?.data[0].brand.cat_name ?? '',
          "location": data?.location?.[0] ?? '',
          "objective": campaignDetails?.data[0].objective,
          "current_date": new Date().toISOString(),
          "campaign_start_data": campaignDetails?.data[0].campaignStartTime,
          "objective_metrics": {
            "conversions": 300
          },
          "brand_info": {
            "brand_name": campaignDetails?.data[0].brand.brand_name,
            "category_description": campaignDetails?.data[0].brand.description ? [campaignDetails?.data[0].brand.description] : [],
            "target_audience": {
              "age_range": campaignDetails?.data[0].targetGroups[0].advanced.ageRange.min + "-" + campaignDetails?.data[0].targetGroups[0].advanced.ageRange.max,
              "gender": campaignDetails?.data[0].targetGroups[0].gender
            },
          },
          "channel_wise_data": channel_wise_data,
          "historical_data": historical_data,
          "segmented_data": segmentedData
        }
        return getRecomdationsData(body)

      }
      return null;
    },
  });

  useEffect(() => {
    if (campaignDetails?.data) {
      let groupIds: any = campaignDetails?.data.map((item) => item.admanager_user_campaign_targeting[0].ad_group_id)
      analyticsApi.getChannelWiseData(groupIds).then((res: any) => {
        setTabs(campaignDetails?.data[0].targetGroups)
        setActiveTab(0)
        setOpenIndex(null)
        setChannelWiseData(res)
      })
    }
  }, [])


  useEffect(() => {
    if (recomdations?.output_json?.recommendations) {
      let performance: any = {}
      for (let item of recomdations?.output_json?.recommendations) {
        if (item.recommendation_priority == "High") {
          performance.High = (performance.High || 0) + 1
        } else if (item.recommendation_priority == "Medium") {
          performance.med = (performance.med || 0) + 1
        } else if (item.recommendation_priority == "low") {
          performance.low = (performance.low || 0) + 1
        }
      }
      setPerformance(performance)
    }
  }, [recomdations])


  const mutateExternalCampaign = useMutation({
    mutationKey: ["external-campaigns"],
    mutationFn: getExternalCampaigns,
  });

  const { data: campaigns, refetch: refetchCampaigns } = useQuery(
    {
      queryKey: ["campaigns-summary", campaignDetails?.data[0]?.campaignId],
      enabled: false,
      queryFn: () => getCampaignSummary(campaignDetails?.data[0]?.campaignId)
    }
  );

  const toggleAccordion = (index: number, category: string) => {
    if (recomdations?.analysis_json) {
      setImageAnalysis(recomdations?.analysis_json);
    } else {
      if (openIndex != index && category == "creative") {
        if (campaignDetails?.data[0]?.type == "EXTERNAL") {
          const params = {
            workspaceId: Number(localStorage.getItem("workspace_id")),
            campaignId: [campaignDetails?.data[0]?.campaignId]
          };
          mutateExternalCampaign.mutate(params, {
            onSuccess: (response: any) => {
              refetchCampaigns()
            },
            onError: (error: any) => {
            },
          });
        } else {
          refetchCampaigns()
        }
      }
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchImageAnalysis = async () => {
      if (campaigns?.data) {
        let activeTgId = tabs[activeTab]?.id
        let targetGroups = campaigns?.data?.targetGroups?.filter((item: any) => item.tg_id == activeTgId)
        let ads = targetGroups[0]?.ads ?? []
        setImageAnalysis(null)
        let imageAnalysis: any = []

        // Create an array of promises for all the API calls
        const analysisPromises = ads.map(async (ad: any) => {
          if (ad?.media[0]?.signed_image_url) {
            try {
              const category = campaignDetails?.data[0]?.brand?.cat_name;
              const response = await analyzeImageWithAI(category, ad.media[0].signed_image_url);
              return {
                img: ad.media[0].signed_image_url,
                analysis: response
              };
            } catch (error) {
              console.error('AI Analysis Error:', error);
              return null;
            }
          }
          return null;
        });

        // Wait for all promises to resolve
        const results = await Promise.all(analysisPromises);

        // Filter out null results and set the state
        imageAnalysis = results.filter(result => result !== null);
        setImageAnalysis(imageAnalysis);
        updRecomdationsData({
          "campaign_id": campaignDetails?.data[0]?.campaignId,
          "analysis_json": imageAnalysis
        })
      }
    };

    fetchImageAnalysis();
  }, [campaigns])


  // Google ads svg 
  const gAdsSVG = <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 21 21" fill="none">
    <path d="M10.3504 2.57501C10.1852 2.57108 10.0189 2.57823 9.85351 2.59843C9.41172 2.65238 8.97442 2.79298 8.56683 3.02844C8.031 3.33799 7.66057 3.79824 7.37051 4.30173L7.32032 4.27161L2.18032 12.8383L2.20374 12.8517C1.9085 13.3879 1.7135 13.9663 1.7135 14.5633C1.7135 15.3962 1.9865 16.2406 2.57184 16.8991C3.15718 17.5576 4.06933 17.99 5.14017 17.99C6.211 17.99 7.12316 17.5576 7.70849 16.8991C7.87422 16.7126 7.95999 16.4868 8.07659 16.275L8.10002 16.2884L10.2802 12.6559L12.452 16.2767C12.453 16.2785 12.4543 16.2799 12.4553 16.2817C13.3976 17.908 15.5049 18.4724 17.1335 17.5315C18.764 16.5908 19.3302 14.4803 18.3884 12.85L18.3834 12.8433L13.2484 4.28332C13.2474 4.28152 13.2461 4.28009 13.245 4.2783C12.6269 3.21142 11.5073 2.60251 10.3504 2.57501ZM10.4023 4.28332C10.5118 4.29084 10.6198 4.30861 10.7252 4.33686C11.147 4.4499 11.5253 4.7259 11.7643 5.13999L11.7676 5.14668L11.771 5.1517L16.9043 13.7067C17.3828 14.5349 17.105 15.5696 16.2768 16.0474C15.4485 16.5259 14.4139 16.2482 13.9361 15.42L13.9327 15.4133L8.79606 6.85332C8.31747 6.02489 8.59462 4.99139 9.4235 4.51255C9.73411 4.33311 10.074 4.26076 10.4023 4.28332ZM7.29187 7.64808C7.30273 7.66777 7.30066 7.69044 7.31195 7.70999L7.31697 7.71668L9.28128 10.9911L8.1201 12.927C7.99597 12.687 7.89411 12.4364 7.70849 12.2276C7.13349 11.5807 6.23838 11.1616 5.19204 11.1467L7.29187 7.64808ZM5.14017 12.85C5.78267 12.85 6.15551 13.0601 6.42684 13.3653C6.69817 13.6706 6.8535 14.1112 6.8535 14.5633C6.8535 15.0155 6.69817 15.4561 6.42684 15.7613C6.15551 16.0666 5.78267 16.2767 5.14017 16.2767C4.49767 16.2767 4.12482 16.0666 3.85349 15.7613C3.58216 15.4561 3.42683 15.0155 3.42683 14.5633C3.42683 14.1232 3.58375 13.7012 3.84178 13.3971L3.86353 13.362C4.13435 13.0605 4.50256 12.85 5.14017 12.85Z" fill="white" />
  </svg>

  // fetch Keywords 
  const ad_group_id = campaignDetails?.data[0]?.admanager_user_campaign_targeting[0]?.ad_group_id;
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (recomdations) {
      if (ad_group_id && !keywords.length && (!recomdations?.keywords_json || !Object.keys(recomdations?.keywords_json).length)) {
        setkwLoading(true)
        const fetchKeywords = async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_AI_KEYWORDS}/fetch-keywords-by-ad-group`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ad_group_id: ad_group_id
            })
          });
          if (res) setkwLoading(false)
          const data = await res.json();
          setKeywords(data);
          return data;
        }
        fetchKeywords();
      }
    }
  }, [ad_group_id, recomdations])


  const [headlines, setHeadlines] = useState([]);
  const [description, setDescription] = useState([]);

  // get Headlines 
  useEffect(() => {
    if (recomdations) {
      if (campaignDetails && keywords?.length) {
        const headLinesPayLoad = {
          campaign: {
            name: campaignDetails?.data[0]?.campaignInfo?.campaign_name,
            objective: campaignDetails?.data[0]?.objective,
            ad_platform: [
              "Google"
            ],
            brand: {
              id: campaignDetails?.data[0]?.brandId,
              brand_name: campaignDetails?.data[0]?.brand?.brand_name,
              cat_name: campaignDetails?.data[0]?.brand?.cat_name,
              website: null,
              description: ""
            }
          },
          product: [],
          targetGroup: []
        }
        const url = process.env.NEXT_PUBLIC_CAMPAIGN_HEAD_RECOM as string;
        const getHeadlines = async () => {
          const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(headLinesPayLoad)
          })
          const data = await res.json();
          if (data?.error) {
            getHeadlines();
          } else {
            setHeadlines(data?.headlines?.slice(0, 3))
            setDescription(data?.descriptions?.slice(0, 3))
          }
        }
        getHeadlines();
      }
    }
  }, [campaignDetails, keywords])

  // keywords optimization 
  const { data: optmzKeywords } = useQuery({
    queryKey: ['optmzKeywords'],
    enabled: !!keywords.length && !!headlines && !!description,
    queryFn: async () => {
      setkwLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_AI_KEYWORDS}/keyword-optimization`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: keywords,
          brand_category: campaignDetails?.data[0]?.brand?.cat_name,
          product_category: "",
          headlines: headlines,
          descriptions: description
        })
      });
      if (res) setkwLoading(false)
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      return data;
    }
  });

  // Saving Keywords in Database 
  useEffect(() => {
    if (optmzKeywords) {
      const payload = {
        campaign_id: campaignDetails?.data[0]?.campaignId,
        keywords_json: optmzKeywords
      }
      const saveKeywords = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/recommendation/recommend/update`
        await fetch(url, {
          method: "POST",
          headers: {
            'content-type': 'application/json',
            'Authorization': localStorage.getItem('token') as string
          },
          body: JSON.stringify(payload)
        })
        // console.log(await update.json(), "update")
      }
      saveKeywords();
    }
  }, [optmzKeywords])

  // Loading - Keywords 
  useEffect(() => {
    if (recomdations?.keywords_json && Object.keys(recomdations?.keywords_json).length) {
      setkwLoading(false)
    }
  }, [recomdations])



  type keywDataTypes = {
    text: string,
    action: string,
    type: string,
    relevance: number,
    matchType: string
  }

  type relevanceObj = {
    brand_alignment: number
    product_alignment: number
    theme_alignment: number
    competition_score: number
  }

  const KeywordAnalysisCard = () => {

    const finalKeywords: keywDataTypes[] = [];
    // Data pattern for finalKeywords
    //  { text: "Digital Marketing", action: "Keep", type: "Informational", relevance: 91 },
    const calculatePercent = (obj: relevanceObj) => {
      const brand_alignment = obj.brand_alignment || 0;
      const product_alignment = obj.product_alignment || 0;
      const theme_alignment = obj.theme_alignment || 0;
      const competition_score = obj.competition_score || 0;
      const total = brand_alignment + product_alignment + theme_alignment + competition_score;
      const percent = (total * 100) / 40;
      return percent;
    }

    const averagePercent = (arr: number[]): number => {
      if (arr.length === 0) return 0;
      const sum = arr.reduce((acc, val) => acc + val, 0);
      const avg = sum / arr.length;
      return +(avg * 100).toFixed(2); // convert to percent & round
    };

    // const overallCTR: number[] = [];
    // const overallCPC: number[] = [];

    const retainCTR: number[] = [];
    const nagativeCTR: number[] = [];

    const retainCPC: number[] = [];
    const nagativeCPC: number[] = [];

    const keyResults = (recomdations?.keywords_json && Object.keys(recomdations.keywords_json).length > 0)
      ? recomdations.keywords_json
      : optmzKeywords;

    keyResults?.negative_keywords?.map(key => {
      const relevancePercent = calculatePercent(key.relevance_scores)
      const negKeyData = {
        text: key.keyword,
        action: "Remove",
        type: key.intent_classification,
        relevance: relevancePercent,
        matchType: key.match_type
      }
      finalKeywords.push(negKeyData);
      // overallCTR.push(key?.performance_metrics?.original_ctr)
      // overallCPC.push(key?.performance_metrics?.original_cpc)
      nagativeCTR.push(key?.performance_metrics?.original_ctr)
      nagativeCPC.push(key?.performance_metrics?.original_cpc)
    })
    keyResults?.replacement_keywords?.map(key => {
      const relevancePercent = calculatePercent(key.relevance_scores)
      const replsKeyData = {
        text: key.keyword,
        action: "Add",
        type: key.relevance_scores.intent_classification,
        relevance: relevancePercent,
        matchType: key.match_type
      }
      finalKeywords.push(replsKeyData);
      // overallCTR.push(key?.predicted_performance?.predicted_ctr)
      // overallCPC.push(key?.predicted_performance?.predicted_cpc)
    })
    keyResults?.retained_keywords?.map(key => {
      // const relevancePercent = calculatePercent(key.relevance_scores)
      // const retainKeyData = {
      //   text: key.keyword,
      //   action: "Keep",
      //   type: key.intent_classification,
      //   relevance: relevancePercent,
      //   matchType: key.match_type
      // }
      // finalKeywords.push(retainKeyData);
      // overallCTR.push(key?.performance_metrics?.original_ctr)
      // overallCPC.push(key?.performance_metrics?.original_cpc)
      retainCTR.push(key?.performance_metrics?.original_ctr)
      retainCPC.push(key?.performance_metrics?.original_cpc)
    })


    // ctr 
    const avgRetainCTR = averagePercent(retainCTR)
    const avgNegCTR = averagePercent(nagativeCTR)

    // cpc 
    const avgRetainCPC = averagePercent(retainCPC)
    const avgNegCPC = averagePercent(nagativeCPC)

    // final Calculations 
    const finalCTR = avgRetainCTR - avgNegCTR
    const finalCPC = avgNegCPC - avgRetainCPC

    // const avgCTRPercent = averagePercent(overallCTR);
    // const avgCPC = averagePercent(overallCPC);

    interface DotLoaderProps {
      text: string;
    }
    const DotLoader: React.FC<DotLoaderProps> = ({ text }: { text: string }) => {
      return (
        <>
          <p style={{ color: 'white', fontWeight: 500, position: 'relative', display: 'inline-block' }}>
            {text}
            <span className="dot-loader" />
          </p>

          <style>
            {`
          .dot-loader::after {
            content: '.';
            animation: dots 1.5s steps(4, end) infinite;
            margin-left: 4px;
            white-space: pre;
          }

          @keyframes dots {
            0%   { content: '.'; }
            25%  { content: '..'; }
            50%  { content: '...'; }
            75%  { content: ''; }
            100% { content: '.'; }
          }
        `}
          </style>
        </>
      );
    };

    return (
      <div className="w-full mx-auto bg-[#332270] text-white rounded-xl p-4 shadow-lg">
        <div
          className="flex justify-between items-center cursor-pointer"
        // onClick={() => setOpen(!open)}
        >
          <div className="flex gap-4">
            <span className="p-2 bg-[#44337C] rounded-full flex flex-shrink-0 w-10 h-10 justify-center items-center">
              {gAdsSVG}
            </span>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Keyword Analysis Result</h2>
              <p className="text-sm text-[#C8D2D3]">
                {(kwLoading) ? <DotLoader text="Loading keywords" /> :
                  <> {finalKeywords?.length} Keywords Analyzed with intent classification  </>
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {finalKeywords?.length &&
              <div className="flex justify-end items-center gap-6 text-sm text-purple-200">
                <div className="flex flex-col items-center">
                  <span className="text-white text-center">CTR Optimization</span>
                  <span className="text-green-400 font-semibold">{finalCTR} %</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-white text-center">CPC Reduction</span>
                  <span className="text-green-400 font-semibold">INR {finalCPC}</span>
                </div>
              </div>
            }
            {/* <ChevronDown
              size={26}
              className={`transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            /> */}
          </div>
        </div>
        {/* ${open ? "max-h-screen mt-4" : "max-h-0"} */}
        <div
          className={`transition-all duration-500 overflow-hidden max-h-screen mt-4`}
        >
          <div className="space-y-3 max-h-[500px] overflow-hidden overflow-y-auto">
            {finalKeywords?.map((kw, idx) => (
              <div key={idx} className="flex justify-between items-center bg-[#44337C] rounded-lg p-4 overflow-y-auto max-h-[800px]">
                <div className="flex items-center gap-4">
                  {/* icons  */}
                  {
                    kw.action === "Keep" && <span><Check size={18} color="#53D73D" /></span> ||
                    kw.action === "Add" && <span><Plus size={18} color="#3B72D8" /></span> ||
                    kw.action === "Remove" && <span><X size={18} color="#EF5075" /></span>
                  }
                  <p className="font-medium text-white">{kw.text}</p>
                  <div className="flex gap-2 text-xs mt-1">
                    <span
                      className={`px-2 py-0.5 rounded font-medium ${kw.action === "Keep"
                        ? "text-[#53D73D]"
                        : kw.action === "Add"
                          ? "text-[#3B72D8]"
                          : "text-red-500"
                        }`}
                    >
                      {kw.action}
                    </span>
                    <span
                      className={`${kw.type === "INFORMATIONAL" ? "bg-[#AEC6FF] text-[#3B72D8]" :
                        kw.type === "TRANSACTIONAL" ? "bg-[#CFE8DA] text-green-700" :
                          kw.type === "COMMERCIAL" ? "bg-[#CDA6F8] text-[#6C36A8]" :
                            kw.type === "NAVIGATIONAL" ? "bg-[#FFF7AE] text-[#5A4A00]" : ""}  
                    px-2 py-0.5 rounded`}>
                      {kw.type}
                    </span>
                    <span>
                      <CircleDot size={18} color={kw.matchType === "PHRASE" ? "#A17035" :
                        kw.matchType === "BROAD" ? "#CDA6F8" :
                          kw.matchType === "MATCH" ? "#AEC6FF" : kw.matchType === "EXACT" ? "#FFAEA9" : ""} />
                    </span>
                    <span className={`px-2 py-0.5 rounded font-medium ${kw.matchType === "PHRASE" ? "bg-[#FFEBD3] text-[#A17035]" :
                      kw.matchType === "BROAD" ? "bg-[#CDA6F8] text-[#6C36A8]" :
                        kw.matchType === "MATCH" ? "bg-[#AEC6FF] text-[#3B72D8]" : kw.matchType === "EXACT" ? "bg-[#FFAEA9] text-[#B83227]" : ""}`}>
                      {kw.matchType}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex flex-col items-center gap-2 font-semibold ${kw.relevance >= 80
                    ? "text-green-300"
                    : kw.relevance >= 70
                      ? "text-yellow-300"
                      : "text-red-300"
                    }`}
                >
                  <span className="text-[#C8D2D3] font-medium">Relevance</span>
                  {kw.relevance}%
                </div>
              </div>
            ))}
          </div>
          <span className="my-4 flex w-full justify-center text-sm">
            {!kwLoading && !keyResults && !finalKeywords && <>oops..! No keywords are found.</>}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className=" xl:pb-[60px] pb-[70px] 2xl:pb-[55px] rounded-[8px] h-[100%] flex flex-col  text-white mb-4">
      <div
        className={`w-full flex gap-6  whitespace-nowrap md:whitespace-normal -mt-1`}
      >
        {tabs?.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="w-auto text-center cursor-pointer"
            onClick={() => setActiveTab(index)}
          >
            <div
              className={classNames(
                "xl:border-b-2 text-base flex flex-col justify-center items-center gap-1 ",
                index == activeTab
                  ? "text-[#FFC01D] border-[#FFC01D] font-bold"
                  : "text-white border-none font-normal"
              )}
            >
              <p className="text-[14px] leading-[15px] -pt-2  xl:pt-[-10px] pb-[8px]">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <>
          <Loading />
          <Loading />
        </>
      ) :
        <div className="flex flex-col lg:flex-row gap-6 mt-2">
          {/* Left/Main Column */}
          <div className="flex-1 min-w-0">
            {/* Performance Enhancement Header */}
            <div className="rounded-xl mb-6">
              <div className="md:items-center md:justify-between gap-4 mb-4">
                <div className="text-[20px] font-bold text-white flex items-center gap-3">
                  <span className="decoration-4 underline-offset-4">Performance Enhancement</span>
                  <span className="ml-2 flex gap-1">
                    <span className="bg-[#FF5A5A] text-[10px] px-2 py-1 rounded font-normal">High {performance?.High}</span>
                    <span className="bg-[#FFC01D] text-[10px] px-2 py-1 rounded font-normal text-[#000000]">Medium {performance?.med}</span>
                    <span className="bg-[#4CAF50] text-[10px] px-2 py-1 rounded font-normal">Low {performance?.low}</span>
                  </span>
                </div>
                <div className="text-sm text-white">Implementing all recommendation could result in following improvement</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Improvement Metrics */}

                {recomdations?.output_json?.benchmark_comparison && Object.keys(recomdations?.output_json?.benchmark_comparison).map((item: any, index: number) => {
                  const value = (recomdations?.output_json?.benchmark_comparison[item]).replace(/[-%]/g, "");
                  return <div className="bg-[#332270] rounded-lg p-4 pb-5 flex-1 min-w-[220px] flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[16px] text-white">{item}</span>
                      <div className="flex items-end gap-2">
                        <div className="text-[16px] font-bold text-white">+{value}%</div>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-[#8297BD] rounded mt-2">
                      <div className="h-2 bg-[#FFCB54] rounded" style={{ width: `${value > 100 ? 100 : value}%` }}></div>
                    </div>
                  </div>
                })}

              </div>
            </div>

            {/* Recommendations List */}
            <div className="flex flex-col gap-4">
              {recomdations?.output_json?.recommendations && recomdations?.output_json?.recommendations.length > 0 ? (
                recomdations.output_json.recommendations.map((item: any, index: number) => (
                  <div key={index} className={`bg-[#23145A] rounded-xl p-4 pb-6 ${openIndex === index ? 'bg-[#332270]' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer" onClick={() => toggleAccordion(index, item.recommendation_category)}>
                      <div className="flex items-center justify-center gap-3">
                        {/* Placeholder icon */}
                        <div className="bg-[#44337C] rounded-full flex items-center justify-center text-white text-xl font-bold p-2">
                          {item.recommendation_category == "budget" && (<MdCurrencyExchange />)}
                          {item.recommendation_category == "creative" && (<MdOutlineNewspaper />)}
                          {item.recommendation_category == "demographic" && (<FaUserGroup />)}
                          {item.recommendation_category == "other" && (<TbPhysotherapist />)}
                        </div>
                        <span className="text-base mt-2 font-semibold">{item.recommendation.split(':')[0]}

                        </span>
                        <span className={
                          'text-[10px] font-normal px-2 py-1 inline-block rounded m-2 ' +
                          (item.recommendation_priority === 'High' ? 'bg-[#FF5A5A] text-white' : item.recommendation_priority === 'Medium' ? 'bg-[#FFC01D] text-[#000000]' : 'bg-[#4CAF50] text-white')
                        }>
                          {item.recommendation_priority ? item.recommendation_priority.charAt(0).toUpperCase() + item.recommendation_priority.slice(1) : 'Med'}
                        </span>
                      </div>
                      <button onClick={() => {
                        if (item.recommendation_category == "budget") {
                          router.push(`/apphome/${Workspacename}/admanager/budget?campaignId=${campaignDetails?.data[0].campaignId}&brandid=${campaignDetails?.data[0].brandId}&productid=${campaignDetails?.data[0].productId}`)
                        }
                        if (item.recommendation_category == "creative") {
                          router.push(`/apphome/${Workspacename}/admanager/ad-creative?campaignId=${campaignDetails?.data[0].campaignId}&brandid=${campaignDetails?.data[0].brandId}&productid=${campaignDetails?.data[0].productId}`)
                        }
                        if (item.recommendation_category == "demographic") {
                          router.push(`/apphome/${Workspacename}/admanager/campaign-creation?campaignId=${campaignDetails?.data[0].campaignId}&brandid=${campaignDetails?.data[0].brandId}&productid=${campaignDetails?.data[0].productId}`)
                        }
                        if (item.recommendation_category == "other") {
                          router.push(`/apphome/${Workspacename}/admanager/summary?campaignId=${campaignDetails?.data[0].campaignId}&brandid=${campaignDetails?.data[0].brandId}&productid=${campaignDetails?.data[0].productId}`)
                        }
                      }} className="border-2 border-[#FFC01D] text-[#FFC01D] font-bold px-4 py-2 rounded hover:bg-[#FFC01D] text-[12px] hover:text-[#1B0B2B] transition whitespace-nowrap">Implement Now</button>
                      <div className="ml-2 flex items-center">
                        {openIndex === index ? <FaAngleUp size={20} className="text-white" /> : <FaAngleDown size={20} className="text-white" />}
                      </div>
                    </div>
                    {/* Metrics Row */}
                    <div className="ml-[50px] flex flex-wrap mt-2 text-[14px] gap-1 text-[#B9B9B9]">
                      {item.optimization_potential.map((item, key) => <span key={key} className="font-normal text-[#53D73D]">{item['CTR'] ? `CTR :  ${item.CTR} ` : ""} {item.CPC ? ` | CPC : ${item.CPC}` : ""}</span>)}
                    </div>
                    {/* Expanded Details */}
                    {openIndex === index && (
                      <>
                        <div className="mt-2 text-white text-sm font-thin">{item.reasoning}</div>
                        <div className="mt-4">
                          <div className="bg-[#44337C] rounded-xl p-4">
                            <div className="text-base font-bold text-white mb-2">Why this matters?</div>
                            <div className="text-sm text-white font-thin">{item.expected_outcome}</div>
                          </div>
                        </div>
                        {item.recommendation_category == "creative" && <div className="rounded-xl py-4 mt-2">
                          <div className="text-base font-bold text-white mb-2">Image Analysis</div>
                          {imageAnalysis === null ? (
                            // Show loader when imageAnalysis is null
                            <div className="bg-[#44337C] rounded-xl p-4">
                              <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                <span className="ml-3 text-white">Loading image analysis...</span>
                              </div>
                            </div>
                          ) : imageAnalysis && imageAnalysis.length > 0 ? (
                            // Show image analysis items when array has content
                            imageAnalysis.map((item: any, index: number) => (
                              <div key={index} className="bg-[#44337C] rounded-xl p-4 mt-2">
                                <div className="flex gap-4">
                                  {/* Left side - Image */}
                                  <div className="flex-shrink-0 w-32 h-32">
                                    {/* <img src={item.signed_image_url} className="w-[50px]" /> */}
                                    <img
                                      src={item.img}
                                      alt="Ad creative"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>
                                  {/* Right side - Analysis text with scroll */}
                                  <div className="flex-1">
                                    <div className="text-sm text-white font-thin max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-700">
                                      {item?.analysis?.feature_analyses && Object.entries(item.analysis.feature_analyses)
                                        .filter(([key, feature]: [string, any]) => feature.feature_assessment === "bad")
                                        .map(([key, feature]: [string, any], index: number) => (
                                          <div
                                            key={index}
                                            className="mb-2 p-2 bg-[#23145A] rounded border-l-2 border-[#130828] transition-colors hover:bg-[#2A1A5A]"

                                          >
                                            <div className="text-sm text-white font-semibold relative group">
                                              <p className="text-white font-normal text-[14px] absolute  bg-black z-50 mt-[5px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {feature?.keyword_recommendation}
                                              </p>
                                              <p className="text-white hover:text-nyx-yellow font-normal text-[14px] leading-[20px] text-left w-[14ch] truncate ">
                                                {feature.feature_name}
                                              </p>

                                            </div>
                                            <div className="text-xs text-white font-thin mt-1">{feature.current_value}</div>
                                          </div>
                                        ))
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            // Show "No image analysis available" when array is empty
                            <div className="bg-[#44337C] rounded-xl p-4">
                              <div className="text-sm text-white font-thin">No image analysis available.</div>
                            </div>
                          )}
                        </div>}

                      </>
                    )}



                  </div>
                ))
              ) : (
                <div className="text-center text-[#FFC01D] text-lg py-8">No recommendation for now, please run the campaign for some time!</div>
              )}
            </div>
            <br />
            {recomdations?.output_json?.recommendations && recomdations?.output_json?.recommendations.length > 0 && <KeywordAnalysisCard />}

          </div>

          {/* Right/Sidebar Column */}
          <div className="w-full lg:w-[464px] flex-shrink-0">
            <div className="bg-[#23145A] rounded-xl p-6 mb-6">
              <div className="text-xl font-bold text-white mb-4">Key Insights</div>
              <div className="flex flex-col gap-4">
                {(recomdations?.output_json?.key_insights ?? []).length > 0 ? (
                  recomdations.output_json.key_insights.map((item: any, idx: number) => (
                    <div key={idx} className="bg-[#332270] rounded-lg p-4 text-white flex items-center gap-3">
                      <span className="text-white text-lg"><MdOutlineElectricBolt /></span>
                      <span className="text-base">{item.insight}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[#FFCB54] text-sm">No insights available.</div>
                )}
              </div>
              {/* <div className="mt-4 text-right">
                <a href="#" className="text-[#FFCB54] text-xs underline">View All Insights</a>
              </div> */}
            </div>
          </div>

        </div>
      }

    </div>
  );
};
