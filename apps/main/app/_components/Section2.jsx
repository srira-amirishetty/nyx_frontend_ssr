/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Section2 = ({
  title,
  description,
  descriptionMain,
  imageUrl,
  imageUrl1,
  imageUrl2,
  imageUrl3,
  card1Title,
  card1SubTitle,
  card1Description,
  card2Title,
  card2SubTitle,
  card2Description,
  card3Title,
  card3SubTitle,
  card3Description,
  link,
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
    <div className="bg-[#130625] px-[20px] lg:w-full h-full flex flex-col overflow-hidden section_padding">
      {/* product section */}
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="relative mt-[100px]  lg:-left-[150px]">
          <Image
            src={imageUrl}
            width={380}
            height={320}
            alt="Unable to load"
            className="lg:shrink-0 lg:p-[50px] w-[380px] h-[320px] md:w-[620px] md:h-[612px] lg:w-[450px] lg:h-[450px] xl:w-[620px] xl:h-[620px] lg:ml-[100px] xl:ml-[0px]"
          />
        </div>
        <div className="flex flex-col mt-5 lg:mt-0 md:w-[620px] xl:w-auto">
          <div className="relative  w-full h-[100px] lg:w-[419px] lg:h-[280px]">
            {/* title */}
            <div className="text-white">
              <h3 className="text-[24px] md:text-[48px] lg:text-[54px] font-bold bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent">
                {title}
              </h3>

              {/* underline */}
              <div className="w-[171.5px] md:w-[400px] lg:w-full border-[0.87px] lg:border-b-2 border-transparent relative mt-[8.73px] lg:mt-5">
                <div className="absolute bottom-0 left-0 w-full h-[0.87px] lg:h-[2px] bg-gradient-to-r from-[#B631B1] to-[#7048D7]"></div>
              </div>
            </div>

            {/* description */}

            <div className="text-white text-[12px]  md:text-[14px] lg:text-[18px] mt-3 md:mt-[24px] lg:mt-8 font-normal">
              {/* <p className="">{descriptionMain}</p> */}
              {description}
            </div>

            {/* know more button */}
            <div className="mt-4 md:mt-8">
              <Link href={`${link}`}>
                <span className="flex items-center justify-center text-[12px] md:text-[18px] h-[36px] w-[116px] md:h-[52px] md:w-[172px] px-5 py-2 md:font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition">
                  Know more
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="mt-[40px] md:mt-[149px] lg:mt-[0px] mb-[10rem] lg:mb-[12rem]">
        <div className="flex items-center justify-center relative top-[84px] md:top-[70px] w-full md:h-auto  md:w-[60%] md:left-[50%] md:translate-x-[-50%] xl:w-full xl:left-[0%] xl:translate-x-[0%] ">
          <div className="flex flex-wrap md:flex-nowrap xl:flex-wrap flex-col md:flex-row justify-center gap-[18px] md:gap-4 xl:gap-8 ">
            {/* card - 1 */}
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
              }}
              className="w-full h-[170px] md:w-[245px] md:h-auto xl:w-[365px] border-2 border-transparent rounded-[16px]"
            >
              <div className="relative flex flex-row md:flex-col p-[18px] md:p-0  items-center gap-[18px] md:gap-[0px]">
                <Image
                  src={imageUrl1}
                  width={140}
                  height={144}
                  alt="Unable to load"
                  className="w-[140px] h-[144px] md:w-[245px] md:h-[245px] xl:w-[365px] xl:h-[350px] rounded-[10px]"
                />
                <div className="p-0 md:px-[16px] md:py-6 xl:p-6">
                  <div className="w-[140px] h-auto md:w-[90%] md:h-[76px] -mt-4">
                    <div className="text-white  font-light">
                      <div className="flex flex-wrap leading-5 md:leading-8">
                        <div className="w-[80%] text-[12px] md:text-[18px] xl:text-[24px] md:mt-[23.76px] font-normal card_para_font10">
                          {card1Title}{" "}
                        </div>

                        <div className="font-bold text-[16px] md:text-[22px] xl:text-[31px] card_para_font12">
                          {card1SubTitle}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-auto xl:w-[310px] xl:h-[112px] text-white text-[12px] md:text-[14px] mt-3 md:mt-6 xl:text-[18px] leading-[14px] md:leading-[22px] xl:leading-[30px] font-normal card_para_font10">
                    <p>{card1Description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* card - 2 */}
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
              }}
              className="w-full h-[170px] md:w-[245px] md:h-auto xl:w-[365px] border-2 border-transparent rounded-[16px]"
            >
              <div className="relative flex flex-row md:flex-col p-[18px] md:p-0  items-center gap-[18px] md:gap-[0px]">
                <Image
                  src={imageUrl2}
                  width={140}
                  height={144}
                  alt="Unable to load"
                  className="w-[140px] h-[144px] md:w-[245px] md:h-[245px] xl:w-[365px] xl:h-[350px] rounded-[10px]"
                />
                <div className="p-0 md:px-[16px] md:py-6 xl:p-6">
                  <div className="w-[140px] h-auto md:w-[90%] md:h-[76px] -mt-4">
                    <div className="text-white  font-light">
                      <div className="flex flex-wrap leading-5 md:leading-8">
                        <div className="w-[80%] text-[12px] font-normal md:text-[18px] xl:text-[24px] md:mt-[23.76px] card_para_font10">
                          {card2Title}
                        </div>
                        <div className="font-bold  text-[16px] md:text-[22px] xl:text-[31px] card_para_font12">
                          {card2SubTitle}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="  w-full h-auto xl:w-[310px] xl:h-[112px] text-white mt-3 md:mt-6 text-[12px] md:text-[14px] xl:text-[18px] leading-[14px] md:leading-[22px] xl:leading-[30px]  font-normal card_para_font10">
                    <p>{card2Description}</p>
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
              className="w-full h-[170px] md:w-[245px] md:h-auto xl:w-[365px] border-2 border-transparent rounded-[16px]"
            >
              <div className="relative flex flex-row md:flex-col p-[18px] md:p-0  items-center gap-[18px] md:gap-[0px]">
                <Image
                  src={imageUrl3}
                  width={140}
                  height={144}
                  alt="Unable to load"
                  className="w-[140px] h-[144px] md:w-[245px] md:h-[245px] xl:w-[365px] xl:h-[350px] rounded-[10px]"
                />
                <div className="p-0 md:px-[16px] md:py-6 xl:p-6">
                  <div className="w-[140px] h-auto md:w-[90%] md:h-[76px] -mt-4">
                    <div className="text-white  font-light">
                      <div className="flex flex-wrap leading-5 md:leading-8">
                        <div className="w-[80%] text-[12px] md:text-[18px] xl:text-[24px] md:mt-[23.76px] font-normal card_para_font10">
                          {card3Title}{" "}
                        </div>

                        <div className="font-bold text-[16px] md:text-[22px] xl:text-[31px] card_para_font12">
                          {card3SubTitle}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-auto xl:w-[310px] xl:h-[112px] text-white text-[12px] md:text-[14px] mt-3 md:mt-6 xl:text-[18px] leading-[14px] md:leading-[22px] xl:leading-[30px] font-normal card_para_font10">
                    <p>{card3Description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* try it out button */}
        <div className="flex justify-center lg:mt-[144px] lg:-mb-[80px]">
          <div className=" items-center justify-center relative hidden lg:block">
            <button
              className="px-[1px] py-[1px] rounded-full bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border w-52 "
              onClick={goToLogin}
            >
              <span className="flex px-[32px] py-[14px] w-full h-[52px] items-center justify-center rounded-full bg-[#311853] hover:bg-[#2F2546] buttonShadowTransition">
                <span className="text-[18px] font-normal text-white ">
                  Try it out
                </span>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div>
        </div>

        {/* try it out button for mobile */}
        <div className="flex justify-center">
          <div className=" items-center justify-center relative top-[100px] lg:top-[150px] block lg:hidden">
            <button
              className="px-[1px] py-[1px] rounded-full bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border w-52"
              onClick={goToLogin}
            >
              <span className="flex px-[16px] md:px-[32px] w-full h-[36px] md:h-[52px] items-center justify-center rounded-full bg-[#23113c] back buttonShadowTransition">
                <div className="text-[14px] font-normal text-white ">
                  Try {title}
                </div>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
