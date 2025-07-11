/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { useRouter } from "next/navigation";

const Section = ({
  card1Title,
  card1Subtitle,
  card1Description,
  card2Title,
  card2Subtitle,
  card2Description,
  card3Title,
  card3Subtitle,
  card3Description,
}) => {
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
    <div className="bg-[#130625] px-[20px] md:w-full h-full flex flex-col overflow-hidden">
      {/* product section */}
      <h1 className="flex flex-col lg:flex-row items-center justify-center text-white text-[24px] md:text-[40px] xl:text-[54px] mt-[24px] mb-[48px] md:mt-[82px] md:mb-[65px] font-semibold">
        Discover Our Toolset
      </h1>

      {/* cards */}
      <div className="flex items-center justify-center w-full mb-[86px] xl:mb-[83.27px]">
        <div className="flex flex-col xl:flex-row justify-center gap-8 flex-wrap">
          {/* card - 1 */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
            }}
            className="relative  w-[320px] h-[200px] md:w-[710px] md:h-[435px] xl:w-[367px] xl:h-[710px] p-[18px] xl:p-0 border-2 border-solid 
          border-transparent hover:border-[#B631B1] rounded-[16px] mb-0 md:mb-11 transition 
          duration-1000 ease-in-out pr-0  md:flex md:items-center xl:block"
          >
            <div className="flex flex-row md:items-center gap-0 md:gap-[39px] xl:gap-0 xl:flex-col">
              <Image
                src={`${IMAGE_URL}/assets/images/home/VideoVista1.png`}
                width={143}
                height={152}
                alt="Unable to load"
                className="w-[143.34px] h-[152.13px] md:w-[310px] md:h-[320px] xl:w-full xl:h-[320px] rounded-[10px]"
              />
              <div className="ml-[14px] md:ml-0 xl:ml-[14px] md:pr-4 xl:pr-0">
                <div className="w-full h-auto xl:w-full xl:h-[76px]">
                  <div className="text-white">
                    <div className="flex flex-col xl:px-[27.25px] xl:mt-[34.78px]">
                      <div className="text-[12px] md:text-[31px] xl:text-[25px] font-light xl:font-normal -mb-1">
                        <p>{card1Title}</p>
                      </div>
                      <div className="font-bold text-[14px] md:text-[31px] -mb-1">
                        <p>{card1Subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="w-full h-auto xl:h-[112px] xl:px-[27.25px] mt-[10px] xl:mt-[24px]
              text-white text-[12px] md:text-[18px] md:leading-[26px] lg:text-[18px] font-normal leading-4 
              xl:leading-7 lg:leading-8"
                >
                  <p className="">{card1Description}</p>
                </div>
                <div className="absolute bottom-3 xl:bottom-10">
                  <div className="relative flex w-[104px] h-[36px]  xl:w-[136px] xl:h-[30px] xl:ml-[27.25px]">
                    <button
                      className="absolute top-0 md:top-[-50px] xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                  bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r "
                      onClick={goToLogin}
                    >
                      <span
                        className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[36px] md:w-[176px] md:h-[40px]
                       xl:h-[52px] rounded-full bg-[#261936] 
                    hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
                      >
                        <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium">
                          Coming Soon
                        </span>
                      </span>
                    </button>
                    {
                      <Waitlist
                        onClose={closePopup}
                        isPopupOpen={isPopupOpen}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end of card 1 */}

          {/* card - 2 */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
            }}
            className="relative  w-[320px] h-[200px] md:w-[710px] md:h-[435px] xl:w-[367px] xl:h-[710px] p-[18px] xl:p-0 border-2 border-solid 
          border-transparent hover:border-[#B631B1] rounded-[16px] mb-0 xl:mb-11 transition 
          duration-1000 ease-in-out pr-0 md:flex md:items-center xl:block"
          >
            <div className="flex flex-row md:items-center gap-0 md:gap-[39px] xl:gap-0 xl:flex-col">
              <Image
                src={`${IMAGE_URL}/assets/images/home/VideoVista2.png`}
                width={143}
                height={152}
                alt="Unable to load"
                className="w-[143.34px] h-[152.13px] md:w-[310px] md:h-[320px] xl:w-full xl:h-[320px] rounded-[10px]"
              />
              <div className="ml-[14px] md:ml-0 xl:ml-[14px] md:pr-4 xl:pr-0">
                <div className="w-full h-auto xl:w-full xl:h-[76px]">
                  <div className="text-white">
                    <div className="flex flex-col xl:px-[27.25px] xl:mt-[34.78px]">
                      <div className="text-[12px] md:text-[31px] xl:text-[25px] font-light xl:font-normal -mb-1">
                        <p>{card2Title}</p>
                      </div>
                      <div className="font-bold text-[14px] md:text-[31px] -mb-1">
                        <p>{card2Subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="w-full h-auto xl:h-[112px] xl:px-[27.25px] mt-[10px] xl:mt-[24px]
                text-white text-[12px] md:text-[18px] md:leading-[26px]  lg:text-[18px] font-normal leading-4 
                xl:leading-7 lg:leading-8"
                >
                  <p className="">{card2Description}</p>
                </div>
                <div className="absolute bottom-3 xl:bottom-10">
                  <div className="relative flex w-[104px] h-[36px]  xl:w-[136px] xl:h-[30px] xl:ml-[27.25px]">
                    <button
                      className="absolute top-0 md:top-[-50px] xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r"
                      onClick={goToLogin}
                    >
                      <span
                        className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[36px] md:w-[176px] md:h-[40px]
                      xl:h-[52px] rounded-full bg-[#261936] 
                   hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
                      >
                        <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium ">
                          Coming Soon
                        </span>
                      </span>
                    </button>
                    {
                      <Waitlist
                        onClose={closePopup}
                        isPopupOpen={isPopupOpen}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card - 3 */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
            }}
            className="relative  w-[320px] h-[200px] md:w-[710px] md:h-[435px] xl:w-[367px] xl:h-[710px] p-[18px] xl:p-0 border-2 border-solid 
          border-transparent hover:border-[#B631B1] rounded-[16px] mb-0 xl:mb-11 transition 
          duration-1000 ease-in-out pr-0 md:flex md:items-center xl:block"
          >
            <div className="flex flex-row md:items-center gap-0 md:gap-[39px] xl:gap-0 xl:flex-col">
              <Image
                src={`${IMAGE_URL}/assets/images/home/VideoVista4.png`}
                width={143}
                height={152}
                alt="Unable to load"
                className="w-[143.34px] h-[152.13px] md:w-[310px] md:h-[320px] xl:w-full xl:h-[320px] rounded-[10px]"
              />
              <div className="ml-[14px] md:ml-0 xl:ml-[14px] md:pr-4 xl:pr-0">
                <div className="w-full h-auto xl:w-full xl:h-[76px]">
                  <div className="text-white">
                    <div className="flex flex-col xl:px-[27.25px] xl:mt-[34.78px]">
                      <div className="text-[12px] md:text-[31px] xl:text-[25px] font-light xl:font-normal -mb-1">
                        <p>{card3Title}</p>
                      </div>
                      <div className="font-bold text-[14px] md:text-[31px] -mb-1">
                        <p>{card3Subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="w-full h-auto xl:h-[112px] xl:px-[27.25px] mt-[10px] xl:mt-[24px]
                text-white text-[12px] md:text-[18px] md:leading-[26px]  lg:text-[18px] font-normal leading-4 
                xl:leading-7 lg:leading-8"
                >
                  <p className="">{card3Description}</p>
                </div>
                <div className="absolute bottom-3 xl:bottom-10">
                  <div className="relative flex w-[104px] h-[36px]  xl:w-[136px] xl:h-[30px] xl:ml-[27.25px]">
                    <button
                      className="absolute top-0 md:top-[-50px] xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r"
                      onClick={goToLogin}
                    >
                      <span
                        className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[36px] md:w-[176px] md:h-[40px]
                      xl:h-[52px] rounded-full bg-[#261936] 
                   hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
                      >
                        <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium ">
                          Coming Soon
                        </span>
                      </span>
                    </button>
                    {
                      <Waitlist
                        onClose={closePopup}
                        isPopupOpen={isPopupOpen}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end of card 2 */}
        </div>
      </div>
      {/* end of cards */}
    </div>
  );
};

export default Section;
