/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState ,useEffect} from "react";
import { StableDiffusionTabs } from "@nyx-frontend/main/shared/inputs";
import { STABLE_DIFFUSION_TABS } from "@nyx-frontend/main/utils/utils";
import Likehilood from "../_components/Likelihood";
import Api from "../_components/Api";
import Pricing from "../_components/Pricing";
import { useRouter } from "next/navigation";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";

export default function Page() {
  const [diffusionTab, setDiffusionTab] = useState(0);

  return (
    <>
      <div className="bg-[#15072a] w-full h-full flex justify-center items-center">
        {/* <div className="flex absolute -top-[300px] md:top-0 z-0">
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
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                stop-color="#81186A"
                stop-opacity="0.31"
              />
              <stop
                offset="0.868938"
                stop-color="#5227BB"
                stop-opacity="0.55"
              />
            </linearGradient>
          </defs>
        </svg>
      </div> */}
        <div className="w-[90%] h-full lg:p-6 my-20 rounded-md">
          <div className="md:mx-6">
            <div className="text-[11px] md:text-[14px] text-white font-normal mt-4 flex ">
            <Link href="/models">Models</Link> <BsChevronRight className="mt-1"/> Prediction <BsChevronRight className="mt-1"/>
              <span className="text-[11px] md:text-[14px] text-white font-normal">
                NYX Image Likelihood Predictor
              </span>
            </div>
            <div className="flex justify-center md:justify-start font-semibold ">
              <StableDiffusionTabs
                data={STABLE_DIFFUSION_TABS}
                tabState={setDiffusionTab}
                tabStatus={diffusionTab}
              />
            </div>
          </div>
          <div>
            {diffusionTab == 0 && <Likehilood />}
            {diffusionTab == 1 && <Api />}
            {diffusionTab == 2 && <Pricing />}
          </div>
        </div>
      </div>
    </>
  );
}
