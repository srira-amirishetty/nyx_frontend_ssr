/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
const logo = IMAGE_URL + "/assets/logo.svg";
const webappIcon = IMAGE_URL + "/assets/mwebappicon.png";

const WebAppMobileScreen = () => {
  return (
    <div>
      <div className="block md:hidden mobile_design px-0  box_container">
        <div className="flex items-center justify-center pt-[52px] ">
          <div>
            <Image
              src={logo}
              width={105}
              height={40}
              alt="NYX Logo"
              className="mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-[208px] mt-[25.53px] bg-[#332270] rounded-[10px] ">
          <Image
            src={webappIcon}
            width={73}
            height={58}
            alt="icon"
            className="mt-[20px]"
          />
          <p className="px-[12px] font-bold text-white text-center  leading-[22px] text-[14px] pt-[10px]">
            Hello, our app loves big screens.
          </p>
          <p className="font-normal text-white text-center text-[11px]">
            Grab your laptop/desktop or tab, let&apos;s create content
          </p>

          <button
            onClick={() => router.push("/")}
            className="py-[38px] px-[12px] font-normal text-white text-center underline"
          >
            Back to home
          </button>
        </div>

        <div className="flex items-center justify-center pt-[44px]">
          <p className="text-[16px] text-white font-bold">Our Products</p>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-0 mt-[18px] pb-[98px]">
          {/* ImageCraft */}
          <div className="w-[155px] h-[187px] flex flex-col items-center justify-center bg-[#332270] rounded-[10px]">
            <div className="px-2 -mt-2">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/assets/images/home/ImageCraft.png`}
                alt="ImageCraft AI"
                width="152px"
                height="152px"
                className="rounded-lg"
              />
            </div>
            <div className="pt-2">
              <h3 className="text-[11px] text-[#FFC01D] font-semibold">
                ImageCraft AI
              </h3>
            </div>
          </div>

          {/* VideoVista */}
          <div className="w-[155px] h-[187px] flex flex-col items-center justify-center bg-[#332270] rounded-[10px]">
            <div className="px-2 -mt-2">
              <img
                src="https://storage.googleapis.com/nyxassets-new/assets/images/home/VideoVista.png"
                alt="VideoVista AI"
                width="152px"
                height="152px"
                className="rounded-lg"
              />
            </div>
            <div className="pt-2">
              <h3 className="text-[11px] text-[#FFC01D] font-semibold">
                VideoVista AI
              </h3>
            </div>
          </div>
          {/* campulse Ai */}
          <div className="w-[155px] h-[187px] flex flex-col items-center justify-center bg-[#332270] rounded-[10px]">
            <div className="px-2 -mt-2">
              <img
                src="https://storage.googleapis.com/nyxassets-new/assets/images/home/CampulseAI.png"
                alt="CampulseAi"
                width="152px"
                height="152px"
                className="rounded-lg"
              />
            </div>
            <div className="pt-2">
              <h2 className="text-[11px] text-[#FFC01D] font-semibold">
                CamPulse AI
              </h2>
            </div>
          </div>
          {/* LyricGenius */}
          <div className="w-[155px] h-[187px] flex flex-col items-center justify-center bg-[#332270] rounded-[10px]">
            <div className="px-2 -mt-2">
              <img
                src="https://storage.googleapis.com/nyxassets-new/assets/images/home/LyricGeniusAI.png"
                alt="LyricGenius AI"
                width="152px"
                height="152px"
                className="rounded-lg"
              />
            </div>
            <div className="pt-2">
              <h3 className="text-[11px] text-[#FFC01D] font-semibold">
                LyricGenius AI
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAppMobileScreen;
