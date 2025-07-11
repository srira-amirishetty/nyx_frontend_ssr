/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { TAIL_TITLE } from "@nyx-frontend/main/components/tails";
import { useRouter } from "next/navigation";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Link from "next/link";
import { useOrientation } from "@nyx-frontend/main/hooks/useOrientation";
import LandscapePopup from "../../LandscapePopUp";

const Page = () => {
  const router = useRouter();

  const [workspace, setWorkspace] = useState<any>("");
  const orientation = useOrientation();

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  return (
    <>
      <div
        className={` flex w-full ${orientation.type === "landscape" ? "landscape-mode" : ""}`}
      >
        <div className="flex w-full ">
          <Sidebar
          // defaultOpened={true}
          />
          <div className="p-5 py-4 w-full toolsetcontainer max-h-[100vh] overflow-hidden overflow-y-auto">
            <Profileicon hide={""} />
            <TAIL_TITLE
              title="Welcome to Campulse AI!"
              style="text-white flex justify-center text-3xl font-[700]"
            ></TAIL_TITLE>
            <TAIL_TITLE
              title="Maximizing your Campaign Potential"
              style="text-white flex justify-center text-base font-[400]"
            ></TAIL_TITLE>

            <div className="w-full my-5">
              <p className="text-[#FFFFFF] text-xl font-semibold">
              How can we assist you today?
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="flex gap-[36px] w-full h-[212px] rounded-md bg-[#3B226F]">
                <div className="w-[337px]">
                  <img
                    className="w-full rounded-lg h-[212px] "
                    src={`${IMAGE_URL}/assets/images/home/campulsePDP1.png`}
                    alt="CampulseAI app"
                  />
                </div>
                <div className="w-[70%] p-3 relative">
                  <p className="text-amber-300 font-bold text-xl mb-2">
                    Auto Ad Manager
                  </p>
                  <p className="text-white font-normal text-base mb-5">
                    Budget, schedule and launch your cross platform campaign
                    using AI Attribution
                  </p>
                  {/* <div className="absolute bottom-8 text-[20px] inline-flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-nyx-gray-1	border-nyx-gray-1 h-12 py-5 px-8 border-solid cursor-not-allowed">
                    Coming Soon
                  </div> */}
                  <div className="flex ">
                    <Link
                      href={`/apphome/${workspace}/admanager/brand-details`}
                    >
                      <div className="absolute bottom-8 text-[20px] w-[180px] inline-flex  justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D]	border-[#FFC01D] h-12 hover:bg-[#FFC01D]  py-5 px-8 border-solid cursor-pointer hover:text-black">
                        Try It Out
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex gap-[36px] w-full h-[212px] rounded-md bg-[#3B226F]">
                <div className="w-[337px] ">
                  <img
                    className="w-full rounded-lg h-[212px]"
                    src={`${IMAGE_URL}/assets/images/home/campulsePDP2.png`}
                    alt="CampulseAI app"
                  />
                </div>
                <div className="w-[70%] px-3 pt-[22px] relative">
                  <p className="text-amber-300 font-bold text-xl mb-2">
                    Uniview analytics
                  </p>
                  <p className="text-white font-normal text-base mb-5">
                    Monitor your campaign to optimize for best performance using
                    AI insights
                  </p>
                  {/* <div className="absolute bottom-8 text-[20px] inline-flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-nyx-gray-1	border-nyx-gray-1 h-12 py-5 px-8 border-solid cursor-not-allowed">
                    Coming Soon
                  </div> */}
                  <div className="flex ">
                    <Link href={`/apphome/${workspace}/admanager/dashboard?view=graph`}>
                      <div className="absolute bottom-8 text-[20px] w-[180px] inline-flex  justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D]	border-[#FFC01D] h-12 hover:bg-[#FFC01D]  py-5 px-8 border-solid cursor-pointer hover:text-black">
                        Try It Out
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LandscapePopup />
    </>
  );
};

export default Page;
