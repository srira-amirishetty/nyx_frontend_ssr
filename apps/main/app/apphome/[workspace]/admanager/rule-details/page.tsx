/* eslint-disable react-hooks/exhaustive-deps */
// import MetabaseDashboard from "./_components/MetabaseDashboard";
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./index.css";
import Select from "react-select";
import Switch from "react-switch";
import { decodeToken } from "@nyx-frontend/main/utils/utils";
import useStore from "../component/store";
import { ruleFilter, ruleStatus } from "@nyx-frontend/main/utils/productConstants";
import { ruleDropDown } from "@nyx-frontend/main/utils/productStyle";
import React from "react";
import RuleLoading from "./_components/RuleLoading";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { ToastContainer, toast } from "react-toastify";

import {
  getAllRule,
  changeRuleStatus,
  createRule,
  deleteRuleById,
} from "@nyx-frontend/main/services/admanagerServices";
import "react-loading-skeleton/dist/skeleton.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaAngleRight } from "react-icons/fa6";

const Page = () => {
  const [Workspacename, setWorkspacename] = useState();
  const [Workspaceid, setWorkspaceid] = useState();

  const [checkedoverall, setCheckedoverall] = useState<any>();
  const [checkId, setCheckId] = useState<any>({});
  const [allData, setAllData] = useState<any>();
  const { setElement } = useStore();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  const [selectedSchedules, setSelectedSchedules] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  useEffect(() => {
    setElement("element5", false);
    setElement("element4", false);
    setElement("element3", false);
    setElement("element2", false);
    setElement("element1", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    const ID = localStorage.getItem("workspace_id");

    //@ts-ignore
    setWorkspacename(name);
    //@ts-ignore
    setWorkspaceid(ID);
  }, []);

  const handleChangeoverall = (id: any) => {
    const data = {
      status: checkId[id] == true ? "ACTIVE" : "INACTIVE",
      id: id,
    };

    const args = { data: data, workspaceId: Workspaceid };

    changeRule.mutate(args, {
      onSuccess: (response) => {
        refetch();
        // setCheckId((prevState: any) => ({
        //   ...prevState,
        //   [id]: !prevState[id],
        // }));
      },
      onError: (res) => {
        console.log(res);
      },
    });
  };

  const toggleExpand = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const {
    data: ruleDetailsById,
    refetch,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["get-all-rules"],
    queryFn: async () => {
      const data = await getAllRule(
        Number(localStorage.getItem("workspace_id")),
      );
      // Sort by id before returning the data
      return data?.sort((a: any, b: any) => b.id - a.id);
    },
  });

  useEffect(() => {
    if (ruleDetailsById) {
      console.log("implerigng gn ")
      applyFilters(selectedSchedules, selectedStatus);
    }
  }, [ruleDetailsById, selectedSchedules, selectedStatus]);

  // const onFilterSchedule = (selectedValues: any) => {
  //   const selectedSchedules = selectedValues.map((item: any) => item.value);

  //   const filteredData = ruleDetailsById.filter((dataItem: any) =>
  //     selectedSchedules.includes(dataItem.schedule),
  //   );
  //   setAllData(selectedSchedules.length > 0 ? filteredData : ruleDetailsById);
  // };

  // const onFilterStatus = (selectedValue: any) => {
  //   console.log(selectedValue);
  //   const selectedStatus = selectedValue.value;
  //   if (selectedStatus === "ALL") {
  //     setAllData(ruleDetailsById);
  //   } else {
  //     const filteredData = ruleDetailsById.filter(
  //       (dataItem: any) => dataItem.status === selectedStatus,
  //     );

  //     setAllData(filteredData);
  //   }
  // };
  console.log(selectedStatus)
  const onFilterSchedule = (selectedValues: any) => {
    const schedules = selectedValues?.map((item: any) => item.value);
    setSelectedSchedules(schedules);
    applyFilters(schedules, selectedStatus);
  };

  const onFilterStatus = (selectedValue: any) => {
    const status = selectedValue?.value;
    setSelectedStatus(status);
    applyFilters(selectedSchedules, status);
  };

  const applyFilters = (schedules: any[], status: string) => {
    let filteredData = ruleDetailsById;

    if (schedules.length > 0) {
      filteredData = filteredData?.filter((dataItem: any) =>
        schedules?.includes(scheduleMap[dataItem?.schedule_in_hours]),
      );
    }

    if (status !== "ALL") {
      filteredData = filteredData?.filter(
        (dataItem: any) => dataItem.status === status,
      );
    }

    setAllData(filteredData);
  };

  const changeRule = useMutation({
    mutationKey: ["create-rule"],
    mutationFn: changeRuleStatus,
  });

  const mutateCreateRule = useMutation({
    mutationKey: ["create-rule"],
    mutationFn: createRule,
  });

  const mutateDeleteRule = useMutation({
    mutationKey: ["delete-rule"],
    mutationFn: ({ ruleId, workspaceId }: { ruleId: any; workspaceId: any }) =>
      deleteRuleById(ruleId, workspaceId),
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting rule:", error);
    },
  });

  useEffect(() => {
    console.log("refetched");
    if (ruleDetailsById && Array.isArray(ruleDetailsById)) {
      applyFilters(selectedSchedules, selectedStatus);
      // Create a new object to store the id mappings
      const activeIds = ruleDetailsById?.reduce((acc, rule) => {
        if (rule.status === "ACTIVE") {
          acc[rule.id] = true;
        } else {
          acc[rule.id] = false;
        }
        return acc;
      }, {});

      // Update the checkId state with the new object
      setCheckId(activeIds);
    }
  }, [ruleDetailsById]);

  const handleCopy = (item: any) => {
    let copyCount = 0;
    const copyNumberMatch = item?.name.match(/\((\d+)\)/);

    // If the name already contains a copy number, increment it
    let newName;

    if (copyNumberMatch) {
      // If a copy number exists, increment it
      let copyCount = parseInt(copyNumberMatch[1], 10) + 1;
      newName = item?.name.replace(/\(\d+\)/, `(${copyCount})`); // Replace the old copy number with the new one
    } else {
      // If no copy number exists, add the first one
      newName = `${item?.name}(1)`;
    }
    let payload = {
      userId: decodeToken(localStorage.getItem("token")).data.userId,
      workspaceId: Number(localStorage.getItem("workspace_id")),
      // name: item?.name + " " + item?.id,
      name: newName,
      campaignId: item?.campaignId,
      ruleAppliesTo: item?.ruleAppliesTo,
      conditions: item?.conditions,
      emails: item?.emails,
      schedule_in_hours: item?.schedule_in_hours,
    };

    mutateCreateRule.mutate(payload, {
      onSuccess: (response: any) => {
        console.log(response);
        toast.success(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Request Successful!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Rule duplicated successfully.
            </span>
          </>,
          { autoClose: 5000 },
        );
        refetch();
      },
      onError: (res: any) => {
        console.log(res);
        toast.error(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Bad Request!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              {res?.response?.data?.error}
            </span>
          </>,
          { autoClose: 5000 },
        );
      },
    });
  };

  const deleteRuleClick = (item: any) => {
    const workspaceId = localStorage.getItem("workspace_id");
    mutateDeleteRule.mutate(
      { ruleId: item.id, workspaceId },
      {
        onSuccess: (response: any) => {
          console.log(response);
          toast.success(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Request Successful!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Rule Deleted Successfully
              </span>
            </>,
            { autoClose: 5000 },
          );
          refetch();
        },
        onError: (res: any) => {
          console.log(res);
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                {res?.response?.data?.error}
              </span>
            </>,
            { autoClose: 5000 },
          );
        },
      },
    );
  };

  const scheduleMap: any = {
    1: "Hour",
    24: "Day",
    168: "Week",
    720: "Month",
  };

  const metricTextMap: { [key: string]: string } = {
    cost: "Spend",
    impressions: "Impressions",
    ctr: "CTR",
    cpm: "CPM",
    avg_cpc: "CPC",
    clicks: "Clicks",
    cpa: "CPA",
    cpi: "CPI",
    cvr: "CVR",
    mobile_app_install: "Mobile App Install",
    roas: "ROAS",
  };

  const timeTextMap: { [key: string]: string } = {
    all_time: "All time",
    today: "Today",
    yesterday: "Yesterday",
    last_7_days: "Last 7 Days",
    last_14_days: "Last 14 Days",
    last_28_days: "Last 28 Days",
    last_30_days: "Last 30 Days",
  };

  const valueTextMap: { [key: string]: string } = {
    cost: "Spend",
    impressions: "Impressions",
    ctr: "CTR",
    cpm: "CPM",
    avg_cpc: "CPC",
    clicks: "Clicks",
    cpa: "CPA",
    cpi: "CPI",
    cvr: "CVR",
    mobile_app_install: "Mobile App Install",
    roas: "ROAS",
  };

  const valueTypeMapPreview: { [key: string]: string } = {
    Rupees: "₹",
    Clicks: "Clicks",
    Integer: "N",
    Percentage: "%",
  };

  return (
    <>
      <div className="w-full h-full px-5 pt-[20px] pb-[30px] ">

        <div className="flex justify-between items-center mb-[32px]">
          <div className=" text-xl text-white font-bold ml-2">Rule Engine</div>
          <div className="flex items-center gap-3 mr-1">
            <div>
              <Select
                className="text-sm md:text-base z-20  w-48 text-white bg-inherit text-[14px] cursor-pointer"
                options={ruleStatus}
                onChange={onFilterStatus}
                menuPlacement="bottom"
                placeholder="Filter by Status"
                isSearchable={false}
                styles={ruleDropDown}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div>
              <Select
                className="text-sm md:text-base z-20 w-48 text-white bg-inherit text-[14px] flex-nowrap selectStyle"
                options={ruleFilter}
                isMulti
                onChange={onFilterSchedule}
                menuPlacement="bottom"
                placeholder="Filter by Schedule"
                isSearchable={false}
                styles={ruleDropDown}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <Link href={`/apphome/${Workspacename}/admanager/automated-rule`}>
              <button className="w-[175px] flex flex-row h-[37px] text-black hover:underline hover:decoration-black
 bg-[#FFCB54] justify-center items-center gap-1 font-medium rounded-[72px] text-[14px] leading-[17px]">
                <svg
                  width="15"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.125 8a.844.844 0 0 1-.844.844H7.937v5.344a.844.844 0 1 1-1.687 0V8.843H.906a.844.844 0 0 1 0-1.688H6.25V1.813a.844.844 0 1 1 1.688 0v5.343h5.343a.844.844 0 0 1 .844.844Z"
                    fill="#000"
                  />
                </svg>
                Create New Rule
              </button>
            </Link>

            {/* <Link href={`/apphome/${Workspacename}/admanager/dashboard?view=graph`}>
              <button className="w-[175px] text-[#FFCB54] hover:text-black flex flex-row h-[37px] border-2 border-[#FFCB54] bg-transparent hover:bg-[#FFCB54] justify-center items-center gap-1 font-medium rounded-[72px] text-[14px] leading-[17px]">
                Dashboard
              </button>
            </Link> */}
          </div>
        </div>

        {isLoading ||
          isFetching ||
          isRefetching ||
          mutateCreateRule.isPending ||
          mutateDeleteRule.isPending ? (
          <>
            <RuleLoading />
          </>
        ) : (
          <>

            <div className="w-full overflow-auto h-[65vh] mt-[14px] scrollable-container">
              <table className="min-w-[1024px] w-full bg-[#332270]  rounded-[10px] overflow-hidden pb-4">
                <thead className="bg-[#23145A] h-[44px] sticky top-0 z-10">
                  <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
                    <th className="w-1/6 px-5 text-left">Rule Name</th>
                    <th className="w-1/6 px-5 text-left">Campaign name</th>
                    <th className="w-1/6 px-5 text-left">Schedule</th>
                    <th className="w-2/6 px-5 text-left">Action</th>
                    <th className="w-1/12 px-5 text-left"></th>
                    <th className="w-1/12 px-5 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allData?.length > 0 ? (
                    <>
                      {allData?.map((item: any, rowIndex: any) => {
                        const isExpanded = expandedRows[item.id || rowIndex];
                        return (
                          <tr className="border-b border-solid border-[#503193] text-white font-normal text-sm" key={item?.id || rowIndex}>
                            <td className="px-5 py-4">
                              <div className="relative group cursor-pointer">
                                <p className="text-white font-normal text-[14px] absolute z-[1000] bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                  {item?.name}
                                </p>
                                <div className="max-w-[200px] truncate font-semibold">
                                  {item?.name.split(' ').slice(0, 2).join(' ')}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4 relative">
                              <div className="max-w-[200px]">
                                <ul className="campaign-list cursor-default">
                                  {!isExpanded
                                    ? item?.ruleAppliesTo?.slice(0, 2).map((data: any, index: number) => (
                                      <li key={index} className="text-[14px] font-normal break-words">
                                        {data?.campaignName}
                                      </li>
                                    ))
                                    : item?.ruleAppliesTo?.map((data: any, index: number) => (
                                      <li key={index} className="text-[14px] font-normal break-words">
                                        {data?.campaignName}
                                      </li>
                                    ))}

                                  {!isExpanded && item?.ruleAppliesTo?.length > 2 && (
                                    <li
                                      className="text-[14px] font-semibold text-nyx-yellow cursor-pointer break-words"
                                      onClick={() => toggleExpand(item.id || rowIndex)}
                                    >
                                      +{item?.ruleAppliesTo?.length - 2} more
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {isExpanded && (
                                <div className="">
                                  <button
                                    className="text-sm ml-2 text-nyx-yellow underline mt-2 break-words"
                                    onClick={() => toggleExpand(item.id || rowIndex)}
                                  >
                                    Show Less
                                  </button>
                                </div>
                              )}
                            </td>



                            <td className="px-5 py-4">
                              <div className="max-w-[200px] truncate cursor-default">
                                Check per {scheduleMap[item?.schedule_in_hours]}
                              </div>
                            </td>

                            <td
                              className={`px-5 py-4 relative w-[500px] ${item?.conditions?.length > 2 ? "cursor-pointer" : "cursor-default"}`}
                            >
                              <ul className="truncate-conditions">
                                {item?.conditions?.map((condition: any, index: number) => (
                                  <li key={index}>
                                    {`${metricTextMap[condition?.metric]} ${timeTextMap[condition?.time]} ${condition?.comparison} ${condition?.matricOrValue == "Metric" ? valueTextMap[condition?.value] : condition?.value
                                      } ${condition?.matricOrValue == "Metric" ? "" : valueTypeMapPreview[condition?.valueType]
                                      } ${timeTextMap[condition?.secondaryTime] || ""}`}
                                    {index < item?.conditions.length - 1 && ` ${item?.conditions[index + 1]?.logicalOperator}`}
                                  </li>
                                ))}
                              </ul>
                              {item?.conditions?.length > 2 && (
                                <div className="tooltip-box">
                                  {item?.conditions.map((condition: any, index: number) => (
                                    <div key={index}>
                                      {`${metricTextMap[condition?.metric]} ${timeTextMap[condition?.time]} ${condition?.comparison} ${condition?.matricOrValue == "Metric" ? valueTextMap[condition?.value] : condition?.value
                                        } ${condition?.matricOrValue == "Metric" ? "" : valueTypeMapPreview[condition?.valueType]
                                        } ${timeTextMap[condition?.secondaryTime] || ""}`}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>


                            <td className="px-5 py-4">
                              <div className="flex items-center gap-4">
                                <div className="relative cursor-pointer hover:text-nyx-yellow text-white group" onClick={() => handleCopy(item)}>
                                  <svg width="25" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.094 5.25A2.25 2.25 0 0 1 10.344 3h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Zm2.25-1.125A1.125 1.125 0 0 0 9.219 5.25v9a1.125 1.125 0 0 0 1.125 1.125h9a1.125 1.125 0 0 0 1.125-1.125v-9a1.125 1.125 0 0 0-1.125-1.125h-9Zm-4.5 4.5A1.125 1.125 0 0 0 4.719 9.75v9a1.125 1.125 0 0 0 1.125 1.125h9a1.125 1.125 0 0 0 1.125-1.125v-1.125h1.125v1.125a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9a2.25 2.25 0 0 1 2.25-2.25h1.125v1.125H5.844Z" />
                                  </svg>
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-2 bg-[#1E1239] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1000]">
                                    Duplicate
                                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-t-[#1E1239] border-l-transparent border-r-transparent"></div>
                                  </div>
                                </div>

                                <Link href={`/apphome/${Workspacename}/admanager/automated-rule?ruleId=${item?.id}`}
                                  className="relative cursor-pointer hover:text-nyx-yellow text-white group">
                                  <svg width="19" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.594 16h1.425l9.775-9.775L12.369 4.8l-9.775 9.775V16Zm-2 2v-4.25L13.794.575c.2-.183.42-.325.662-.425.242-.1.496-.15.763-.15.266 0 .525.05.775.15.25.1.466.25.65.45L18.019 2c.2.183.346.4.437.65a2.165 2.165 0 0 1 0 1.512 1.871 1.871 0 0 1-.437.663L4.844 18H.594ZM13.069 5.525l-.7-.725 1.425 1.425-.725-.7Z" />
                                  </svg>
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-2 bg-[#1E1239] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1000]">
                                    Edit
                                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-t-[#1E1239] border-l-transparent border-r-transparent"></div>
                                  </div>
                                </Link>

                                <div className="relative cursor-pointer hover:text-nyx-yellow text-white group" onClick={() => deleteRuleClick(item)}>
                                  <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2 0.933333H9.9L8.95714 0H4.24286L3.3 0.933333H0V2.8H13.2M0.942857 14.9333C0.942857 15.4284 1.14153 15.9032 1.49517 16.2533C1.84881 16.6033 2.32845 16.8 2.82857 16.8H10.3714C10.8716 16.8 11.3512 16.6033 11.7048 16.2533C12.0585 15.9032 12.2571 15.4284 12.2571 14.9333V3.73333H0.942857V14.9333Z" />
                                  </svg>
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-2 bg-[#1E1239] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1000]">
                                    Delete
                                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-5px] w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-t-[#1E1239] border-l-transparent border-r-transparent"></div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <Switch
                                onChange={() => handleChangeoverall(item?.id)}
                                checked={checkId[item?.id]}
                                checkedIcon={false}
                                onColor="#53D73D"
                                offColor="#503193"
                                handleDiameter={16}
                                width={32}
                                height={14}
                                uncheckedIcon={false}
                              />
                            </td>
                          </tr>

                        )
                      })}
                    </>
                  ) : (
                    <>
                      <tr className="bg-[#3B226F] text-white font-normal border-b-[1px] border-[#8297BD]">
                        <td colSpan={6} className="px-6 py-6 text-[18px] text-center">
                          No Rule Data Found!
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

          </>
        )}
      </div>
    </>
  );
};

export default Page;
