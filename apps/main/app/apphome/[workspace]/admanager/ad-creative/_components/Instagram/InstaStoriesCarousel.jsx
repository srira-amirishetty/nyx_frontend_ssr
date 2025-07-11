/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../index.css";
import "../custom.css";

const InstaStoriesCarousel = ({
  headlines,
  descriptions,
  captions,
  mixedArray,
  instaStoryChecked,
  setInstaStoryChecked,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setInstaStoryChecked(event.target.checked);
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
    // dots: true,
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "0px",
    // slidesToShow: 1,
    // speed: 500,
    // autoplay: "true",
    // pauseOnHover: false,
    className: "center",
    dots: true,
    centerMode: true,
    infinite: false,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    autoplay: "true",
    pauseOnHover: false,
  };
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
                Stories(image)
              </p>
            </div>
          </div>

          <div className="pr-3">
            <input
              type="checkbox"
              id="instaStoryChecked"
              checked={instaStoryChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="instaStoryChecked"></label>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-16 left-[50%] transform translate-x-[-50%] z-10">
            <div className="w-[147px] h-[34px] bg-white rounded-[8px] flex items-center justify-center gap-[5px]">
              <div>
                <svg
                  width="24"
                  height="23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m10.139 15.508-1.606 1.471c-.42.398-.992.62-1.587.62a2.315 2.315 0 0 1-1.587-.62 2.06 2.06 0 0 1-.657-1.497c0-.562.236-1.1.657-1.498l4.118-3.893a2.297 2.297 0 0 1 1.52-.618 2.311 2.311 0 0 1 1.554.54l.11.086a.937.937 0 0 0 .644.245.935.935 0 0 0 .639-.258.831.831 0 0 0 .258-.608.834.834 0 0 0-.272-.602 2.631 2.631 0 0 0-.163-.18 4.196 4.196 0 0 0-2.801-.935 4.163 4.163 0 0 0-2.723 1.123l-4.172 3.894a3.712 3.712 0 0 0-1.07 2.675 3.73 3.73 0 0 0 1.19 2.63c.74.698 1.739 1.1 2.786 1.121a4.205 4.205 0 0 0 2.835-1.01l1.57-1.446a.829.829 0 0 0 .238-.584.83.83 0 0 0-.248-.582.943.943 0 0 0-1.233-.075Zm9.695-12.186a4.2 4.2 0 0 0-2.87-1.117 4.2 4.2 0 0 0-2.87 1.117l-1.57 1.446a.83.83 0 0 0-.238.585.83.83 0 0 0 .247.581.943.943 0 0 0 1.233.075l1.57-1.472c.42-.397.992-.62 1.587-.62s1.166.223 1.587.62c.421.397.657.936.657 1.498 0 .561-.236 1.1-.657 1.497l-4.118 3.894a2.298 2.298 0 0 1-1.52.618 2.311 2.311 0 0 1-1.554-.541l-.11-.086a.937.937 0 0 0-.644-.244.935.935 0 0 0-.638.257.831.831 0 0 0-.26.608.837.837 0 0 0 .273.603 4.205 4.205 0 0 0 3.01 1.111 4.173 4.173 0 0 0 2.722-1.12l4.127-3.893A3.738 3.738 0 0 0 21 6.037a3.732 3.732 0 0 0-1.166-2.715Z"
                    fill="#3576BF"
                  />
                </svg>
              </div>
              <p className="font-medium text-[#3576BF] ">{actionLabel}</p>
            </div>
          </div>
          {/* <img
            src={`${IMAGE_URL}/assets/admanager/Slider.svg`}
            width={189}
            height={19}
            alt="img"
            className="absolute top-2 inset-x-1/2 transform translate-x-[-50%]"
          /> */}
          <div className="absolute top-3 w-[258px] h-[32.8px] bg-transparent flex items-center justify-between  px-[9px]">
            <div className="flex  gap-[3px]">
              <Image
                src={`${IMAGE_URL}/assets/admanager/Oval.svg`}
                width={19}
                height={19}
                className="rounded-[4px]"
              />
              <div>
                <div className="text-[#ffffff] font-semibold text-[7.84px] leading-[10.86px]">
                  Nyx
                  <span className="ml-1 text-[6.85px] text-white opacity-[50%]">
                    23h
                  </span>
                </div>

                <p className="text-[#ffffff] font-bold text-[6.64px] leading-[7.92px]">
                  Sponsored
                </p>
              </div>
            </div>
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
                fill="#fff"
              />
            </svg>
          </div>

          <div className="h-[413px] w-[258px] bg-black">
            {mixedArray?.length > 0 && driveClickedArray.length > 0 ? (
              <div className="w-full">
                <Slider {...settings} className="w-full storiesSlider">
                  {driveClickedArray.map((item, index) => (
                    <div key={`instapost-${index}`}>
                      {item.type === "images" ? (
                        <img
                          src={item.signed_image_url}
                          alt="previewImage"
                          className="w-full h-[414px] object-cover"
                        />
                      ) : null}
                    </div>
                  ))}
                </Slider>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default InstaStoriesCarousel;
