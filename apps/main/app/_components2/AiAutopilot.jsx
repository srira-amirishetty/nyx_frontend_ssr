import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const AiAutopilot = () => {
  return (
    <>
      <div className="bg-[#190B38] px-[25px] md:px-[80px]">
        <div className="  pt-[67px] pb-[20px] md:pb-[52px]">
          <h3 className="text-[20px] leading-[24px] md:text-[40px] md:leading-[35px] font-bold text-center text-white">
            NYX AI - Autopilot
          </h3>
          <p className="text-[12px] leading-[20px] md:text-[24px] md:leading-[35px] font-normal text-center text-white max-md:pt-[20px] pt-[10px]">
            Get Time to focus on Strategy & skip operational hassles (coming
            soon)
          </p>
        </div>
        <div className="flex items-center justify-center pb-[64px]">
          <Image
            src={`${IMAGE_URL}/assets/images/home/autoPilot.gif`}
            width={800}
            height={769}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default AiAutopilot;
