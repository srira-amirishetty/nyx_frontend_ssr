/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import "../custom.css";

const LinkedInFeedOne = ({
  headlines,
  descriptions,
  captions,

  linkedinFeedOneChecked,
  setLinkedinFeedOneChecked,
  campaingSiteUrl,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  previewUrl,
  mixedArray,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setLinkedinFeedOneChecked(event.target.checked);
  };
  let actionLabel =
    campainObjective === "Brand Awareness"
      ? "Learn more"
      : campainObjective === "Traffic"
        ? "Visit Website"
        : campainObjective === "Engagement"
          ? "Follow"
          : campainObjective === "Video views"
            ? "Watch"
            : campainObjective === "Lead generation"
              ? "Apply Now"
              : campainObjective === "Website conversion"
                ? "Sign Up"
                : campainObjective === "Store traffic"
                  ? "Visit Store"
                  : campainObjective === "Catalogue sales"
                    ? "Shop Now"
                    : campainObjective === "UAC/AAA"
                      ? "Download"
                      : "";
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 ">
        <div className="relative w-[190px] h-auto bg-[#FFFFFF] ">
          <div className="absolute top-2 right-2">
            <div className="">
              <input
                type="checkbox"
                id="linkedinFeedOneChecked"
                checked={linkedinFeedOneChecked}
                onChange={handleCheckboxChange}
                className="custom-checkbox"
              />
              <label for="linkedinFeedOneChecked"></label>
            </div>
          </div>
          <div className="w-full h-[50px] bg-[#FFFFFF] flex items-center justify-between pt-4 px-[9px]">
            <div className="flex items-center gap-[3px]">
              <Image
                src={
                  brandLogos?.length > 0
                    ? brandLogos[0]
                    : `${IMAGE_URL}/assets/admanager/Oval.svg`
                }
                width={19}
                height={19}
                alt="img"
                className="rounded-[4px]"
              />
              <div>
                <p className="text-[#0D0C0C] font-semibold text-[7.84px] leading-[10.86px]">
                  {brandName}
                </p>
                <p className="text-[#9F9F9F] font-bold text-[6.64px] leading-[7.92px] flex gap-[3px]">
                  Promoted
                </p>
              </div>
            </div>
            <p>...</p>
          </div>
          <p className="w-full text-[8px] leading-[10.65px] text-[#050505] mb-[5px] px-[9px]">
            {captions[0]}
          </p>

          <div className="w-full h-[212px] max-w-[190px]">
            {previewUrl.type === "images" ? (
              <img
                src={previewUrl.url}
                alt="previewImage"
                className="w-full h-full object-cover"
              />
            ) : previewUrl.type === "videos" ? (
              <video
                src={previewUrl.url}
                alt="PreviewVideo"
                className="w-full h-full object-cover"
                controls={false}
                loop={false}
                autoPlay={true}
                muted
              />
            ) : mixedArray &&
              mixedArray.length > 0 &&
              mixedArray[0].type == "videos" ? (
              <video
                src={mixedArray[0]?.signed_video_url}
                alt="DriveVideo"
                className="w-full h-full object-cover"
                controls={false}
                loop={false}
                autoPlay={true}
                muted
              />
            ) : mixedArray &&
              mixedArray.length > 0 &&
              mixedArray[0].type == "images" ? (
              <img
                src={mixedArray[0]?.signed_image_url}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          <div className="bg-[#EEF3F8] w-full h-[28px] flex items-center justify-between px-[9px] py-[6px]">
            <div>
              <p className="text-[7px] leading-[5.32px] font-semibold text-[#191919] mb-1">
                {headlines[0]}
              </p>
              <p className="text-[6.39px] leading-[5.32px] font-semibold text-[#000000] opacity-[60%] mb-1">
                {campaingSiteUrl}
              </p>
            </div>
            <div>
              <button className="w-auto px-2 h-[15px] border-[0.53px] border-[#3072AC] rounded-[18px] flex items-center justify-center text-[7.45px] leading-[10px] text-[#3072AC] font-semibold">
                {actionLabel}
              </button>
            </div>
          </div>
          <div>
            <Image
              src={`${IMAGE_URL}/assets/admanager/linkedinbottom1.svg`}
              width={205}
              height={24}
              alt="img"
              className="px-[10px]"
            />
            <Image
              src={`${IMAGE_URL}/assets/admanager/linkedinbottom2.svg`}
              width={213}
              height={30}
              alt="img"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkedInFeedOne;
