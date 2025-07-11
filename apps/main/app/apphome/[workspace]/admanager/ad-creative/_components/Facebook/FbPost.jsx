/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../custom.css";

const FbImageCarousel = ({
  headlines,
  descriptions,
  campaingSiteUrl,
  captions,
  fbPostChecked,
  setFbPostChecked,
  campainObjective,
  brandName,
  mixedArray,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setFbPostChecked(event.target.checked);
  };
  let actionLabel =
    campainObjective === "Brand Awareness" ||
    campainObjective === "Traffic" ||
    campainObjective === "Engagement"
      ? "Learn more"
      : campainObjective === "Video views"
        ? "Watch More"
        : campainObjective === "Lead generation"
          ? "Apply Now"
          : campainObjective === "Website conversion"
            ? "Sign Up"
            : campainObjective === "Store traffic" ||
                campainObjective === "Catalogue sales"
              ? "Shop Now"
              : campainObjective === "UAC/AAA"
                ? "Download"
                : "";

  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    autoplay: "true",
    pauseOnHover: false,
    adaptiveHeight: true,
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
                Post
              </p>
            </div>
          </div>

          <div className="pr-3">
            <input
              type="checkbox"
              id="fbPostChecked"
              checked={fbPostChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="fbPostChecked"></label>
          </div>
        </div>

        <div className="w-[258px] h-auto bg-[#FFFFFF]  px-[9px]">
          <div className="flex items-center justify-between ">
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
                  Sponsored{" "}
                  <span>
                    <svg
                      width="7"
                      height="7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.45 6.04a2.39 2.39 0 0 0 .567-.068l-.4-.6H2.451V5.04c0-.183.065-.34.195-.47a.642.642 0 0 1 .471-.197h.667v-1h-.667a.323.323 0 0 1-.237-.095.323.323 0 0 1-.096-.238v-.667h-.15a.506.506 0 0 1-.496-.658.537.537 0 0 1 .063-.142l.516-.758a2.646 2.646 0 0 0-1.387.942 2.555 2.555 0 0 0-.546 1.616h.333V3.04a.32.32 0 0 1 .096-.237.323.323 0 0 1 .238-.096h.666c.095 0 .174.032.238.096a.323.323 0 0 1 .096.237v.333a.323.323 0 0 1-.096.238.323.323 0 0 1-.238.096v.333c0 .183-.065.34-.196.47a.642.642 0 0 1-.47.197h-.309c.234.4.553.722.959.966.405.245.855.367 1.35.367Zm2.534-1.85a2.36 2.36 0 0 0 .1-.397c.022-.136.033-.276.033-.42 0-.623-.189-1.171-.566-1.646A2.635 2.635 0 0 0 4.117.789v.917a.64.64 0 0 1 .471.196c.13.13.196.287.196.47v.667c.105 0 .2.013.283.038a.584.584 0 0 1 .242.154l.675.958ZM3.45 6.705c-.462 0-.895-.088-1.3-.263a3.366 3.366 0 0 1-1.059-.712c-.3-.3-.537-.653-.712-1.059a3.246 3.246 0 0 1-.263-1.3c0-.46.088-.894.263-1.3a3.37 3.37 0 0 1 .712-1.058c.3-.3.653-.537 1.059-.712a3.246 3.246 0 0 1 1.3-.263c.46 0 .894.088 1.3.263a3.37 3.37 0 0 1 1.058.712c.3.3.537.653.712 1.058.175.406.263.84.263 1.3 0 .462-.088.895-.263 1.3a3.366 3.366 0 0 1-.712 1.059c-.3.3-.653.537-1.058.712a3.246 3.246 0 0 1-1.3.263Z"
                        fill="#9F9F9F"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>

            <p className="flex items-center gap-[3px] ">
              ...
              <span className="mt-2 p-1">
                <svg
                  width="11"
                  height="11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M.349.362a.57.57 0 0 0 0 .807l4.236 4.237L.347 9.644a.57.57 0 1 0 .807.807l4.238-4.238L9.63 10.45a.57.57 0 1 0 .807-.807L6.199 5.406l4.236-4.236a.57.57 0 0 0-.807-.807L5.392 4.599 1.156.362a.57.57 0 0 0-.807 0Z"
                    fill="#000"
                  />
                </svg>
              </span>
            </p>
          </div>
          <p className="text-[#000000] font-normal text-[7.84px] leading-[10.86px] mt-[5px]">
            {captions[0]}
          </p>
        </div>

        <div className="max-h-[258px] h-auto w-[258px] bg-white">
          {mixedArray?.length > 0 ? (
            <div className="w-full">
              {mixedArray?.length == 1 && mixedArray[0].type === "images" ? (
                <div>
                  <img
                    src={mixedArray[0].signed_image_url}
                    alt="previewImage"
                    className="w-[258px] h-auto object-contain"
                  />
                </div>
              ) : (
                <Slider
                  {...settings}
                  className="w-full mx-2.5 adCreativeSlider h-full"
                >
                  {mixedArray.map((item, index) => (
                    <div key={`instapost-${index}`} className="h-auto">
                      {item.type === "images" ? (
                        <img
                          src={item.signed_image_url}
                          alt="previewImage"
                          className="w-[258px] h-auto "
                        />
                      ) : item.type === "videos" ? (
                        <video
                          src={item.signed_video_url}
                          controls={false}
                          className="w-[258px] h-[258px] object-cover"
                          loop={false}
                          autoPlay={true}
                          muted
                        />
                      ) : null}
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          ) : null}
        </div>
        <div className="bg-white w-[258px] ">
          <div className="bg-[#EEF3F8] w-full h-[45px] flex items-center justify-between px-[9px] py-[6px]">
            <div>
              <p className="text-[6.39px] leading-[5.32px] font-semibold text-[#000000] opacity-[60%] mb-1">
                {campaingSiteUrl}
              </p>
              <p className="text-[7px] leading-[8px] font-semibold text-[#191919] mb-1 break-all">
                {headlines[0]}
              </p>
            </div>
            <div>
              <button className="w-[50px] h-[15px] bg-gray-300 py-2 flex items-center justify-center text-[6px] leading-[10px] text-[#000] font-medium">
                {actionLabel}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white w-[258px] px-2 pt-3 pb-1 relative">
          <Image
            src={`${IMAGE_URL}/assets/admanager/fbBottomPanel.svg`}
            width={258}
            height={12}
            alt="img"
            className="w-full"
          />
          <div className="absolute top-[10px] border-[0.5px] border-solid border-[#D2C7C7] w-[240px] mx-auto opacity-[50%]"></div>
        </div>
      </div>
    </>
  );
};

export default FbImageCarousel;
