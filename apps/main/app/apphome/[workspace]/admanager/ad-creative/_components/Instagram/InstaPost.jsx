/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../custom.css";

const InstaImageCarousel = ({
  headlines,
  descriptions,
  captions,
  mixedArray,
  campainObjective,
  brandName,
  instaPostChecked,
  setInstaPostChecked,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setInstaPostChecked(event.target.checked);
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
    autoplay: false,
    pauseOnHover: false,
    adaptiveHeight: true,
  };
  // console.log("brandLogos-------", brandLogos[0]);
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
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
                Post
              </p>
            </div>
          </div>
          <div className="pr-3">
            <input
              type="checkbox"
              id="instaPostChecked"
              checked={instaPostChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="instaPostChecked"></label>
          </div>
        </div>

        <div className="w-[258px] h-[32.8px] bg-[#FFFFFF] flex items-center justify-between  px-[9px]">
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
              <p className="text-[#000000] font-bold text-[6.64px] leading-[7.92px]">
                Sponsored
              </p>
            </div>
          </div>
          <p>...</p>
        </div>
        <div className="max-h-[258px] h-auto w-[258px] bg-white">
          {mixedArray?.length > 0 ? (
            <div className="w-full ">
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
                          className="w-[258px] h-auto"
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

        <div className="bg-white w-[258px] px-3 py-2">
          <img
            src={`${IMAGE_URL}/assets/admanager/Frame 1707484509.svg`}
            width={222}
            height={12}
            alt="img"
          />
          {/* <p className="text-[#000000] font-normal text-[7.84px] leading-[10.86px] mt-[10px]">
            Florasecret Ready to decorate your home with seasonal flower
            bouquets?
          </p> */}

          <p className="text-[#000000] font-normal text-[7.84px] leading-[10.86px] mt-[10px]">
            {captions[0]}
          </p>
        </div>
      </div>
    </>
  );
};

export default InstaImageCarousel;
