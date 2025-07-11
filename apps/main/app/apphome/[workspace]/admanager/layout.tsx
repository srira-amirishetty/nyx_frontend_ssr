/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import { useRouter, usePathname } from "next/navigation";
import Steper from "./component/Steper";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import "./index.css";
import Link from "next/link";
import useGlobalStore from "./store/store";
import { useSearchParams } from "next/navigation";
import { BlurPaywall } from "@nyx-frontend/main/app/blur-pay-wall/BlurPayWall";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [workspacename, setWorkspacename] = useState("");
  const [shouldShowP, setshouldShowP] = useState(false);
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
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
  }, []);

  useEffect(() => {
    const should =
      pathname.includes("dashboard") ||
      pathname.includes("uniview") ||
      pathname.includes("rule-details") ||
      pathname.includes("ai-campaign-assistant") ||
      pathname.includes("automated-rule");
    setshouldShowP(should);
  }, [pathname]);

  const resetCampaign = () => {
    setObjective(null); // Reset objective to null
    setChannelsArray([]); // Reset channelsArray to an empty array
    setGoalId(null); // Reset goalId to null
    setGoalData(null); // Reset goalData to null
    setSubTopic(null); // Reset subTopic to null
    setOptionValue({}); // Reset optionValue to an empty object
    setChannelIdArray([]); // Reset channelIdArray to an empty array
  };

  return (
    <>
      <div className="justify-start flex w-full bg-[#130828] ">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh] overflow-auto  hide-scrollbar">
          <div style={{ backgroundColor: '#332270' }}>
            <TopBar title={shouldShowP ? "Launch and Optimize Campaigns" : "Launch Multi-Channel Campaign"} />
            {shouldShowP && (
              <div className="w-full flex px-2">
                <div className="w-[70%] flex px-2 gap-5 items-center">
                  <Link
                    href={`/apphome/${workspacename}/admanager/dashboard?view=graph`}
                    className={`text-sm cursor-pointer px-4 py-4 border-b-4 ${search.get("view") === "graph"
                      ? "text-nyx-yellow font-[700] border-nyx-yellow"
                      : "text-white font-[600] hover:text-nyx-yellow hover:font-[700] border-transparent"
                      }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`/apphome/${workspacename}/admanager/dashboard?view=table`}
                    className={`text-sm cursor-pointer px-4 py-4 border-b-4 ${search.get("view") === "table"
                      ? "text-nyx-yellow font-[700] border-nyx-yellow"
                      : "text-white font-[600] hover:text-nyx-yellow hover:font-[700] border-transparent"
                      }`}
                  >
                    My Campaigns
                  </Link>
                  <Link
                    href={`/apphome/${workspacename}/admanager/rule-details`}
                    className={`text-sm cursor-pointer px-4 py-4 border-b-4 ${pathname.includes("rule-details") ||
                      pathname.includes("automated-rule")
                      ? "text-nyx-yellow font-[700] border-nyx-yellow"
                      : "text-white font-[600] hover:text-nyx-yellow hover:font-[700] border-transparent"
                      }`}
                  >
                    Automated Alerts
                  </Link>
                  <Link
                    href={`/apphome/${workspacename}/admanager/ai-campaign-assistant`}
                    className={`text-sm cursor-pointer px-4 py-4 border-b-4 ${pathname.includes("ai-campaign-assistant")
                      ? "text-nyx-yellow font-[700] border-nyx-yellow"
                      : "text-white font-[600] hover:text-nyx-yellow hover:font-[700] border-transparent"
                      }`}
                  >
                    AI Campaign Assistant
                  </Link>
                </div>
                <div className="w-[30%] flex justify-end mt-2">
                  <button
                    className={`create-campaign-btn w-[175px] h-[37px] hover:bg-[#FFCB54] hover:text-[#000000] font-normal rounded-full text-[14px] leading-[17px] flex gap-1 justify-center items-center text-[#FFCB54] duration-200 border border-[#FFCB54]
                        ${pathname.includes("rule-details") ||
                        pathname.includes("automated-rule")
                        ? "invisible"
                        : ""
                      } `}
                    onClick={() => {
                      resetCampaign();
                      router.push(
                        `/apphome/${workspacename}/admanager/brand-details`,
                      );
                    }}
                  >
                    <svg
                      className="create-campaign-plus-svg duration-200"
                      width="15"
                      height="16"
                      fill="#FFCB54"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.125 8a.844.844 0 0 1-.844.844H7.937v5.344a.844.844 0 1 1-1.687 0V8.843H.906a.844.844 0 0 1 0-1.688H6.25V1.813a.844.844 0 1 1 1.688 0v5.343h5.343a.844.844 0 0 1 .844.844Z"
                      />
                    </svg>{" "}
                    Create campaign
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-[100%] flex flex-col items-center relative">
            <BlurPaywall>
              {!shouldShowP ? (
                <div
                  className="bg-[#130828]"
                >
                  {children}
                </div>
              ) : (
                <div className="w-full">
                  <div className=" w-full relative h-[80vh]">
                    {children}
                  </div>
                </div>
              )}
            </BlurPaywall>
          </div>
        </div>
      </div>
    </>
  );
}