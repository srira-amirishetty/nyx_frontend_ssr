/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import "../custom.css";

const FbReels = ({
  headlines,
  descriptions,
  captions,
  fbreelsChecked,
  setFbreelsChecked,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  previewUrl,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setFbreelsChecked(event.target.checked);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="w-[258px] h-[40px] bg-[#ECECEC]  flex items-center justify-between">
          <div className="flex items-center gap-[3px] px-[7px]">
            <svg
              width="17"
              height="17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#a)">
                <path
                  d="M15.17 8.22a6.67 6.67 0 0 0-6.667-6.667 6.67 6.67 0 0 0-6.667 6.666 6.673 6.673 0 0 0 5.333 6.534v-4.534H5.836v-2h1.333V6.553a2.336 2.336 0 0 1 2.334-2.334h1.666v2H9.836c-.367 0-.667.3-.667.667V8.22h2v2h-2v4.634a6.666 6.666 0 0 0 6-6.634Z"
                  fill="#000"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    fill="#fff"
                    transform="translate(.5 .219)"
                    d="M0 0h16v16H0z"
                  />
                </clipPath>
              </defs>
            </svg>
            <div>
              <p className="text-[#969696] font-semibold text-[7.41px] leading-[10.26px]">
                Facebook
              </p>
              <p className="text-[#000000] font-bold text-[7.41px] leading-[10.26px]">
                Reels
              </p>
            </div>
          </div>

          <div className="pr-3">
            <input
              type="checkbox"
              id="fbreelsChecked"
              checked={fbreelsChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="fbreelsChecked"></label>
          </div>
        </div>

        <div className="bg-black py-[41px] relative">
          <div className="absolute right-[30px] bottom-[29px]">
            <Image
              src={`${IMAGE_URL}/assets/admanager/fbReel.svg`}
              width={17}
              height={68}
            />
          </div>
          <div className="absolute bottom-[66px] left-[18px]">
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
                <p className="text-white font-semibold text-[7.84px] leading-[10.86px]">
                  {brandName}
                </p>
              </div>
            </div>
            <p className="text-white font-normal text-[7.84px] leading-[10.86px] mt-[5px]">
              {captions[0]}
            </p>
            <p className="text-[#9f9f9f] font-normal text-[7.84px] leading-[10.86px] mt-[5px]">
              Sponsored
            </p>
          </div>
          <div className=" h-[309px] w-[258px] bg-white">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default FbReels;
