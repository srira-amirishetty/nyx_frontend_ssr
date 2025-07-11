/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../custom.css";

const FbStoriesCarousel = ({
  headlines,
  descriptions,
  campaingSiteUrl,
  captions,
  fbStoryChecked,
  setFbStoryChecked,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  mixedArray,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setFbStoryChecked(event.target.checked);
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
    dots: true,
    className: "center",
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
                Stories(image)
              </p>
            </div>
          </div>

          <div className="pr-3">
            <input
              type="checkbox"
              id="fbStoryChecked"
              checked={fbStoryChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox"
            />
            <label for="fbStoryChecked"></label>
          </div>
        </div>

        <div className="bg-black  relative">
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
          <div className="w-[258px] h-auto bg-transparent flex items-center justify-between pt-3 pb-1 px-[9px]">
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
                <p className="text-[#fff] font-semibold text-[7.84px] leading-[10.86px]">
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
            <p className="flex items-center gap-[3px] text-white ">
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
                    fill="#fff"
                  />
                </svg>
              </span>
            </p>
          </div>

          <div className=" h-[414px] w-[258px] bg-white">
            {mixedArray?.length > 0 && driveClickedArray.length > 0 ? (
              <div className="w-full">
                <Slider {...settings} className="w-full storiesSlider">
                  {driveClickedArray.map((item, index) => (
                    <div key={`instapost-${index}`}>
                      {item.type === "images" ? (
                        <img
                          src={item.signed_image_url}
                          alt="previewImage"
                          className="w-[258px] h-[414px] object-cover"
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

export default FbStoriesCarousel;
