/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./index.css";
import Select from "react-select";
import { assetSortStyle, campaignSortStyle } from "@/utils/productStyle";
import { IMAGE_URL } from "@/components/constants";
import Image from "next/image";
import Link from "next/link";
import {
  campaignStatusSort,
  campaignChannelSort,
  campaignTimeSort,
} from "@/utils/productConstants";
import axios from "axios";
import { getAllCampaiPagination } from "@/services/admanagerServices";
import ButtonLoadingGenAI from "@/components/ButtonLoadingGenAI";
import {
  getChildCampaigns,
  getExternalCampaigns,
} from "../../../../../../services/admanagerServices";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
export const dynamic = "force-dynamic";

const customStyles = {
  // include any other styles you have
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(90deg)" : "rotate(0deg)",
  }),
};

const greyedOutStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    color: "#ffffff",
    borderColor: "#8297BD",
    opacity: 0.6,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#888",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#888",
  }),
};

const DashboardTableNew = () => {
  const router = useRouter();
  const [workspacename, setworkspacename] = useState("");
  // Filter States
  const [statusFilter, setStatusFilter] = useState(null);
  const [channelsFilter, setChannelsFilter] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [search, setSearch] = useState("");

  // const [campaignData, setCampaignData] = useState([]); // Stores the campaign data
  const [allCampaignData, setallCampaignData] = useState([]);
  const [nextCursor, setNextCursor] = useState(null); // Tracks the next cursor
  const [hasNextPage, setHasNextPage] = useState(true); // Indicates if more data is available
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for scrolling
  const hasRun = useRef(false);
  const [childCampaigns, setChildCampaigns] = useState([]);
  // Open TG groups / sub entries
  const [expandedRow, setExpandedRow] = useState([]);
  const [expandedTGRow, setExpandedTGRow] = useState([]);

  // // Function to fetch campaign data
  // // Update fetchCampaignData to accept filters explicitly
  // const fetchCampaignData = async (
  //   cursor = null,
  //   appendData = false,
  //   filters = {},
  // ) => {
  //   console.log("fetchCampaignData");
  //   if (!hasNextPage && !appendData) return;

  //   if (!appendData) setLoading(true);
  //   else setLoadingMore(true);

  //   try {
  //     const params = new URLSearchParams();
  //     if (cursor) params.append("nextCursor", cursor);
  //     if (filters.statusFilter) params.append("status", filters.statusFilter);
  //     if (filters.channelsFilter?.length > 0) {
  //       params.append("platforms", filters.channelsFilter.join(","));
  //     }
  //     if (filters.sortBy) params.append("sorting_order", filters.sortBy);
  //     console.log("going to call api");
  //     const response = await axios.get(
  //       http://localhost:5000/v2/admanager/all-campaigns/${Number(localStorage.getItem("workspace_id"))},
  //       {
  //         headers: {
  //           Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInBob25lIjoiODEyMzM0Mjg5NCIsImNvdW50cnlDb2RlIjoiKzkxIiwidHlwZSI6IkFSVElTVCIsImlhdCI6MTc0MDgzOTI1OSwiZXhwIjoxNzQwOTI1NjU5fQ.aVhDGpcC_4YM72cDe9vi39MYCbDLUWCSoUtI07VpM2Y,
  //         },
  //         params,
  //       },
  //     );

  //     const { data, nextCursor, hasNextPage } = response.data;
  //     console.log({ data, nextCursor, hasNextPage });

  //     if (appendData) {
  //       setallCampaignData((prevData) => [...prevData, ...data]);
  //     } else {
  //       setallCampaignData(data);
  //     }
  //     setNextCursor(nextCursor);
  //     setHasNextPage(hasNextPage);
  //   } catch (error) {
  //     console.error("Error fetching campaign data:", error);
  //   } finally {
  //     if (!appendData) setLoading(false);
  //     else setLoadingMore(false);
  //   }
  // };

  useEffect(() => {
    const workspace = localStorage.getItem("workspace_name");
    setworkspacename(workspace);
  }, []);

  // useEffect(() => {
  //   if (hasRun.current) return;
  //   fetchCampaignData();
  //   hasRun.current = true;
  // }, [workspacename]);

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

  // useEffect(() => {
  //   // Log filters when they change
  //   console.log("Filters changed:", { statusFilter, channelsFilter, sortBy });

  //   // Reset state before fetching new data
  //   setallCampaignData([]);
  //   setNextCursor(null);
  //   setHasNextPage(true);

  //   // Fetch data with updated filters
  //   const updatedFilters = {
  //     statusFilter,
  //     channelsFilter,
  //     sortBy,
  //   };

  //   // Debounce API calls
  //   const timeout = setTimeout(() => {
  //     fetchCampaignData(null, false, updatedFilters);
  //   }, 300); // Adjust debounce time as needed

  //   return () => clearTimeout(timeout); // Cleanup timeout
  // }, [statusFilter, channelsFilter, sortBy]);

  // Use a ref to track the latest filters
  const filtersRef = useRef({ statusFilter, channelsFilter, sortBy });

  // Update the ref whenever filters change
  useEffect(() => {
    filtersRef.current = { statusFilter, channelsFilter, sortBy };
  }, [statusFilter, channelsFilter, sortBy]);

  useEffect(() => {
    // Reset state before fetching new data
    setallCampaignData([]);
    setNextCursor(null);
    setHasNextPage(true);

    // Fetch data with updated filters
    fetchCampaignData(null, false);
  }, [statusFilter, channelsFilter, sortBy]);

  useEffect(() => {
    if (hasNextPage) {
      console.log("hasNextPage is true, fetching data...");
      // fetchCampaignData(null, false);
    }
  }, [hasNextPage]); // Only depend on hasNextPage

  const fetchCampaignData = async (cursor = null, appendData = false) => {
    if (!hasNextPage && !appendData) {
      console.log("Early return: hasNextPage is false and appendData is false");
      return;
    }

    if (!appendData) setLoading(true);
    else setLoadingMore(true);

    try {
      const params = new URLSearchParams();
      if (cursor) params.append("nextCursor", cursor);
      if (filtersRef.current.statusFilter)
        params.append("status", filtersRef.current.statusFilter);
      if (filtersRef.current.channelsFilter?.length > 0) {
        params.append("platforms", filtersRef.current.channelsFilter.join(","));
      }
      if (filtersRef.current.sortBy)
        params.append("sorting_order", filtersRef.current.sortBy);
      if (search.length >= 3) {
        params.append("campaignSearch", search);
      }
      const response = await getAllCampaiPagination(
        Number(localStorage.getItem("workspace_id")),
        params // Pass the params object directly
      );

      const { data, nextCursor, hasNextPage } = response;
      if (appendData) {
        setallCampaignData((prevData) => [...prevData, ...data]);
      } else {
        setallCampaignData(data);
      }
      setNextCursor(nextCursor);
      setHasNextPage(hasNextPage);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    } finally {
      if (!appendData) setLoading(false);
      else setLoadingMore(false);
    }
  };

  // Handlers for filters
  const handleStatusChange = (selectedOption) => {
    console.log("handleStatusChange");
    setStatusFilter(selectedOption?.value || null);
    // setCurrentPage(1); // Reset to first page on filter change
  };

  const handleChannelsChange = (selectedOptions) => {
    console.log("handleChannelsChange");
    const selectedValues = selectedOptions?.map((option) => option.value) || [];
    console.log(selectedValues);
    setChannelsFilter(selectedValues);
    // setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (selectedOption) => {
    console.log("handleSortChange");
    setSortBy(selectedOption?.value || null);
    // setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && search.length >= 3) {
      // Reset state before fetching new data
      setallCampaignData([]);
      setNextCursor(null);
      setHasNextPage(true);
      // Fetch data with the search keyword
      fetchCampaignData(null, false);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (
      scrollHeight - scrollTop <= clientHeight + 10 &&
      hasNextPage &&
      !loadingMore
    ) {
      // Call API when scrolled to the bottom
      fetchCampaignData(nextCursor, true); // Append data for scrolling
    }
  };

  //  for Tg-groups and Ad entries
  const toggleRow = async (id) => {
    const res = await getChildCampaigns(id);
    setChildCampaigns(res.data.adsets);
    setExpandedRow((items) =>
      items.includes(id) ? items.filter((rowid) => rowid != id) : [id]
    );
  };

  const toggleTGRow = (id) => {
    setExpandedTGRow((items) =>
      items.includes(id) ? items.filter((rowid) => rowid != id) : [id]
    );
  };

  const mutateExternalCampaign = useMutation({
    mutationKey: ["external-campaigns"],
    mutationFn: getExternalCampaigns,
  });

  const openRow = (item) => {
    if (
      item?.type == "EXTERNAL" &&
      item?.platforms[0]?.platformName == "Google"
    ) {
      const params = {
        workspaceId: Number(localStorage.getItem("workspace_id")),
        campaignId: [item?.campaignId],
      };
      mutateExternalCampaign.mutate(params, {
        onSuccess: (response) => {
          router.push(
            `/apphome/${workspacename}/admanager/uniview?campaignID=${item?.campaignId}`
          );
        },
        onError: (error) => {},
      });
    } else {
      router.push(
        `/apphome/${workspacename}/admanager/uniview?campaignID=${item?.campaignId}`
      );
    }
  };

  //  For TypeScript
  // type Status =
  //   | 'IN_PROGRESS'
  //   | 'DRAFT'
  //   | 'ACTIVE'
  //   | 'REJECTED'
  //   | 'PAUSED'
  //   | 'INACTIVE'
  //   | 'ENABLED'
  //   | 'UNDER_REVIEW'
  //   | string;

  // interface StatusIconProps {
  //   status: Status;
  //   size?: number;
  // }

  // (status: Status): string   // for type script

  const getStatusColor = (status) => {
    switch (status) {
      case "IN_PROGRESS":
      case "DRAFT":
      case "INACTIVE":
      case "ENABLED":
      case "UNDER_REVIEW":
        return "#8297BD";
      case "ACTIVE":
        return "#34C759";
      case "REJECTED":
        return "#FF3B30";
      case "PAUSED":
        return "#FFCC00";
      default:
        return "white";
    }
  };

  const PlatformIcon = ({ platform, status, size }) => {
    const fillColor = getStatusColor(status);
    return (
      <>
        {platform === "LinkedIn" && (
          <svg
            viewBox="0 0 26 26"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
          >
            <path
              d="M22.9167 0.25C23.6681 0.25 24.3888 0.548511 24.9201 1.07986C25.4515 1.61122 25.75 2.33189 25.75 3.08333V22.9167C25.75 23.6681 25.4515 24.3888 24.9201 24.9201C24.3888 25.4515 23.6681 25.75 22.9167 25.75H3.08333C2.33189 25.75 1.61122 25.4515 1.07986 24.9201C0.548511 24.3888 0.25 23.6681 0.25 22.9167V3.08333C0.25 2.33189 0.548511 1.61122 1.07986 1.07986C1.61122 0.548511 2.33189 0.25 3.08333 0.25H22.9167ZM22.2083 22.2083V14.7C22.2083 13.4751 21.7218 12.3005 20.8557 11.4343C19.9895 10.5682 18.8149 10.0817 17.59 10.0817C16.3858 10.0817 14.9833 10.8183 14.3033 11.9233V10.3508H10.3508V22.2083H14.3033V15.2242C14.3033 14.1333 15.1817 13.2408 16.2725 13.2408C16.7985 13.2408 17.303 13.4498 17.6749 13.8217C18.0469 14.1937 18.2558 14.6982 18.2558 15.2242V22.2083H22.2083ZM5.74667 8.12667C6.37788 8.12667 6.98324 7.87592 7.42958 7.42958C7.87592 6.98324 8.12667 6.37788 8.12667 5.74667C8.12667 4.42917 7.06417 3.3525 5.74667 3.3525C5.11169 3.3525 4.50273 3.60474 4.05374 4.05374C3.60474 4.50273 3.3525 5.11169 3.3525 5.74667C3.3525 7.06417 4.42917 8.12667 5.74667 8.12667ZM7.71583 22.2083V10.3508H3.79167V22.2083H7.71583Z"
              fill={fillColor}
            />
          </svg>
        )}
        {platform === "Twitter" && (
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
          >
            <path
              d="m3.242 3 7.096 10.14L3.615 21h2.64l5.265-6.17L15.835 21h6.91l-7.422-10.625L21.615 3h-2.6l-4.869 5.688L10.175 3H3.242Zm3.84 2h2.049l9.777 14h-2.031L7.082 5Z"
              fill={fillColor}
            />
          </svg>
        )}
        {platform === "Instagram" && (
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
          >
            <path
              d="M8.375 3c-2.757 0-5 2.243-5 5v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5h-8Zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3h-8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"
              fill={fillColor}
            />
          </svg>
        )}
        {platform === "Google" && (
          <svg
            height={size}
            width={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.375 2.31c-.7-.05-1.43.11-2.08.49a3.656 3.656 0 0 0-1.35 5l7.34 12.7c1.01 1.76 3.25 2.34 5.01 1.34 1.75-1 2.33-3.25 1.33-5l-7.32-12.7a3.694 3.694 0 0 0-2.93-1.83ZM6.945 7.6l-5.32 9.24a3.67 3.67 0 0 0-.5 1.83 3.67 3.67 0 0 0 3.67 3.67 3.67 3.67 0 0 0 3.17-1.84v.01l3.16-5.48c-1.35-2.3-2.73-4.59-3.97-6.96-.08-.15-.15-.31-.2-.47h-.01Z"
              fill={fillColor}
            />
          </svg>
        )}
        {platform === "Facebook" && (
          <svg
            height={size}
            width={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#a)">
              <path
                d="M22.375 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5c0-1.93 1.57-3.5 3.5-3.5h2.5v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
                fill={fillColor}
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
        )}
      </>
    );
  };

  // Status
  const getStatusTextColor = (status) => {
    const colorMap = {
      IN_PROGRESS: "text-[#8297BD]",
      DRAFT: "text-[#8297BD]",
      ACTIVE: "text-[#34C759]",
      REJECTED: "text-[#FF3B30]",
      PAUSED: "text-[#FFCC00]",
      INACTIVE: "text-[#8297BD]",
      ENABLED: "text-[#8297BD]",
      UNDER_REVIEW: "text-[#8297BD]",
    };

    return colorMap[status] || "text-white";
  };

  const getStatusHTML = (status) => {
    const statusHTMLMap = {
      IN_PROGRESS: "Inactive <br /> (Under Review)",
      DRAFT: "Inactive <br /> (Draft)",
      ACTIVE: "Active",
      REJECTED: "Rejected",
      PAUSED: "Paused",
      INACTIVE: "Inactive",
      ENABLED: "Enabled",
      UNDER_REVIEW: "Inactive <br /> (Under Review)",
    };

    return statusHTMLMap[status] || status;
  };

  const formatNumber = (num) => {
    if (num === undefined) {
      return "-";
    }

    if (num === null) {
      return "-";
    }

    const format = (num, suffix) => {
      const formatted = num.toFixed(2);
      return `${
        formatted.endsWith(".00") ? parseInt(formatted) : formatted
      }${suffix}`;
    };

    if (num >= 1000000000) {
      return format(num / 1000000000, "B");
    }
    if (num >= 1000000) {
      return format(num / 1000000, "M");
    }
    if (num >= 1000) {
      return format(num / 1000, "K");
    }
    const formattedVal = num?.toFixed?.(2);
    return `${
      formattedVal?.endsWith(".00")
        ? parseInt(formattedVal)
        : formattedVal ?? num
    }`;
  };

  return (
    <>
      <div className="w-full flex justify-between pt-[20px] px-4 ">
        <div className="text-white font-bold text-[20px] flex items-center ml-3">
          My Campaigns
        </div>
        <div className="flex  gap-x-6 w-9/12">
          <Select
            className="text-sm md:text-base z-[99] w-full max-w-[236px] text-white bg-inherit text-[14px] focus:border-white"
            options={campaignStatusSort}
            onChange={handleStatusChange}
            menuPlacement="bottom"
            placeholder="Filter"
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              borderColor: "white",
            })}
            styles={
              !statusFilter
                ? { ...campaignSortStyle, ...greyedOutStyle }
                : campaignSortStyle
            }
            isSearchable={false}
          />
          <Select
            className="text-sm md:text-base z-99 w-full max-w-[236px] text-white bg-inherit text-[14px] flex-nowrap selectStyle"
            options={campaignChannelSort}
            onChange={handleChannelsChange}
            menuPlacement="bottom"
            placeholder="Select Channel"
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              borderColor: "white",
            })}
            styles={
              channelsFilter.length === 0
                ? { ...assetSortStyle, ...greyedOutStyle }
                : assetSortStyle
            }
            value={campaignChannelSort.filter((option) =>
              channelsFilter.includes(option.value)
            )}
            isMulti
            isSearchable={false}
          />
          <Select
            className="text-sm md:text-base z-99 w-full max-w-[236px] text-white bg-inherit text-[14px] focus:border-white"
            options={campaignTimeSort}
            onChange={handleSortChange}
            menuPlacement="bottom"
            placeholder="Sort By"
            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              borderColor: "white",
            })}
            styles={
              !sortBy
                ? { ...assetSortStyle, ...greyedOutStyle }
                : assetSortStyle
            }
            isSearchable={false}
          />
          {/* <input
            value={search}
            onChange={handleSearchChange}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Search your campaign")}
            type="text"
            placeholder="Search your campaign"
            className="text-[14px] font-normal text-white rounded border-[1px] px-[18px] py-[12px] border-[#8297BD] bg-inherit w-full max-w-[236px] outline-none appearance-none"
          /> */}
          <input
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress} // Trigger search on Enter key press
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Search your campaign")}
            type="text"
            placeholder="Search your campaign"
            className="text-[14px] font-normal text-[#8297BD] rounded border-[1px] px-[18px] py-[12px] border-[#8297BD] bg-inherit w-full max-w-[236px] outline-none appearance-none focus:text-white focus:border-white"
          />
        </div>
      </div>

      {/* Table and Data */}
      <div
        className="w-full px-[24px] overflow-x-auto overflow-y-auto h-full max-h-[540px] mt-8"
        onScroll={handleScroll} // Attach scroll handler
      >
        {loading ? (
          <p className="text-white text-center">Loading campaigns...</p>
        ) : (
          <table className="min-w-full bg-[#332270] rounded-[10px] overflow-hidden dashboardTableStyle pb-2 ">
            <thead className="bg-[#23145A] h-[44px] mt-[12px] sticky top-0 z-[1]">
              <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
                <th className="min-w-[160px] px-[20px] text-leftfont-semibold">
                  Campaign Name
                </th>
                <th className="min-w-[130px] text-left px-[20px] font-semibold">
                  channels
                </th>
                <th className="min-w-[130px] text-center px-[20px] font-semibold">
                  Status
                </th>
                <th className="min-w-[164px] text-left px-[20px] font-semibold pl-16">
                  {" "}
                  Schedule Time
                </th>
                <th className="min-w-[164px] text-center px-[20px] font-semibold">
                  Budget
                </th>
                <th className="min-w-[119px] text-center px-[20px] font-semibold">
                  Impressions{" "}
                </th>
                <th className="min-w-[120px] text-center px-[20px] font-semibold">
                  Clicks
                </th>
                <th className="min-w-[120px] text-center px-[20px] font-semibold">
                  Recommendations
                </th>
                {/* <th className="min-w-[120px] text-center px-[20px] rounded-tr-[10px] font-normal"> Recommendations</th> */}
              </tr>
            </thead>

            <tbody>
              {Array.isArray(allCampaignData) &&
                allCampaignData?.map((item, index) => {
                  const { date: startDate, time: startTime } = formatDateTime(
                    item.campaignStartTime
                  );
                  const { date: endDate, time: endTime } = formatDateTime(
                    item.campaignEndTime
                  );

                  return (
                    <Fragment key={item.id}>
                      <tr
                        className="border-b border-solid border-[#503193]"
                        key={index}
                      >
                        <td className="flex min-w-[160px] max-w-[221px] text-center pl-[20px] h-[72px] items-center">
                          {/* toggle arrow  */}
                          <svg
                            style={{
                              transform: expandedRow.includes(item.campaignId)
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "0.3s ease",
                            }}
                            onClick={() => toggleRow(item.campaignId)}
                            className="cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="6 15 12 9 18 15" />
                          </svg>
                          <div className="flex flex-col">
                            <div
                              className="cursor-pointer"
                              onClick={() => openRow(item)}
                            >
                              <div className="flex gap-[12px]">
                                {/* <Image
                                  src={`${IMAGE_URL}/assets/admanager/Oval.svg`}
                                  width={28}
                                  height={28}
                                  alt="Campaign Icon"
                                /> */}
                                <div className="flex flex-col gap-2">
                                  <div class="relative group">
                                    <p className="text-white font-normal text-[14px] absolute z-2 bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      {item?.campaignName}
                                    </p>
                                    <p className="text-white hover:text-nyx-yellow font-normal text-[14px] leading-[20px] text-left w-[14ch] truncate ">
                                      {item?.campaignName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Platforms Channels */}
                        <td className="pl-[20px]">
                          <div className="flex items-center gap-2 mt-1 max-w-[160px] flex-wrap">
                            {item.platforms.map((pltf) => {
                              return (
                                <Fragment key={pltf.id}>
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

                                      <PlatformIcon
                                        platform={pltf?.platformName}
                                        status={pltf?.status}
                                        size={22}
                                      />
                                    </div>
                                  )}

                                  {pltf?.platformName === "Twitter" && (
                                    <div className="relative group cursor-pointer">
                                      <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {pltf?.status}
                                      </p>
                                      <PlatformIcon
                                        platform={pltf?.platformName}
                                        status={pltf?.status}
                                        size={22}
                                      />
                                    </div>
                                  )}
                                  {pltf?.platformName === "Instagram" && (
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
                                      <PlatformIcon
                                        platform={pltf?.platformName}
                                        status={pltf?.status}
                                        size={22}
                                      />
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
                                      <PlatformIcon
                                        platform={pltf?.platformName}
                                        status={pltf?.status}
                                        size={22}
                                      />
                                    </div>
                                  )}
                                  {pltf?.platformName === "Facebook" && (
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
                                      <PlatformIcon
                                        platform={pltf?.platformName}
                                        status={pltf?.status}
                                        size={22}
                                      />
                                    </div>
                                  )}
                                </Fragment>
                              );
                            })}
                          </div>
                        </td>
                        {/* Status  */}
                        <td className="min-w-[120px] max-w-[120px] text-center">
                          <div className="relative group">
                            <p
                              className={`font-normal text-[14px] leading-[20px] cursor-pointer 
                                ${getStatusTextColor(item?.overallStatus)}`}
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: getStatusHTML(item?.overallStatus),
                                }}
                              />
                            </p>
                          </div>
                        </td>
                        <td className="min-w-[164px] max-w-[164px] flex text-left items-center gap-2 pt-5 px-[20px] pl-16">
                          <div className="flex items-center">
                            <p className="text-white font-normal  text-[14px] leading-[20px]">
                              {!item?.campaignStartTime ? "NA" : startDate}
                            </p>
                            <div className="text-white">-</div>
                            <p className="text-white font-normal  text-[14px] leading-[20px]">
                              {!item?.campaignEndTime ? "NA" : endDate}
                            </p>
                          </div>
                        </td>
                        <td className="min-w-[164px] max-w-[164px] text-center">
                          <p className="text-white font-normal  text-[14px] leading-[20px]">
                            {formatNumber(item?.totalBudget) || "-"}
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
                        <td className="w-[50px] text-center">
                          <Link
                            href={`/apphome/${workspacename}/admanager/uniview?campaignID=${item?.campaignId}`}
                          >
                            <span className="text-white underline text-sm">
                              See More
                            </span>
                          </Link>
                        </td>
                      </tr>
                      {/* table collapse  */}
                      {expandedRow.includes(item.campaignId) &&
                        // mapping of TG groups
                        childCampaigns?.map((childItem, index) => {
                          const { date: startDate, time: startTime } =
                            formatDateTime(childItem.start_date);
                          const { date: endDate, time: endTime } =
                            formatDateTime(childItem.end_date);
                          return (
                            <Fragment>
                              <tr
                                key={index}
                                className="border-b border-solid border-[#503193] text-white"
                              >
                                <td className="flex gap-2 pl-[32px] text-[14px] h-[72px] items-center max-w-[140px]">
                                  <div className="w-6 h-6">
                                    <svg
                                      style={{
                                        transform: expandedTGRow.includes(
                                          childItem.tg_id
                                        )
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)",
                                        transition: "0.3s ease",
                                      }}
                                      onClick={() =>
                                        toggleTGRow(childItem.tg_id)
                                      }
                                      className="cursor-pointer"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      stroke="white"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    >
                                      <polyline points="6 15 12 9 18 15" />
                                    </svg>
                                  </div>
                                  <div className="relative group">
                                    <p className="text-white font-normal text-[14px] absolute  bg-black  mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      {childItem.tg_name}
                                    </p>
                                    <p className="text-white hover:text-nyx-yellow font-normal text-[14px] leading-[20px] text-left w-[14ch] truncate ">
                                      {childItem.tg_name}
                                    </p>
                                  </div>
                                </td>
                                {/* platforms  */}
                                <td className="pl-[20px]">
                                  <div className="flex childItems-center gap-2 mt-1 max-w-[160px] flex-wrap">
                                    {childItem.platforms.map((pltf) => {
                                      return (
                                        <>
                                          {pltf?.platformName ===
                                            "LinkedIn" && (
                                            <div className="relative group cursor-pointer">
                                              <p
                                                className={
                                                  pltf?.status === "REJECTED" &&
                                                  pltf?.errorMessages?.length >
                                                    1
                                                    ? "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-65px] p-2 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    : "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                }
                                              >
                                                {pltf?.status === "REJECTED" &&
                                                Array.isArray(
                                                  pltf?.errorMessages
                                                ) &&
                                                pltf?.errorMessages?.length >
                                                  0 ? (
                                                  pltf?.errorMessages?.map(
                                                    (childItem) => (
                                                      <>
                                                        {" "}
                                                        <p className="mb-[4px] text-left ">
                                                          {childItem?.message}
                                                        </p>
                                                      </>
                                                    )
                                                  )
                                                ) : (
                                                  <>{pltf?.status}</>
                                                )}
                                              </p>

                                              <PlatformIcon
                                                platform={pltf?.platformName}
                                                status={pltf?.status}
                                                size={22}
                                              />
                                            </div>
                                          )}
                                          {pltf?.platformName === "Twitter" && (
                                            <div className="relative group cursor-pointer">
                                              <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {pltf?.status}
                                              </p>
                                              <PlatformIcon
                                                platform={pltf?.platformName}
                                                status={pltf?.status}
                                                size={22}
                                              />
                                            </div>
                                          )}
                                          {pltf?.platformName ===
                                            "Instagram" && (
                                            <div className="relative group cursor-pointer">
                                              <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {pltf?.status}
                                              </p>
                                              <PlatformIcon
                                                platform={pltf?.platformName}
                                                status={pltf?.status}
                                                size={22}
                                              />
                                            </div>
                                          )}
                                          {pltf?.platformName === "Google" && (
                                            <div className="relative group cursor-pointer">
                                              <p
                                                className={
                                                  pltf?.status === "REJECTED" &&
                                                  pltf?.errorMessages?.length >
                                                    1
                                                    ? "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-65px] p-2 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    : "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                }
                                              >
                                                {pltf?.status === "REJECTED" &&
                                                Array.isArray(
                                                  pltf?.errorMessages
                                                ) &&
                                                pltf?.errorMessages?.length >
                                                  0 ? (
                                                  pltf?.errorMessages?.map(
                                                    (childItem) => (
                                                      <>
                                                        {" "}
                                                        <p className="mb-[4px] text-left ">
                                                          {childItem?.message}
                                                        </p>
                                                      </>
                                                    )
                                                  )
                                                ) : (
                                                  <>{pltf?.status}</>
                                                )}
                                              </p>
                                              <PlatformIcon
                                                platform={pltf?.platformName}
                                                status={pltf?.status}
                                                size={22}
                                              />
                                            </div>
                                          )}
                                          {pltf?.platformName ===
                                            "Facebook" && (
                                            <div className="relative group cursor-pointer">
                                              <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {pltf?.status}
                                              </p>
                                              <PlatformIcon
                                                platform={pltf?.platformName}
                                                status={pltf?.status}
                                                size={22}
                                              />
                                            </div>
                                          )}
                                        </>
                                      );
                                    })}
                                  </div>
                                </td>
                                {/* Status */}
                                <td className="text-center">
                                  <div className="relative group">
                                    <p
                                      className={`font-normal text-[14px] leading-[20px] cursor-pointer 
                                         ${getStatusTextColor(
                                           childItem?.overallStatus
                                         )}`}
                                    >
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: getStatusHTML(
                                            childItem?.overallStatus
                                          ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                </td>
                                {/* Schedule Time  */}
                                <td className="text-center">
                                  <div className="flex childItems-center justify-center">
                                    <p className="text-white font-normal text-[14px] leading-[20px]">
                                      {childItem?.start_date === null
                                        ? "NA"
                                        : startDate}
                                    </p>
                                    <div className="text-white">-</div>
                                    <p className="text-white font-normal  text-[14px] leading-[20px]">
                                      {childItem?.end_date === null
                                        ? "NA"
                                        : endDate}
                                    </p>
                                  </div>
                                </td>
                                <td className="min-w-[164px] max-w-[164px] text-center">
                                  <p className="text-white font-normal  text-[14px] leading-[20px]">
                                    {formatNumber(
                                      childItem?.totalDailybudget
                                    ) || "-"}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-white font-normal  text-[14px] leading-[20px]">
                                    {formatNumber(childItem?.impressions) ||
                                      "-"}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-white font-normal text-[14px] leading-[20px]">
                                    {formatNumber(childItem?.clicks) || "-"}
                                  </p>
                                </td>
                                <td className="w-[50px] text-center">
                                  <Link
                                    href={`/apphome/${workspacename}/admanager/uniview?campaignID=${childItem?.campaignId}`}
                                  >
                                    <span className="text-white underline text-sm">
                                      See More
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                              {expandedTGRow.includes(childItem.tg_id) && (
                                // mapping of TG-ads entries
                                <Fragment>
                                  {childItem?.ads?.map((adItem, index) => {
                                    const { date: startDate, time: startTime } =
                                      formatDateTime(adItem.start_date);
                                    const { date: endDate, time: endTime } =
                                      formatDateTime(adItem.end_date);
                                    return (
                                      <tr
                                        className="border-b border-solid border-[#503193] text-white"
                                        key={index}
                                      >
                                        <td className="pl-[64px] flex text-[14px] h-[72px] items-center max-w-[140px]">
                                          <div className="relative group">
                                            <p className="text-white font-normal text-[14px] absolute  bg-black z-50 mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                              AD-{adItem.unique_adbatch_id}
                                            </p>
                                            <p className="text-white hover:text-nyx-yellow font-normal text-[14px] leading-[20px] text-left w-[14ch] truncate ">
                                              AD-{adItem.unique_adbatch_id}
                                            </p>
                                          </div>
                                        </td>
                                        {/* platforms  */}
                                        <td className="pl-[20px]">
                                          <div className="flex adItems-center gap-2 mt-1 max-w-[160px] flex-wrap">
                                            {adItem.platforms.map((pltf) => {
                                              return (
                                                <Fragment key={pltf.id}>
                                                  {pltf?.platformName ===
                                                    "LinkedIn" && (
                                                    <div className="relative group cursor-pointer">
                                                      <p
                                                        className={
                                                          pltf?.status ===
                                                            "REJECTED" &&
                                                          pltf?.errorMessages
                                                            ?.length > 1
                                                            ? "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-65px] p-2 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            : "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        }
                                                      >
                                                        {pltf?.status ===
                                                          "REJECTED" &&
                                                        Array.isArray(
                                                          pltf?.errorMessages
                                                        ) &&
                                                        pltf?.errorMessages
                                                          ?.length > 0 ? (
                                                          pltf?.errorMessages?.map(
                                                            (adItem) => (
                                                              <>
                                                                {" "}
                                                                <p className="mb-[4px] text-left ">
                                                                  {
                                                                    adItem?.message
                                                                  }
                                                                </p>
                                                              </>
                                                            )
                                                          )
                                                        ) : (
                                                          <>{pltf?.status}</>
                                                        )}
                                                      </p>
                                                      <PlatformIcon
                                                        platform={
                                                          pltf?.platformName
                                                        }
                                                        status={pltf?.status}
                                                        size={22}
                                                      />
                                                    </div>
                                                  )}
                                                  {pltf?.platformName ===
                                                    "Twitter" && (
                                                    <div className="relative group cursor-pointer">
                                                      <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        {pltf?.status}
                                                      </p>
                                                      <PlatformIcon
                                                        platform={
                                                          pltf?.platformName
                                                        }
                                                        status={pltf?.status}
                                                        size={22}
                                                      />
                                                    </div>
                                                  )}
                                                  {pltf?.platformName ===
                                                    "Instagram" && (
                                                    <div className="relative group cursor-pointer">
                                                      <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        {pltf?.status}
                                                      </p>
                                                      <PlatformIcon
                                                        platform={
                                                          pltf?.platformName
                                                        }
                                                        status={pltf?.status}
                                                        size={22}
                                                      />
                                                    </div>
                                                  )}
                                                  {pltf?.platformName ===
                                                    "Google" && (
                                                    <div className="relative group cursor-pointer">
                                                      <p
                                                        className={
                                                          pltf?.status ===
                                                            "REJECTED" &&
                                                          pltf?.errorMessages
                                                            ?.length > 1
                                                            ? "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-65px] p-2 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            : "w-max text-white font-normal z-[9] text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        }
                                                      >
                                                        {pltf?.status ===
                                                          "REJECTED" &&
                                                        Array.isArray(
                                                          pltf?.errorMessages
                                                        ) &&
                                                        pltf?.errorMessages
                                                          ?.length > 0 ? (
                                                          pltf?.errorMessages?.map(
                                                            (adItem) => (
                                                              <>
                                                                {" "}
                                                                <p className="mb-[4px] text-left ">
                                                                  {
                                                                    adItem?.message
                                                                  }
                                                                </p>
                                                              </>
                                                            )
                                                          )
                                                        ) : (
                                                          <>{pltf?.status}</>
                                                        )}
                                                      </p>
                                                      <PlatformIcon
                                                        platform={
                                                          pltf?.platformName
                                                        }
                                                        status={pltf?.status}
                                                        size={22}
                                                      />
                                                    </div>
                                                  )}
                                                  {pltf?.platformName ===
                                                    "Facebook" && (
                                                    <div className="relative group cursor-pointer">
                                                      <p className="w-max text-white font-normal text-[14px] absolute bg-black mt-[-25px] p-1 rounded-[10px]  leading-[20px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        {pltf?.status}
                                                      </p>
                                                      <PlatformIcon
                                                        platform={
                                                          pltf?.platformName
                                                        }
                                                        status={pltf?.status}
                                                        size={22}
                                                      />
                                                    </div>
                                                  )}
                                                </Fragment>
                                              );
                                            })}
                                          </div>
                                        </td>
                                        <td>
                                          <div className="relative group text-center">
                                            <p
                                              className={`font-normal text-[14px] leading-[20px] cursor-pointer 
                                                 ${getStatusTextColor(
                                                   adItem?.overallStatus
                                                 )}`}
                                            >
                                              <span
                                                dangerouslySetInnerHTML={{
                                                  __html: getStatusHTML(
                                                    adItem?.overallStatus
                                                  ),
                                                }}
                                              />
                                            </p>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <div className="flex items-center justify-center">
                                            <p className="text-white font-normal text-[14px] leading-[20px]">
                                              {!adItem?.start_date
                                                ? "NA"
                                                : startDate}
                                            </p>
                                            <div className="text-white">-</div>

                                            <p className="text-white font-normal  text-[14px] leading-[20px]">
                                              {!adItem?.end_date
                                                ? "NA"
                                                : endDate}
                                            </p>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <p className="text-white font-normal  text-[14px] leading-[20px]">
                                            {formatNumber(
                                              adItem?.totalBudget
                                            ) || "-"}
                                          </p>
                                        </td>
                                        <td className="text-center">
                                          <p className="text-white font-normal  text-[14px] leading-[20px]">
                                            {formatNumber(
                                              adItem?.impressions
                                            ) || "-"}
                                          </p>
                                        </td>
                                        <td className="text-center">
                                          <p className="text-white font-normal text-[14px] leading-[20px]">
                                            {formatNumber(adItem?.clicks) ||
                                              "-"}
                                          </p>
                                        </td>
                                        <td className="w-[50px] text-center">
                                          <Link
                                            href={`/apphome/${workspacename}/admanager/uniview?campaignID=${adItem?.campaignId}`}
                                          >
                                            <span className="text-white underline text-sm">
                                              See More
                                            </span>
                                          </Link>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </Fragment>
                              )}
                            </Fragment>
                          );
                        })}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
        )}

        {/* Loading more indicator */}
        {loadingMore && (
          <p className="text-white text-center mt-4">
            Loading more campaigns...
          </p>
        )}

        {/* No more data indicator */}
        {!hasNextPage && !loading && (
          <p className="text-white text-center mt-4">
            No more campaigns to load.
          </p>
        )}
      </div>
    </>
  );
};

export default DashboardTableNew;
