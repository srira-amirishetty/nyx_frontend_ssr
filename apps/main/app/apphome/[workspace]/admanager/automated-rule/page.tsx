"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@nyx-frontend/main/components/Button";
import Select from "react-select";
import {
  admanagerRuleColourStyles,
  admanagerRuleColourStylesMetric,
  admanagerRuleColourStylesTime,
  admanagerRuleColourStylesMetricOrValue,
  admanagerRuleColourStylesOperator,
} from "@nyx-frontend/main/utils/productStyle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCampaign } from "@nyx-frontend/main/services/admanagerServices";
import { decodeToken } from "@nyx-frontend/main/utils/utils";
import {
  createRule,
  updateRule,
  getRuleById,
} from "@nyx-frontend/main/services/admanagerServices";
import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import classNames from "@nyx-frontend/main/utils/classNames";
import { useSearchParams } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { activeCampaignDropdown } from "@nyx-frontend/main/utils/productStyle";

type Condition = {
  metric: string | null;
  time: string | null;
  secondaryTime: string | null;
  comparison: string | null;
  matricOrValue: string | null;
  value: string;
  logicalOperator: string; // Add logicalOperator to track AND/OR
  valueType: string;
};

const Rule: React.FC = () => {
  const router = useRouter();
  const search = useSearchParams();
  const [workspacename, setWorkspacename] = useState<string>("");
  const [ruleId, setRuleId] = useState<number | null>(null);
  const [ruleName, setRuleName] = useState<string>("");
  const [boxerror, setBoxerror] = useState<Boolean>(true);
  // const [applyCampaignName, setApplyCampaignName] = useState<string>("");
  // const [applyCampaignId, setApplyCampaignId] = useState<number | null>(null);

  // const [applyCampaignIds, setApplyCampaignIds] = useState<string[]>([]);

  // const [applyCampaignNames, setApplyCampaignNames] = useState<number[]>([]);

  const [activeCampaigns, setActiveCampaigns] = useState<
    { campaignName: string; campaignNameId: number }[]
  >([]);

  const [selectedScheduleInHour, setSelectedScheduleInHour] = useState(1);
  const [conditions, setConditions] = useState<Condition[]>([
    {
      metric: null,
      time: null,
      secondaryTime: null,
      comparison: null,
      matricOrValue: "Value",
      value: "",
      logicalOperator: "AND", // Default to "AND"
      valueType: "",
    },
  ]);

  const [emailInput, setEmailInput] = useState("");
  const [emailArray, setEmailArray] = useState<string[]>([]);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const { data: campaigndata } = useQuery({
    queryKey: ["get-campaign-admanager-rule"],
    queryFn: async () => {
      const data = await getAllCampaign(
        Number(localStorage.getItem("workspace_id")),
      );
      // Filter data where overallStatus is ACTIVE
      return data.filter(
        (campaign: any) => campaign.overallStatus === "ACTIVE",
      );
    },
  });

  const { data: ruleDetailsById } = useQuery({
    queryKey: ["get-ruleby-id", Number(search.get("ruleId"))],
    queryFn: () => {
      if (Number(search.get("ruleId"))) {
        return getRuleById(
          Number(search.get("ruleId")),
          Number(localStorage.getItem("workspace_id")),
        );
      }

      return null;
    },
  });

  useEffect(() => {
    if (ruleDetailsById) {
      setRuleId(ruleDetailsById?.id);
      setRuleName(ruleDetailsById?.name);

      const campaigns = ruleDetailsById.ruleAppliesTo.map((item: any) => ({
        campaignName: item.campaignName, // Assuming 'label' is the campaign name
        campaignNameId: item.campaignNameId, // Assuming 'value' is the campaign ID
      }));

      setActiveCampaigns(campaigns.length ? campaigns : []); // Only set if valid

      setConditions(ruleDetailsById?.conditions);
      setEmailArray(ruleDetailsById?.emails);
      setSelectedScheduleInHour(ruleDetailsById?.schedule_in_hours);
    }
  }, [ruleDetailsById]);

  const mutateCreateRule = useMutation({
    mutationKey: ["create-rule"],
    mutationFn: createRule,
  });

  const mutateUpdateRule = useMutation({
    mutationKey: ["update-rule"],
    mutationFn: updateRule,
  });

  const campaignoption = campaigndata?.map((campaign: any) => ({
    value: campaign.campaignId,
    label: campaign.campaignName,
  }));

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    const id = localStorage.getItem("workspace_id");

    if (name) {
      setWorkspacename(name);
    }
  }, []);

  const handleInputChangeRuleName = (e: any) => {
    setRuleName(e.target.value);
  };

  const handleConditionLogicChange = (index: any, logic: any) => {
    const updatedConditions = [...conditions];
    updatedConditions[index].logicalOperator = logic;
    setConditions(updatedConditions);
  };

  const addCondition = () => {
    setConditions((prevConditions) => [
      ...prevConditions,
      {
        metric: null,
        time: null,
        secondaryTime: null,
        comparison: null,
        matricOrValue: "Value",
        value: "",
        logicalOperator: "AND", // Default to "AND"
        valueType: "",
      },
    ]);
  };

  const matricOptions = [
    { value: "cost", label: "Spend" },
    { value: "impressions", label: "Impressions" },
    { value: "ctr", label: "CTR" },
    { value: "cpm", label: "CPM" },
    { value: "avg_cpc", label: "CPC" },
    { value: "clicks", label: "Clicks" },
    { value: "cpa", label: "CPA" },
    { value: "cpi", label: "CPI" },
    { value: "cvr", label: "CVR" },
    { value: "mobile_app_install", label: "Mobile App Install" },
    { value: "roas", label: "ROAS" },
  ];

  const timeOptions = [
    { value: "all_time", label: "All time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_14_days", label: "Last 14 Days" },
    { value: "last_28_days", label: "Last 28 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
  ];

  const comparisionOptions = [
    { value: "<", label: "<" },
    { value: ">", label: ">" },
    { value: "<=", label: "<=" },
    { value: ">=", label: ">=" },
    { value: "=", label: "=" },
  ];

  const matric_value = [
    { value: "Value", label: "Value" },
    { value: "Metric", label: "Metric" },
  ];

  // const selectCampaignChange = (selected: any) => {
  //   // setApplyCampaignId(selected.value);
  //   // setApplyCampaignName(selected.label);

  //   if (selected) {
  //     const selectedIds = selected.map((option: any) => option.value);
  //     const selectedNames = selected.map((option: any) => option.label);

  //     // setApplyCampaignIds(selectedIds);
  //     // setApplyCampaignNames(selectedNames);

  //     const campaigns = selected.map((option: any) => ({
  //       campaignName: option.label, // Assuming 'label' is the campaign name
  //       campaignNameId: option.value, // Assuming 'value' is the campaign ID
  //     }));

  //     setActiveCampaigns(campaigns);
  //   } else {
  //     // setApplyCampaignIds([]);
  //     // setApplyCampaignNames([]);
  //     setActiveCampaigns([]);
  //   }
  // };

  const handleSelectChange = (
    selected: { value: string } | null,
    field: keyof Condition,
    index: number,
  ) => {
    const newConditions = [...conditions];
    //@ts-ignore
    newConditions[index][field] = selected?.value || null;
    setConditions(newConditions);
  };

  const hasNonEmptyCondition = (conditions: Condition[]) => {
    return conditions.some(
      (condition) =>
        condition.metric ||
        condition.time ||
        condition.comparison ||
        // condition.matricOrValue ||
        condition.value,
    );
  };

  const showPreview = (
    condition: Condition,
    index: number,
    totalConditions: number,
  ) => {
    const {
      metric,
      time,
      secondaryTime,
      comparison,
      matricOrValue,
      value,
      logicalOperator,
      valueType,
    } = condition;

    const comparisonTextMap: { [key: string]: string } = {
      "<": "is less than",
      ">": "is greater than",
      "<=": "is less than equal to",
      ">=": "is greater than equal to",
      "=": "is equal to",
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

    // @ts-ignore
    const metricText = metricTextMap[metric] || metric;

    // @ts-ignore
    const timeText = timeTextMap[time] || time;

    // @ts-ignore
    const secondaryTimeText = timeTextMap[secondaryTime] || secondaryTime;

    // @ts-ignore
    const comparisonText = comparisonTextMap[comparison] || comparison;

    // @ts-ignore
    const valueText = valueTextMap[value] || value;

    const valueTypeText = valueTypeMapPreview[valueType];

    return (
      <div className="flex items-center text-white text-sm font-normal">
        {index > 0 && index < totalConditions && (
          <p className="text-white mr-5 font-bold">{logicalOperator}</p>
        )}

        <div className="flex gap-2 items-center rounded-md">
          <p className="text-[#03E088]">{metricText}</p>
          <p className="text-[#75ADFF]">{timeText}</p>
          <p className="text-[#C0C0C0]">{comparisonText}</p>
          {/* <p>{matricOrValue}</p> */}
          <p className=" text-[#FF9800]">{valueText}</p>
          <p className=" text-[#FF9800]">
            {matricOrValue == "Value" ? valueTypeText : ""}
          </p>
          <p className="text-[#75ADFF]">{secondaryTimeText}</p>
        </div>
      </div>
    );
  };

  const deleteCondition = (index: number) => {
    setConditions((prevConditions) =>
      prevConditions.filter((_, i) => i !== index),
    );
  };

  const valueTypeMap = (key: string): string => {
    switch (key) {
      case "Spend":
        return "Rupees";
      case "Impressions":
        return "Integer";
      case "CTR":
        return "Percentage";
      case "CPM":
        return "Rupees";
      case "CPC":
        return "Rupees";
      case "Clicks":
        return "Clicks";
      case "CPA":
        return "Rupees";
      case "CPI":
        return "Rupees";
      case "CVR":
        return "Percentage";
      case "Mobile App Install":
        return "Integer";
      case "ROAS":
        return "Integer";
      default:
        return "Integer";
    }
  };

  const renderConditionFields = () => {
    return conditions.map((condition, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <div className="flex gap-10 ml-1">
            <label
              className={`cursor-pointer text-[16px]  text-white flex items-center justify-center ${condition.logicalOperator === "AND" ? "font-semibold" : ""}`}
            >
              <input
                type="radio"
                name={`condition-${index}`}
                value="AND"
                checked={condition.logicalOperator === "AND"}
                onChange={() => handleConditionLogicChange(index, "AND")}
                className="hidden"
              />
              <span className="mr-2 w-4 h-4 flex items-center justify-center border-2 border-yellow-500 rounded-full">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    condition.logicalOperator === "AND" ? "bg-yellow-500" : ""
                  }`}
                ></span>
              </span>
              AND
            </label>
            <label
              className={`cursor-pointer  text-[16px]  text-white flex items-center justify-center ${condition.logicalOperator === "OR" ? "font-semibold" : ""}`}
            >
              <input
                type="radio"
                name={`condition-${index}`}
                value="OR"
                checked={condition.logicalOperator === "OR"}
                onChange={() => handleConditionLogicChange(index, "OR")}
                className="hidden"
              />
              <span className="mr-2 w-4 h-4 flex items-center justify-center border-2 border-yellow-500 rounded-full">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    condition.logicalOperator === "OR" ? "bg-yellow-500" : ""
                  }`}
                ></span>
              </span>
              OR
            </label>
          </div>
        )}
        <div className="w-full flex gap-3 items-center">
          <div>
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.625 17.25a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25ZM7.5 12a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0Zm2.25-6.375a1.125 1.125 0 1 0-2.25 0 1.125 1.125 0 0 0 2.25 0Zm4.5 12.75a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0Zm0-6.375a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0Zm0-6.375a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="w-full flex">
            <Select
              className="w-full text-sm md:text-base"
              options={matricOptions}
              placeholder="Select Metric"
              styles={admanagerRuleColourStylesMetric}
              components={{ IndicatorSeparator: () => null }}
              onChange={(selected) => {
                //@ts-ignore
                handleSelectChange(selected, "metric", index);
                const newConditions = [...conditions];
                //@ts-ignore
                newConditions[index].valueType = valueTypeMap(selected.label);
                setConditions(newConditions);
              }}
              value={matricOptions.find(
                (option) => option.value === condition.metric,
              )}
            />
            <Select
              className="w-full text-sm md:text-base"
              options={timeOptions}
              placeholder="Select Time"
              styles={admanagerRuleColourStylesTime}
              components={{ IndicatorSeparator: () => null }}
              onChange={(selected) =>
                //@ts-ignore
                handleSelectChange(selected, "time", index)
              }
              value={timeOptions.find(
                (option) => option.value === condition.time,
              )}
            />
            <Select
              className="w-full text-sm md:text-base"
              options={comparisionOptions}
              placeholder="Comparison"
              styles={admanagerRuleColourStylesOperator}
              components={{ IndicatorSeparator: () => null }}
              onChange={(selected) =>
                //@ts-ignore
                handleSelectChange(selected, "comparison", index)
              }
              value={comparisionOptions.find(
                (option) => option.value === condition.comparison,
              )}
            />
          </div>

          <div className="w-full flex">
            <Select
              className="w-full text-sm md:text-base"
              options={matric_value}
              defaultValue={matric_value[0]}
              placeholder="Select"
              styles={admanagerRuleColourStyles}
              components={{ IndicatorSeparator: () => null }}
              onChange={(selected) => {
                //@ts-ignore
                handleSelectChange(selected, "matricOrValue", index);

                //@ts-ignore
                if (selected?.value == "Metric") {
                  condition.value = "";
                  const newConditions = [...conditions];
                  //@ts-ignore
                  newConditions[index].value = condition.metric;
                  setConditions(newConditions);
                } else {
                  condition.value = "";
                }
              }}
              value={matric_value.find(
                (option) => option.value === condition.matricOrValue,
              )}
            />
            {condition.matricOrValue === "Metric" && (
              <>
                <Select
                  className="w-full text-sm md:text-base"
                  options={matricOptions}
                  placeholder="Select Metric"
                  defaultValue={condition.metric}
                  styles={admanagerRuleColourStylesMetricOrValue}
                  components={{ IndicatorSeparator: () => null }}
                  value={matricOptions.find(
                    (option) => option.value === condition.value,
                  )}
                  onChange={(selected: any) => {
                    const newConditions = [...conditions];
                    newConditions[index].value = selected.value;
                    setConditions(newConditions);
                  }}
                />

                <Select
                  className="w-full text-sm md:text-base"
                  options={timeOptions}
                  placeholder="Select Time"
                  styles={admanagerRuleColourStylesTime}
                  components={{ IndicatorSeparator: () => null }}
                  onChange={(selected) =>
                    //@ts-ignore
                    handleSelectChange(selected, "secondaryTime", index)
                  }
                  value={timeOptions.find(
                    (option) => option.value === condition.secondaryTime,
                  )}
                />
              </>
            )}
            {condition.matricOrValue === "Value" && (
              <input
                type="number"
                placeholder="Enter Value"
                value={condition.value}
                onChange={(e) => {
                  const newConditions = [...conditions];
                  newConditions[index].value = e.target.value; // Directly update value
                  setConditions(newConditions);
                }}
                className="w-full bg-transparent border border-[#8297BD] p-2 text-[#FF9800] text-sm placeholder:italic"
              />
            )}
          </div>

          <button onClick={() => deleteCondition(index)} className="w-max">
            <svg
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2 0.933333H9.9L8.95714 0H4.24286L3.3 0.933333H0V2.8H13.2M0.942857 14.9333C0.942857 15.4284 1.14153 15.9032 1.49517 16.2533C1.84881 16.6033 2.32845 16.8 2.82857 16.8H10.3714C10.8716 16.8 11.3512 16.6033 11.7048 16.2533C12.0585 15.9032 12.2571 15.4284 12.2571 14.9333V3.73333H0.942857V14.9333Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </React.Fragment>
    ));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setEmailErrorMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const valid = /^\S+@\S+\.\S+$/.test(emailInput);
    if (e.key === "Enter" || e.code === "Space") {
      e.preventDefault();
      if (emailArray.includes(emailInput.trim())) {
        setEmailErrorMessage("This email is already added.");
      } else if (emailInput.length > 6 && valid) {
        setEmailArray((prevEmails) => [...prevEmails, emailInput.trim()]);
        setEmailInput("");
      }
    }
  };

  const handleDeleteEmail = (indexToDelete: number) => {
    setEmailArray((prevEmails) =>
      prevEmails.filter((_, index) => index !== indexToDelete),
    );
  };

  const arrangeConditions = (conditions: Condition[]): Condition[] => {
    const updatedConditions = [...conditions];

    if (updatedConditions.length > 1) {
      updatedConditions[0].logicalOperator =
        updatedConditions[1].logicalOperator;
    } else if (updatedConditions.length == 1) {
      updatedConditions[0].logicalOperator = "AND";
    }

    return updatedConditions;
  };

  const nextButtonClick = () => {
    if (search.has("ruleId")) {
      if (
        ruleName.length == 0 ||
        activeCampaigns.length == 0 ||
        conditions[0].metric == null ||
        conditions[0].time == null ||
        conditions[0].comparison == null ||
        conditions[0].value.length == 0 ||
        emailArray.length == 0
      ) {
        setBoxerror(false);

        toast.error(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Bad Request!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Please fill the required data
            </span>
          </>,
          { autoClose: 5000 },
        );
      } else {
        let payload = {
          id: ruleId,
          userId: decodeToken(localStorage.getItem("token")).data.userId,
          workspaceId: Number(localStorage.getItem("workspace_id")),
          name: ruleName,
          // campaignId: applyCampaignIds,
          // appliesTo: applyCampaignNames,
          ruleAppliesTo: activeCampaigns,
          conditions: arrangeConditions(conditions),
          emails: emailArray,
          schedule_in_hours: selectedScheduleInHour,
        };

        //console.log("payload", payload);

        mutateUpdateRule.mutate(payload, {
          onSuccess: (response: any) => {
            router.push(`/apphome/${workspacename}/admanager/rule-details`);
          },
          onError: (res: any) => {
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Please try again
                </span>
              </>,
              { autoClose: 5000 },
            );
          },
        });
      }
    } else {
      if (
        ruleName.length == 0 ||
        activeCampaigns.length == 0 ||
        conditions[0].metric == null ||
        conditions[0].time == null ||
        conditions[0].comparison == null ||
        conditions[0].value.length == 0 ||
        emailArray.length == 0
      ) {
        setBoxerror(false);
        toast.error(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Bad Request!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Please fill the required data
            </span>
          </>,
          { autoClose: 5000 },
        );
      } else {
        let payload = {
          userId: decodeToken(localStorage.getItem("token")).data.userId,
          workspaceId: Number(localStorage.getItem("workspace_id")),
          name: ruleName,
          // campaignId: applyCampaignIds,
          // appliesTo: applyCampaignNames,
          ruleAppliesTo: activeCampaigns,
          conditions: arrangeConditions(conditions),
          emails: emailArray,
          schedule_in_hours: selectedScheduleInHour,
        };

        //console.log("payload", payload);

        mutateCreateRule.mutate(payload, {
          onSuccess: (response: any) => {
            router.push(`/apphome/${workspacename}/admanager/rule-details`);
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
                  Please try again
                </span>
              </>,
              { autoClose: 5000 },
            );
          },
        });
      }
    }
  };
  console.log("input emale", emailInput);
  const enteredemail = () => {
    const valid = /^\S+@\S+\.\S+$/.test(emailInput);
    if (emailArray.includes(emailInput.trim())) {
      setEmailErrorMessage("This email is already added.");
    } else if (emailInput.length > 6 && valid) {
      setEmailArray((prevEmails) => [...prevEmails, emailInput.trim()]);
      setEmailInput("");
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="h-[80vh] overflow-hidden overflow-y-auto p-4 pt-6">
          <div className="font-[600] text-[20px]  text-white flex items-center gap-2">
            <div
              onClick={() =>
                router.push(`/apphome/${workspacename}/admanager/rule-details`)
              }
              className=" cursor-pointer"
            >
              <svg
                width="22"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.592 18.664c.243-.256.38-.602.38-.964 0-.36-.137-.707-.38-.963L9.163 9.993l6.429-6.744c.236-.257.367-.601.364-.958a1.397 1.397 0 0 0-.38-.952 1.27 1.27 0 0 0-.907-.399 1.267 1.267 0 0 0-.914.382L6.41 9.03c-.244.255-.38.602-.38.963s.136.708.38.963l7.346 7.708c.244.255.574.398.918.398.345 0 .675-.143.919-.398Z"
                  fill="#fff"
                />
              </svg>
            </div>
            {search.has("ruleId") ? (
              <div>Edit Rule</div>
            ) : (
              <div>New Automation Rule</div>
            )}
          </div>
          <div className="w-full flex flex-col gap-7 py-5 pt-2">
            <div className="w-full flex gap-6">
              <div className="flex flex-col gap-2 w-full md:w-[495px]">
                <p className="text-[#FFFFFF] text-base font-[600]">
                  Rule Name <span className="ml-1 text-nyx-red">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Rule Name"
                  className={
                    !boxerror && ruleName === ""
                      ? "w-full h-[40px] bg-transparent border border-[#ff5a5a] rounded-md p-2 text-white text-sm placeholder:italic"
                      : "w-full h-[40px] bg-transparent border border-[#8297BD] rounded-md p-2 text-white text-sm placeholder:italic"
                  }
                  value={ruleName}
                  onChange={handleInputChangeRuleName}
                />
              </div>
              <div className="flex flex-col gap-2 w-full md:w-[495px]">
                <p className="text-[#FFFFFF] text-base font-[600]">
                  Rule Applies to<span className="ml-1 text-nyx-red">*</span>
                </p>
                <Select
                  className={
                    !boxerror && activeCampaigns.length == 0
                      ? "w-full text-sm md:text-base outline-double outline-[#ff5a5a]"
                      : "w-full text-sm md:text-base"
                  }
                  options={campaignoption}
                  placeholder="Select Campaign"
                  styles={activeCampaignDropdown}
                  value={campaignoption?.filter((option: any) =>
                    activeCampaigns.some(
                      (campaign) => campaign.campaignNameId === option.value,
                    ),
                  )} // Ensure this returns an array of selected options
                  onChange={(selectedOptions: any) => {
                    const campaigns = selectedOptions.map((option: any) => ({
                      campaignName: option.label, // Campaign name
                      campaignNameId: option.value, // Campaign ID
                    }));
                    setActiveCampaigns(campaigns); // Update state with selected campaigns
                  }}
                  components={{ IndicatorSeparator: () => null }}
                  noOptionsMessage={() => "No active campaign"}
                  isMulti
                />
              </div>
            </div>

            {/* <div className="relative w-full bg-[#28134B] rounded-md flex flex-col gap-2 p-5">
              <p className="text-[#FFFFFF] text-base font-[600]">
                Conditions<span className="ml-1 text-nyx-red">*</span>
              </p>
              <div className="w-full flex flex-col gap-4">
                <button
                  onClick={addCondition}
                  className={`absolute top-5 right-11 flex gap-1 justify-center items-center 
                  ${conditions.length === 3 ? "text-gray-400 cursor-not-allowed" : "text-yellow-500 cursor-pointer"}`}
                  disabled={conditions.length === 3}
                >
                  <svg
                    width="15"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.125 8a.844.844 0 0 1-.844.844H7.937v5.344a.844.844 0 1 1-1.687 0V8.843H.906a.844.844 0 0 1 0-1.688H6.25V1.813a.844.844 0 1 1 1.688 0v5.343h5.343a.844.844 0 0 1 .844.844Z"
                      fill={conditions.length === 3 ? "#9CA3AF" : "#eab308"}
                    />
                  </svg>
                  {conditions.length === 3 ? "Limit Reached" : "Add Condition"}
                </button>

                {renderConditionFields()}
              </div>
            </div> */}
            <div className="relative w-full bg-[#332270] rounded-md flex flex-col gap-2 p-5">
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-[#FFFFFF] text-xl font-[600]">
                    Conditions<span className="ml-1 text-nyx-red">*</span>
                  </p>
                </div>
                <div>
                  <div className="relative group">
                    <button
                      onClick={addCondition}
                      className={` flex gap-1 justify-center items-center text-base font-medium hover:underline 
        ${conditions.length === 3 ? "text-gray-400 cursor-not-allowed" : "text-yellow-500 cursor-pointer"}`}
                      disabled={conditions.length === 3}
                    >
                      <svg
                        width="15"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.125 8a.844.844 0 0 1-.844.844H7.937v5.344a.844.844 0 1 1-1.687 0V8.843H.906a.844.844 0 0 1 0-1.688H6.25V1.813a.844.844 0 1 1 1.688 0v5.343h5.343a.844.844 0 0 1 .844.844Z"
                          fill={conditions.length === 3 ? "#9CA3AF" : "#eab308"}
                        />
                      </svg>
                      Add Condition
                    </button>

                    {/* Tooltip */}
                    {conditions.length === 3 && (
                      <span className="absolute -top-14 right-0 -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-[14px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Limit reached
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 p-4">
                {renderConditionFields()}
              </div>
            </div>

            {hasNonEmptyCondition(conditions) && (
              <div className="flex flex-col gap-2">
                <p className="text-[#FFFFFF] text-lg font-[600]">Previews</p>
                <div className="w-full bg-black rounded-md flex flex-col p-5">
                  {conditions.map((condition, index) => (
                    <React.Fragment key={index}>
                      {showPreview(condition, index, conditions.length)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full flex flex-col gap-2">
              <p className="text-[#FFFFFF] text-base font-[600]">
                Schedule<span className="ml-1 text-nyx-red">*</span>
              </p>
              <div className="lg:w-[50%] xl:w-[40%] grid grid-cols-2 gap-y-3">
                {/* Check Every Hour */}
                <label
                  className={`flex items-center cursor-pointer text-white ${
                    selectedScheduleInHour == 1 ? "" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="hour"
                    checked={selectedScheduleInHour === 1}
                    onChange={(e) => setSelectedScheduleInHour(1)}
                    className="hidden" // Hide the default radio button
                  />
                  <span className="mr-2 w-4 h-4 flex items-center justify-center border-2 border-yellow-500 rounded-full">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedScheduleInHour === 1 ? "bg-yellow-500" : ""
                      }`}
                    ></span>
                  </span>
                  Check Every Hour
                </label>

                {/* Check Every Day */}
                <label
                  className={`cursor-pointer flex items-center text-white ${
                    selectedScheduleInHour == 24 ? "" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="day"
                    checked={selectedScheduleInHour === 24}
                    onChange={(e) => setSelectedScheduleInHour(24)}
                    className="hidden"
                  />
                  <span className="mr-2 w-4 h-4 flex items-center justify-center border-2 border-yellow-500 rounded-full">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedScheduleInHour === 24 ? "bg-yellow-500" : ""
                      }`}
                    ></span>
                  </span>
                  Check Every Day
                </label>

                {/* Check Every Week */}
                <label
                  className={`cursor-pointer flex items-center text-white ${
                    selectedScheduleInHour == 168 ? "" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="week"
                    checked={selectedScheduleInHour === 168}
                    onChange={(e) => setSelectedScheduleInHour(168)}
                    className="hidden"
                  />
                  <span className="mr-2 w-4 h-4 flex items-center justify-center border-2 border-yellow-500 rounded-full">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedScheduleInHour === 168 ? "bg-yellow-500" : ""
                      }`}
                    ></span>
                  </span>
                  Check Every Week
                </label>

                {/* Check Every Month */}
                <label
                  className={`cursor-pointer flex items-center text-white ${
                    selectedScheduleInHour == 720 ? "" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="month"
                    checked={selectedScheduleInHour === 720}
                    onChange={(e) => setSelectedScheduleInHour(720)}
                    className="hidden"
                  />
                  <span className="mr-2 w-4 h-4 flex items-center justify-center border-2 border-yellow-500 rounded-full">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedScheduleInHour === 720 ? "bg-yellow-500" : ""
                      }`}
                    ></span>
                  </span>
                  Check Every Month
                </label>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2" onClick={enteredemail}>
              <p className="text-[#FFFFFF] text-lg font-[600]">
                Notifications
              </p>
              <div className="flex flex-col gap-2">
                
                <p className="text-[#FFFFFF] text-base font-[600]">
                  Email(s)<span className="ml-1 text-nyx-red">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Enter your Email"
                  className={
                    !boxerror && emailArray?.length <= 0
                      ? "w-[495px] h-[40px] bg-transparent border border-[#ff5a5a] rounded-md p-2 text-white text-sm placeholder:italic"
                      : "w-[495px] h-[40px] bg-transparent border border-[#8297BD] rounded-md p-2 text-white text-sm placeholder:italic"
                  }
                  value={emailInput}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                />
                {emailErrorMessage && (
                  <p className="text-red-500 text-sm mt-1 font-normal">
                    {emailErrorMessage}
                  </p>
                )}
                {emailArray.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[#FFFFFF] text-base font-[400]">
                      Entered Emails :
                    </p>

                    <ul className="flex gap-2 flex-wrap mt-2">
                      {emailArray.map((email, index) => (
                        <li
                          key={index}
                          className="w-max bg-[#28134B] p-2 rounded-lg relative group text-white text-sm font-normal"
                        >
                          {email}
                          <button
                            className="w-5 h-5 rounded-full absolute top-[-12px] right-[-5px] bg-black text-white text-xs hidden group-hover:block"
                            onClick={() => handleDeleteEmail(index)}
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center my-[10.5px] gap-2">
          <Button
            className={classNames(
              "rounded-full w-[124px] font-semibold hover:shadow-none",
              mutateCreateRule.isPending
                ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                : "text-nyx-yellow",
            )}
            onClick={() =>
              router.push(`/apphome/${workspacename}/admanager/rule-details`)
            }
            disabled={mutateCreateRule.isPending}
          >
            Back
          </Button>

          <Button
            className={classNames(
              "rounded-full w-[124px] font-semibold text-black",
              mutateCreateRule.isPending
                ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                : "bg-nyx-yellow hover:shadow-none",
            )}
            onClick={nextButtonClick}
            disabled={mutateCreateRule.isPending}
          >
            {mutateCreateRule.isPending || mutateUpdateRule.isPending ? (
              <ButtonLoadingGenAI />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Rule;
