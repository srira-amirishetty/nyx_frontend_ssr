import Link from "next/link";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const Usecases = () => {
  return (
    <div className="bg-[#2C1E3A] relative py-[7rem] overflow-hidden">
      <div className="z-0 hidden h-auto md:flex md:absolute md:bottom-0 md:right-0">
        <svg
          width="729"
          height="410"
          viewBox="0 0 729 424"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1306_8572)">
            <path
              d="M707.567 -21.5818C707.567 127.921 787.362 625.197 637.86 625.197C488.358 625.197 101.812 746.042 101.812 596.54C101.812 447.037 265.055 371.966 414.557 371.966C564.06 371.966 707.567 -171.084 707.567 -21.5818Z"
              fill="url(#paint0_linear_1306_8572)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1306_8572"
              x="0.512497"
              y="-148.921"
              width="829.627"
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
                result="effect1_foregroundBlur_1306_8572"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1306_8572"
              x1="520.344"
              y1="399.229"
              x2="448.699"
              y2="1047.02"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="1" stopColor="#661284" />
              <stop offset="1" stopColor="#17041E" stopOpacity="0.53" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center xl:gap-[60px]">
        <Image
          src={`${IMAGE_URL}/assets/images/home/usecaseColorful.png`}
          width={500}
          height={300}
          alt="usecase Image"
          className="block sm:hidden"
        />
        <Image
          src={`${IMAGE_URL}/assets/images/home/usecaseColorfulDesktop.png`}
          width={500}
          height={300}
          alt="usecase Image"
          className="hidden sm:block"
        />
        <div>
          <h3 className="horizontal_spacing lg:w-auto xl:w-[500px] z-10 text-[24px] leading-[32px] md:text-[48px] xl:text-[54px] md:leading-[50px] text-center font-semibold text-white pb-[1.5rem] md:pb-[3rem] px-[79px]  xl:px-[0px] mt-8 md:mt-0">
            Checkout some of our use cases
          </h3>

          <div className="mt-3 flex justify-center items-center">
            <Link href="/gallery" className="z-10">
              <span
                className="cursor-pointer  text-[14px] md:text-[18px] md:py-[12px] px-[32px] py-[6px] h-[36px] md:h-[52px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
        
        "
              >
                Know more
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usecases;
