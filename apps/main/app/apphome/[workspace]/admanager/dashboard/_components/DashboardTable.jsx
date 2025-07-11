/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";
import Select from "react-select";
import { assetSortStyle, campaignSortStyle } from "@nyx-frontend/main/utils/productStyle";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Link from "next/link";
import {
  campaignStatusSort,
  campaignChannelSort,
  campaignTimeSort,
} from "@nyx-frontend/main/utils/productConstants";

const customStyles = {
  // include any other styles you have
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(90deg)" : "rotate(0deg)",
  }),
};

const DashboardTable = ({ campaigndata }) => {
  const [workspacename, setworkspacename] = useState("");
  const [allCampaignData, setallCampaignData] = useState(campaigndata);
  const [search, setSearch] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);

  useEffect(() => {
    const workspace = localStorage.getItem("workspace_name");
    setworkspacename(workspace);
    setallCampaignData(campaigndata);
  }, [campaigndata]);

  const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);

    const date = dateObj.toLocaleDateString("en-GB", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    const time = dateObj.toLocaleTimeString("en-GB", {
      timeZone: "UTC",
      hour12: false, // 24-hour format
    });

    return { date, time };
  };

  const onFilterStatus = useCallback(
    (selectedOption) => {
      if (selectedOption.value === "All CAMPAIGNS") {
        setallCampaignData(campaigndata);
      } else if (selectedOption.value === "INACTIVE") {
        const data = campaigndata.filter(
          (item) =>
            item.overallStatus == "INACTIVE" ||
            item.overallStatus == "IN_PROGRESS" ||
            item.overallStatus == "DRAFT" ||
            item.overallStatus == "UNDER_REVIEW" ||
            item.overallStatus == "ENABLED",
        );

        setallCampaignData(data);
      } else {
        const data = campaigndata.filter(
          (item) => item.overallStatus === selectedOption.value,
        );
        setallCampaignData(data);
      }
    },
    [campaigndata],
  );

  const onFilterChannel = (selectedOptions) => {
    if (!selectedOptions) {
      setSelectedChannels([]);
      return;
    }
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedChannels(selectedValues);
  };

  useEffect(() => {
    if (selectedChannels.length > 0) {
      const data = campaigndata?.filter((campaign) =>
        campaign.platforms.some((platform) =>
          selectedChannels.includes(platform.platformName),
        ),
      );
      setallCampaignData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFilterChannel]);

  const onFilterSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    if (searchValue !== "") {
      const filteredData = campaigndata.filter((item) => {
        return item.campaignName.toLowerCase().includes(searchValue);
      });
      setallCampaignData(filteredData);
    } else {
      setallCampaignData(campaigndata);
    }
  };

  // const onFilterDate = useCallback(
  //   (selectedOptions) => {
  //     const data =
  //       selectedOptions.value === "Oldest"
  //         ? campaigndata.sort(
  //             (a, b) =>
  //               new Date(a.campaignStartTime) - new Date(b.campaignStartTime),
  //           )
  //         : campaigndata.sort(
  //             (a, b) =>
  //               new Date(b.campaignStartTime) - new Date(a.campaignStartTime),
  //           );
  //     setallCampaignData(data);
  //   },
  //   [campaigndata, allCampaignData],
  // );

  const onFilterDate = useCallback(
    (selectedOptions) => {
      // Create a new sorted array to avoid mutating state
      const sortedData = [...campaigndata].sort((a, b) =>
        selectedOptions.value === "Oldest"
          ? new Date(a.campaignStartTime) - new Date(b.campaignStartTime)
          : new Date(b.campaignStartTime) - new Date(a.campaignStartTime),
      );

      setallCampaignData(sortedData);
    },
    [campaigndata], // `allCampaignData` removed from dependencies
  );

    const formatNumber = (num) => {
      console.log(num)

      if (num === null || num === undefined || isNaN(num)) return "-";

  const format = (num, suffix) => {
    const formatted = (num).toFixed(2);
    return `${formatted.endsWith('.00') ? parseInt(formatted) : formatted}${suffix}`;
  };
  
  if (num >= 1_000_000_000) {
    // Billions
    return format(num / 1_000_000_000, "B");
  } else if (num >= 1_000_000) {
    // Millions
    return format(num / 1_000_000, "M");
  } else if (num >= 1_000) {
    // Thousands
    return format(num / 1_000,"K");
  } else {
    // Less than 1000, no formatting needed
    const formattedVal = num?.toFixed?.(2);

    return `${formattedVal?.endsWith('.00') ? parseInt(formattedVal) : formattedVal ?? num}`;
  }
};

  return (
    <>
      <div className="w-full flex justify-between pt-[20px] px-4 ">
        <div className="text-white font-bold text-[20px] flex items-center ml-3">
          My Campaigns
        </div>
        <div className="flex  gap-x-6 w-9/12">
          <Select
            className="text-sm md:text-base z-99 w-full max-w-[236px] text-white bg-inherit text-[14px]"
            options={campaignStatusSort}
            onChange={onFilterStatus}
            menuPlacement="bottom"
            placeholder="Filter"
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              borderColor: "white",
            })}
            styles={campaignSortStyle}
            isSearchable={false}
          />
          <Select
            className="text-sm md:text-base z-99 w-full max-w-[236px] text-white bg-inherit text-[14px] flex-nowrap selectStyle"
            options={campaignChannelSort}
            onChange={onFilterChannel}
            menuPlacement="bottom"
            placeholder="Select Channel"
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              borderColor: "white",
            })}
            styles={assetSortStyle}
            value={campaignChannelSort.filter((option) =>
              selectedChannels.includes(option.value),
            )}
            isMulti
            isSearchable={false}
          />
          <Select
            className="text-sm md:text-base z-99 w-full max-w-[236px] text-white bg-inherit text-[14px]"
            options={campaignTimeSort}
            onChange={onFilterDate}
            menuPlacement="bottom"
            placeholder="Sort By"
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              borderColor: "white",
            })}
            styles={assetSortStyle}
            isSearchable={false}
          />
          <input
            value={search}
            onChange={onFilterSearch}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Search your campaign")}
            type="text"
            placeholder="Search your campaign"
            className="text-[14px] font-normal text-white rounded border-[1px] px-[18px] py-[12px] border-[#8297BD] bg-inherit w-full max-w-[236px] outline-none appearance-none"
          />
        </div>
      </div>

      <div className="w-full px-[16px] overflow-x-auto overflow-y-auto h-full max-h-[470px] mt-8 overflow-hidden">
        <table className="min-w-full bg-[#332270] rounded-t-[20px] overflow-hidden dashboardTableStyle pb-2 ">
            <thead className="bg-[#23145A] h-[44px] mt-[12px] sticky top-0 z-[1]">
              <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
              <th className="min-w-[221px] max-w-[221px] px-[20px] font-semibold rounded-tl-[10px] ">
                Campaign name
              </th>
              <th className="min-w-[120px] max-w-[120px] text-center px-[20px]">
                Channels
              </th>
              <th className="min-w-[130px] max-w-[130px] text-center px-[20px]">
                Status
              </th>
              <th className="min-w-[164px] max-w-[164px] text-center px-[20px]">
                Schedule Time
              </th>
              {/* <th className="min-w-[141px] max-w-[141px] text-center px-[20px]">
                Start date
              </th> */}
              {/* <th className="min-w-[123px] max-w-[123px] text-center px-[20px]">
                End date
              </th> */}
              <th className="min-w-[164px] max-w-[164px] text-center px-[20px]">
                Budget
              </th>
              <th className="min-w-[119px] max-w-[119px] text-center px-[20px]">
                Impressions
              </th>
              <th className="min-w-[120px] max-w-[120px] text-center px-[20px]">
                Clicks
              </th>
              <th className=" min-w-[120px] max-w-[120px] text-center  px-[20px] overflow-hidden text-ellipsis bg-[#301959] ">
                
                  Recommendations
                
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(allCampaignData) &&
              allCampaignData?.map((item, index) => {
                const { date: startDate, time: startTime } = formatDateTime(
                  item.campaignStartTime,
                );
                const { date: endDate, time: endTime } = formatDateTime(
                  item.campaignEndTime,
                );

                return (
                  <tr
                    className="border-b border-solid border-[#503193] "
                    key={index}
                  >
                    <td className="min-w-[221px] max-w-[221px] text-center pl-[20px] h-[72px]">
                      <Link
                        href={`/apphome/${workspacename}/admanager/uniview?campaignID=${item?.campaignId}`}
                      >
                        <div className="flex  gap-[12px]">
                          <Image
                            src={`${IMAGE_URL}/assets/admanager/Oval.svg`}
                            width={28}
                            height={28}
                            alt="Campaign Icon"
                          />
                          <div class="relative group ">
                            <p className="text-white font-normal text-[14px] absolute  bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {item?.campaignName}
                            </p>
                            <p className="text-white hover:text-nyx-yellow font-normal text-[14px] leading-[20px] text-left w-[14ch] truncate  ">
                              {item?.campaignName}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="min-w-[140px] max-w-[140px] text-center  pl-[20px] h-[72px]">
                      <div className="flex items-start gap-2 mt-1">
                        {item.platforms.map((pltf) => {
                          return (
                            <>
                              {pltf?.platformName === "LinkedIn" && (
                                <div className="relative group cursor-pointer">
                                  <p
                                    className={
                                      pltf?.status === "REJECTED" &&
                                      pltf?.errorMessages?.length > 1
                                        ? "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-65px] p-2 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        : "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    }
                                  >
                                    {pltf?.status === "REJECTED" &&
                                    Array.isArray(pltf?.errorMessages) &&
                                    pltf?.errorMessages?.length > 0 ? (
                                      pltf?.errorMessages?.map((item) => (
                                        <>
                                          {" "}
                                          <p className="mb-[4px] text-left ">
                                            {item?.message}
                                          </p>
                                        </>
                                      ))
                                    ) : (
                                      <>{pltf?.status}</>
                                    )}
                                  </p>

                                  <svg
                                    viewBox="0 0 26 26"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="22"
                                    width="22"
                                  >
                                    <path
                                      d="M22.9167 0.25C23.6681 0.25 24.3888 0.548511 24.9201 1.07986C25.4515 1.61122 25.75 2.33189 25.75 3.08333V22.9167C25.75 23.6681 25.4515 24.3888 24.9201 24.9201C24.3888 25.4515 23.6681 25.75 22.9167 25.75H3.08333C2.33189 25.75 1.61122 25.4515 1.07986 24.9201C0.548511 24.3888 0.25 23.6681 0.25 22.9167V3.08333C0.25 2.33189 0.548511 1.61122 1.07986 1.07986C1.61122 0.548511 2.33189 0.25 3.08333 0.25H22.9167ZM22.2083 22.2083V14.7C22.2083 13.4751 21.7218 12.3005 20.8557 11.4343C19.9895 10.5682 18.8149 10.0817 17.59 10.0817C16.3858 10.0817 14.9833 10.8183 14.3033 11.9233V10.3508H10.3508V22.2083H14.3033V15.2242C14.3033 14.1333 15.1817 13.2408 16.2725 13.2408C16.7985 13.2408 17.303 13.4498 17.6749 13.8217C18.0469 14.1937 18.2558 14.6982 18.2558 15.2242V22.2083H22.2083ZM5.74667 8.12667C6.37788 8.12667 6.98324 7.87592 7.42958 7.42958C7.87592 6.98324 8.12667 6.37788 8.12667 5.74667C8.12667 4.42917 7.06417 3.3525 5.74667 3.3525C5.11169 3.3525 4.50273 3.60474 4.05374 4.05374C3.60474 4.50273 3.3525 5.11169 3.3525 5.74667C3.3525 7.06417 4.42917 8.12667 5.74667 8.12667ZM7.71583 22.2083V10.3508H3.79167V22.2083H7.71583Z"
                                      fill={
                                        pltf?.status === "IN_PROGRESS"
                                          ? "#8297BD"
                                          : pltf?.status === "DRAFT"
                                            ? "#8297BD"
                                            : pltf?.status === "ACTIVE"
                                              ? "#34C759"
                                              : pltf?.status === "REJECTED"
                                                ? "#FF3B30"
                                                : pltf?.status === "PAUSED"
                                                  ? "#FFCC00"
                                                  : pltf?.status === "INACTIVE"
                                                    ? "#8297BD"
                                                    : pltf?.status === "ENABLED"
                                                      ? "#8297BD"
                                                      : pltf?.status ===
                                                          "UNDER_REVIEW"
                                                        ? "#8297BD"
                                                        : "white"
                                      }
                                    />
                                  </svg>
                                </div>
                              )}
                              {/* {pltf?.platformName === "LinkedIn" && (
                                <div className="relative group cursor-pointer">
                                  <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {pltf?.status}
                                  </p>
                                  <svg
                                    viewBox="0 0 26 26"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="22"
                                    width="22"
                                  >
                                    <path
                                      d="M22.9167 0.25C23.6681 0.25 24.3888 0.548511 24.9201 1.07986C25.4515 1.61122 25.75 2.33189 25.75 3.08333V22.9167C25.75 23.6681 25.4515 24.3888 24.9201 24.9201C24.3888 25.4515 23.6681 25.75 22.9167 25.75H3.08333C2.33189 25.75 1.61122 25.4515 1.07986 24.9201C0.548511 24.3888 0.25 23.6681 0.25 22.9167V3.08333C0.25 2.33189 0.548511 1.61122 1.07986 1.07986C1.61122 0.548511 2.33189 0.25 3.08333 0.25H22.9167ZM22.2083 22.2083V14.7C22.2083 13.4751 21.7218 12.3005 20.8557 11.4343C19.9895 10.5682 18.8149 10.0817 17.59 10.0817C16.3858 10.0817 14.9833 10.8183 14.3033 11.9233V10.3508H10.3508V22.2083H14.3033V15.2242C14.3033 14.1333 15.1817 13.2408 16.2725 13.2408C16.7985 13.2408 17.303 13.4498 17.6749 13.8217C18.0469 14.1937 18.2558 14.6982 18.2558 15.2242V22.2083H22.2083ZM5.74667 8.12667C6.37788 8.12667 6.98324 7.87592 7.42958 7.42958C7.87592 6.98324 8.12667 6.37788 8.12667 5.74667C8.12667 4.42917 7.06417 3.3525 5.74667 3.3525C5.11169 3.3525 4.50273 3.60474 4.05374 4.05374C3.60474 4.50273 3.3525 5.11169 3.3525 5.74667C3.3525 7.06417 4.42917 8.12667 5.74667 8.12667ZM7.71583 22.2083V10.3508H3.79167V22.2083H7.71583Z"
                                      fill={
                                        pltf?.status === "IN_PROGRESS"
                                          ? "#8297BD"
                                          : pltf?.status === "DRAFT"
                                            ? "#8297BD"
                                            : pltf?.status === "ACTIVE"
                                              ? "#34C759"
                                              : pltf?.status === "REJECTED"
                                                ? "#FF3B30"
                                                : pltf?.status === "PAUSED"
                                                  ? "#FFCC00"
                                                  : pltf?.status === "INACTIVE"
                                                    ? "#8297BD"
                                                    : pltf?.status === "ENABLED"
                                                      ? "#8297BD"
                                                      : pltf?.status ===
                                                          "UNDER_REVIEW"
                                                        ? "#8297BD"
                                                        : "white"
                                      }
                                    />
                                  </svg>
                                </div>
                              )} */}
                              {pltf?.platformName === "Twitter" && (
                                <div className="relative group cursor-pointer">
                                  <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {pltf?.status}
                                  </p>
                                  <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="25"
                                    width="25"
                                  >
                                    <path
                                      d="m3.242 3 7.096 10.14L3.615 21h2.64l5.265-6.17L15.835 21h6.91l-7.422-10.625L21.615 3h-2.6l-4.869 5.688L10.175 3H3.242Zm3.84 2h2.049l9.777 14h-2.031L7.082 5Z"
                                      fill={
                                        pltf?.status === "IN_PROGRESS"
                                          ? "#8297BD"
                                          : pltf?.status === "DRAFT"
                                            ? "#8297BD"
                                            : pltf?.status === "ACTIVE"
                                              ? "#34C759"
                                              : pltf?.status === "REJECTED"
                                                ? "#FF3B30"
                                                : pltf?.status === "PAUSED"
                                                  ? "#FFCC00"
                                                  : pltf?.status === "INACTIVE"
                                                    ? "#8297BD"
                                                    : pltf?.status === "ENABLED"
                                                      ? "#8297BD"
                                                      : pltf?.status ===
                                                          "UNDER_REVIEW"
                                                        ? "#8297BD"
                                                        : "white"
                                      }
                                    />
                                  </svg>
                                </div>
                              )}
                              {pltf?.platformName === "Instagram" && (
                                <div className="relative group cursor-pointer">
                                  <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {pltf?.status}
                                  </p>
                                  <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="25"
                                    width="25"
                                  >
                                    <path
                                      d="M8.375 3c-2.757 0-5 2.243-5 5v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5h-8Zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3h-8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"
                                      fill={
                                        pltf?.status === "IN_PROGRESS"
                                          ? "#8297BD"
                                          : pltf?.status === "DRAFT"
                                            ? "#8297BD"
                                            : pltf?.status === "ACTIVE"
                                              ? "#34C759"
                                              : pltf?.status === "REJECTED"
                                                ? "#FF3B30"
                                                : pltf?.status === "PAUSED"
                                                  ? "#FFCC00"
                                                  : pltf?.status === "INACTIVE"
                                                    ? "#8297BD"
                                                    : pltf?.status === "ENABLED"
                                                      ? "#8297BD"
                                                      : pltf?.status ===
                                                          "UNDER_REVIEW"
                                                        ? "#8297BD"
                                                        : "white"
                                      }
                                    />
                                  </svg>
                                </div>
                              )}
                              {pltf?.platformName === "Google" && (
                                <div className="relative group cursor-pointer">
                                  <p
                                    className={
                                      pltf?.status === "REJECTED" &&
                                      pltf?.errorMessages?.length > 1
                                        ? "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-65px] p-2 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        : "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    }
                                  >
                                    {pltf?.status === "REJECTED" &&
                                    Array.isArray(pltf?.errorMessages) &&
                                    pltf?.errorMessages?.length > 0 ? (
                                      pltf?.errorMessages?.map((item) => (
                                        <>
                                          {" "}
                                          <p className="mb-[4px] text-left ">
                                            {item?.message}
                                          </p>
                                        </>
                                      ))
                                    ) : (
                                      <>{pltf?.status}</>
                                    )}
                                  </p>
                                  <svg
                                    width="25"
                                    height="25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.375 2.31c-.7-.05-1.43.11-2.08.49a3.656 3.656 0 0 0-1.35 5l7.34 12.7c1.01 1.76 3.25 2.34 5.01 1.34 1.75-1 2.33-3.25 1.33-5l-7.32-12.7a3.694 3.694 0 0 0-2.93-1.83ZM6.945 7.6l-5.32 9.24a3.67 3.67 0 0 0-.5 1.83 3.67 3.67 0 0 0 3.67 3.67 3.67 3.67 0 0 0 3.17-1.84v.01l3.16-5.48c-1.35-2.3-2.73-4.59-3.97-6.96-.08-.15-.15-.31-.2-.47h-.01Z"
                                      fill={
                                        pltf?.status === "IN_PROGRESS"
                                          ? "#8297BD"
                                          : pltf?.status === "DRAFT"
                                            ? "#8297BD"
                                            : pltf?.status === "ACTIVE"
                                              ? "#34C759"
                                              : pltf?.status === "REJECTED"
                                                ? "#FF3B30"
                                                : pltf?.status === "PAUSED"
                                                  ? "#FFCC00"
                                                  : pltf?.status === "INACTIVE"
                                                    ? "#8297BD"
                                                    : pltf?.status === "ENABLED"
                                                      ? "#8297BD"
                                                      : pltf?.status ===
                                                          "UNDER_REVIEW"
                                                        ? "#8297BD"
                                                        : "white"
                                      }
                                    />
                                  </svg>
                                </div>
                              )}
                              {pltf?.platformName === "Facebook" && (
                                <div className="relative group cursor-pointer">
                                  <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {pltf?.status}
                                  </p>
                                  <svg
                                    width="25"
                                    height="25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#a)">
                                      <path
                                        d="M22.375 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5c0-1.93 1.57-3.5 3.5-3.5h2.5v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
                                        fill={
                                          pltf?.status === "IN_PROGRESS"
                                            ? "#8297BD"
                                            : pltf?.status === "DRAFT"
                                              ? "#8297BD"
                                              : pltf?.status === "ACTIVE"
                                                ? "#34C759"
                                                : pltf?.status === "REJECTED"
                                                  ? "#FF3B30"
                                                  : pltf?.status === "PAUSED"
                                                    ? "#FFCC00"
                                                    : pltf?.status ===
                                                        "INACTIVE"
                                                      ? "#8297BD"
                                                      : pltf?.status ===
                                                          "ENABLED"
                                                        ? "#8297BD"
                                                        : pltf?.status ===
                                                            "UNDER_REVIEW"
                                                          ? "#8297BD"
                                                          : "white"
                                        }
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="a">
                                        <path
                                          fill="#fff"
                                          transform="translate(.375)"
                                          d="M0 0h24v24H0z"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </div>
                    </td>
                    <td className="min-w-[120px] max-w-[120px] text-center">
                      <div class="relative group">
                        <p
                          className={`font-normal text-[14px] leading-[20px] cursor-pointer ${
                            item?.overallStatus === "IN_PROGRESS"
                              ? "text-[#8297BD]"
                              : item?.overallStatus === "DRAFT"
                                ? "text-[#8297BD]"
                                : item?.overallStatus === "ACTIVE"
                                  ? "text-[#34C759]"
                                  : item?.overallStatus === "REJECTED"
                                    ? "text-[#FF3B30]"
                                    : item?.overallStatus === "PAUSED"
                                      ? "text-[#FFCC00]"
                                      : item?.overallStatus === "INACTIVE"
                                        ? "text-[#8297BD]"
                                        : item?.overallStatus === "ENABLED"
                                          ? "text-[#8297BD]"
                                          : item?.overallStatus ===
                                              "UNDER_REVIEW"
                                            ? "text-[#8297BD]"
                                            : "text-white"
                          }`}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                item?.overallStatus === "IN_PROGRESS"
                                  ? "Inactive <br /> (Under Review)"
                                  : item?.overallStatus === "DRAFT"
                                    ? "Inactive <br /> (Draft)"
                                    : item?.overallStatus === "ACTIVE"
                                      ? "Active"
                                      : item?.overallStatus === "REJECTED"
                                        ? "Rejected"
                                        : item?.overallStatus === "PAUSED"
                                          ? "Paused"
                                          : item?.overallStatus === "INACTIVE"
                                            ? "Inactive"
                                            : item?.overallStatus === "ENABLED"
                                              ? "Enabled"
                                              : item?.overallStatus ===
                                                  "UNDER_REVIEW"
                                                ? "Inactive <br /> (Under Review)"
                                                : item?.overallStatus,
                            }}
                          />
                        </p>
                      </div>
                    </td>

                    <td className="min-w-[164px] max-w-[164px] flex text-center items-center justify-center gap-2 pt-5">
                      <div>
                        <p className="text-white font-normal  text-[14px] leading-[20px]">
                          {item?.campaignStartTime === null ? "NA" : startDate}
                        </p>
                        {/* <p className="text-[#9A8FC0] font-normal  text-[12px] leading-[16px]">
                          {item?.campaignStartTime === null ? "" : startTime}
                        </p> */}
                      </div>

                      <div className="text-white">-</div>

                      <div>
                        <p className="text-white font-normal  text-[14px] leading-[20px]">
                          {item?.campaignEndTime === null ? "NA" : endDate}
                        </p>
                        {/* <p className="text-[#9A8FC0] font-normal  text-[12px] leading-[16px]">
                          {item?.campaignEndTime === null ? "" : endTime}
                        </p> */}
                      </div>
                    </td>
                    {/* <td className="min-w-[141px] max-w-[141px] text-center justify-center">
                      <p className="text-white font-semibold text-[14px] leading-[20px]">
                        {item?.campaignStartTime === null ? "-" : startDate}
                      </p>
                      <p className="text-[#9A8FC0] font-semibold text-[12px] leading-[16px]">
                        {item?.campaignStartTime === null ? "" : startTime}
                      </p>
                    </td> */}
                    {/* <td className="min-w-[123px] max-w-[123px] text-center">
                      <p className="text-white font-semibold text-[14px] leading-[20px]">
                        {item?.campaignEndTime === null ? "-" : endDate}
                      </p>
                      <p className="text-[#9A8FC0] font-semibold text-[12px] leading-[16px]">
                        {item?.campaignEndTime === null ? "" : endTime}
                      </p>
                    </td> */}

                    <td className="min-w-[164px] max-w-[164px] text-center">
                      <p className="text-white font-normal  text-[14px] leading-[20px]">
                        {formatNumber(item?.totalBudget) || "-"}
                        {item?.totalBudget}

                      </p>
                    </td>
                    <td className="min-w-[119px] max-w-[119px] text-center">
                      <p className="text-white font-normal  text-[14px] leading-[20px]">
                        {formatNumber(item?.impressions) || "-"}
                      </p>
                    </td>
                    <td className="min-w-[120px] max-w-[120px] text-center">
                      <p className="text-white font-normal  text-[14px] leading-[20px]">
                        {formatNumber(item?.clicks) || "-"}
                      </p>
                    </td>
                    <td className="min-w-[120px] max-w-[120px] text-center">
                      <Link
                        href={`/apphome/${workspacename}/admanager/uniview?campaignID=${item?.campaignId}`}
                      >
                        <p className="text-white hover:text-nyx-yellow  text-[12px] leading-[20px] font-bold underline">
                          {/* {item?.ctr ? `${item.ctr.toFixed(2)}` : "-"} */}
                          See more
                        </p>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {Array.isArray(allCampaignData) && allCampaignData.length != 0 ? (
          <></>
        ) : (
          <p className="flex justify-center items-center w-full text-[24px] p-8 text-nyx-yellow">
            No campaign data found!{" "}
          </p>
        )}
      </div>
    </>
  );
};

export default DashboardTable;
