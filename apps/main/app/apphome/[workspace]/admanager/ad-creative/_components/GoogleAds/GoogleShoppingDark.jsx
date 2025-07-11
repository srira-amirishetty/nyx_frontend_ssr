/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../custom.css";

const GoogleShoppingDark = ({
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
  googlePreviewData,
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

    infinite: false,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    autoplay: "true",
    pauseOnHover: false,
  };

  const images = [
    "https://i.ibb.co/ngSf1gV/image-2.png",
    "https://i.ibb.co/ngSf1gV/image-2.png",
    "https://i.ibb.co/ngSf1gV/image-2.png",
    "https://i.ibb.co/ngSf1gV/image-2.png",
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 bg-white">
        {googlePreviewData.length >= 4 ? (
          <>
            <div className="bg-[#1F1F1F]">
              <div className="w-[477px] h-[40px] bg-[#ECECEC]  flex items-center justify-between">
                <div className="flex items-center gap-[3px] px-[7px]">
                  {/* <svg
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
                  </svg> */}
                  <div>
                    <p className="text-[#969696] font-semibold text-[7.41px] leading-[10.26px]">
                      Google
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

              <div className="w-[477px] h-auto   px-[9px]">
                <div className="flex items-center justify-between mt-4 mb-2">
                  <div className="font-semibold text-[12px] text-white">
                    Sponsored
                  </div>

                  <div>
                    <svg
                      width="4"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
                        fill="#9AA0A6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className=" h-[300px] w-[477px]  mt-1">
                {/* {mixedArray?.length > 0 ? (
            <div className="w-full">
              <Slider {...settings} className="w-full mx-2.5 adCreativeSlider">
                {mixedArray.map((item, index) => (
                  <div key={`instapost-${index}`}>
                    {item.type === "images" ? (
                      <img
                        src={item.signed_image_url}
                        alt="previewImage"
                        className="w-[258px] h-[258px] object-cover"
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
            </div>
          ) : null} */}

                <Slider
                  {...settings}
                  className="w-full mx-2.5 adCreativeSlider"
                >
                  {googlePreviewData?.map((item, index) => (
                    <div key={`${item?.name}-${index}`}>
                      <img
                        src={
                          item?.imageLink
                            ? item?.imageLink
                            : "https://i.ibb.co/vP9xNGn/Whats-App-Image-2024-11-23-at-22-26-19-191350ff.jpg"
                        }
                        alt="previewImage"
                        className="w-[143px] h-[168px] object-cover rounded-t-[12px]"
                      />

                      <div className="border border-[#3C4043] p-2 rounded-b-[12px] w-[143px] ">
                        <div
                          className="w-[125px] font-inter h-[40px] text-[12px] font-medium leading-[13.18px] tracking-[-0.0732px] text-left text-[#95C3FF] mt-2 line-clamp-3"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item?.title ? item?.title : "Unable to fetch title"}
                        </div>
                        <div className="font-inter text-[12px] h-[15px] font-bold leading-[14.52px] tracking-[0.0513px] text-left mt-1 text-[#67B890]">
                          ₹
                          {item?.price?.value
                            ? item?.price?.value
                            : "Unable to fetch price"}
                        </div>
                        <div className="font-inter text-[12px] h-[14px] font-semibold leading-[13.18px] tracking-[-0.0732px] text-left text-[#BDC1C6] mt-[6px]">
                          {item?.brand ? item?.brand : "brand not available"}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <div></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#1F1F1F]">
              <div className="w-auto h-[40px] bg-[#ECECEC]  flex items-center justify-between">
                <div className="flex items-center gap-[3px] px-[7px]">
                  {/* <svg
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
                  </svg> */}
                  <div>
                    <p className="text-[#969696] font-semibold text-[7.41px] leading-[10.26px]">
                      Google
                    </p>
                    <p className="text-[#000000] font-bold text-[7.41px] leading-[10.26px]">
                      Post
                    </p>
                  </div>
                </div>
                <div className="pr-3">
                  <input
                    type="checkbox"
                    checked={fbPostChecked}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="w-auto h-auto   px-[20px] ">
                <div className="flex items-center justify-between mt-4 mb-2">
                  <div className="font-semibold text-[12px] text-white">
                    Sponsored
                  </div>

                  <div>
                    <svg
                      width="4"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
                        fill="#9AA0A6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className=" h-[300px] w-auto  mt-1 flex flex-row gap-2 px-5">
                {googlePreviewData?.map((item, index) => (
                  <div key={`${item?.name}-${index}`}>
                    <img
                      src={
                        item?.imageLink
                          ? item?.imageLink
                          : "https://i.ibb.co/vP9xNGn/Whats-App-Image-2024-11-23-at-22-26-19-191350ff.jpg"
                      }
                      alt="previewImage"
                      className="w-[143px] h-[168px] object-cover rounded-t-[12px]"
                    />

                    <div className="border border-[#3C4043] p-2 rounded-b-[12px] w-[143px]">
                      <div
                        className="w-[125px] font-inter h-[40px] text-[12px] font-medium leading-[13.18px] tracking-[-0.0732px] text-left text-[#95C3FF] mt-2 line-clamp-3"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item?.title ? item?.title : "Unable to fetch title"}
                      </div>
                      <div className="font-inter text-[12px] h-[15px] font-bold leading-[14.52px] tracking-[0.0513px] text-left mt-1 text-[#67B890]">
                        ₹ 
                        {item?.price?.value
                          ? item?.price?.value
                          : "Unable to fetch price"}
                      </div>
                      <div className="font-inter text-[12px] h-[14px] font-semibold leading-[13.18px] tracking-[-0.0732px] text-left text-[#BDC1C6] mt-[6px]">
                        {item?.brand ? item?.brand : "brand not available"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Crousel */}

        {/* No Crousel */}
      </div>
    </>
  );
};

export default GoogleShoppingDark;
