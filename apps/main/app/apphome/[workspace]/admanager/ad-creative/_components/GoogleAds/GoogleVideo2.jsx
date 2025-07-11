/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import "../custom.css";

const GoogleVideo2 = ({
  headlines,
  descriptions,
  captions,
  driveVideoClickedArray,
  campainObjective,
  campaingSiteUrl,
  brandName,
  previewUrl,
  googleVideoTwoChecked,
  setGoogleVideoTwoChecked,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setGoogleVideoTwoChecked(event.target.checked);
  };
  return (
    <>
      <div className="w-[258px] h-auto mt-5 mx-auto relative bg-[#E5E5E5] ">
        <div className="absolute top-1 right-3 z-99">
          <div className="">
            <input
              type="checkbox"
              id="googleVideoTwoChecked"
              checked={googleVideoTwoChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="googleVideoTwoChecked"></label>
          </div>
        </div>
        <div className="flex items-center gap-[5px] p-[2px]">
          <Image
            src={
              brandLogos?.length > 0
                ? brandLogos[0]
                : `${IMAGE_URL}/assets/admanager/nLogo.svg`
            }
            width={18}
            height={18}
            alt="img"
            className="rounded-[50%]"
          />
          <p className="text-[#4D5156] text-[10px]">NYX</p>
        </div>
        {previewUrl?.type == "videos" ? (
          <video
            src={previewUrl?.url}
            alt="previewVideo"
            className="w-full h-full object-cover"
            controls={false}
            loop={false}
            autoPlay={true}
            muted
          />
        ) : (
          <video
            src={driveVideoClickedArray[0]?.signed_video_url}
            alt="previewVideo"
            className="w-full h-full object-cover"
            controls={false}
            loop={false}
            autoPlay={true}
            muted
          />
        )}
        <div className="bg-[#E5E5E5]">
          <div className="flex items-center justify-between px-1 border-b-[0.5px] border-black ">
            <div className="flex items-center gap-[2px]">
              <Image
                src={`${IMAGE_URL}/assets/admanager/imagix.svg`}
                width={18}
                height={18}
              />
              <p className="text-[8px] text-[#4D5156]">{brandName}</p>
            </div>
            <p className="text-[8px] text-[#8C8E94]">{campaingSiteUrl}</p>
          </div>
          <div className="flex items-center gap-1">
            {/* <Image
              src={`${IMAGE_URL}/assets/admanager/imagix.svg`}
              width={11}
              height={12}
            /> */}
            {/* <p className="text-[6px] text-[#4D5156]">{brandName}</p> */}
            <p className="text-[10px] px-2 text-[#000000]">{captions[0]}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleVideo2;
