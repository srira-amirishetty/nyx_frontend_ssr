/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { ModelPageTabs } from "@nyx-frontend/main/shared/inputs";
import { MODEL_TABS } from "@nyx-frontend/main/utils/utils";
import Allmodel from "./_components/Allmodel";
import TextToImage from "./_components/TextToImage";
import ImageToImage from "./_components/ImageToImage";
import Prediction from "./_components/Prediction";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import LoginPopupModel from "./logincomponents/LoginPopupModel";
import SignupPopupModel from "./logincomponents/SignupPopupModel";
import { welcomePopUpStyleLoginPopup } from "@nyx-frontend/main/utils/modalstyles";
import "./index.css";

export default function Page() {
  const router = useRouter();
  const [modelTab, setModelTab] = useState(0);

  const chooseModal = (val: any) => {
    router.push(`models/${val}`);
  };

  return (
    <>
      <div className="bg-[#15072a] relative w-full h-full flex flex-col justify-center items-center ">
        <div className="flex absolute -top-[300px] md:top-0 z-0">
          <svg
            width="100%"
            height="1141"
            viewBox="0 0 1384 1141"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_5749_12072)">
              <path
                d="M264.344 580.21C206.621 364.783 466.791 136.157 656.161 85.4158C845.531 34.6742 1045.84 168.178 1103.56 383.606C1161.29 599.033 1054.57 814.806 865.197 865.548C675.826 916.289 322.068 795.638 264.344 580.21Z"
                fill="url(#paint0_linear_5749_12072)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_5749_12072"
                x="-7.73593"
                y="-189.25"
                width="1390.87"
                height="1330.23"
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
                  result="effect1_foregroundBlur_5749_12072"
                />
              </filter>
              <linearGradient
                id="paint0_linear_5749_12072"
                x1="776.319"
                y1="847.052"
                x2="787.805"
                y2="146.01"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.240197"
                  stopColor="#81186A"
                  stopOpacity="0.31"
                />
                <stop
                  offset="0.868938"
                  stopColor="#5227BB"
                  stopOpacity="0.55"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="z-10 w-[90%]  h-full p-6  mt-12 md:mt-20  mb-0 md:mb-32  rounded-md flex flex-col justify-center items-center">
          <div className="flex flex-col items-center mx-6">
            <h1 className="text-2xl text-white font-bold mt-4 md:p-4 text-center text-[24px] lg:text-[54px]">
              Models
            </h1>
            <div className="text-white mt-4 md:mt-6 w-[300px] md:w-full text-center text-[14px] lg:text-[18px]">
              Explore NYX&apos;s diverse range of models to transform your
              application.
            </div>

            <div className=" flex  text-[16px] mt-6 font-semibold w-[300px] sm:w-full overflow-hidden overflow-x-auto models_tabs_scrollbar ">
              <ModelPageTabs
                data={MODEL_TABS}
                tabState={setModelTab}
                tabStatus={modelTab}
              />
            </div>
          </div>
          <div className="">
            {modelTab == 0 && <Allmodel chooseModal={chooseModal} />}
            {modelTab == 1 && <TextToImage chooseModal={chooseModal} />}
            {modelTab == 2 && <ImageToImage chooseModal={chooseModal} />}
            {modelTab == 3 && <Prediction chooseModal={chooseModal} />}
            {/* {modelTab == 3 && <Utility />}
            {modelTab == 4 && <Controlnets />} */}
          </div>
        </div>
      </div>
    </>
  );
}
