/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "rsuite";
import Select from "react-select";
import { budgetSelect } from "@nyx-frontend/main/utils/productStyle";

import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "./index.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const getOptions = (platformName: any, objective: any) => {
  if (platformName.toLowerCase() === "meta") {
    const objectiveOptions: any = {
      "website conversion": [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "COST_CAP", label: "Cost Cap" },
        { value: "BID_CAP", label: "Bid Cap" },
        // { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        // { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
      "lead generation": [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "COST_CAP", label: "Cost Cap" },
        { value: "BID_CAP", label: "Bid Cap" },
        // { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        // { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
      traffic: [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "COST_CAP", label: "Cost Cap" },
        { value: "BID_CAP", label: "Bid Cap" },
        // { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        // { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
      "brand awareness": [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "BID_CAP", label: "Bid Cap" },
        { value: "COST_CAP", label: "Cost Cap" },
      ],
      reach: [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "BID_CAP", label: "Bid Cap" },
        { value: "COST_CAP", label: "Cost Cap" },
      ],
      engagement: [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        // { value: "COST_CAP", label: "Cost Cap" },
        { value: "BID_CAP", label: "Bid Cap" },
        // { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        // { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
      "video views": [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "BID_CAP", label: "Bid Cap" },
        // { value: "COST_CAP", label: "Cost Cap" },
      ],
      shopping: [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "COST_CAP", label: "Cost Cap" },
        // { value: "BID_CAP", label: "Bid Cap" },
        { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        // { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
      "store traffic": [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "COST_CAP", label: "Cost Cap" },
        { value: "BID_CAP", label: "Bid Cap" },
        // { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        // { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
      "app install": [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "COST_CAP", label: "Cost Cap" },
        { value: "BID_CAP", label: "Bid Cap" },
        { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
      "app engagement": [
        { value: "LOWEST_COST", label: "Lowest Cost" },
        { value: "COST_CAP", label: "Cost Cap" },
        { value: "BID_CAP", label: "Bid Cap" },
        { value: "MINIMUM_ROAS", label: "Minimum ROAS" },
        { value: "MAXIMUM_ROAS", label: "Maximum ROAS" },
      ],
    };

    // Return the options based on objective
    return objectiveOptions[objective] || [];
  } else if (platformName.toLowerCase() === "google") {
    const objectiveOptions: any = {
      "website conversion": [
        { value: "MAXIMIZE_CONVERSIONS", label: "Maximize Conversions" },
        { value: "TARGET_CPA", label: "Target CPA" },
        { value: "TARGET_ROAS", label: "Target ROAS" },
      ],
      "lead generation": [
        { value: "MAXIMIZE_CONVERSIONS", label: "Maximize Conversions" },
        { value: "TARGET_CPA", label: "Target CPA" },
        { value: "TARGET_ROAS", label: "Target ROAS" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
        { value: "ENHANCED_CPC", label: "Enhanced CPC" },
      ],
      traffic: [
        { value: "MAXIMIZE_CLICKS", label: "Maximize Clicks" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
        { value: "ENHANCED_CPC", label: "Enhanced CPC" },
        {
          value: "TARGET_IMPRESSION_SHARE",
          label: "Target Impression Share",
        },
      ],
      "brand awareness": [
        { value: "TARGET_CPM", label: "Target CPM" },
        { value: "MAXIMIZE_IMPRESSIONS", label: "Maximize Impressions" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
        { value: "MAXIMIZE_VIEWS", label: "Maximize Views" },
      ],
      // reach: [
      //   { value: 'lowest_cost', label: 'Lowest Cost' },
      //   { value: 'bid_cap', label: 'Bid Cap' },
      //   { value: 'cost_cap', label: 'Cost Cap' },
      // ],
      engagement: [
        { value: "MAXIMIZE_CONVERSIONS", label: "Maximize Conversions" },
        { value: "TARGET_CPA", label: "Target CPA" },
        { value: "TARGET_ROAS", label: "Target ROAS" },
        {
          value: "MAXIMIZE_CONVERSION_VALUE",
          label: "Maximize Conversion Value",
        },
        { value: "ENHANCED_CPC", label: "Enhanced CPC" },
      ],
      "performance max": [
        { value: "MAXIMIZE_CONVERSIONS", label: "Maximize Conversions" },
        { value: "TARGET_CPA", label: "Target CPA" },
        { value: "TARGET_ROAS", label: "Target ROAS" },
      ],
      "video views": [
        { value: "MAXIMIZE_VIEWS", label: "Maximize Views" },
        { value: "TARGET_CPM", label: "Target CPM" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
      ],
      "catalogue sales": [
        {
          value: "MAXIMIZE_CONVERSION_VALUE",
          label: " Maximize Conversion Value",
        },
        { value: "TARGET_ROAS", label: "Target ROAS" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
        { value: "ENHANCED_CPC", label: "Enhanced CPC" },
      ],
      "store traffic": [
        { value: "MAXIMIZE_CLICKS", label: "Maximize Clicks" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
        { value: "ENHANCED_CPC", label: "Enhanced CPC" },
      ],
      "app install": [
        { value: "MAXIMIZE_CONVERSIONS", label: "Maximize Conversions" },
        { value: "TARGET_CPA", label: "Target CPA" },
        { value: "TARGET_ROAS", label: "Target ROAS" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
      ],
      "app engagement": [
        { value: "MAXIMIZE_CONVERSIONS", label: "Maximize Conversions" },
        { value: "TARGET_CPA", label: "Target CPA" },
        { value: "TARGET_ROAS", label: "Target ROAS" },
        { value: "MANUAL_CPC", label: "Manual CPC" },
      ],
    };
    return objectiveOptions[objective] || [];
  } else if (platformName.toLowerCase() === "linkedin") {
    const objectiveOptions: any = {
      "brand awareness": [
        { value: "MAX_REACH", label: "Max Reach" },
        { value: "MAX_IMPRESSION", label: "Max Impression" },
        { value: "CAP_COST_AND_MAXIMIZE_IMPRESSIONS", label: "Cost Cap" },
        { value: "CPM", label: "Manual CPM" },
      ],
      traffic: [
        { value: "MAX_CLICK", label: "Max Click" },
        { value: "CAP_COST_AND_MAXIMIZE_CLICKS", label: "Cost Cap" },
        { value: "CPM", label: "Manual CPM" },
        { value: "CPC", label: "Manual CPC" },
      ],
      engagement: [
        { value: "MAX_CLICK", label: "Max Click" },
        { value: "CAP_COST_AND_MAXIMIZE_CLICKS", label: "Cost Cap" },
        { value: "CPM", label: "Manual CPM" },
        { value: "CPC", label: "Manual CPC" },
      ],
      "video views": [
        { value: "MAX_VIDEO_VIEW", label: "Max Video View" },
        { value: "CAP_COST_AND_MAXIMIZE_VIDEO_VIEWS", label: "Cost Cap" },
        { value: "CPM", label: "Manual CPM" },
        { value: "CPV", label: "Manual CPV" },
      ],
      "lead generation": [
        { value: "MAX_LEAD", label: "Max Lead" },
        { value: "CAP_COST_AND_MAXIMIZE_LEADS", label: "Cost Cap" },
        { value: "CPM", label: "Manual CPM" },
        { value: "CPC", label: "Manual CPC" },
      ],
      "website conversion": [
        { value: "MAX_CONVERSION", label: "Max Conversion" },
        { value: "CAP_COST_AND_MAXIMIZE_LEADS", label: "Cost Cap" },
        { value: "CPM", label: "Manual CPM" },
        { value: "CPC", label: "Manual CPC" },
      ],
    };
    return objectiveOptions[objective] || [];
  }
  return [];
};

const shouldShowInputField = (platformName: any, label: any) => {
  // Define valid labels for each platform
  const facebookInstagramValidLabels = [
    "Cost Cap",
    "Bid Cap",
    "Minimum ROAS",
    "Maximum ROAS",
  ];
  const googleValidLabels = [
    "Manual CPC",
    "Target Impression Share",
    "Target CPA",
    "Target ROAS",
    "Target CPM",
  ];

  const linkedInValidLables = [
    "Manual Bidding",
    "Cost Cap",
    "Manual CPM",
    "Manual CPC",
    "Manual CPV",
  ];

  // Check for platform name and corresponding label
  if (
    platformName.toLowerCase() === "facebook" ||
    platformName.toLowerCase() === "instagram"
  ) {
    // For Facebook and Instagram, show input field if the label is in the valid list
    return facebookInstagramValidLabels.includes(label);
  } else if (platformName.toLowerCase() === "google") {
    // For Google, show input field only if the label is "Lowest Cost"
    return googleValidLabels.includes(label);
  } else if (platformName.toLowerCase() === "linkedin") {
    return linkedInValidLables.includes(label);
  }

  // For any other platform, don't show the input field
  return false;
};

const TgSlider = ({ minimunBudget, platform, budget, setBudgets }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (budget && platform) {
      let data = budget?.budget[platform]
      let defultTg = getOptions(platform, (data?.objective).toLowerCase())[0]
      for (let item of data.data) {
        if (!item.value) {
          item['label'] = defultTg?.label
          item['value'] = defultTg?.value
        }
      }
      setData(data)
    }
  }, [budget, platform])


  // Change Locked
  const handleLocked = (index: any) => {
    const updatedData = JSON.parse(JSON.stringify(budget));
    updatedData.budget[platform].data[index].isLocked = !updatedData.budget[platform].data[index].isLocked
    setData(updatedData?.budget[platform])
    setBudgets(updatedData)
  };

  const commonHandler = (index: any, value: number) => {

    // Ensure the new value doesn't go below the minimum for the platform and is an integer
    const newValue = Math.max(
      minimunBudget[platform],
      Math.floor(value)
    );

    const updatedData = JSON.parse(JSON.stringify(budget));

    const originalBudget = updatedData.budget[platform].data[index].budget;

    // Calculate budget difference
    const diff = newValue - originalBudget;

    // Prepare list of other unlocked
    const otherUnlocked = updatedData.budget[platform].data.filter(
      (item, key) => key !== index && !item.isLocked
    );

    if (otherUnlocked.length == 0) return

    const perPlatformAdjustment = diff / otherUnlocked.length;

    //  Apply the new budget and redistribute
    updatedData.budget[platform].data[index].budget = newValue;

    otherUnlocked.forEach((item, key) => {
      let minvalue = minimunBudget[platform]
      let checkIndex = updatedData.budget[platform].data.findIndex((i) => i.tgId == item.tgId)
      let oldValue = updatedData.budget[platform].data[checkIndex].budget
      let newValue = oldValue - perPlatformAdjustment
      let adjustment = newValue < minvalue ? [(oldValue - minvalue), perPlatformAdjustment - (oldValue - minvalue)] : [perPlatformAdjustment, 0]
      updatedData.budget[platform].data[checkIndex].budget -= adjustment[0]
      updatedData.budget[platform].data[index].budget -= adjustment[1];
    });

    setData(updatedData?.budget[platform])
    setBudgets(updatedData)
  };

  // Change Locked
  const handleSelectChange = (obj: any, index: any) => {
    const updatedData = JSON.parse(JSON.stringify(budget));
    updatedData.budget[platform].data[index] = {
      ...updatedData.budget[platform].data[index],
      ...obj
    }
    setData(updatedData?.budget[platform])
    setBudgets(updatedData)
  };

  return (
    <div className="flex items-start gap-0 flex-wrap ">
      {data?.data && data?.data?.map((item: any, index: any) => {
        if (item.budget) {
          return (
            <div
              key={index}
              className="w-[374px] rounded-[8px]"
            >
              <div className="w-full flex justify-between">
                <div className="w-full">
                  <p className="text-[14px] mt-3 font-semibold text-white">
                    {item.tgName}
                  </p>
                  <>
                    {getOptions(
                      platform,
                      (data?.objective).toLowerCase()
                    )?.length != 0 && (
                        <Select
                          options={getOptions(
                            platform,
                            (data?.objective).toLowerCase()
                          )}
                          menuPlacement="top"
                          placeholder="Bid Strategy"
                          instanceId={"bid-category"}
                          styles={budgetSelect}
                          onChange={(obj) => handleSelectChange(obj, index)}
                          value={item}
                          components={{
                            IndicatorSeparator: () => null,
                          }}
                          isSearchable={false}
                        />
                      )}

                    {/* conditionally showing this input on the basis of select value */}
                    {shouldShowInputField(
                      platform,
                      item?.label
                    ) && (
                        <input
                          type="number"
                          className={`text-[11px] text-white lg:text-[12px] w-[80%] h-[40px] border border-[#8297BD] rounded-[4px] px-4 bg-inherit focus:outline-none autofill active:text-[#FFFFFF] italic`}
                          placeholder="₹ Enter Amount"
                          value={item?.bid}
                          min="1"
                          onChange={(e) => {
                            let newValue = e.target.value;
                            handleSelectChange({ ...item, bid: newValue }, index)
                          }}
                        />
                      )}
                  </>
                </div>
                <div className="w-full">
                  <Slider
                    tooltip={false}
                    progress
                    min={0}
                    max={Number(data.total_budget)}
                    value={Number(item?.budget)}
                    disabled={item?.isLocked}
                    onChange={(value) => {
                      if (!item?.isLocked) {
                        const newValue = value < 100 ? 100 : value;
                        commonHandler(index, newValue);
                      }
                    }}
                    className="mt-5 sliderStyle"
                  />
                  <div className="flex justify-between items-baseline">
                    <div className="w-fit  rounded-[4px] text-[white] text-[16px] font-semibold flex items-center justify-center pt-1 mb-[12px]">
                      ₹{Number(item?.budget).toFixed(1)}
                    </div>

                    <div
                      className="cursor-pointer "
                      onClick={() => handleLocked(index)}
                    >
                      {item?.isLocked ? (
                        <>
                          <svg
                            width="10"
                            height="13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 5V4a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v1"
                              stroke="#fff"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
                              fill="#fff"
                            />
                            <path
                              d="M3.788 8.208c.077-.275.258-.514.51-.673.252-.159.557-.226.859-.19.301.035.579.172.78.385.201.213.312.486.313.77 0 .204-.058.404-.168.58-.11.177-.267.324-.457.425v1.328h-1.25V9.505a1.191 1.191 0 0 1-.528-.556 1.089 1.089 0 0 1-.059-.741Z"
                              fill="#1E1E1E"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            width="14"
                            height="13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.5 5a.5.5 0 0 1-1 0h1Zm5 0V4h1v1h-1Zm-5-1v1h-1V4h1ZM4 1.5A2.5 2.5 0 0 0 1.5 4h-1A3.5 3.5 0 0 1 4 .5v1ZM6.5 4A2.5 2.5 0 0 0 4 1.5v-1A3.5 3.5 0 0 1 7.5 4h-1ZM12 5H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
                              fill="#fff"
                            />
                            <path
                              d="M7.788 8.208c.077-.275.258-.514.51-.673.252-.159.557-.226.859-.19.301.035.579.172.78.385.201.213.313.486.313.77 0 .204-.058.404-.168.58-.11.177-.267.324-.457.425v1.328h-1.25V9.505a1.191 1.191 0 0 1-.528-.556 1.089 1.089 0 0 1-.059-.741Z"
                              fill="#1E1E1E"
                            />
                          </svg>
                        </>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TgSlider;