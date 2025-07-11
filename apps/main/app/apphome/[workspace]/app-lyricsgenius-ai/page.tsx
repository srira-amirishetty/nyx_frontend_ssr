/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { TAIL_TITLE } from "@nyx-frontend/main/components/tails";
import { useRouter } from "next/navigation";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Link from "next/link";
import LandscapePopup from "../../LandscapePopUp";

const Page = () => {
  const router = useRouter();
  const [workspace, setWorkspace] = useState<any>("");

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
      <div className="flex w-full ">
        <Sidebar
        // defaultOpened={true}
        />
        <div className="w-full px-10 py-5 max-h-[100vh] overflow-hidden overflow-y-auto">
          <Profileicon hide={""} />
          <TAIL_TITLE
            title="Welcome to LyricGenius AI!"
            style="text-white flex justify-center text-3xl font-[700]"
          ></TAIL_TITLE>
          <TAIL_TITLE
            title="Your songwriting companion"
            style="text-white flex justify-center text-base font-[400]"
          ></TAIL_TITLE>

          <div className="w-full my-5">
            <p className="text-[#FFFFFF] text-xl font-semibold">
              What would you like to do today?
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-[36px] w-full h-[212px] rounded-md bg-[#3B226F]">
              <div className="w-[337px]">
                <img
                  className="w-full rounded-lg h-[212px]"
                  src={`${IMAGE_URL}/assets/images/home/LyricGeniusAI1_app.png`}
                  alt="LyricGeniusAI1_app"
                />
              </div>
              <div className="w-[70%] px-3 pt-[20px] relative">
                <p className="text-amber-300 font-bold text-xl mb-2">
                  LyricGenius Generate
                </p>
                <p className="text-white font-normal text-base mb-5">
                  Generate engaging and catchy lyrics for your songs with just a
                  few clicks.
                </p>
                <div className="flex ">
                  <Link
                    href={`/apphome/${workspace}/lyrics-genius-ai/ai-lyrics-writer`}
                  >
                    <div className="absolute bottom-8 text-[20px] w-[180px] inline-flex  justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D]	border-[#FFC01D] h-12 hover:bg-[#FFC01D]  py-5 px-8 border-solid cursor-pointer hover:text-black">
                      Try It Out
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="flex gap-[36px] w-full h-[212px] rounded-md bg-[#3B226F]">
              <div className="w-[337px]">
                <img
                  className="w-full rounded-lg h-[212px]"
                  src={`${IMAGE_URL}/assets/images/home/LyricGeniusAI2_app.png`}
                  alt="LyricGeniusAI2_app"
                />
              </div>
              <div className="w-[70%] px-3 pt-[22px] relative">
                <p className="text-amber-300 font-bold text-xl mb-2">
                  LyricGenius Consultation
                </p>
                <p className="text-white font-normal text-base mb-5">
                  Get expert advice and feedback on your lyrics to take your
                  songwriting to the next level.
                </p>
                <div className="flex ">
                  
                  <div className="absolute bottom-8 text-[20px] inline-flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-nyx-gray-1	border-nyx-gray-1 h-12 py-5 px-8 border-solid cursor-not-allowed">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex gap-[36px] w-full h-[212px] rounded-md bg-[#3B226F]">
              <div className="w-[337px]">
                <img
                  className="w-full rounded-lg h-[212px]"
                  src={`${IMAGE_URL}/assets/images/home/LyricGeniusAI3_app.png`}
                  alt="LyricGeniusAI3_app"
                />
              </div>
              <div className="w-[70%] px-3 pt-[22px] relative">
                <p className="text-amber-300 font-bold text-xl mb-2">
                  LyricGenius Predict
                </p>
                <p className="text-white font-normal text-base mb-6">
                  Predict the success of your lyrics and make data-driven
                  decisions in your songwriting process.
                </p>
                <div className="flex ">
                  {/* <Link href={`/apphome/${workspace}/lyrics-genius-ai/lyrics`}>
                    <div className="absolute bottom-8 text-[20px] w-[180px] inline-flex  justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D]	border-[#FFC01D] h-12 hover:bg-[#FFC01D] py-5 px-8 border-solid cursor-pointer hover:text-black">
                      Try It Out
                    </div>
                  </Link> */}
                  <div className="absolute bottom-8 text-[20px] inline-flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-nyx-gray-1	border-nyx-gray-1 h-12 py-5 px-8 border-solid cursor-not-allowed">
                    Coming Soon
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
