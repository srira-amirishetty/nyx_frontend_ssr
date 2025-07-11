/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const GoogleSearched = ({
  headlines,
  descriptions,
  captions,
  campaingSiteUrl,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  brandLogos,
}) => {
  return (
    <>
      <div className="bg-white w-[400px] h-auto mt-5 mx-auto relative p-5 rounded-md">
        <p className="text-[14px] leading-[16.41px] text-black ">Sponsored</p>
        <div className="flex items-center gap-[17px] mt-3">
          <Image
            src={
              brandLogos?.length > 0
                ? brandLogos[0]
                : `${IMAGE_URL}/assets/admanager/Oval.svg`
            }
            width={19}
            height={19}
            alt="img"
            className="rounded-[4px] w-10 h-10"
          />
          <div className="w-full flex flex-col">
            <p className="text-[14px] leading-[16.41px] text-[#8C8E94] ">
              Brand Name
            </p>
            <p className="text-[14px] leading-[16.41px] text-[#8C8E94] ">
              {campaingSiteUrl}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[10px] my-[10px]">
          <h3 className="text-[16px] leading-[18.75px] text-[#162DC9]">
            {headlines[0]}
          </h3>
        </div>

        <p className="text-[16px] leading-[16.41px] text-[#4D5156] font-normal">
          {descriptions[0]}
        </p>
      </div>
    </>
  );
};

export default GoogleSearched;
