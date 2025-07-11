/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import "../custom.css";

const GoogleSearched = ({
  headlines,
  descriptions,
  captions,
  googleSearchedChecked,
  setGoogleSearchedChecked,
  campaingSiteUrl,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setGoogleSearchedChecked(event.target.checked);
  };
  return (
    <>
      <div className="bg-white w-[90%] h-auto mt-5 mx-auto relative p-5">
        <div className="absolute top-2 right-3">
          <div className="">
            <input
              type="checkbox"
              id="googleSearchedChecked"
              checked={googleSearchedChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="googleSearchedChecked"></label>
          </div>
        </div>
        <p className="text-[14px] leading-[16.41px] text-black">Sponsored</p>
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
            className="rounded-[4px]"
          />
          <p className="text-[14px] leading-[16.41px] text-[#8C8E94] ">
            {campaingSiteUrl}
          </p>
        </div>
        <div className="flex items-center gap-[10px] my-[10px]">
          <h3 className="text-[16px] leading-[18.75px] text-[#162DC9]">
            {headlines[0]}
          </h3>
          <div>
            <svg
              width="21"
              height="17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x=".5"
                y=".5"
                width="20"
                height="16"
                rx="2.5"
                stroke="#162DC9"
              />
              <path
                d="M7.148 4.725 4.324 12.5H3.17l3.252-8.531h.744l-.018.756ZM9.516 12.5l-2.83-7.775-.018-.756h.744l3.264 8.531h-1.16Zm-.147-3.158v.926H4.576v-.926H9.37Zm6.281 1.928V3.5h1.09v9h-.996l-.094-1.23ZM11.385 9.4v-.123c0-.484.058-.923.175-1.318.122-.398.292-.74.51-1.025.223-.286.487-.504.791-.657a2.25 2.25 0 0 1 1.032-.234c.398 0 .746.07 1.042.21.301.138.555.339.762.604.211.262.377.579.498.95.121.37.205.79.252 1.26v.538a5.523 5.523 0 0 1-.252 1.254 2.958 2.958 0 0 1-.498.95 2.085 2.085 0 0 1-.761.603 2.527 2.527 0 0 1-1.055.205 2.18 2.18 0 0 1-1.02-.24 2.407 2.407 0 0 1-.79-.674 3.285 3.285 0 0 1-.51-1.02 4.492 4.492 0 0 1-.176-1.283Zm1.09-.123V9.4c0 .317.03.614.093.891.067.277.168.521.305.732.137.211.31.377.522.498.21.118.462.176.755.176.36 0 .655-.076.885-.228a1.71 1.71 0 0 0 .563-.604c.14-.25.25-.521.328-.814V8.639a3.134 3.134 0 0 0-.205-.621 1.912 1.912 0 0 0-.34-.54 1.47 1.47 0 0 0-.51-.38 1.652 1.652 0 0 0-.709-.141 1.5 1.5 0 0 0-.768.188 1.5 1.5 0 0 0-.521.503 2.33 2.33 0 0 0-.305.739 4.045 4.045 0 0 0-.093.89Z"
                fill="#162DC9"
              />
            </svg>
          </div>

          <div>
            <svg
              width="16"
              height="17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#a)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 8.5a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm7.543 3.424 4.606-5.758-.832-.665-3.927 4.907L4.608 8.09l-.683.82 3.618 3.014Z"
                  fill="#3DA288"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    fill="#fff"
                    transform="translate(0 .5)"
                    d="M0 0h16v16H0z"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <p className="text-[16px] leading-[16.41px] text-[#4D5156] font-normal">
          {descriptions[0]}
        </p>
      </div>
    </>
  );
};

export default GoogleSearched;
