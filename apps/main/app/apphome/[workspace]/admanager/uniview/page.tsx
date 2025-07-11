/* eslint-disable react-hooks/exhaustive-deps */
// import MetabaseDashboard from "./_components/MetabaseDashboard";
"use client";
import TestDashboard from "./_components/TestDashboard";
import { FaAngleRight, FaIndianRupeeSign } from "react-icons/fa6";
import MetabaseDashboard from "./_components/MetabaseDashboard";
import { getCampaign } from "@nyx-frontend/main/services/admanagerServices";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Switch from "react-switch";
import { recomendationCampaign } from "@nyx-frontend/main/services/admanagerServices";
import { CampaignStatusUpdate } from "@nyx-frontend/main/services/admanagerServices";
import useStore from "../component/store";
import { Recommendations } from "./_components/Recommendations";
import classNames from "@nyx-frontend/main/utils/classNames";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  getExternalCampaigns,
  // OnlyActiveCampaign,
} from "@nyx-frontend/main/services/admanagerServices";
import Modal from "react-modal";
import { recoPopupStyle } from "@nyx-frontend/main/utils/modalstyles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  chartData,
  gradientDefs,
  metricOptionsForChart,
} from "./_components/Constant";

const showMoreDetails = [
  {
    title: "Budget Optimization",
    recommendations: [
      {
        scenario: "Adjust budget for high/low-performing campaigns",
        useCase:
          "Performance is flattening; scale down the campaign budget by 20% to prevent waste.",
      },
      {
        scenario: "Shift budget across campaigns for high ROAS",
        useCase:
          "Shift 15% of the budget from underperforming ads to top-performing ones.",
      },
      {
        scenario: "Optimize daily spend distribution",
        useCase:
          "Adjust daily spending limits to maximize conversions during peak hours.",
      },
      {
        scenario: "Optimize bid strategy type",
        useCase:
          "Switch from manual CPC to target CPA for better cost efficiency.",
      },
      {
        scenario: "Adjust budget for seasonal trends",
        useCase: "Increase budget by 30% for the festive sale period.",
      },
    ],
  },
  {
    title: "Audience & Targeting",
    recommendations: [
      {
        scenario: "Exclude low-converting regions",
        useCase: "Pause ads in regions with CTR below 0.5%.",
      },
      {
        scenario: "Refine targeting (broad → narrow)",
        useCase:
          "Narrow targeting from broad interest groups to high-intent buyers.",
      },
      {
        scenario: "Expand high-performing lookalikes (Meta)",
        useCase:
          "Increase spend on a lookalike audience that converts 2x better.",
      },
      {
        scenario: "Improve keyword targeting (Google)",
        useCase: "Add high-performing keywords and remove irrelevant ones.",
      },
      {
        scenario: "Focus on high-converting demographics",
        useCase:
          "Adjust targeting to prioritize users aged 25-34, where ROAS is highest.",
      },
    ],
  },
  {
    title: "External Factors",
    recommendations: [
      {
        scenario: "Align with market trends",
        useCase:
          "Competitor discounts are trending; adjust ad messaging accordingly.",
      },
      {
        scenario: "Benchmark against competitors",
        useCase:
          "Competitor A increased ad spend; consider increasing bids for visibility.",
      },
    ],
  },
  {
    title: "Ad Creative & Copy",
    recommendations: [
      {
        scenario: "Reduce spending on high CPC & low CTR ads",
        useCase:
          "Reduce the budget for an ad creative with CTR 30% higher than average.",
      },
    ],
  },
  {
    title: "Recommendation Category",
    recommendations: [
      {
        scenario: "Replace underperforming creatives",
        useCase:
          "Swap low-performing images with top-clicked visuals from past campaigns.",
      },
      {
        scenario: "Optimize ad content & messaging",
        useCase: "Adjust copy to highlight limited- time offers for urgency.",
      },
    ],
  },
  {
    title: "Ad Frequency & Fatigue",
    recommendations: [
      {
        scenario: "Lower frequency for high CPC, low CTR ads",
        useCase:
          "Reduce ad frequency to prevent audience fatigue and CPC spikes.",
      },
      {
        scenario: "Update creatives based on performance",
        useCase: "Refresh visuals every 2 to 3 weeks maintain engagement",
      },
      {
        scenario: "Use dynamic ads for fresh content",
        useCase:
          "Enable dynamic creative testing to optimize ad variations automatically.",
      },
      {
        scenario: "Pause stale, low-engagement ads",
        useCase:
          "Pause ads that have run for 30 days with no engagement improvement.",
      },
    ],
  },
  {
    title: "Overall Optimization",
    recommendations: [
      {
        scenario: "Reallocate budget across platforms",
        useCase:
          "Shift 20% of the budget from Google to Meta, where CTR is higher.",
      },
      {
        scenario: "Launch remarketing campaigns",
        useCase: "Retarget users who visited the website but didn’t convert.",
      },
      {
        scenario: "Suggest new campaign opportunities",
        useCase:
          "Suggest launching a conversion/install campaign for better engagement with Gen Z.",
      },
    ],
  },
];

function AdmanagerDashboard() {
  const search = useSearchParams();
  const [plateforms, setplateforms] = useState([]);
  const router = useRouter();
  const [plats, setplats] = useState<any>();
  const [Campgtatus, setCampgtatus] = useState<any>();
  const [Workspacename, setWorkspacename] = useState();
  const [Workspaceid, setWorkspaceid] = useState();
  const [checkedinsta, setCheckedinsta] = useState<any>();
  const [checkedfb, setCheckedfb] = useState<any>();
  const [checkedggl, setCheckedggl] = useState<any>();
  const [checkedlinkedin, setCheckedlinkedin] = useState<any>();
  const [checkedoverall, setCheckedoverall] = useState<any>();
  const [Recomdations, setRecomdations] = useState<any>();
  const [activedata, setactivedata] = useState<any>();
  const [variable, setVariable] = useState<boolean>(true);
  const [statemanagement, setstatemanagement] = useState<boolean>(true);
  const { setElement } = useStore();
  const [page, setPage] = useState<any>(true);
  const [campaignFetchingDetails, setcampaignFetchingDetails] =
    useState<any>(true);
  const [campaignIds, setCampaignIds] = useState<any>();

  const [expand, setExpand] = useState<any>();

  const [showMorePopup, setShowMorePopup] = useState<boolean>(false);

  const [selectedMetrics, setSelectedMetrics] = useState([
    "impressions",
    "clicks",
    "ctr",
    "spend",
  ]);

  const mutateStatusUpdate = useMutation({
    mutationKey: ["update-status"],
    mutationFn: CampaignStatusUpdate,
  });
  useEffect(() => {
    setElement("element5", false);
    setElement("element4", false);
    setElement("element3", false);
    setElement("element2", false);
    setElement("element1", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDisable = () => {
    setVariable(false);
    setTimeout(() => {
      setVariable(true);
      refetch();
      setstatemanagement(!statemanagement);
    }, 10000);
  };


  const UpdateStatusCampaign = (
    status: any,
    plateformid: any,
    isplateform: boolean
  ) => {
    handleClickDisable();
    if (isplateform) {
      const data = {
        campaignId: campaignDetails?.data[0]?.campaignId,
        workspaceId: Workspaceid,
        platformId: plateformid,
        currentStatus: status,
      };

      mutateStatusUpdate.mutate(data, {
        onSuccess: (response: any) => {
          //refetch();
        },
        onError: (error: any) => { },
      });
    } else {
      const data = {
        campaignId: campaignDetails?.data[0]?.campaignId,
        workspaceId: Workspaceid,
        currentStatus: status,
      };
      mutateStatusUpdate.mutate(data, {
        onSuccess: (response: any) => {
          // refetch();
        },
        onError: (error: any) => { },
      });
    }
  };

  const handleChangeinsta = (checked: boolean, platformId: number) => {
    const status = !checked ? "ACTIVE" : "PAUSED";
    const isplateform = true;
    setCheckedinsta(checked);
    UpdateStatusCampaign(status, platformId, isplateform);
  };
  const handleChangefb = (checked: boolean, platformId: number) => {
    const status = !checked ? "ACTIVE" : "PAUSED";
    const isplateform = true;
    setCheckedfb(checked);
    UpdateStatusCampaign(status, platformId, isplateform);
  };
  const handleChangelinkedin = (checked: boolean, platformId: number) => {
    const status = !checked ? "ACTIVE" : "PAUSED";
    const isplateform = true;
    setCheckedlinkedin(checked);
    UpdateStatusCampaign(status, platformId, isplateform);
  };
  const handleChangeggl = (checked: boolean, platformId: any) => {
    const status = !checked ? "ACTIVE" : "PAUSED";
    const isplateform = true;
    setCheckedggl(checked);
    UpdateStatusCampaign(status, platformId, isplateform);
  };
  const handleChangeoverall = (checked: boolean) => {
    setCheckedoverall(checked);
    const status = !checked ? "ACTIVE" : "PAUSED";
    const isplateform = false;
    UpdateStatusCampaign(status, null, isplateform);
  };

  // const mutateActivedata = useMutation({
  //   mutationKey: ["Active-data"],
  //   mutationFn: OnlyActiveCampaign,
  // });

  const mutateExternalCampaign = useMutation({
    mutationKey: ["external-campaigns"],
    mutationFn: getExternalCampaigns,
  });

  const {
    data: campaignDetails,
    isLoading: campaignFetching,
    refetch,
  } = useQuery({
    queryKey: ["getProduct2", Number(search.get("campaignID"))],
    queryFn: () => {
      if (Number(search.get("campaignID"))) {
        return getCampaign(Number(search.get("campaignID")));
      }

      return null;
    },
  });

  useEffect(() => {
    if (campaignDetails) {
      const checkover = campaignDetails?.overallStatus;
      setCheckedoverall(checkover === "ACTIVE" ? true : false);
      if (checkover != "ACTIVE") {
        setCheckedoverall(false);
      }
      if (checkover === "ACTIVE") {
        setCheckedoverall(true);
      }

      const campaignIds = campaignDetails?.data
        ?.map((item: any) => {
          return item?.adAccountId;
        })
        .filter(Boolean);
      //console.log("ideas campaign", campaignDetails    );

      setCampaignIds(campaignDetails?.data?.[0]?.campaignId);

      const platform = Array.from(
        new Set(
          campaignDetails?.data?.map(
            (campaignDetail: { platform: { platformName: string } }) =>
              campaignDetail?.platform?.platformName
          )
        )
      );
      const plates = Array.from(
        new Set(
          campaignDetails?.data?.map(
            (campaignDetail: { platform: any }) => campaignDetail?.platform
          )
        )
      );

      const CampStatus = campaignDetails?.data?.map(
        (campaignDetail: { status: any }) => campaignDetail?.status
      );

      console.log(CampStatus);
      setCampgtatus(CampStatus);
      for (let i = 0; i < plates?.length; i++) {
        //@ts-ignore
        if (plates[i]?.platformName === "Google") {
          //@ts-ignore
          if (CampStatus[i] != "ACTIVE") {
            setCheckedggl(false);
          }
          if (CampStatus[i] === "ACTIVE") {
            setCheckedggl(true);
          }
        }
        //@ts-ignore
        if (plates[i]?.platformName === "Facebook") {
          //@ts-ignore
          if (CampStatus[i] != "ACTIVE") {
            setCheckedfb(false);
          }
          if (CampStatus[i] === "ACTIVE") {
            setCheckedfb(true);
          }
        }
        //@ts-ignore
        if (plates[i]?.platformName === "Instagram") {
          //@ts-ignore
          if (CampStatus[i] != "ACTIVE") {
            setCheckedinsta(false);
          }
          if (CampStatus[i] === "ACTIVE") {
            setCheckedinsta(true);
          }
        }

        //@ts-ignore
        if (plates[i]?.platformName === "LinkedIn") {
          //@ts-ignore
          if (CampStatus[i] != "ACTIVE") {
            setCheckedlinkedin(false);
          }
          if (CampStatus[i] === "ACTIVE") {
            setCheckedlinkedin(true);
          }
        }
      }
      //@ts-ignore
      setplats(plates);
      //@ts-ignore
      setplateforms(platform);
    }
  }, [campaignDetails, statemanagement]);

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    const ID = localStorage.getItem("workspace_id");

    //@ts-ignore
    setWorkspacename(name);
    //@ts-ignore
    setWorkspaceid(ID);
  }, [
    handleChangeinsta,
    handleChangeggl,
    handleChangelinkedin,
    handleChangeoverall,
    handleChangefb,
  ]);

  useEffect(() => {
    // console.log({activedata})
    // if (activedata) {
    //  console.log("data set ",campaignDetails)

    const Gen = campaignDetails?.data[0]?.targetGroups[0]?.gender;
    const obj = campaignDetails?.data[0]?.objective;

    // console.log("details homo",campaignDetails)
    const elementsArray = [
      "Brand Awareness",
      "Traffic",
      "Search",
      "Video views",
      "Engagement",
      "Website conversion",
    ];
    const mainobj = elementsArray.includes(obj);

    // if (activedata) {
    const data = {
      campaign_id: Number(search.get("campaignID")),
      //campaign_id: campaignDetails?.data?.[0]?.adCampaignId,
      // platform: activedata?.platform || null,
      // age: activedata?.age || null,
      // gender: activedata?.gender || null,
      // device: activedata?.device || null,
      // campaign_objective: activedata?.campaign_objective || obj || null,
      // campaign_type: activedata?.campaign_type || null,
      // bid_type: activedata?.bid_type || null,
      // ad_type: activedata?.campaign_type || null,
      // creative_type: activedata?.campaign_name || null,
      // placement: activedata?.placement || null,
      // country: activedata?.country || null,
      // location: activedata?.location || null,
      // impressions: activedata?.impressions || null,
      // clicks: activedata?.clicks || null,
      // conversions: activedata?.conversions || null,
      // cost: activedata?.cost || null,
      // ctr: activedata?.ctr || null,
      // actual_cpc: activedata?.avg_cpc || null,
      // cpm: activedata?.cpm || null,
    };

    // mutateRecomdation.mutate(data, {
    //   onSuccess: (response: any) => {
    //     console.log(response);
    //     setRecomdations(response);
    //     setcampaignFetchingDetails(false);
    //   },
    //   onError: (error: any) => {
    //     // console.log("responce error :::", error);
    //     setcampaignFetchingDetails(false);
    //   },
    // });
    // }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (Number(search.get("campaignID"))) {
  //     const data = {
  //       campaign_id: Number(search.get("campaignID")),
  //     };
  //     mutateActivedata.mutate(data, {
  //       onSuccess: (response: any) => {
  //         // setRecomdations(response);
  //         setactivedata(response);
  //         // console.log("Active data", response);
  //       },
  //       onError: (error: any) => {
  //         // console.log("responce error :::", error);
  //         setcampaignFetchingDetails(false);
  //       },
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [campaignDetails]);

  const handleExpand = () => {
    setExpand((prev: any) => !prev);
  };

  const allcampaignclick = () => {
    localStorage.setItem("allcampaignpath", "uniview");
    router.push(`/apphome/${Workspacename}/admanager/dashboard?view=graph`);
  };
  useEffect(() => {
    localStorage.removeItem("allcampaignpath");
  }, []);

  const toggleMetric = (metric: string) => {
    setSelectedMetrics((prev) => {
      // Always keep at least one metric selected
      if (prev.includes(metric) && prev.length > 1) {
        return prev.filter((m) => m !== metric);
      } else if (!prev.includes(metric)) {
        return [...prev, metric];
      }
      return prev;
    });
  };

  const openSummaryPage = () => {
    // if (campaignDetails?.data[0]?.type == "EXTERNAL") {
    //   const params = {
    //     workspaceId: Number(localStorage.getItem("workspace_id")),
    //     campaignId: [campaignDetails?.data[0]?.campaignId]
    //   };
    //   mutateExternalCampaign.mutate(params, {
    //     onSuccess: (response: any) => {
    //       router.push(`/apphome/${Workspacename}/admanager/summary?campaignId=${campaignDetails?.data[0]?.campaignId}&brandid=${campaignDetails?.data[0]?.brandId}&objective=${campaignDetails?.data[0]?.objective}`);
    //     },
    //     onError: (error: any) => {
    //     },
    //   });

    // } else {
    router.push(`/apphome/${Workspacename}/admanager/summary?campaignId=${campaignDetails?.data[0]?.campaignId}&brandid=${campaignDetails?.data[0]?.brandId}&objective=${campaignDetails?.data[0]?.objective}`);
    // }
  }

  return (
    <>
      <div className=" w-full h-full px-2 pt-[10px] pb-8">
        {campaignFetching ? (
          <>
            <div className="px-[16px] rounded-[8px] h-[154px] flex items-center ">
              <div className="w-full h-full rounded-xl">
                <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
                  <div>
                    <Skeleton
                      //@ts-ignore
                      animation="wave"
                      baseColor="rgba(255, 255, 255, 0.09)"
                      className="w-full h-[500px] rounded-xl "
                    />
                  </div>
                </SkeletonTheme>
              </div>
            </div>
          </>
        ) : (
          <div className=" py-[-8px] px-[14px] rounded-[8px] h-full relative overflow-hidden overflow-y-auto">
            <div className="flex flex-row items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="text-white items-center  text-bold text-[20px] mr-3 font-bold flex  gap-2">
                  <Link
                    href={`/apphome/${Workspacename}/admanager/dashboard?view=table`}
                    className=" hover:text-nyx-yellow text-white group "
                  >
                    <svg
                      width="10"
                      height="20"
                      viewBox="0 0 10 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      <path
                        d="M9.59159 18.6636C9.83505 18.4081 9.97182 18.0616 9.97182 17.7004C9.97182 17.3391 9.83505 16.9926 9.59159 16.7371L3.16308 9.99302L9.59159 3.24893C9.82815 2.99197 9.95905 2.64781 9.95609 2.29059C9.95313 1.93336 9.81655 1.59164 9.57577 1.33903C9.33498 1.08642 9.00925 0.943139 8.66874 0.940035C8.32823 0.93693 8.00018 1.07426 7.75524 1.32244L0.408559 9.02977C0.165093 9.28527 0.0283208 9.63175 0.0283208 9.99302C0.0283208 10.3543 0.165093 10.7008 0.408559 10.9563L7.75524 18.6636C7.99878 18.919 8.32905 19.0625 8.67341 19.0625C9.01778 19.0625 9.34804 18.919 9.59159 18.6636Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>

                  <p className="text-[20px]">
                    {campaignDetails?.data[0]?.campaignName}
                  </p>
                  <div
                    onClick={openSummaryPage}
                    className="ml-[6px] hover:text-nyx-yellow text-white group inline-flex cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="">
                  <Switch
                    onChange={handleChangeoverall}
                    checked={checkedoverall}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#53D73D"
                    offColor="#503193"
                    handleDiameter={16}
                    width={32}
                    height={14}
                    disabled={
                      (campaignDetails?.overallStatus === "ACTIVE" ||
                        campaignDetails?.overallStatus === "PAUSED") &&
                        variable
                        ? false
                        : true
                    }
                  />
                </div>
              </div>

              <div className="flex gap-x-3 -mt-1  items-center w-fit relative">
                <p
                  className={`text-normal text-[14px] leading-[14px] flex  items-center gap-2 ${campaignDetails?.overallStatus === "IN_PROGRESS"
                    ? "text-[#90a3c8]"
                    : campaignDetails?.overallStatus === "DRAFT"
                      ? "text-[#90a3c8]"
                      : campaignDetails?.overallStatus === "ACTIVE"
                        ? "text-[#34C759]"
                        : campaignDetails?.overallStatus === "REJECTED"
                          ? "text-[#FF3B30]"
                          : campaignDetails?.overallStatus === "PAUSED"
                            ? "text-[#FFCC00]"
                            : campaignDetails?.overallStatus === "INACTIVE"
                              ? "text-[#90a3c8]"
                              : campaignDetails?.overallStatus === "UNDER_REVIEW"
                                ? "text-[#90a3c8]"
                                : "text-white"
                    }`}
                >
                  <span
                    className={`w-[10px] h-[10px] rounded-[80px] ${campaignDetails?.overallStatus === "IN_PROGRESS"
                      ? "bg-[#90a3c8]"
                      : campaignDetails?.overallStatus === "DRAFT"
                        ? "bg-[#90a3c8]"
                        : campaignDetails?.overallStatus === "ACTIVE"
                          ? "bg-[#34C759]"
                          : campaignDetails?.overallStatus === "REJECTED"
                            ? "bg-[#FF3B30]"
                            : campaignDetails?.overallStatus === "PAUSED"
                              ? "bg-[#FFCC00]"
                              : campaignDetails?.overallStatus === "INACTIVE"
                                ? "bg-[#90a3c8]"
                                : campaignDetails?.overallStatus === "UNDER_REVIEW"
                                  ? "bg-[#90a3c8]"
                                  : "bg-white"
                      }`}
                  ></span>{" "}
                  {campaignDetails?.overallStatus === "IN_PROGRESS"
                    ? "Inactive (Under Review)"
                    : campaignDetails?.overallStatus === "DRAFT"
                      ? "Inactive (Draft)"
                      : campaignDetails?.overallStatus === "ACTIVE"
                        ? "Active"
                        : campaignDetails?.overallStatus === "REJECTED"
                          ? "Rejected"
                          : campaignDetails?.overallStatus === "PAUSED"
                            ? "Paused"
                            : campaignDetails?.overallStatus === "INACTIVE"
                              ? "Inactive"
                              : campaignDetails?.overallStatus === "UNDER_REVIEW"
                                ? "Inactive (Under Review)"
                                : campaignDetails?.overallStatus}
                </p>
                <div className="text-white">|</div>
                <div className="font-bold text-[#ffffff] text-[14px]">
                  Channels
                </div>
                <div className="flex gap-x-2">
                  {plats &&
                    plats.map((item: any, index: any) => {
                      return (
                        <div className="h-[18px] w-[20px] mb-[8px]" key={index}>
                          {item.platformName === "Google" && (
                            <>
                              {/* <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.375 2.31c-.7-.05-1.43.11-2.08.49a3.656 3.656 0 0 0-1.35 5l7.34 12.7c1.01 1.76 3.25 2.34 5.01 1.34 1.75-1 2.33-3.25 1.33-5l-7.32-12.7a3.694 3.694 0 0 0-2.93-1.83ZM6.945 7.6l-5.32 9.24a3.67 3.67 0 0 0-.5 1.83 3.67 3.67 0 0 0 3.67 3.67 3.67 3.67 0 0 0 3.17-1.84v.01l3.16-5.48c-1.35-2.3-2.73-4.59-3.97-6.96-.08-.15-.15-.31-.2-.47h-.01Z"
                                  fill={
                                    Campgtatus[index] === "ACTIVE"
                                      ? `#fff`
                                      : `#ffffff55`
                                  }
                                />
                              </svg> */}

                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.082 3.00511C11.8891 3.00053 11.6951 3.00888 11.502 3.03246C10.9863 3.09542 10.4758 3.25955 10 3.53441C9.37451 3.89576 8.94211 4.43301 8.60352 5.02074L8.54492 4.98558L2.54492 14.9856L2.57227 15.0012C2.22763 15.6272 2 16.3023 2 16.9993C2 17.9715 2.31868 18.9571 3.00195 19.7258C3.68523 20.4945 4.75 20.9993 6 20.9993C7.25 20.9993 8.31477 20.4945 8.99805 19.7258C9.1915 19.5082 9.29162 19.2445 9.42773 18.9973L9.45508 19.0129L12 14.7727L14.5352 18.9993C14.5364 19.0014 14.5379 19.003 14.5391 19.0051C15.639 20.9035 18.099 21.5623 20 20.4641C21.9033 19.3659 22.5643 16.9024 21.4648 14.9993L21.459 14.9914L15.4648 4.99925C15.4636 4.99715 15.4621 4.99548 15.4609 4.99339C14.7393 3.74801 13.4325 3.03722 12.082 3.00511ZM12.1426 4.99925C12.2703 5.00803 12.3965 5.02877 12.5195 5.06175C13.0119 5.1937 13.4535 5.51588 13.7324 5.99925L13.7363 6.00707L13.7402 6.01293L19.7324 15.9993C20.291 16.9661 19.9667 18.1739 19 18.7317C18.0331 19.2902 16.8254 18.966 16.2676 17.9993L16.2637 17.9914L10.2676 7.99925C9.70892 7.03221 10.0324 5.8258 11 5.26683C11.3626 5.05737 11.7593 4.97292 12.1426 4.99925ZM8.51172 8.92699C8.5244 8.94997 8.52197 8.97643 8.53516 8.99925L8.54102 9.00707L10.834 12.8293L9.47852 15.0891C9.33362 14.809 9.21472 14.5164 8.99805 14.2727C8.32684 13.5176 7.28196 13.0284 6.06055 13.011L8.51172 8.92699ZM6 14.9993C6.75 14.9993 7.18523 15.2445 7.50195 15.6008C7.81868 15.9571 8 16.4715 8 16.9993C8 17.527 7.81868 18.0414 7.50195 18.3977C7.18523 18.754 6.75 18.9993 6 18.9993C5.25 18.9993 4.81477 18.754 4.49805 18.3977C4.18132 18.0414 4 17.527 4 16.9993C4 16.4855 4.18317 15.9928 4.48438 15.6379L4.50977 15.5969C4.82589 15.245 5.25572 14.9993 6 14.9993Z"
                                  fill={
                                    Campgtatus[index] === "ACTIVE"
                                      ? `#fff`
                                      : `#ffffff55`
                                  }
                                />
                              </svg>
                            </>
                          )}
                          {item.platformName === "Instagram" && (
                            <>
                              {/* <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.375 3c-2.757 0-5 2.243-5 5v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5h-8Zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3h-8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"
                                  fill={
                                    Campgtatus[index] === "ACTIVE"
                                      ? `#fff`
                                      : `#ffffff55`
                                  }
                                />
                              </svg> */}

                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 3.00391C5.243 3.00391 3 5.24691 3 8.00391V16.0039C3 18.7609 5.243 21.0039 8 21.0039H16C18.757 21.0039 21 18.7609 21 16.0039V8.00391C21 5.24691 18.757 3.00391 16 3.00391H8ZM8 5.00391H16C17.654 5.00391 19 6.34991 19 8.00391V16.0039C19 17.6579 17.654 19.0039 16 19.0039H8C6.346 19.0039 5 17.6579 5 16.0039V8.00391C5 6.34991 6.346 5.00391 8 5.00391ZM17 6.00391C16.7348 6.00391 16.4804 6.10926 16.2929 6.2968C16.1054 6.48434 16 6.73869 16 7.00391C16 7.26912 16.1054 7.52348 16.2929 7.71101C16.4804 7.89855 16.7348 8.00391 17 8.00391C17.2652 8.00391 17.5196 7.89855 17.7071 7.71101C17.8946 7.52348 18 7.26912 18 7.00391C18 6.73869 17.8946 6.48434 17.7071 6.2968C17.5196 6.10926 17.2652 6.00391 17 6.00391ZM12 7.00391C9.243 7.00391 7 9.24691 7 12.0039C7 14.7609 9.243 17.0039 12 17.0039C14.757 17.0039 17 14.7609 17 12.0039C17 9.24691 14.757 7.00391 12 7.00391ZM12 9.00391C13.654 9.00391 15 10.3499 15 12.0039C15 13.6579 13.654 15.0039 12 15.0039C10.346 15.0039 9 13.6579 9 12.0039C9 10.3499 10.346 9.00391 12 9.00391Z"
                                  fill={
                                    Campgtatus[index] === "ACTIVE"
                                      ? `#fff`
                                      : `#ffffff55`
                                  }
                                />
                              </svg>
                            </>
                          )}
                          {item.platformName === "LinkedIn" && (
                            <>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_1_8)">
                                  <path
                                    d="M19.3636 3H4.63636C3.73227 3 3 3.73227 3 4.63636V19.3636C3 20.2677 3.73227 21 4.63636 21H19.3636C20.2677 21 21 20.2677 21 19.3636V4.63636C21 3.73227 20.2677 3 19.3636 3ZM8.68964 17.7273H6.276V9.96109H8.68964V17.7273ZM7.45827 8.85082C6.68018 8.85082 6.051 8.22 6.051 7.44355C6.051 6.66709 6.681 6.03709 7.45827 6.03709C8.23391 6.03709 8.86473 6.66791 8.86473 7.44355C8.86473 8.22 8.23391 8.85082 7.45827 8.85082ZM17.7305 17.7273H15.3185V13.9505C15.3185 13.0497 15.3022 11.8912 14.0643 11.8912C12.8084 11.8912 12.6153 12.8722 12.6153 13.8851V17.7273H10.2033V9.96109H12.5187V11.0223H12.5515C12.8738 10.4119 13.6609 9.768 14.835 9.768C17.2789 9.768 17.7305 11.3765 17.7305 13.4678V17.7273Z"
                                    fill={
                                      Campgtatus[index] === "ACTIVE"
                                        ? `#fff`
                                        : `#ffffff55`
                                    }
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1_8">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </>
                          )}
                          {item.platformName === "Facebook" && (
                            <>
                              {/* <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#a)">
                                  <path
                                    d="M22.375 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5c0-1.93 1.57-3.5 3.5-3.5h2.5v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
                                    fill={
                                      Campgtatus[index] === "ACTIVE"
                                        ? `#fff`
                                        : `#ffffff55`
                                    }
                                  />
                                </g>
                                <defs>
                                  <clipPath id="a">
                                    <path
                                      fill={
                                        item.status === "ACTIVE" ? "#fff" : ""
                                      }
                                      transform="translate(.375)"
                                      d="M0 0h24v24H0z"
                                    />
                                  </clipPath>
                                </defs>
                              </svg> */}

                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_6926_19094)">
                                  <path
                                    d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
                                    fill={
                                      Campgtatus[index] === "ACTIVE"
                                        ? `#fff`
                                        : `#ffffff55`
                                    }
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_6926_19094">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </>
                          )}
                        </div>
                      );
                    })}

                </div>
                <div
                  onClick={() => {
                    handleExpand();
                  }}
                  aria-expanded={"true"}
                  aria-controls="collapseOne"
                  className="ml-[-6px] relative"
                >
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames(
                      "ml-auto h-5 w-7 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none cursor-pointer",
                      expand ? `rotate-[-180deg] ` : `dark:fill-white`
                    )}
                  >
                    <path
                      d="M18.6626 6.40939C18.4071 6.16593 18.0606 6.02915 17.6994 6.02915C17.3381 6.02915 16.9916 6.16593 16.7361 6.40939L9.99204 12.8379L3.24795 6.40939C2.99099 6.17282 2.64684 6.04193 2.28961 6.04488C1.93238 6.04784 1.59066 6.18442 1.33805 6.42521C1.08545 6.666 0.942162 6.99173 0.939059 7.33224C0.935953 7.67275 1.07328 8.0008 1.32146 8.24574L9.02879 15.5924C9.28429 15.8359 9.63077 15.9727 9.99204 15.9727C10.3533 15.9727 10.6998 15.8359 10.9553 15.5924L18.6626 8.24574C18.918 8.0022 19.0615 7.67193 19.0615 7.32757C19.0615 6.9832 18.918 6.65293 18.6626 6.40939Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <motion.div
                  initial={{
                    display: "hidden",
                    height: 0, // Start with height 0 for the dropdown effect
                  }}
                  animate={{
                    display: expand ? "block" : "hidden",
                    height: expand ? "auto" : 0, // Smoothly transition the height based on `expand` state
                  }}
                  exit={{
                    display: "hidden",
                    height: 0, // Collapse the height when exiting
                  }}
                  className={
                    plats?.length <= 2
                      ? `rounded-lg absolute left-[150px] top-2 mt-1 overflow-hidden z-10`
                      : `rounded-lg absolute left-[150px]  top-2 mt-1 overflow-hidden z-10`
                  } // `overflow-hidden` ensures content is hidden when collapsed
                >
                  <div className="flex flex-col my-5 ">
                    {plats &&
                      plats?.map((item: any, index: any) => {
                        return (
                          <div
                            className="w-[216px] h-[66px] bg-[#20133D]  px-[20px] pt-2 pb-4"
                            key={index}
                          >
                            <div className="flex items-center justify-center gap-x-[10px] text-white">
                              <div className="h-[18px] w-[20px] " key={index}>
                                {item.platformName === "Google" && (
                                  <>
                                    <svg
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12.375 2.31c-.7-.05-1.43.11-2.08.49a3.656 3.656 0 0 0-1.35 5l7.34 12.7c1.01 1.76 3.25 2.34 5.01 1.34 1.75-1 2.33-3.25 1.33-5l-7.32-12.7a3.694 3.694 0 0 0-2.93-1.83ZM6.945 7.6l-5.32 9.24a3.67 3.67 0 0 0-.5 1.83 3.67 3.67 0 0 0 3.67 3.67 3.67 3.67 0 0 0 3.17-1.84v.01l3.16-5.48c-1.35-2.3-2.73-4.59-3.97-6.96-.08-.15-.15-.31-.2-.47h-.01Z"
                                        fill={
                                          Campgtatus[index] === "ACTIVE"
                                            ? `#fff`
                                            : `#ffffff55`
                                        }
                                      />
                                    </svg>
                                  </>
                                )}
                                {item.platformName === "Instagram" && (
                                  <>
                                    <svg
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8.375 3c-2.757 0-5 2.243-5 5v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5h-8Zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3h-8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"
                                        fill={
                                          Campgtatus[index] === "ACTIVE"
                                            ? `#fff`
                                            : `#ffffff55`
                                        }
                                      />
                                    </svg>
                                  </>
                                )}
                                {item.platformName === "LinkedIn" && (
                                  <>
                                    <svg
                                      viewBox="0 0 26 26"
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="22"
                                      width="22"
                                    >
                                      <path
                                        d="M22.9167 0.25C23.6681 0.25 24.3888 0.548511 24.9201 1.07986C25.4515 1.61122 25.75 2.33189 25.75 3.08333V22.9167C25.75 23.6681 25.4515 24.3888 24.9201 24.9201C24.3888 25.4515 23.6681 25.75 22.9167 25.75H3.08333C2.33189 25.75 1.61122 25.4515 1.07986 24.9201C0.548511 24.3888 0.25 23.6681 0.25 22.9167V3.08333C0.25 2.33189 0.548511 1.61122 1.07986 1.07986C1.61122 0.548511 2.33189 0.25 3.08333 0.25H22.9167ZM22.2083 22.2083V14.7C22.2083 13.4751 21.7218 12.3005 20.8557 11.4343C19.9895 10.5682 18.8149 10.0817 17.59 10.0817C16.3858 10.0817 14.9833 10.8183 14.3033 11.9233V10.3508H10.3508V22.2083H14.3033V15.2242C14.3033 14.1333 15.1817 13.2408 16.2725 13.2408C16.7985 13.2408 17.303 13.4498 17.6749 13.8217C18.0469 14.1937 18.2558 14.6982 18.2558 15.2242V22.2083H22.2083ZM5.74667 8.12667C6.37788 8.12667 6.98324 7.87592 7.42958 7.42958C7.87592 6.98324 8.12667 6.37788 8.12667 5.74667C8.12667 4.42917 7.06417 3.3525 5.74667 3.3525C5.11169 3.3525 4.50273 3.60474 4.05374 4.05374C3.60474 4.50273 3.3525 5.11169 3.3525 5.74667C3.3525 7.06417 4.42917 8.12667 5.74667 8.12667ZM7.71583 22.2083V10.3508H3.79167V22.2083H7.71583Z"
                                        fill={
                                          Campgtatus[index] === "ACTIVE"
                                            ? `#fff`
                                            : `#ffffff55`
                                        }
                                      />
                                    </svg>
                                  </>
                                )}
                                {item.platformName === "Facebook" && (
                                  <>
                                    <svg
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#a)">
                                        <path
                                          d="M22.375 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5c0-1.93 1.57-3.5 3.5-3.5h2.5v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
                                          fill={
                                            Campgtatus[index] === "ACTIVE"
                                              ? `#fff`
                                              : `#ffffff55`
                                          }
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="a">
                                          <path
                                            fill={
                                              item.status === "ACTIVE"
                                                ? "#fff"
                                                : ""
                                            }
                                            transform="translate(.375)"
                                            d="M0 0h24v24H0z"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </>
                                )}
                              </div>
                              <div>
                                <div
                                  className={
                                    Campgtatus[index] === "ACTIVE" ||
                                      Campgtatus[index] === "ACTIVE"
                                      ? `text-[14px] w-[90px] text-[#fff]`
                                      : `text-[14px] w-[90px] text-[#999999]`
                                  }
                                >
                                  {item.platformName}
                                </div>
                                <div
                                  className={
                                    Campgtatus[index] === "ACTIVE"
                                      ? `text-[10px] text-[#53D73D]`
                                      : `text-[10px] text-[#999999]`
                                  }
                                >
                                  {Campgtatus[index] === "IN_PROGRESS"
                                    ? "Inactive (Under Review)"
                                    : Campgtatus[index] === "DRAFT"
                                      ? "Inactive (Draft)"
                                      : Campgtatus[index] === "ACTIVE"
                                        ? "Active"
                                        : Campgtatus[index] === "REJECTED"
                                          ? "Rejected"
                                          : Campgtatus[index] === "PAUSED"
                                            ? "Paused"
                                            : Campgtatus[index] === "INACTIVE"
                                              ? "Inactive"
                                              : Campgtatus[index] === "UNDER_REVIEW"
                                                ? "Inactive (Under Review)"
                                                : Campgtatus[index]}
                                </div>
                              </div>
                              <div>
                                {item?.platformName === "Instagram" && (
                                  <Switch
                                    onChange={(checked) =>
                                      handleChangeinsta(checked, item?.id)
                                    }
                                    checked={checkedinsta}
                                    // checkedIcon={
                                    //   Campgtatus[index] === "ACTIVE" ? true : false
                                    // }
                                    onColor="#53D73D"
                                    offColor="#503193"
                                    handleDiameter={16}
                                    width={32}
                                    height={14}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    // uncheckedIcon={
                                    //   Campgtatus[index] === "PAUSED" ? true : false
                                    // }
                                    disabled={
                                      (Campgtatus[index] === "ACTIVE" ||
                                        Campgtatus[index] === "PAUSED") &&
                                        variable
                                        ? false
                                        : true
                                    }
                                  />
                                )}
                                {item?.platformName === "Facebook" && (
                                  <Switch
                                    onChange={(checked) =>
                                      handleChangefb(checked, item?.id)
                                    }
                                    onColor="#53D73D"
                                    offColor="#503193"
                                    handleDiameter={16}
                                    width={32}
                                    height={14}
                                    checked={checkedfb}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    // checkedIcon={
                                    //   Campgtatus[index] === "ACTIVE" ? true : false
                                    // }
                                    // uncheckedIcon={
                                    //   Campgtatus[index] === "ACTIVE" ? true : false
                                    // }
                                    disabled={
                                      (Campgtatus[index] === "ACTIVE" ||
                                        Campgtatus[index] === "PAUSED") &&
                                        variable
                                        ? false
                                        : true
                                    }
                                  />
                                )}
                                {item?.platformName === "Google" && (
                                  <Switch
                                    onChange={(checked) =>
                                      handleChangeggl(checked, item?.id)
                                    }
                                    onColor="#53D73D"
                                    offColor="#503193"
                                    handleDiameter={16}
                                    width={32}
                                    height={14}
                                    checked={checkedggl}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    // checkedIcon={
                                    //   Campgtatus[index] === "ACTIVE" ? true : false
                                    // }
                                    // uncheckedIcon={
                                    //   Campgtatus[index] === "ACTIVE" ? true : false
                                    // }
                                    disabled={
                                      (Campgtatus[index] === "ACTIVE" ||
                                        Campgtatus[index] === "PAUSED") &&
                                        variable
                                        ? false
                                        : true
                                    }
                                  />
                                )}
                                {item?.platformName === "LinkedIn" && (
                                  <Switch
                                    onChange={(checked) =>
                                      handleChangelinkedin(checked, item?.id)
                                    }
                                    onColor="#53D73D"
                                    offColor="#503193"
                                    handleDiameter={16}
                                    width={32}
                                    height={14}
                                    checked={checkedlinkedin}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    // checkedIcon={
                                    //   Campgtatus[index] === "ACTIVE" ? true : false
                                    // }
                                    // uncheckedIcon={
                                    //   Campgtatus[index] === "ACTIVE" ? true : false
                                    // }
                                    disabled={
                                      (Campgtatus[index] === "ACTIVE" ||
                                        Campgtatus[index] === "PAUSED") &&
                                        variable
                                        ? false
                                        : true
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              </div>

            </div>

            {/* <div className="w-full flex flex-col gap-3 text-base">
              <div className="text-[#FFFFFF] font-bold">
                Current Scenario analysis
              </div>
              <div className="text-[#FFFFFF] font-normal">
                The campaign is underperforming with a CPC of ₹75 and a low CTR
                of 0.7%, despite reaching 1.25 million impressions. The
                frequency of 2.1/day suggests the ad is being repeatedly shown,
                yet engagement remains weak, indicating potential ad fatigue.
                With a conversion rate of just 1.2%, it's clear that either the
                creative lacks impact or the targeting is misaligned.
              </div>
            </div> */}

            {/* <div className="w-full">
              <div className="flex justify-between border-b-[1px] border-[#8297BD80] pt-[18px]  mb-[18px]">
                <div className="flex gap-5 items-center pb-[10px]">
                  <div className="text-[#FFFFFF] font-bold">
                    Future Metrics Projections
                  </div>
                  <button
                    className="text-white hover:text-nyx-yellow font-normal underline"
                    onClick={() => {
                      setShowMorePopup(true);
                    }}
                  >
                    Know More
                  </button>
                </div>

                <div>
                  {page === true &&
                    Recomdations &&
                    Recomdations?.recommendations?.length > 0 && (
                      <div className="flex gap-3 text-[14px] p-2 bg-[#28134B] rounded-[4px] ">
                        {Recomdations?.percentage_difference_cpm && (
                          <div className="text-[#53D73D] flex  gap-x-1">
                            Potential CPM Reduction{" "}
                            {Recomdations?.percentage_difference_cpm}
                            <svg
                              width="11"
                              height="13"
                              viewBox="0 0 11 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="rotate-180 transform scale-x-[-1] mt-1"
                            >
                              <path
                                d="M4.9069 2.08701L4.78944 2.12977L4.83219 2.24723L5.13621 3.08251L5.17897 3.19997L5.29643 3.15722L7.46715 2.36714L5.75594 6.717L3.64279 5.56843L3.64277 5.56842C3.51598 5.49953 3.36888 5.48472 3.23484 5.53351C3.1008 5.58229 2.99763 5.68819 2.94478 5.82247L2.94477 5.82248L0.709586 11.5043L0.669136 11.6071L0.766214 11.6599L1.50315 12.0604L1.6274 12.128L1.67917 11.9964L3.70906 6.83642L5.82221 7.98499L5.82223 7.985C5.94902 8.0539 6.09612 8.0687 6.23016 8.01991C6.3642 7.97113 6.46737 7.86523 6.52022 7.73095L6.52023 7.73094L8.41739 2.90838L9.3056 5.34872L9.34836 5.46618L9.46582 5.42343L10.2041 5.1547L10.3216 5.11195L10.2789 4.99448L8.75877 0.818073L8.71602 0.700611L8.59855 0.743364L4.9069 2.08701Z"
                                fill="#31C618"
                                stroke="#31C618"
                                strokeWidth="0.25"
                              />
                            </svg>
                          </div>
                        )}
                        {Recomdations?.percentage_difference_cpc && (
                          <div className="text-[#53D73D] flex  gap-x-1">
                            Potential CPC Reduction{" "}
                            {Recomdations?.percentage_difference_cpc}
                            <svg
                              width="11"
                              height="13"
                              viewBox="0 0 11 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="rotate-180 transform scale-x-[-1] mt-1"
                            >
                              <path
                                d="M4.9069 2.08701L4.78944 2.12977L4.83219 2.24723L5.13621 3.08251L5.17897 3.19997L5.29643 3.15722L7.46715 2.36714L5.75594 6.717L3.64279 5.56843L3.64277 5.56842C3.51598 5.49953 3.36888 5.48472 3.23484 5.53351C3.1008 5.58229 2.99763 5.68819 2.94478 5.82247L2.94477 5.82248L0.709586 11.5043L0.669136 11.6071L0.766214 11.6599L1.50315 12.0604L1.6274 12.128L1.67917 11.9964L3.70906 6.83642L5.82221 7.98499L5.82223 7.985C5.94902 8.0539 6.09612 8.0687 6.23016 8.01991C6.3642 7.97113 6.46737 7.86523 6.52022 7.73095L6.52023 7.73094L8.41739 2.90838L9.3056 5.34872L9.34836 5.46618L9.46582 5.42343L10.2041 5.1547L10.3216 5.11195L10.2789 4.99448L8.75877 0.818073L8.71602 0.700611L8.59855 0.743364L4.9069 2.08701Z"
                                fill="#31C618"
                                stroke="#31C618"
                                strokeWidth="0.25"
                              />
                            </svg>
                          </div>
                        )}
                        {Recomdations?.percentage_difference_ctr && (
                          <div className="text-[#53D73D] flex  gap-x-1">
                            Potential CTR Increase{" "}
                            {Recomdations?.percentage_difference_ctr}
                            <svg
                              width="11"
                              height="13"
                              viewBox="0 0 11 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=" mt-1"
                            >
                              <path
                                d="M4.9069 2.08701L4.78944 2.12977L4.83219 2.24723L5.13621 3.08251L5.17897 3.19997L5.29643 3.15722L7.46715 2.36714L5.75594 6.717L3.64279 5.56843L3.64277 5.56842C3.51598 5.49953 3.36888 5.48472 3.23484 5.53351C3.1008 5.58229 2.99763 5.68819 2.94478 5.82247L2.94477 5.82248L0.709586 11.5043L0.669136 11.6071L0.766214 11.6599L1.50315 12.0604L1.6274 12.128L1.67917 11.9964L3.70906 6.83642L5.82221 7.98499L5.82223 7.985C5.94902 8.0539 6.09612 8.0687 6.23016 8.01991C6.3642 7.97113 6.46737 7.86523 6.52022 7.73095L6.52023 7.73094L8.41739 2.90838L9.3056 5.34872L9.34836 5.46618L9.46582 5.42343L10.2041 5.1547L10.3216 5.11195L10.2789 4.99448L8.75877 0.818073L8.71602 0.700611L8.59855 0.743364L4.9069 2.08701Z"
                                fill="#31C618"
                                stroke="#31C618"
                                strokeWidth="0.25"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div> */}

            {/* <div className="w-full h-[300px] bg-[#301959] rounded-lg border border-[#301959] p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  {gradientDefs}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#6D28D9"
                    vertical={false}
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="period"
                    axisLine={{ stroke: "#6D28D9" }}
                    tickLine={{ stroke: "#6D28D9" }}
                    tick={{ fill: "#E9D5FF", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={{ stroke: "#6D28D9" }}
                    tickLine={{ stroke: "#6D28D9" }}
                    tick={{ fill: "#E9D5FF", fontSize: 12 }}
                  />

                  <Tooltip
                    content={({ label, payload }) => {
                      if (!payload || payload.length === 0) return null;

                      return (
                        <div
                          style={{
                            backgroundColor: "rgba(45, 27, 105, 0.9)",

                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(109, 40, 217, 0.2)",
                            borderRadius: "12px",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            padding: "8px 12px",
                            textTransform: "uppercase",
                          }}
                        >
                          <p
                            style={{
                              color: "#E9D5FF",
                              fontWeight: "bold",
                            }}
                          >
                            {String(label).toUpperCase()}
                          </p>
                          {payload.map((entry, index) => {
                            const value = Number(entry.value);
                            const formattedValue =
                              value % 1 === 0 ? value : value.toFixed(2); // Check if decimal exists

                            return (
                              <p key={index} style={{ color: entry.color }}>
                                {entry.name?.toString().toUpperCase()} :{" "}
                                {formattedValue}
                              </p>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={72}
                    onClick={(e) => {
                      if (typeof e.dataKey === "string") {
                        toggleMetric(e.dataKey);
                      }
                    }}
                    content={({ payload }) => (
                      <div className="flex flex-wrap gap-3 justify-center mt-5">
                        {payload?.map((entry) => (
                          <div
                            key={String(entry.dataKey)}
                            onClick={() => {
                              if (typeof entry.dataKey === "string") {
                                toggleMetric(entry.dataKey);
                              }
                            }}
                            className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 group ${
                              typeof entry.dataKey === "string" &&
                              selectedMetrics.includes(entry.dataKey)
                                ? "bg-[#2D1B69]/50 text-white"
                                : "text-purple-300/60 hover:text-purple-300"
                            }`}
                          >
                            {(typeof entry.dataKey !== "string" ||
                              !selectedMetrics.includes(entry.dataKey)) && (
                              <div className="absolute inset-0 flex items-center pointer-events-none">
                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent transform -rotate-6" />
                              </div>
                            )}
                            <span
                              className={`w-3 h-3 rounded-full transition-opacity duration-200 ${
                                typeof entry.dataKey === "string" &&
                                !selectedMetrics.includes(entry.dataKey)
                                  ? "opacity-40"
                                  : ""
                              }`}
                              style={{
                                background: entry.color
                                  ?.replace(
                                    "url(#",
                                    "linear-gradient(to right, "
                                  )
                                  .replace(")", ", #4F46E5)"),
                              }}
                            />
                            <span
                              className={`transition-opacity duration-200 ${
                                typeof entry.dataKey === "string" &&
                                !selectedMetrics.includes(entry.dataKey)
                                  ? "opacity-40"
                                  : ""
                              }`}
                            >
                              {metricOptionsForChart.find(
                                (m) => m.key === entry.dataKey
                              )?.label || entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  {metricOptionsForChart.map((metric) => (
                    <Line
                      key={metric.key}
                      type="monotone"
                      dataKey={metric.key}
                      stroke={metric.color}
                      strokeWidth={2}
                      dot={{ fill: metric.color, r: 4, strokeWidth: 2 }}
                      activeDot={{
                        r: 6,
                        fill: "#E9D5FF",
                        stroke: metric.color,
                        strokeWidth: 2,
                      }}
                      hide={!selectedMetrics.includes(metric.key)}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div> */}

            <div className="w-full">
              <div className="flex justify-between border-b-[1px] border-[#8297BD80] pt-[18px]  mb-[18px]">
                <div className="flex gap-5 items-center pb-[10px] text-[14px]">
                  <div className="text-nyx-yellow font-bold ">
                    AI Recommendations
                  </div>
                  <button
                    className="text-white hover:text-nyx-yellow font-normal underline"
                    onClick={() => {
                      setShowMorePopup(true);
                    }}
                  >
                    Know More
                  </button>
                </div>

                <div>
                  {page === true &&
                    Recomdations &&
                    Recomdations?.recommendations?.length > 0 && (
                      <div className="flex gap-3 text-[14px] p-2 bg-[#28134B] rounded-[4px] ">
                        {Recomdations?.percentage_difference_cpm && (
                          <div className="text-[#53D73D] flex  gap-x-1">
                            Potential CPM Reduction{" "}
                            {Recomdations?.percentage_difference_cpm}
                            <svg
                              width="11"
                              height="13"
                              viewBox="0 0 11 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="rotate-180 transform scale-x-[-1] mt-1"
                            >
                              <path
                                d="M4.9069 2.08701L4.78944 2.12977L4.83219 2.24723L5.13621 3.08251L5.17897 3.19997L5.29643 3.15722L7.46715 2.36714L5.75594 6.717L3.64279 5.56843L3.64277 5.56842C3.51598 5.49953 3.36888 5.48472 3.23484 5.53351C3.1008 5.58229 2.99763 5.68819 2.94478 5.82247L2.94477 5.82248L0.709586 11.5043L0.669136 11.6071L0.766214 11.6599L1.50315 12.0604L1.6274 12.128L1.67917 11.9964L3.70906 6.83642L5.82221 7.98499L5.82223 7.985C5.94902 8.0539 6.09612 8.0687 6.23016 8.01991C6.3642 7.97113 6.46737 7.86523 6.52022 7.73095L6.52023 7.73094L8.41739 2.90838L9.3056 5.34872L9.34836 5.46618L9.46582 5.42343L10.2041 5.1547L10.3216 5.11195L10.2789 4.99448L8.75877 0.818073L8.71602 0.700611L8.59855 0.743364L4.9069 2.08701Z"
                                fill="#31C618"
                                stroke="#31C618"
                                strokeWidth="0.25"
                              />
                            </svg>
                          </div>
                        )}
                        {Recomdations?.percentage_difference_cpc && (
                          <div className="text-[#53D73D] flex  gap-x-1">
                            Potential CPC Reduction{" "}
                            {Recomdations?.percentage_difference_cpc}
                            <svg
                              width="11"
                              height="13"
                              viewBox="0 0 11 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="rotate-180 transform scale-x-[-1] mt-1"
                            >
                              <path
                                d="M4.9069 2.08701L4.78944 2.12977L4.83219 2.24723L5.13621 3.08251L5.17897 3.19997L5.29643 3.15722L7.46715 2.36714L5.75594 6.717L3.64279 5.56843L3.64277 5.56842C3.51598 5.49953 3.36888 5.48472 3.23484 5.53351C3.1008 5.58229 2.99763 5.68819 2.94478 5.82247L2.94477 5.82248L0.709586 11.5043L0.669136 11.6071L0.766214 11.6599L1.50315 12.0604L1.6274 12.128L1.67917 11.9964L3.70906 6.83642L5.82221 7.98499L5.82223 7.985C5.94902 8.0539 6.09612 8.0687 6.23016 8.01991C6.3642 7.97113 6.46737 7.86523 6.52022 7.73095L6.52023 7.73094L8.41739 2.90838L9.3056 5.34872L9.34836 5.46618L9.46582 5.42343L10.2041 5.1547L10.3216 5.11195L10.2789 4.99448L8.75877 0.818073L8.71602 0.700611L8.59855 0.743364L4.9069 2.08701Z"
                                fill="#31C618"
                                stroke="#31C618"
                                strokeWidth="0.25"
                              />
                            </svg>
                          </div>
                        )}
                        {Recomdations?.percentage_difference_ctr && (
                          <div className="text-[#53D73D] flex  gap-x-1">
                            Potential CTR Increase{" "}
                            {Recomdations?.percentage_difference_ctr}
                            <svg
                              width="11"
                              height="13"
                              viewBox="0 0 11 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=" mt-1"
                            >
                              <path
                                d="M4.9069 2.08701L4.78944 2.12977L4.83219 2.24723L5.13621 3.08251L5.17897 3.19997L5.29643 3.15722L7.46715 2.36714L5.75594 6.717L3.64279 5.56843L3.64277 5.56842C3.51598 5.49953 3.36888 5.48472 3.23484 5.53351C3.1008 5.58229 2.99763 5.68819 2.94478 5.82247L2.94477 5.82248L0.709586 11.5043L0.669136 11.6071L0.766214 11.6599L1.50315 12.0604L1.6274 12.128L1.67917 11.9964L3.70906 6.83642L5.82221 7.98499L5.82223 7.985C5.94902 8.0539 6.09612 8.0687 6.23016 8.01991C6.3642 7.97113 6.46737 7.86523 6.52022 7.73095L6.52023 7.73094L8.41739 2.90838L9.3056 5.34872L9.34836 5.46618L9.46582 5.42343L10.2041 5.1547L10.3216 5.11195L10.2789 4.99448L8.75877 0.818073L8.71602 0.700611L8.59855 0.743364L4.9069 2.08701Z"
                                fill="#31C618"
                                stroke="#31C618"
                                strokeWidth="0.25"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {page && (
              <Recommendations
                Workspacename={Workspacename}
                campaignDetails={campaignDetails}
              ></Recommendations>
            )}
            {!page && (
              <div className="my-5 relative z-0">
                <div className="h-[100vh] mb-8">
                  {/* <MetabaseDashboard /> */}
                  <TestDashboard />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showMorePopup ? (
        <Modal isOpen={showMorePopup} style={recoPopupStyle}>
          <div className="w-full flex flex-col">
            <div className="flex justify-between">
              <div className="text-base font-bold text-[#FFFFFF]">
                Optimize Your Campaign with Smart Recommendations
              </div>

              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowMorePopup(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#FFFFFF"
                    d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full flex flex-col gap-6 mt-4 h-[350px] overflow-hidden overflow-y-auto">
              {showMoreDetails?.map((section, index) => (
                <div key={index} className="w-full">
                  <p className="text-sm text-nyx-yellow font-bold">
                    {section.title} :
                  </p>
                  {/* <table className="w-full border-collapse border border-nyx-gray-1 mt-2 text-xs">
                    <thead>
                      <tr className="w-full bg-transparent text-white font-normal border-b border-nyx-gray-1">
                        <th className="w-1/2 text-center p-2 border-r border-nyx-gray-1">
                          All Possible Recommendation Scenarios
                        </th>
                        <th className="w-1/2 text-center p-2">
                          Example Use Case
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.recommendations.map(
                        (recommendation, recIndex) => (
                          <tr
                            key={recIndex}
                            className="text-white border-b border-nyx-gray-1"
                          >
                            <td className="p-2 border-r border-nyx-gray-1">
                              {recommendation.scenario}
                            </td>
                            <td className="p-2">{recommendation.useCase}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table> */}
                  <table className="w-full border-collapse mt-2 text-xs">
                    <thead>
                      <tr className="w-full bg-transparent text-gray-300/80 font-normal border-b border-nyx-gray-1">
                        <th className="w-1/2 text-left p-2">
                          {/* All Possible Recommendation Scenarios */}
                          ALL POSSIBLE RECOMMENDATION SCENARIOS
                        </th>
                        <th className="w-1/2 text-left p-2">
                          {/* Example Use Case */}
                          EXAMPLE USE CASE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.recommendations.map(
                        (recommendation, recIndex) => (
                          <tr
                            key={recIndex}
                            className="text-white border-b border-nyx-gray-1"
                          >
                            <td className="p-2">{recommendation.scenario}</td>
                            <td className="p-2">{recommendation.useCase}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default AdmanagerDashboard;
