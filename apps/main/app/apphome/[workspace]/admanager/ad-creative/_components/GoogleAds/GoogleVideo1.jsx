/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import "../custom.css";

const GoogleVideo1 = ({
  headlines,
  descriptions,
  captions,
  driveVideoClickedArray,
  campainObjective,
  campaingSiteUrl,
  brandName,
  previewUrl,
  googleVideoOneChecked,
  setGoogleVideoOneChecked,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setGoogleVideoOneChecked(event.target.checked);
  };
  return (
    <>
      <div className="w-[543px] h-[291px] mt-5 mx-auto relative">
        <div className="absolute top-2 right-3 z-[99]">
          <div className="">
            <input
              type="checkbox"
              id="googleVideoOneChecked"
              checked={googleVideoOneChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="googleVideoOneChecked"></label>
          </div>
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
        <div className="absolute bottom-3 px-[13px]">
          <div className="flex items-center justify-between ">
            <div className="flex flex-col">
              <div className="w-[131px] h-[40px] rounded-[2px] gap-[7px] bg-white px-[5px] py-2 flex items-center">
                <Image
                  src={
                    brandLogos?.length > 0
                      ? brandLogos[0]
                      : `${IMAGE_URL}/assets/admanager/nLogo.svg`
                  }
                  width={19}
                  height={19}
                  alt="img"
                  className="rounded-[50%]"
                />
                <div>
                  <p className="text-[5px] font-medium leading-[7.31px]">
                    {brandName}
                  </p>
                  <p className="text-[5px] font-medium leading-[7.31px] mt-1">
                    {campaingSiteUrl}
                  </p>
                </div>
                <div className="w-[36px] h-[16px] bg-[#065FD4] rounded-[10px] flex items-center justify-center text-[5px] text-white">
                  {" "}
                  Start now
                </div>
              </div>
              <div className="mt-1">
                <Image
                  src={`${IMAGE_URL}/assets/admanager/adCount.svg`}
                  width={80}
                  height={7}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[14px] bottom-[20px]">
          <Image
            src={`${IMAGE_URL}/assets/admanager/skip.svg`}
            width={65}
            height={30}
          />
        </div>
      </div>
    </>
  );
};

export default GoogleVideo1;
