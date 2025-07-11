/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const GoogleYoutybe = ({
  headlines,
  descriptions,
  captions,
  campaingSiteUrl,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  brandLogos,
  previewUrl,
  mixedArray,
}) => {
  return (
    <>
      <div className="bg-white w-[400px] h-auto mt-5 mx-auto relative p-5 rounded-md">
        <div className="w-full h-[200px]">
          {previewUrl.type === "images" ? (
            <img
              src={previewUrl.url}
              alt="previewImage"
              className="w-full h-full object-cover rounded-t-md"
            />
          ) : mixedArray &&
            mixedArray.length > 0 &&
            mixedArray[0].type == "images" ? (
            <img
              src={mixedArray[0]?.signed_image_url}
              className="w-full h-full object-cover rounded-t-md"
            />
          ) : null}
        </div>

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
          <div className="flex flex-col items-center gap-[10px] my-[10px] ">
            <h3 className="text-[16px] leading-[18.75px] text-[#162DC9]">
              {headlines[0]}
            </h3>
            <p className="text-[16px] leading-[16.41px] text-[#4D5156] font-normal">
              {descriptions[0]}
            </p>
            <p className="text-[14px] leading-[16.41px] text-[#8C8E94] ">
              AD 3.5 *
            </p>
          </div>
        </div>
        <div>
          <button className="w-full h-[35px] bg-[#1A73E8] flex items-center justify-center text-[14px] leading-[10px] text-[#FFFFFF] font-medium rounded-full">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default GoogleYoutybe;
