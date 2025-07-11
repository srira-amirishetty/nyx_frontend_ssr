/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../index.css";
import { arrow } from "@floating-ui/react";
import "../custom.css";

const InstaShoppingReel = ({
  headlines,
  descriptions,
  captions,
  instareelsChecked,
  setInstareelsChecked,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  previewUrl,
  brandLogos,
  previewData,
}) => {
  const handleCheckboxChange = (event) => {
    setInstareelsChecked(event.target.checked);
  };
  const settings = {
    // dots: true,
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "0px",
    // slidesToShow: 1,
    // speed: 500,
    // autoplay: "true",
    // pauseOnHover: false,
    dots: false,

    infinite: false,
    centerPadding: "0px",
    slidesToShow: 4,
    arrows: false,
    swipe: true,
    speed: 400,
    autoplay: "true",
    pauseOnHover: false,
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
  return (
    <>
      <div
        className="flex flex-col items-center justify-center mt-4  "
        style={{
          background: "linear-gradient(180deg, #566A70 0%, #3E2F26 100%)", // Adjust height or add more styles as needed
        }}
      >
        <div className="w-[258px] h-[40px] bg-[#ECECEC]  flex items-center justify-between">
          <div className="flex items-center gap-[3px] px-[7px]">
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.744 1.375h4.79a3.31 3.31 0 0 1 3.306 3.307V9.47a3.307 3.307 0 0 1-3.307 3.307H4.744A3.31 3.31 0 0 1 1.438 9.47V4.68a3.307 3.307 0 0 1 3.306-3.306Zm-.114 1.14a2.052 2.052 0 0 0-2.052 2.053v5.017c0 1.134.918 2.052 2.052 2.052h5.017A2.053 2.053 0 0 0 11.7 9.585V4.568a2.051 2.051 0 0 0-2.053-2.053H4.63Zm5.502.855a.712.712 0 1 1 0 1.425.712.712 0 0 1 0-1.425Zm-2.993.856a2.85 2.85 0 1 1 0 5.701 2.85 2.85 0 0 1 0-5.701Zm0 1.14a1.71 1.71 0 1 0 0 3.42 1.71 1.71 0 0 0 0-3.42Z"
                fill="#000"
              />
            </svg>
            <div>
              <p className="text-[#969696] font-semibold text-[7.41px] leading-[10.26px]">
                Instagram
              </p>
              <p className="text-[#000000] font-bold text-[7.41px] leading-[10.26px]">
                Reels
              </p>
            </div>
          </div>

          <div className="pr-3">
            <input
              type="checkbox"
              id="instareelsChecked"
              checked={instareelsChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="instareelsChecked"></label>
          </div>
        </div>

        <div className="relative h-[467px]">
          {/* reels icons */}
          <img
            src={`${IMAGE_URL}/assets/admanager/Reels%20Icon.png`}
            alt="img"
            className="absolute top-[27px] right-[8px] z-10 "
          />
          <div className="absolute top-[27px] px-[9px]">
            <p className="text-white text-[13.13px] font-semibold leading-[12px]">
              Reels
            </p>
          </div>

          {/* Main Image */}
          <div className="mt-12">
            <img
              src={previewData[0].image_url}
              alt="previewImage"
              className="w-[258px] h-[179px] object-cover"
            />
          </div>

          {/* Crousel of images */}
          <div className="mt-6 flex flex-row gap-2 ml-1 w-[240px]">
            <Slider {...settings} className="w-full ">
              {/* {driveClickedArray.map((item, index) => (
                    <div key={`instapost-${index}`}>
                      {item.type === "images" ? (
                        <img
                          src={item.signed_image_url}
                          alt="previewImage"
                          className="w-full h-[414px] object-cover"
                        />
                      ) : null}
                    </div>
                  ))} */}
              {/* <div>
                <img
                  src="https://i.ibb.co/Ss1YLcR/image-3377.png"
                  alt="previewImage"
                  className="w-[54px] h-[54px] object-cover rounded-[4px]"
                />
              </div>

              <div>
                <img
                  src="https://i.ibb.co/Ss1YLcR/image-3377.png"
                  alt="previewImage"
                  className="w-[54px] h-[54px] object-cover rounded-[4px]"
                />
              </div>

              <div>
                <img
                  src="https://i.ibb.co/Ss1YLcR/image-3377.png"
                  alt="previewImage"
                  className="w-[54px] h-[54px] object-cover rounded-[4px]"
                />
              </div>

              <div>
                <img
                  src="https://i.ibb.co/Ss1YLcR/image-3377.png"
                  alt="previewImage"
                  className="w-[54px] h-[54px] object-cover rounded-[4px]"
                />
              </div>
              <div>
                <img
                  src="https://i.ibb.co/Ss1YLcR/image-3377.png"
                  alt="previewImage"
                  className="w-[54px] h-[54px] object-cover rounded-[4px]"
                />
              </div> */}
              {previewData.map((item, index) => (
                <div key={`${item.name}-${index}`}>
                  <img
                    src={item.image_url}
                    alt="previewImage"
                    className="w-[54px] h-[54px] object-cover rounded-[4px]"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="absolute bottom-20 w-[258px] h-[32.8px] bg-transparent   px-[9px]">
            <div className="flex  items-center gap-[3px]">
              <Image
                src={
                  brandLogos?.length > 0
                    ? brandLogos[0]
                    : `${IMAGE_URL}/assets/admanager/Oval.svg`
                }
                width={21}
                height={21}
                alt="img"
                className="rounded-[4px]"
              />
              <div>
                <div className="text-[#ffffff] font-semibold text-[10px] leading-[10.86px] flex gap-[3px]">
                  {brandName}
                  <svg
                    width="10"
                    height="10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.757 8.907a3.648 3.648 0 1 0 0-7.296 3.648 3.648 0 0 0 0 7.296Zm1.894-4.55a.274.274 0 0 0-.39-.384L4.278 5.985l-.785-.796a.274.274 0 0 0-.39.384l.98.994a.274.274 0 0 0 .39 0l2.178-2.21Z"
                      fill="#fff"
                    />
                  </svg>
                </div>

                {/* <p className="text-[#ffffff] font-bold text-[6.64px] leading-[7.92px]">
                  Sponsored
                </p> */}
              </div>
            </div>

            <button className="mx-auto bg-white w-[208px] h-[29px] rounded-[4.38px] text-black text-start pl-2 text-[12px] leading-[6.57px] font-semibold mt-2">
              {actionLabel} Shop Now
            </button>
            <p className="text-[10px] leading-[7.88px] text-white mt-2 w-[187px] truncate">
              {descriptions}
            </p>

            <div className="w-[52px] h-[18px] mt-2 font-medium text-[6px] bg-[#271C16] rounded-xl text-white text-center flex items-center justify-center">
              Sponsored
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstaShoppingReel;
