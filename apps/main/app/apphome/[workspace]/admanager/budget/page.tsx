/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useEffect, useRef } from "react";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "./index.css";
import Button from "@nyx-frontend/main/components/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  getCampaignBudget,
  updateCampaignBudget,
  BudgetAiSuggestion,
} from "@nyx-frontend/main/services/admanagerServices";
import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import BudgetLoading from "./_component/BudgetLoading";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import CampaignLoading from "../campaign-creation/_components/CampaignLoading";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { BsFillInfoCircleFill } from "react-icons/bs";
import classNames from "@nyx-frontend/main/utils/classNames";
import MultipleTgBudget from "./MultipleTgBudget";
import { MultiDate } from "./MultiDate";
import useStore from "../component/store";
import Steper from "../component/Steper";

type ValuePiece = Date | null;

const objectivesTemp = [
  "website conversions",
  "brand awareness",
  "traffic",
  "app installs",
  "lead generation",
  "shopping",
  "video views",
];

const minimunBudget = {
  Meta: 100,
  Google: 100,
  LinkedIn: 500,
  Instagram: 100,
  Facebook: 100,
};

type Value = ValuePiece | [ValuePiece, ValuePiece];

function handleKeyDown(event: any) {
  if (["e", "E", "+", "-"].includes(event.key)) {
    event.preventDefault();
  }
}

function mapAgeRange(range: any) {
  if (range === "18 - 19" || range === "20 - 24") {
    return "18 - 24";
  } else if (range === "55 - 80") {
    return "55+";
  } else {
    return range; // For ranges like "25-54", return as is
  }
}

function extractNumbersWithDash(input: any) {
  // Ensure input is a string
  const stringInput = String(input);
  return stringInput.replace(/[^\d-]/g, "").replace(/-/g, " - ");
}

function getDaysBetweenDates(
  startDate: string | Date,
  endDate: string | Date
): number {
  // Convert input strings or Date objects to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in time (milliseconds)
  const differenceInTime = end.getTime() - start.getTime();

  // Convert the difference from milliseconds to days
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

  return endDate ? Math.ceil(differenceInDays) : 30.5; // Use Math.ceil to round up partial days
}

export default function Page() {
  const router = useRouter();
  const { setElement } = useStore();
  const search = useSearchParams();
  const timer = useRef<any>(null);
  const workspacename = localStorage.getItem("workspace_name");
  const [inputBudget, setInputBudget] = useState<any>();
  const [budget, setBudgets] = useState<any>({});
  const [platforms, setPlatforms] = useState<any>([]);
  const [totalTargetGroups, setTotalTargetGroups] = useState<any>([]);
  const [minBudgetError, setMinBudgetError] = useState(null);

  useEffect(() => {
    setElement("element1", false);
    setElement("element2", false);
    setElement("element3", true);
    setElement("element4", false);
    setElement("element5", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: campaigndata,
    isPending: bugdetPending,
    isLoading: budgetLoading,
    isFetching: budgetFetching,
  } = useQuery({
    queryKey: ["get-campaign-admanager"],
    queryFn: () => {
      if (Number(search.get("campaignId"))) {
        return getCampaignBudget(Number(search.get("campaignId")));
      }
      return null;
    },
  });

  useEffect(() => {
    if (campaigndata?.data) {

      let platforms: any = [];
      for (let item of campaigndata?.data) {
        let platformName = item.platform.platformName;
        let platformId = item.platform.id;
        let user_campaign_id = item.id;

        platformName = platformName.charAt(0).toUpperCase() + platformName.slice(1).toLowerCase();
        let platformOrgName = platformName.charAt(0).toUpperCase() + platformName.slice(1).toLowerCase();
        if (platformName === "Facebook" || platformName === "Instagram") {
          platformName = "Meta";
        } else if (platformName === "Linkedin") {
          platformName = "LinkedIn"; // Ensure correct casing for LinkedIn
        }
        let platform = platforms.findIndex(
          (platform) => platform.name == platformName
        );
        if (platform !== -1) {
          platforms[platform] = {
            name: platformName,
            platformId: [...platforms[platform].platformId, platformId],
            user_campaign_id: [
              ...platforms[platform].user_campaign_id,
              user_campaign_id,
            ],
            platformOrgName: [
              ...platforms[platform].platformOrgName,
              platformOrgName,
            ],
          };
        } else {
          platforms.push({
            name: platformName,
            platformId: [platformId],
            user_campaign_id: [user_campaign_id],
            platformOrgName: [platformOrgName],
          });
        }
      }

      let targetGroups: any = [];
      let baseBudget = 0;
      let campaignId = Number(search.get("campaignId"));
      let currency = "INR";
      let campaignStartTime = null;
      let campaignEndTime = null;
      let budget = {};
      if (
        campaigndata &&
        campaigndata?.data &&
        campaigndata?.data?.length > 0
      ) {
        targetGroups = campaigndata?.data?.[0]?.admanager_user_campaign_targeting;
      }
      for (let platform of platforms) {
        let total_budget = 0
        let totalBudget = platform.name == "Google" ? minimunBudget[platform.name] : minimunBudget[platform.name] * targetGroups?.length;
        budget[platform.name] = {
          objective: campaigndata?.data?.[0].objective ?? "",
          isLocked: false,
          data: targetGroups.map((item: any, key: any) => {
            item['start_date'] = item?.start_date ? item?.start_date : new Date()
            item['end_date'] = item?.end_date ? item?.end_date : null
            const admanager_lists = campaigndata?.data?.find((campaign) => {
              return platform.name == "Meta" ? (campaign.platform.platformName == "Facebook" || campaign.platform.platformName == "Instagram") : campaign.platform.platformName == platform.name
            })
            total_budget += admanager_lists?.admanager_user_campaign_targeting[key]?.budget ?? minimunBudget[platform.name]
            return {
              campTgRecordId: admanager_lists?.admanager_user_campaign_targeting[key].id,
              tgId: admanager_lists?.admanager_user_campaign_targeting[key].tg_id,
              tgName: admanager_lists?.admanager_user_campaign_targeting[key]?.name,
              budget: admanager_lists?.admanager_user_campaign_targeting[key]?.budget ?? minimunBudget[platform.name],
              isLocked: false,
              bid: null,
              label: null,
              value: null
            };
          }),
          total_budget: total_budget > 0 ? total_budget : totalBudget,
        };
        baseBudget += total_budget > 0 ? total_budget : totalBudget
      }
      for (let platform of platforms) {
        budget[platform.name]['percentage'] = (Number(budget[platform.name]['total_budget']) / Number(baseBudget)) * 100
      }

      setPlatforms(platforms);
      setTotalTargetGroups(targetGroups);
      setInputBudget(baseBudget);
      setBudgets({
        campaignId,
        currency,
        campaignStartTime,
        campaignEndTime,
        baseBudget,
        budget,
      });
    }
  }, [campaigndata]);


  // Change Input Budget
  const inputBudgetChange = (e: any) => {
    let baseBudget = e.target.value ? Number(e.target.value) : '';
    setInputBudget(baseBudget);
    setMinBudgetError(null);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const minBudget = platforms.reduce(
        (sum, platform) =>
          sum +
          (platform.name == "Google"
            ? minimunBudget[platform.name]
            : minimunBudget[platform.name] * totalTargetGroups?.length),
        0
      );
      if (baseBudget < minBudget) {
        setMinBudgetError(minBudget);
        return;
      }
      let newBudget: any = budget.budget;
      for (let key in newBudget) {
        let platformBudget = (baseBudget * newBudget[key].percentage) / 100;
        newBudget[key].total_budget = platformBudget;
        for (let item of newBudget[key].data) {
          item["budget"] =
            Number(platformBudget) /
            (key == "Google" ? 1 : totalTargetGroups?.length);
        }
      }
      setBudgets({ ...budget, budget: newBudget, baseBudget });
    }, 500);
  };

  const handleAiSuggestion = () => {
    if (budget?.baseBudget <= 0) {
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Please Enter Valid Budget Range.
          </span>
        </>,
        { autoClose: 5000 }
      );
    } else {
      const payload = {
        // campaign_objective: "Website Conversions",
        campaign_objective: objectivesTemp.includes(
          campaigndata?.data[0]?.objective?.toLowerCase()
        )
          ? campaigndata?.data[0]?.objective
          : "Traffic",
        channels: platforms.map((item: any) => item.name),
        age: campaigndata?.data[0]?.targetGroups?.[0]?.age_group
          ? mapAgeRange(
            extractNumbersWithDash(
              campaigndata?.data[0]?.targetGroups[0]?.age_group
            )
          )
          : "18 - 24",
        gender: campaigndata?.data[0]?.targetGroups?.[0]?.gender
          ? campaigndata?.data[0]?.targetGroups[0]?.gender
          : "All",
        // location: "West Region",
        location: campaigndata?.data[0]?.targetGroups?.[0]?.location?.[0]
          ? campaigndata?.data[0]?.targetGroups[0]?.location[0]
          : "India",
        start_date: new Date(budget?.campaignStartTime)
          .toISOString()
          .split("T")[0],
        ...(budget?.campaignEndTime && {
          end_date: new Date(budget?.campaignEndTime)
            .toISOString()
            .split("T")[0],
        }),
        meta_adsets: totalTargetGroups.map((item: any) => item.name),
        cost: budget?.baseBudget,
      };
      mutateAiSuggestion.mutate(payload, {
        onSuccess: (response: any) => {
          if (response?.platform_budget_split) {
            let baseBudget = 0
            const updatedData = JSON.parse(JSON.stringify(budget));
            for (let item of response.platform_budget_split) {
              updatedData.budget[item?.Platform].percentage = item.Percentage;
              updatedData.budget[item?.Platform].total_budget =
                item?.Platform == "Google"
                  ? item.Allocation_Amount
                  : item.Allocation_Amount * totalTargetGroups?.length;
              updatedData.budget[item?.Platform].data = updatedData.budget[
                item?.Platform
              ].data.map((it) => {
                return { ...it, budget: item.Allocation_Amount };
              });
              baseBudget += updatedData.budget[item?.Platform].total_budget
            }
            setBudgets(updatedData);
            setInputBudget(baseBudget);
          }
        },
        onError: (error: any) => {
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                {error.response.data.detail}
              </span>
            </>,
            { autoClose: 5000 }
          );
        },
      });
    }
  };

  const mutateAiSuggestion = useMutation({
    mutationKey: ["budget-AI"],
    mutationFn: BudgetAiSuggestion,
  });

  const mutateUpdateCampaign = useMutation({
    mutationKey: ["update-campaign-budget"],
    mutationFn: updateCampaignBudget,
  });

  const handleClick = () => {
    if (budget?.baseBudget <= 0) {
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Please Enter Valid Budget Range.
          </span>
        </>,
        { autoClose: 5000 }
      );
    } else {
      let newBudget: any = {};
      for (let item of platforms) {
        for (let key in item.user_campaign_id) {
          newBudget[item.platformOrgName[key]] = {
            ...budget?.budget[item.name],
            user_campaign_id: item.user_campaign_id[key],
          };



          for (let k in totalTargetGroups) {
            // tempBudget[item.platformOrgName[key]].data[k].campTgRecordId = admanager_lists?.admanager_user_campaign_targeting[k]['id'] ?? null
            newBudget[item.platformOrgName[key]].data[k]['tgStartdate'] = totalTargetGroups[k]['start_date'] ?? null
            newBudget[item.platformOrgName[key]].data[k]['tgEnddate'] = totalTargetGroups[k]['end_date'] ?? null
          }
        }
      }

      let tempBudget = JSON.parse(JSON.stringify(newBudget))
      for (let key in tempBudget) {
        const admanager_lists = campaigndata?.data?.find((campaign) => {
          let platformName = campaign.platform.platformName.charAt(0).toUpperCase() + campaign.platform.platformName.slice(1).toLowerCase();
          return key == platformName
        })
        let data = tempBudget[key].data
        for (let k in data) {
          data[k]['campTgRecordId'] = admanager_lists?.admanager_user_campaign_targeting[k]['id'] ?? null
        }
      }


      mutateUpdateCampaign.mutate(
        { ...budget, budget: tempBudget, totalBudget: null, "workspace_id": Number(localStorage.getItem("workspace_id")) },
        {
          onSuccess: (response: any) => {
            router.push(
              `/apphome/${workspacename}/admanager/summary?campaignId=${Number(
                search.get("campaignId")
              )}&brandid=${Number(search.get("brandid"))}&objective=${search.get("objective")}`
            );
          },
          onError: (res: any) => {
            console.log(res);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center h-full mt-2">
        <Steper />
      </div>
      <div className="w-full h-full ">
        <div className=" h-[78vh] overflow-hidden overflow-y-auto relative ">
          {bugdetPending || budgetLoading || budgetFetching ? (
            <>
              <div className="p-5 bg-[#3B226F] flex flex-col gap-4">
                {[1, 2].map((item, index) => (
                  <CampaignLoading key={index} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="p-6">
                <div className="mb-12">
                  <h3 className="font-bold text-sm xl:text-[16px] leading-[17px] text-white mb-[14px] border-b-[0.5px] border-opacity-60 border-[#FFFFFF99] pb-[13px]">
                    Schedule your campaign
                    <span className="text-nyx-red px-1">*</span>
                  </h3>

                  <div className="w-full flex flex-wrap gap-5">
                    {totalTargetGroups?.map((item, k) => (
                      <MultiDate
                        item={item}
                        index={k}
                        totalTargetGroups={totalTargetGroups}
                        setTotalTargetGroups={setTotalTargetGroups}
                        campaigndata={campaigndata}
                      />
                    ))}
                  </div>
                </div>

                <div className="">
                  <div>
                    <div className="w-full flex gap-2 border-b-[0.5px] border-opacity-60 border-[#FFFFFF99] pb-[13px]">
                      <h3 className="font-bold text-sm xl:text-[16px] leading-[17px] text-white  ">
                        Set Daily Budget
                      </h3>
                      <div className="text-white flex group relative">
                        <BsFillInfoCircleFill className="cursor-pointer" />
                        <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[400px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300">
                          Recommended that the daily budget should be ₹100 per
                          day. You can pause or cancel this campaign.
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-center mt-[10px]">
                      <div className="flex flex-row gap-8 ">
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="₹ Enter the budget for your campaign"
                            className={`text-[12px] text-white lg:text-[14px] w-[324px] h-[40px]  border-[1px] border-opacity-60 border-[#FFFFFF99] rounded-[4px] px-4 bg-inherit focus:outline-none autofill active:text-[#FFFFFF] italic`}
                            value={inputBudget}
                            onChange={inputBudgetChange}
                            onKeyDown={handleKeyDown}
                          />
                          {!!minBudgetError && (
                            <p className="absolute top-[45px] text-xs text-nyx-red">
                              Amount should not be less than {minBudgetError}
                            </p>
                          )}
                        </div>

                        {/* <div className="flex items-center">
                          <p className="text-[14px] leading-[17px] text-white font-bold flex items-center">
                            Estimated duration cost :{" "}
                            <span className="font-semibold ml-1">
                              ₹{" "}
                              {Math.round(
                                Number(budget?.baseBudget) *
                                getDaysBetweenDates(
                                  budget?.campaignStartTime,
                                  budget?.campaignEndTime
                                )
                              )}
                            </span>{" "}
                          </p>
                        </div> */}
                      </div>
                      <div className="relative">
                        <div
                          className="w-[210px] h-[42px] rounded-[8px] py-[7px] px-[16px] flex gap-2 items-center cursor-pointer justify-center bg-[#28134B] hover:bg-[#5E32FF]"
                          onClick={handleAiSuggestion}
                        >
                          {mutateAiSuggestion.isPending ? (
                            <svg
                              width="24"
                              height="25"
                              className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <>
                              <svg
                                width="28"
                                height="28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="28"
                                  height="28"
                                  rx="14"
                                  fill="#8252FD"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M13.444 8.13c-.325-.892-1.587-.892-1.912 0l-1.476 4.058-4.058 1.476c-.893.325-.893 1.588 0 1.913l4.058 1.476 1.476 4.057c.325.893 1.587.893 1.912 0l1.476-4.057 4.058-1.476c.893-.325.893-1.588 0-1.913l-4.058-1.476-1.476-4.057Z"
                                  fill="#fff"
                                />
                                <g clipPath="url(#b)">
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M20.05 6.51a.43.43 0 0 0-.807 0l-.624 1.713-1.714.624a.43.43 0 0 0 0 .808l1.714.623.624 1.714a.43.43 0 0 0 .808 0l.623-1.714 1.714-.623a.43.43 0 0 0 0-.808l-1.714-.624-.623-1.714Z"
                                    fill="#fff"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="b">
                                    <path
                                      fill="#fff"
                                      transform="translate(16.623 6.227)"
                                      d="M0 0h6.049v6.049H0z"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>

                              <p className="font-semibold text-[14px] leading-[17px] text-white">
                                Ask AI Suggestions
                              </p>
                            </>
                          )}
                        </div>
                        <p className="absolute bottom-[-14px] right-1 text-[10px] font-normal text-white leading-[12px]">
                          for optimized results
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-[14px] xl:text-[16px] leading-[17px] text-white mb-[14px] mt-[62px]">
                  Amount split by different channels
                </h3>

                {(budgetLoading || bugdetPending || budgetFetching) && (
                  <>
                    <div className="flex items-center gap-[16px] flex-wrap w-[600px] mb-3">
                      {[1, 2].map((item, index) => (
                        <div key={`${index}-${index}`}>
                          <BudgetLoading />
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <MultipleTgBudget
                  minimunBudget={minimunBudget}
                  platforms={platforms}
                  targetGroups={totalTargetGroups}
                  budget={budget}
                  setBudgets={setBudgets}
                />
              </div>
            </>
          )}
        </div>
        <div className="w-full flex justify-center items-center my-[10.5px]  gap-2">
          <Button
            className={classNames(
              "rounded-full w-[124px] font-semibold hover:shadow-none",
              mutateUpdateCampaign.isPending
                ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                : "text-nyx-yellow"
            )}
            onClick={() =>
              router.push(
                `/apphome/${workspacename}/admanager/ad-creative?campaignId=${Number(search.get("campaignId")
                )}&brandid=${Number(search.get("brandid"))}&objective=${campaigndata?.data[0]?.objective}`
              )
            }
            disabled={mutateUpdateCampaign.isPending}
          >
            Back
          </Button>
          <Button
            className={classNames(
              "rounded-full w-[124px] font-semibold hover:shadow-none",
              mutateUpdateCampaign.isPending
                ? "bg-gray-400 text-white cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                : "bg-nyx-yellow text-black"
            )}
            onClick={handleClick}
            disabled={mutateUpdateCampaign.isPending}
          >
            {mutateUpdateCampaign.isPending ? <ButtonLoadingGenAI /> : "Next"}
          </Button>
          {search.has("edit") && search.get("edit") == "true" && (
            <Button
              className={classNames(
                "rounded-full w-44 font-semibold hover:shadow-none",
                mutateUpdateCampaign.isPending
                  ? "bg-gray-400 text-white cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                  : "text-nyx-yellow "
              )}
              onClick={handleClick}
              // onClick={click}
              disabled={mutateUpdateCampaign.isPending}
            >
              {mutateUpdateCampaign.isPending ? (
                <ButtonLoadingGenAI />
              ) : (
                "Save & Update"
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
