/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../custom.css";

const InstaShoppingFeed = ({
  headlines,
  descriptions,
  captions,
  mixedArray,
  campainObjective,
  brandName,
  instaPostChecked,
  setInstaPostChecked,
  brandLogos,
  previewData,
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
    autoplay: "true",
    pauseOnHover: false,
  };
  // console.log("brandLogos-------", brandLogos[0]);
  return (
    <>
      <div className="flex flex-col  justify-center mt-4 bg-white">
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

        <div>
          <img
            src={`${IMAGE_URL}/assets/admanager/Insta%20banner.png`}
            alt="previewImage"
            className="w-[258px] h-[33px] object-cover"
          />
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
              <p className="text-[#0D0C0C] font-semibold text-[8.30px] leading-[10.86px]">
                {brandName}
              </p>
              <p className="text-[#6F6F6F] font-medium text-[8px] leading-[7.92px]">
                Sponsored
              </p>
            </div>
          </div>
          <p>...</p>
        </div>
        <div className="h-auto w-[258px] bg-white">
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

          <Slider {...settings} className="w-full mx-2.5 adCreativeSlider">
            {previewData.map((item, index) => (
              <div key={`${item.name}-${index}`}>
                <img
                  src={item.image_url}
                  alt="previewImage"
                  className="w-[258px] h-[273px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex flex-row justify-between  items-center w-[258px] px-2 mb-2">
          <div className=" font-semibold text-[12px]">Shop Now</div>
          <div>
            <svg
              width="6"
              height="11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.23 10.127A.736.736 0 0 1 0 9.596c0-.2.083-.39.23-.531l3.878-3.722L.23 1.622a.736.736 0 0 1-.22-.53.737.737 0 0 1 .23-.524.8.8 0 0 1 .547-.22.802.802 0 0 1 .552.21L5.77 4.813c.146.14.229.332.229.531 0 .2-.083.39-.23.532l-4.432 4.252a.8.8 0 0 1-.555.22.8.8 0 0 1-.554-.22Z"
                fill="#000"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white w-[258px] ">
          <img
            src={`${IMAGE_URL}/assets/admanager/Insta%20icons.png `}
            width={258}
            height={24}
            alt="img"
          />
        </div>
        {/* <p className="text-[#000000] font-normal text-[7.84px] leading-[10.86px] mt-[10px]">
            Florasecret Ready to decorate your home with seasonal flower
            bouquets?
          </p> */}
        <div
          className="w-[258px] font-semibold text-[10px] px-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          {brandName}
          <span className="font-medium ml-1 leading-[14px] ">{captions}</span>
        </div>

        {/* <p className="text-[#000000] font-normal text-[7.84px] leading-[10.86px] mt-[10px]">
            {captions[0]}  
          </p> */}

        <div className="font-normal text-[10px] text-[#8E8E8E] px-2 mb-2">
          {" "}
          View all Comments
        </div>
      </div>
    </>
  );
};

export default InstaShoppingFeed;
