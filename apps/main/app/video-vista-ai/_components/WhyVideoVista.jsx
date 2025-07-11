/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import "../index.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const WhyVideoVista = () => {
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
  return (
    <div className="bg-[#130625] flex flex-col h-full">
      {/* background effect */}
      <div className="relative">
        <div className="hidden md:flex md:absolute md:top-0 md:left-0">
          <svg
            width="680"
            height="1176"
            viewBox="0 0 680 1176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1145_6427)">
              <path
                d="M413.699 664.05C391.043 841.272 113.371 929.74 -52.1187 908.584C-217.608 887.427 -333.398 726.61 -310.741 549.388C-288.085 372.167 -135.563 245.651 29.9266 266.807C195.416 287.963 436.356 486.828 413.699 664.05Z"
                fill="url(#paint0_linear_1145_6427)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1145_6427"
                x="-577.473"
                y="0.5961"
                width="1256.56"
                height="1174.97"
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
                  result="effect1_foregroundBlur_1145_6427"
                />
              </filter>
              <linearGradient
                id="paint0_linear_1145_6427"
                x1="94.2011"
                y1="308.03"
                x2="-102.288"
                y2="829.388"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D327AE" stopOpacity="0" />
                <stop
                  offset="0.868938"
                  stopColor="#4A20B3"
                  stopOpacity="0.76"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-[24px] md:text-[32px] xl:text-[54px] mt-[100px] mb-[48px] md:mb-[63.5px] font-semibold ">
        Why VideoVista AI?
      </div>

      {/* cards */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-[42px] md:gap-9">
          {/* card - 1 */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
            }}
            className="w-[210px] h-[210px] md:w-[226px] md:h-[226px]  xl:w-[367px] xl:h-[367px] border-2 border-solid 
            border-transparent hover:border-[#B631B1] rounded-[16px] transition 
            duration-1000 ease-in-out"
          >
            <div className="relative flex flex-row md:flex-col p-[18px] md:p-0">
              <div className="md:py-8 md:px-4 xl:px-8 xl:pb-8  xl:pt-[44px]">
                <div className="w-full md:-mt-4">
                  <div className="text-white text-[16px] md:text-[20px] xl:text-[31px] font-light">
                    <div className="flex justify-end">
                      <Image
                        src={`${IMAGE_URL}/assets/images/home/whyVideoIcon1.png`}
                        width={80}
                        height={80}
                        alt=" whyVideoIcon1"
                        className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]"
                      />
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-full">Speed and</div>
                      <div className="font-bold w-full">Efficiency</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto xl:w-[310px] md:h-[112px] text-white text-[12px] md:text-[16px] xl:text-[18px] mt-[11px] md:mt-6 font-light">
                  <p>
                    Create videos in minutes, not days. Our streamlined process
                    saves time and effort.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
            }}
            className="w-[210px] h-[210px] md:w-[226px] md:h-[226px]  xl:w-[367px] xl:h-[367px] border-2 border-solid 
            border-transparent hover:border-[#B631B1] rounded-[16px] transition 
            duration-1000 ease-in-out"
          >
            <div className="relative flex flex-row md:flex-col p-[18px] md:p-0">
              <div className="md:py-8 md:px-4 xl:px-8 xl:pb-8  xl:pt-[44px]">
                <div className="w-full md:-mt-4">
                  <div className="text-white text-[16px] md:text-[20px] xl:text-[31px] font-light">
                    <div className="flex justify-end">
                      <Image
                        src={`${IMAGE_URL}/assets/images/home/whyVideoIcon2.png`}
                        width={80}
                        height={80}
                        alt=" whyVideoIcon2"
                        className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div>Quality</div>
                      <div className="font-bold">Assurance</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto xl:w-[310px] md:h-[112px] text-white text-[12px] md:text-[16px] xl:text-[18px] mt-[11px] md:mt-6 font-light">
                  <p>
                    AI precision ensures professional results. No more amateur
                    videos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
            }}
            className="w-[210px] h-[210px]  md:w-[226px] md:h-[226px]  xl:w-[367px] xl:h-[367px]  border-2 border-solid 
            border-transparent hover:border-[#B631B1] rounded-[16px] mb-10 transition 
            duration-1000 ease-in-out"
          >
            <div className="relative flex flex-row md:flex-col p-[18px] md:p-0">
              <div className="md:py-8 md:px-4 xl:px-8 xl:pb-8  xl:pt-[44px]">
                <div className="w-full md:-mt-4">
                  <div className="text-white text-[16px] md:text-[20px] xl:text-[31px] font-light">
                    <div className="flex justify-end">
                      <Image
                        src={`${IMAGE_URL}/assets/images/home/whyVideoIcon3.png`}
                        width={80}
                        height={80}
                        alt=" whyVideoIcon3"
                        className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]"
                      />
                    </div>
                    <div className="flex flex-wrap">
                      <div>Unmatched</div>
                      <div className="font-bold">Affordability</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto xl:w-[310px] md:h-[112px] text-white text-[12px] md:text-[16px] xl:text-[18px] mt-[11px] md:mt-6 font-light">
                  <p>
                    Unlock creativity without breaking the bank. No expensive
                    production teams needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-white">
          <div className="flex justify-center items-center w-[309px] md:w-[700px] xl:w-[1222.12px] mt-[100px] md:mt-[130px]">
            <p className=" font-semibold  text-[24px] md:text-[32px] xl:text-[54px] text-center leading-[39.01px] md:leading-[52px] xl:leading-[65.01px] px-0 lg:px-[80px]">
              Unleash VideoVista AI to turn your ideas into stunning videos.
            </p>
          </div>
          <div className="flex justify-center mt-[29px] md:mt-[54px] mb-[60px] md:mb-[100px]">
            <button
              className="text-[14px] md:text-[16px] px-[32px]  h-[36px] md:h-[52px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition z-10"
              onClick={goToLogin}
            >
              Book a Demo
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyVideoVista;
