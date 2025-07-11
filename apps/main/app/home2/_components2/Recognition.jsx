import Image from "next/image";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import "./tabs/index.css";

const Recognition = () => {
  return (
    <>
      <div className="bg-[#15072A] w-full h-[151px] sm:h-[250px]  xl:h-[336px] ">
        <h3 className="font-bold text-[20px] leading-[18px] sm:text-[32px] sm:leading-[52px] xl:text-[40px] xl:leading-[58px] text-center text-white pt-6 sm:pt-[40px] xl:pt-[42px]">
          Our Recognitions
        </h3>
        <div className="flex items-center justify-start sm:justify-center gap-[43px] sm:gap-[51px] xl:gap-[125px] px-[16px] mt-[24px] overflow-hidden overflow-x-auto scrollbar-hide">
          <Image
            src={`${IMAGE_URL}/assets/images/home/rec3.png`}
            width={210}
            height={134}
            alt="image1"
            className="w-[99px] h-[71px] sm:w-[185px] sm:h-[96px] xl:w-[210px] xl:h-[134px] opacity-[70%]"
          />
          <Image
            src={`${IMAGE_URL}/assets/images/home/rec2.png`}
            width={210}
            height={134}
            alt="image1"
            className="w-[86px] h-[58px] sm:w-[120px] sm:h-[66px]  xl:w-[210px] xl:h-[134px] opacity-[70%]"
          />
          <Image
            src={`${IMAGE_URL}/assets/images/home/rec1.png`}
            width={210}
            height={134}
            alt="image1"
            className="w-[95px] h-[51px] sm:w-[123px] sm:h-[56px]  xl:w-[210px] xl:h-[134px] opacity-[70%]"
          />
          <Image
            src={`${IMAGE_URL}/assets/images/home/rec4.png`}
            width={210}
            height={134}
            alt="image1"
            className="w-[101px] h-[81px] sm:w-[188px] sm:h-[96px] xl:w-[210px] xl:h-[134px] opacity-[70%]"
          />
        </div>
      </div>
    </>
  );
};

export default Recognition;
