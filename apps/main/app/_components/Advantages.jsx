/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import "../index.css";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Advantages = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const goToLogin = () => {
    router.push("apphome/login");
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const items = [
    {
      imgUrl: `${IMAGE_URL}/assets/images/home/WhyNYX1.svg`,
      title: "Advance AI",
      description:
        "Nyx transforms vision into engaging reality with its predictive and generative AI.",
    },
    {
      imgUrl: `${IMAGE_URL}/assets/images/home/WhyNYX2.svg`,
      title: "Easy to use",
      description:
        "NYX is simple to use and a no-code platform, ensuring accessibility for all.",
    },
    {
      imgUrl: `${IMAGE_URL}/assets/images/home/WhyNYX3.svg`,
      title: "Amplify Returns",
      description:
        "With personalised and highly likeable content, NYX elevates conversion exponentially.",
    },
  ];

  return (
    <div className="bg-[#130625] h-[1300px] md:h-[1147px] overflow-hidden advantage_section">
      <div
        className="z-10 w-full h-full relative flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
        }}
      >
        <div className="z-20 flex justify-center relative top-[80px] ">
          <h3 className="text-white text-[24px] md:text-[36px] xl:text-[54px] font-bold">
            Why NYX?
          </h3>
        </div>
        <div className="block md:flex flex-row items-center justify-center relative z-30 opacity-100 top-[140px] md:top-[200px] gap-[102px] md:gap-[30px] xl:gap-[102px] md:px-4 xl:px-0">
          {items.map((item, index) => (
            <div key={index} className="">
              <div className="flex flex-col gap-1">
                <div className="flex justify-center why_nyx_sec_img">
                  <Image
                    src={item.imgUrl}
                    alt={item.title}
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px] hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <div className="text-center flex flex-col gap-3 mb-[40px]">
                  <div className="text-[20px] md:text-[24px] xl:text-[31px] text-white font-semibold mt-4 md:mt-[49px]">
                    {item.title}
                  </div>
                  <div className="w-[309px] md:w-auto xl:w-[309px] text-[12px] h-[60px] md:h-[96px] md:text-[14px] xl:text-[18px] mx-auto text-white font-normal">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex flex-col items-center justify-center">
          <div className="bg-[#130625] w-full md:w-auto md:bg-transparent absolute bottom-0 py-[50px] md:py-[100px] lg:top-[700px] text-white">
            <div className="w-full  md:w-[720px] flex justify-center items-center mt-10">
              <p className=" font-semibold text-[24px] text-wrap md:text-[54px] text-center max-md:px-[40px]">
                Content conversion just became easier with AI
              </p>
            </div>
            <div className="mt-8 mb-10 flex justify-center">
              <button
                className="text-[14px] md:text-[18px] px-[32px] py-[6px md:py-[12pxpx] h-[36px] md:h-[52px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
                onClick={goToLogin}
              >
                Start for free
              </button>
              {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
            </div>
          </div>
        </div>
        <div className="hidden md:flex z-20 absolute top-0 ">
          <svg
            width="582"
            height="611"
            viewBox="0 0 582 611"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1604_9600)">
              <path
                d="M480.239 421.442C480.239 520.738 54.8675 508.207 -44.4295 508.207C-143.726 508.207 -80.5184 494.018 -80.5184 394.721C-80.5184 295.425 -122.824 98.1367 -23.5273 98.1367C75.7697 98.1367 480.239 322.146 480.239 421.442Z"
                fill="#5C12C8"
                fillOpacity="0.67"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1604_9600"
                x="-201.646"
                y="-3.16328"
                width="783.185"
                height="613.18"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="50.65"
                  result="effect1_foregroundBlur_1604_9600"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="hidden md:flex z-10 absolute top-0 md:left-[223.73px] ">
          <svg
            width="831"
            height="630"
            viewBox="0 0 831 630"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1604_9599)">
              <path
                d="M707.483 -164.539C707.483 -15.0365 787.278 482.24 637.776 482.24C488.274 482.24 101.729 603.085 101.729 453.583C101.729 304.08 264.971 229.009 414.473 229.009C563.976 229.009 707.483 -314.041 707.483 -164.539Z"
                fill="url(#paint0_linear_1604_9599)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1604_9599"
                x="0.428513"
                y="-291.878"
                width="829.626"
                height="921.545"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="50.65"
                  result="effect1_foregroundBlur_1604_9599"
                />
              </filter>
              <linearGradient
                id="paint0_linear_1604_9599"
                x1="520.26"
                y1="256.272"
                x2="448.615"
                y2="904.064"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="1" stopColor="#661284" />
                <stop offset="1" stopColor="#17041E" stopOpacity="0.53" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="hidden md:flex z-10 absolute top-0 right-0 whyNyx_bg_img">
          <svg
            width="1007"
            height="737"
            viewBox="0 0 1007 737"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1604_9601)">
              <path
                d="M1040.91 359.14C906.694 540.343 560.536 477.083 400.282 358.388C240.028 239.693 218.916 -3.42224 353.127 -184.625C487.339 -365.829 726.05 -416.501 886.304 -297.806C1046.56 -179.111 1175.12 177.937 1040.91 359.14Z"
                fill="url(#paint0_linear_1604_9601)"
                fillOpacity="0.8"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1604_9601"
                x="0.899811"
                y="-625.875"
                width="1360.01"
                height="1362.25"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="131.95"
                  result="effect1_foregroundBlur_1604_9601"
                />
              </filter>
              <linearGradient
                id="paint0_linear_1604_9601"
                x1="927.972"
                y1="-215.524"
                x2="366.271"
                y2="217.46"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.240197"
                  stopColor="#81186A"
                  stopOpacity="0.15"
                />
                <stop
                  offset="0.868938"
                  stopColor="#5227BB"
                  stopOpacity="0.41"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
