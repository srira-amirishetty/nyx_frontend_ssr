"use client";
import React, { useEffect, useState } from "react";
import DashboardGraph from "./_components/DashboardGraph";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCampaign,
  // OnlyActiveCampaign,
} from "@nyx-frontend/main/services/admanagerServices";
import DashboardTable from "./_components/DashboardTable";
import DashboardTableNew from "./_components/DashboardTableNew";
import { useRouter } from "next/navigation";
import useStore from "../component/store";
import WebAppMobileScreen from "@nyx-frontend/main/components/WebAppMobileScreen";
import useGlobalStore from "../store/store";
import { useSearchParams } from "next/navigation";
import AnalyticsPage from "../campulse/Index";
export const dynamic = 'force-dynamic'


const Page = () => {
  const router = useRouter();
  const search = useSearchParams();
  const view = search.get("view");
  const [workspacename, setWorkspacename] = useState("");
  const [MergedData, setMergedData] = useState();
  const { setElement } = useStore();
  const [showAnalysis, setShowAnalysis] = useState<boolean>(true);
  const [showCampaigns, setShowCampaignss] = useState<boolean>(false);
  const {
    setObjective,
    setChannelsArray,
    setGoalId,
    setGoalData,
    setSubTopic,
    setOptionValue,
    setChannelIdArray,
  } = useGlobalStore();

  useEffect(() => {
    setElement("element5", false);
    setElement("element4", false);
    setElement("element3", false);
    setElement("element2", false);
    setElement("element1", false);
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: campaigndata } = useQuery({
    queryKey: ["get-campaign-admanager"],
    queryFn: () => {
      return getAllCampaign(Number(localStorage.getItem("workspace_id")));
    },
  });
  
  // const { data: activedata } = useQuery({
  //   queryKey: ["active-campaign"],
  //   queryFn: () => {
  //     return OnlyActiveCampaign({
  //       campaign_id: "95",
  //     });
  //   },
  // });
  

  useEffect(() => {
    const path = localStorage.getItem("allcampaignpath");
    if (path === "uniview") {
      setShowAnalysis(false);
      setShowCampaignss(true);
    }
    localStorage.removeItem("allcampaignpath");
  }, []);

  // useEffect(() => {
  //   if (Array.isArray(campaigndata) && Array.isArray(activedata)) {
  //     const mergedata = campaigndata?.map((camp: any) => {
  //       let obj = activedata?.find(
  //         ({ random_id }: any) => random_id === camp.campaignId,
  //       ) || { ctr: null, impressions: null, clicks: null };
  //       return { ...camp, ...obj };
  //     });
  //     //@ts-ignore
  //     setMergedData(mergedata);
  //   }
  // }, [campaigndata, activedata]);

  const resetCampaign = () => {
    setObjective(null); // Reset objective to null
    setChannelsArray([]); // Reset channelsArray to an empty array
    setGoalId(null); // Reset goalId to null
    setGoalData(null); // Reset goalData to null
    setSubTopic(null); // Reset subTopic to null
    setOptionValue({}); // Reset optionValue to an empty object
    setChannelIdArray([]); // Reset channelIdArray to an empty array
  };

  const noDataComp = (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center gap-3">
      <img src="/icons/no-data.png" alt="no-data" />
      <div className="text-[20px] font-[700] text-white">No Data Available</div>
      <div className="text-[14px] font-[500] text-white text-center px-4">
        You need to run some campaigns to view analytics
      </div>
      <button
        className="w-[191px] h-[36px] bg-[#FFC01D] rounded-[72px] text-[12px] font-[600] leading-[17px] flex gap-1 justify-center items-center mt-8"
        onClick={() => {
          resetCampaign();
          router.push(`
            /apphome/${localStorage.getItem(
              "workspace_name",
            )}/admanager/brand-details`);
        }}
      >
        Launch a campaign now
      </button>
    </div>
  );

  return (
    <>
      {view === "graph" && (
        <div className="w-full h-full hidden md:block overflow-hidden overflow-y-auto">
          <div className="relative text-white">
            <AnalyticsPage external noData={noDataComp} />
          </div>
        </div>
      )}

      {view === "table" && (
        <div className="w-full h-full hidden md:block">
          {/* <DashboardTable
            campaigndata={MergedData ? MergedData : campaigndata}
          /> */}
          <DashboardTableNew />
        </div>
      )}

      <WebAppMobileScreen />
    </>
  );
};

export default Page;
