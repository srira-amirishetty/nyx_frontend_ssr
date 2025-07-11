/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const GoogleDisplay = ({
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
      <div className="bg-white w-[400px] h-auto mt-5 mx-auto relative rounded-md">
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

        <div className="flex items-center gap-[17px] mt-3 px-5">
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
          <div className="w-full flex flex-col mb-5">
            <p className="text-[14px] leading-[16.41px] text-[#8C8E94] ">
              Title
            </p>
            <p className="text-[14px] leading-[16.41px] text-[#8C8E94] ">
              Brand Name
            </p>
          </div>
          <div>
            <button className="w-[100px] h-[35px] flex items-center justify-center text-[14px] leading-[10px] text-[#000] font-medium border border-black rounded-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleDisplay;
