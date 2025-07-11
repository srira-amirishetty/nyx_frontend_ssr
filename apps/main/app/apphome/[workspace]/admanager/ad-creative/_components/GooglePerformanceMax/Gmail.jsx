/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const GoogleGmail = ({
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
            className="w-10 h-10"
          />
          <div className="w-full flex flex-col">
            <p className="text-[14px] leading-[16.41px] text-black">Ad</p>
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
        <div className="w-full flex justify-end">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 0.875H15.625V5.25M14.6875 1.8125L10 6.5M8.125 2.125H2.5C2.00272 2.125 1.52581 2.32254 1.17417 2.67417C0.822544 3.02581 0.625 3.50272 0.625 4V14C0.625 14.4973 0.822544 14.9742 1.17417 15.3258C1.52581 15.6775 2.00272 15.875 2.5 15.875H12.5C12.9973 15.875 13.4742 15.6775 13.8258 15.3258C14.1775 14.9742 14.375 14.4973 14.375 14V8.375"
              stroke="#00162D"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default GoogleGmail;
