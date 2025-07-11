/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState, useRef } from "react";
import { getPowerBIGraphWorkspaceLevel } from "@nyx-frontend/main/services/admanagerServices";
import { useMutation } from "@tanstack/react-query";
import "./DashboardGraph.css";
import Script from "next/script";
import useGlobalStore from "../../store/store";
import { useRouter, usePathname } from "next/navigation";

const DashboardGraph = () => {
  const router = useRouter();
  const reportContainerRef = useRef(null);
  const [error, setError] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      const workspaceID = Number(localStorage.getItem("workspace_id"));

      if (workspaceID) {
        return getPowerBIGraphWorkspaceLevel(workspaceID);
      }

      return null;
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
      setError(true);
    },
  });

  const fetchGraphDetails = () => {
    mutation.mutate();
  };

  const workspaceID = Number(localStorage.getItem("workspace_id"));

  useEffect(() => {
    if (mutation.data) {
      const embedConfig = {
        type: "report",
        tokenType: 1,
        accessToken: mutation.data.accessToken,
        embedUrl: mutation.data.embedUrl[0].embedUrl,
        id: mutation.data.embedUrl[0].reportId,
        filters: [mutation.data.Filter],
        settings: mutation.data.settings,
      };

      const embedReport = () => {
        if (reportContainerRef.current) {
          const report = window.powerbi.embed(
            reportContainerRef.current,
            embedConfig,
          );

          return new Promise((resolve, reject) => {
            report.on("loaded", async function () {
              if (mutation.data.dataCheckResult === "No Data Available") {
                setError(true);
                try {
                  await report.bookmarksManager.apply("8da4b46eccbd452c2a40"); // GUID for "No Data Available" bookmark
                  console.log("No Data Available bookmark applied");
                } catch (error) {
                  console.error(
                    "Error applying No Data Available bookmark:",
                    error,
                  );
                }
              }
              resolve(report);
            });

            report.on("error", function (error) {
              reject(error);
            });
          });
        }
      };

      embedReport();

      return () => {
        if (reportContainerRef.current) {
          window.powerbi.reset(reportContainerRef.current);
        }
      };
    }
  }, [mutation.data, workspaceID]);

  useEffect(() => {
    fetchGraphDetails();
  }, [workspaceID]);

  const {
    setObjective,
    setChannelsArray,
    setGoalId,
    setGoalData,
    setSubTopic,
    setOptionValue,
    setChannelIdArray,
  } = useGlobalStore();

  const resetCampaign = () => {
    setObjective(null); // Reset objective to null
    setChannelsArray([]); // Reset channelsArray to an empty array
    setGoalId(null); // Reset goalId to null
    setGoalData(null); // Reset goalData to null
    setSubTopic(null); // Reset subTopic to null
    setOptionValue({}); // Reset optionValue to an empty object
    setChannelIdArray([]); // Reset channelIdArray to an empty array
  };

  if (error) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center gap-3">
        <img src="/icons/no-data.png" alt="no-data" />
        <div className="text-[20px] font-[700] text-white">
          No Data Available
        </div>
        <div className="text-[14px] font-[500] text-white text-center px-4">
          You need to run some campaigns to view analytics
        </div>
        <button
          className="w-[191px] h-[36px] bg-[#FFC01D] rounded-[72px] text-[12px] font-[600] leading-[17px] flex gap-1 justify-center items-center mt-8"
          onClick={() => {
            resetCampaign();
            router.push(`
              /apphome/${localStorage.getItem("workspace_name")}/admanager/brand-details`);
          }}
        >
          Launch a campaign now
        </button>
      </div>
    );
  }

  return (
    <div className="relative mt-[-20px]">
      <div className="absolute top-0 w-full h-[40px] bg-[#3c236f]"></div>
      <div
        id="reportContainer"
        ref={reportContainerRef}
        style={{ width: "100%" }}
        className="h-[550vh] xl:h-[600vh] 2xl:[800vh]"
      ></div>
      <div
        id="footer"
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "#3B236F",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "none",
        }}
      ></div>

      <Script
        src="https://cdn.jsdelivr.net/npm/powerbi-client@2.23.1/dist/powerbi.min.js"
        strategy="afterInteractive"
        onLoad={fetchGraphDetails}
      ></Script>
    </div>
  );
};

export default DashboardGraph;
