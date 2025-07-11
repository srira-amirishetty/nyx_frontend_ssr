/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import "./index.css";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import zIndex from "@mui/material/styles/zIndex";
import Link from "next/link";

export * from "./constant";

export const TAIL_TITLE = (props: any) => {
  return (
    <div className={`${props.style} `}>
      <p style={{ zIndex: 20 }}>{props.title}</p>
    </div>
  );
};

export const TAIL_BUTTON = (props: any) => {
  return (
    <button
      className={`${props.style} inline-flex  justify-center items-center gap-3 p-2 cursor-pointer text-[14px] px-[0px] py-[5px] md:px-[0px] md:py-[10px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition`}
    >
      {props.children}
    </button>
  );
};

export const TAIL_BUTTON2 = (props: any) => {
  return (
    <button className="p-[1.5px]  md:h-[41px] rounded-full bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
      <span className="flex w-full h-full items-center justify-center rounded-full bg-[#250e35] hover:bg-[#2F2546] back ">
        <div className="text-[14px] font-normal text-white ">
          {props.children}
        </div>
      </span>
    </button>
  );
};

export const HOW_IT_WORKS = (props: any) => {
  const [indexTab, setIndex] = useState(0);

  const router = useRouter();

  const goToLogin = () => {
    router.push("apphome/login");
  };

  return (
    <div className="hw_works_section relative  md:px-[88px] lg:px-0 pb-[67px] overflow-hidden">
      <div className="absolute top-0 right-0">
        <Image
          src={`${IMAGE_URL}/assets/images/home/bg.png`}
          width={300}
          height={300}
          alt="icon"
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-[750px] xl:h-[500px]"
        />
      </div>
      <TAIL_TITLE
        title="Enhance Efficiency with NYX AI"
        style="text-white flex justify-center text-[20px] md:text-[32px] md:leading-[38px] pt-[40px] pb-[36px] md:pt-[100px] md:pb-[44px] lg:text-[40px] lg:leading-[58px]  font-bold text-center "
      ></TAIL_TITLE>
      <div className={`flex justify-center`}>
        <div className="flex lg:gap-[100px]  border-b border-white relative z-0 mb-[50px] max-sm:mx-4">
          {props.data.TABS.map((tab: any, index: number) => (
            <div
              onClick={() => setIndex(index)}
              className={classNames(
                `relative text-[13px] text-white md:text-lg lg:text-lg text-center  md:px-[55px] lg:px-2 p-2 cursor-pointer   `,
                index === indexTab
                  ? "z-10 text-white font-semibold"
                  : "text-white",
              )}
              key={`how-it-works-tabs-${index}`}
            >
              {index === indexTab && (
                <motion.span
                  layoutId="how-it-works"
                  className="rounded-[20px] overflow-hidden absolute z-10 left-0 -bottom-1.5 w-full"
                >
                  <span
                    className="block w-full h-1 border-[5px]"
                    style={{
                      borderImage:
                        "linear-gradient(to right, #B631B1, #7048d7)",
                      borderImageSlice: "1",
                      borderStyle: "solid",
                    }}
                  ></span>
                </motion.span>
              )}
              {tab}
            </div>
          ))}
        </div>
      </div>

      {props.data[props.data.TABS[indexTab]]?.map((info: any, index: any) => (
        <div
          key={`${info.title}-${index}`}
          className="flex md:items-center justify-center gap-6 md:gap-[65px] xl:gap-[100px] mt-[24px] lg:ml-[150px]"
        >
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            // className="relative bg-gradient-to-r from-[#B631B1] to-[#7048D7] flex justify-center items-center rounded-[14px]"
          >
            {/* <div className="absolute -top-1 -left-1 flex items-center justify-center bg-white rounded-full w-[22.92px] h-[22.92px] md:w-[44px] md:h-[44px]">
              <div className=" flex items-center justify-center rounded-full w-[18.92px] h-[18.92px] md:w-[40px] md:h-[40px] bg-gradient-to-r from-[#B631B1] to-[#7048D7]">
                <div className="text-white">
                  <p className="md:text-[24px] md:font-bold">{index + 1}</p>
                </div>
              </div>
            </div> */}
            {/* <div className="flex items-center justify-center">
              <Image
                src={info.svg}
                width={400}
                height={296}
                alt=""
                className="w-[146px] h-[112px] md:w-[300px] md:h-[220px]  xl:w-[400px] xl:h-[296px]"
              />
            </div> */}
            <div className="relative group flex items-center justify-center">
              {/* Image */}
              <Image
                src={info.svg}
                width={400}
                height={296}
                alt=""
                className="w-[146px] h-[112px] md:w-[300px] md:h-[220px] xl:w-[400px] xl:h-[296px] transition-opacity duration-300 ease-in-out group-hover:opacity-[20%]"
              />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <p className="text-white text-[14px] cursor-pointer  leading-[24px] md:text-[20px] font-semibold ">
                 <Link href={info.link}>
                 Know More
                 </Link>
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            className="flex flex-col  lg:text-left w-[180px] md:w-[278px] xl:w-[611px]"
          >
            <div className="">
              <p className="text-white font-[550] text-[14px] leading-[17px] md:text-[24px] md:leading-[30px] xl:text-[32px] xl:leading-[40px]">
                {info.title}
              </p>
            </div>
            <div className="">
              <p className="text-white pt-[6px] md:pt-2 font-[300] md:text-[18px] text-[13px] truncate-2-lines">
                {info.content}
              </p>
            </div>
            <div className="w-[111px] h-[36px] md:w-[178px] md:h-[48px] mt-[14px] xl:mt-[24px]">
              {/* <TAIL_BUTTON
                style="w-full font-medium text-[14px] xl:text-[18px]"
                onClick={goToLogin}
              >
                Try it out
              </TAIL_BUTTON> */}
              <button
                className={`w-full inline-flex  justify-center items-center gap-3 p-2 cursor-pointer text-[14px] xl:text-[18px] px-[0px] py-[5px] md:px-[0px] md:py-[10px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition`}
                onClick={goToLogin}
              >
                Try it out
              </button>
            </div>
          </motion.div>
        </div>
      ))}

      {/* <div className="flex justify-center mt-[102px] pb-[82px]">
        <button
          className="inline-flex  justify-center items-center gap-3 font-semibold   h-[36px] md:h-[52px] rounded-[30px] hover:border-none  bg-gradient-to-r from-[#B631B1] to-[#7048D7]  p-5 border-solid cursor-pointer text-white hover:shadow-buttonShadow buttonShadowTransition"
          onClick={goToLogin}
        >
          Try {props.data.TABS[indexTab]}
        </button>
        <Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />
      </div> */}
    </div>
  );
};

// Mobile view

export const HOW_IT_WORKS_MOBILE = (props: any) => {
  const [indexTab, setIndex] = useState(0);
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
    <div className="hw_works_section relative md:hidden px-[20px]">
      <div className="absolute top-0 right-0">
        <Image
          src={`${IMAGE_URL}/assets/images/home/bg.png`}
          width={733}
          height={647}
          alt="icon"
          className=""
        />
      </div>
      <TAIL_TITLE
        title="How it works?"
        style="text-white flex justify-center text-[13px] text-[24px] md:text-4xl py-[50px] md:p-[82px]"
      ></TAIL_TITLE>
      <div className={`flex justify-center `}>
        <div className="flex gap-0 sm:gap-8 border-b border-white mb-[50px] relative z-0 howit_gap_320">
          {props.data.TABS.map((tab: any, index: number) => (
            <div
              onClick={() => setIndex(index)}
              className={classNames(
                `relative text-[13px] text-white md:text-lg lg:text-lg text-center md:px-[65px] lg:px-2 p-2 cursor-pointer howit_tab_320`,
                index === indexTab
                  ? "z-10 text-white font-semibold"
                  : "text-white",
              )}
              key={`how-it-works-tabs-${index}`}
            >
              {index === indexTab && (
                <motion.span
                  layoutId="how-it-works"
                  className="rounded-[20px] overflow-hidden absolute z-10 left-0 -bottom-1.5 w-full"
                >
                  <span
                    className="block w-full h-1 border-[5px]"
                    style={{
                      borderImage:
                        "linear-gradient(to right, #B631B1, #7048d7)",
                      borderImageSlice: "1",
                      borderStyle: "solid",
                    }}
                  ></span>
                </motion.span>
              )}
              {tab}
            </div>
          ))}
        </div>
      </div>

      {props.data[props.data.TABS[indexTab]]?.map((info: any, index: any) => (
        <div
          key={`${info.title}-${index}`}
          className="flex flex-col pb-[48px] m-auto w-full md:w-[50%] gap-10 p-2 justify-center items-center "
        >
          <div className="relative bg-gradient-to-r from-[#B631B1] to-[#7048D7] rounded-[14px] flex justify-center items-center ">
            <div className="absolute -top-1 -left-1 flex items-center justify-center bg-white rounded-full w-[22.92px] h-[22.92px]">
              <div className=" flex items-center justify-center rounded-full w-[18.92px] h-[18.92px] bg-gradient-to-r from-[#B631B1] to-[#7048D7]">
                <div className="text-white transitionClick">
                  <p>{index + 1}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-[101.04px] h-[97.4px]">
              {/* <svg
                width="37"
                height="55"
                viewBox="0 0 77 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.7918 80.4577H43.2085V60.8004L50.7418 68.3337L57.3335 61.6244L38.5002 42.791L19.6668 61.6244L26.3762 68.216L33.7918 60.8004V80.4577ZM10.2502 94.5827C7.66058 94.5827 5.44374 93.6606 3.59964 91.8165C1.75554 89.9724 0.833496 87.7556 0.833496 85.166V9.83268C0.833496 7.2431 1.75554 5.02626 3.59964 3.18216C5.44374 1.33806 7.66058 0.416016 10.2502 0.416016H47.9168L76.1668 28.666V85.166C76.1668 87.7556 75.2448 89.9724 73.4007 91.8165C71.5566 93.6606 69.3397 94.5827 66.7502 94.5827H10.2502ZM43.2085 33.3744V9.83268H10.2502V85.166H66.7502V33.3744H43.2085Z"
                  fill="white"
                />
              </svg> */}
              <Image
                src={info.svg}
                width={58}
                height={58}
                alt="icon"
                className="w-[58px] h-[58px]"
              />
            </div>
          </div>
          <div className="flex flex-col w-[221px]">
            <p className="text-white font-[550] text-[16px] md:text-2xl text-center">
              {info.title}
            </p>
            <p className="text-white pt-2 font-[300] md:text-[18px] text-[12px] text-center">
              {info.content}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-[32px] pb-[48px]">
        <button
          className="inline-flex  justify-center items-center gap-3 font-semibold  h-[36px] md:h-[52px]  rounded-[30px] hover:border-none bg-gradient-to-r from-[#B631B1] to-[#7048D7]  px-5 border-solid cursor-pointer text-white text-[14px] md:text-[16px]"
          onClick={goToLogin}
        >
          Try {props.data.TABS[indexTab]}
        </button>
        <Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />
      </div>
    </div>
  );
};
