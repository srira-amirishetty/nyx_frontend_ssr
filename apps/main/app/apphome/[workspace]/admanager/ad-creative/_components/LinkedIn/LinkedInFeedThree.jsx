/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../custom.css";

const LinkedInFeedThree = ({
  headlines,
  descriptions,
  captions,
  linkedinFeedThreeChecked,
  setLinkedinFeedThreeChecked,
  campaingSiteUrl,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  mixedArray,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setLinkedinFeedThreeChecked(event.target.checked);
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
  console.log("---------", driveClickedArray);
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 ">
        <div className="relative w-[213px] h-auto bg-[#FFFFFF] ">
          <div className="absolute top-2 right-2">
            <div className="">
              <input
                type="checkbox"
                id="linkedinFeedThreeChecked"
                checked={linkedinFeedThreeChecked}
                onChange={handleCheckboxChange}
                className="custom-checkbox"
              />
              <label for="linkedinFeedThreeChecked"></label>
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

          <div className="w-full h-[212px] max-w-[213px]">
            {mixedArray?.length > 0 ? (
              <div className="w-full">
                <Slider
                  {...settings}
                  className="w-full mx-2.5 adCreativeSlider"
                >
                  {mixedArray.map((item, index) => (
                    <div key={`instapost-${index}`}>
                      {item.type === "images" ? (
                        <img
                          src={item.signed_image_url}
                          alt="previewImage"
                          className="w-[258px] h-[212px] object-cover"
                        />
                      ) : item.type === "videos" ? (
                        <video
                          src={item.signed_video_url}
                          controls={false}
                          className="w-[258px] h-[212px] object-cover"
                          loop={false}
                          autoPlay={true}
                          muted
                        />
                      ) : null}
                    </div>
                  ))}
                </Slider>
              </div>
            ) : null}
          </div>

          <div className="bg-[#fff] border-[0.42px] border-[#DADDE1] mx-[9px] h-[28px] flex items-center justify-between px-[9px] py-[6px]">
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

export default LinkedInFeedThree;
