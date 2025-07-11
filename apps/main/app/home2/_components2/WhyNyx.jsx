"use client";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Link from "next/link";
import "./tabs/index.css";

const WhyNyx = () => {
  return (
    <>
      <div className="relative bg-[#281B3B] flex items-center justify-center flex-col  overflow-hidden">
        <div className="absolute top-[-50px] left-0 xl:top-[-130px] z-1 xl:left-[18%]">
          <Image
            src={`${IMAGE_URL}/assets/images/home/wn.png`}
            width={908}
            height={313}
            alt=""
          />
        </div>
        <h3 className="font-bold text-[20px] leading-[58px] xl:text-[40px] xl:leading-[58px] text-center pt-[45px] pb-[34px] xl:pt-[120px] xl:pb-[81px] z-30">
          Why NYX?
        </h3>

        <div className="flex items-center justify-center gap-4 pb-[42px] xl:pb-[120px] z-9 relative flex-wrap">
          <div
            className="w-[161px] h-[132px] sm:w-[248px] sm:h-[176px] xl:w-[420px] xl:h-[284px] rounded-[16px] bg-[#ffffff] bg-opacity-[13%] flex items-center justify-center flex-col border-2 border-solid border-transparent  "
            style={{
              boxShadow: "0px -1.72px 10.33px 0px #59085D40",
            }}
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/wn1.png`}
              width={80}
              height={80}
              alt=""
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px]"
            />
            <p className="font-bold text-[12px] leading-[14px]  sm:text-[20px] sm:leading-[24px] xl:text-[28px] xl:leading-[34px] text-center text-white mt-6 mb-3">
              50% Less CAC
            </p>
            <p className="font-normal text-[9px] leading-[10px] px-[9px] sm:text-[10px] sm:leading-[12px] xl:text-[18px] xl:leading-[22px] text-center text-white truncate-2-lines">
              Campaign recommendations, analytics and smart budget allocations.
            </p>
          </div>
          <div
            className="w-[161px] h-[132px] sm:w-[248px] sm:h-[176px] xl:w-[420px] xl:h-[284px] rounded-[16px] bg-[#ffffff] bg-opacity-[13%] flex items-center justify-center flex-col border-2 border-solid border-transparent  "
            style={{
              boxShadow: "0px -1.72px 10.33px 0px #59085D40",
            }}
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/wn2.png`}
              width={80}
              height={80}
              alt=""
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px]"
            />
            <p className="font-bold text-[12px] leading-[14px]  sm:text-[20px] sm:leading-[24px] xl:text-[28px] xl:leading-[34px] text-center text-white mt-6 mb-3">
              360° View/Insights
            </p>
            <p className="font-normal text-[9px] leading-[10px] px-[9px] sm:text-[10px] sm:leading-[12px] xl:text-[18px] xl:leading-[22px] text-center text-white ">
              Advanced insights and no data silos.
            </p>
          </div>
          <div
            className="w-[161px] h-[132px] sm:w-[248px] sm:h-[176px] xl:w-[420px] xl:h-[284px] rounded-[16px] bg-[#ffffff] bg-opacity-[13%] flex items-center justify-center flex-col border-2 border-solid border-transparent  "
            style={{
              boxShadow: "0px -1.72px 10.33px 0px #59085D40",
            }}
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/wn3.png`}
              width={80}
              height={80}
              alt=""
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px]"
            />
            <p className="font-bold text-[12px] leading-[14px]  sm:text-[20px] sm:leading-[24px] xl:text-[28px] xl:leading-[34px] text-center text-white mt-6 mb-3">
              40% Higher CTR
            </p>
            <p className="font-normal text-[9px] leading-[10px] px-[9px] sm:text-[10px] sm:leading-[12px] xl:text-[18px] xl:leading-[22px] text-center text-white ">
              Creative analysis and recommendations.
            </p>
          </div>
          <div
            className="w-[161px] h-[132px] sm:w-[248px] sm:h-[176px] xl:w-[420px] xl:h-[284px] rounded-[16px] bg-[#ffffff] bg-opacity-[13%] flex items-center justify-center flex-col border-2 border-solid border-transparent  "
            style={{
              boxShadow: "0px -1.72px 10.33px 0px #59085D40",
            }}
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/wn4.png`}
              width={80}
              height={80}
              alt=""
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px]"
            />
            <p className="font-bold text-[12px] leading-[14px]  sm:text-[20px] sm:leading-[24px] xl:text-[28px] xl:leading-[34px] text-center text-white mt-6 mb-3">
              30% Higher CVR
            </p>
            <p className="font-normal text-[9px] leading-[10px] px-[9px] sm:text-[10px] sm:leading-[12px] xl:text-[18px] xl:leading-[22px] text-center text-white ">
              Refine and expand audience  targeting .
            </p>
          </div>
          <div
            className="w-[161px] h-[132px] sm:w-[248px] sm:h-[176px] xl:w-[420px] xl:h-[284px] rounded-[16px] bg-[#ffffff] bg-opacity-[13%] flex items-center justify-center flex-col border-2 border-solid border-transparent  "
            style={{
              boxShadow: "0px -1.72px 10.33px 0px #59085D40",
            }}
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/wn5.png`}
              width={80}
              height={80}
              alt=""
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px]"
            />
            <p className="font-bold text-[12px] leading-[14px]  sm:text-[20px] sm:leading-[24px] xl:text-[28px] xl:leading-[34px] text-center text-white mt-6 mb-3">
              75% Faster TAT
            </p>
            <p className="font-normal text-[9px] leading-[10px] px-[9px] sm:text-[10px] sm:leading-[12px] xl:text-[18px] xl:leading-[22px] text-center text-white ">
              With fast and easy generations.
            </p>
          </div>
          <div
            className="w-[161px] h-[132px] sm:w-[248px] sm:h-[176px] xl:w-[420px] xl:h-[284px] rounded-[16px] bg-[#ffffff] bg-opacity-[13%] flex items-center justify-center flex-col border-2 border-solid border-transparent  "
            style={{
              boxShadow: "0px -1.72px 10.33px 0px #59085D40",
            }}
          >
            <Image
              src={`${IMAGE_URL}/assets/images/home/wn6.png`}
              width={80}
              height={80}
              alt=""
              className="w-[40px] h-[40px] xl:w-[80px] xl:h-[80px]"
            />
            <p className="font-bold text-[12px] leading-[14px]  sm:text-[20px] sm:leading-[24px] xl:text-[28px] xl:leading-[34px] text-center text-white mt-6 mb-3">
              85% Less Operations
            </p>
            <p className="font-normal text-[9px] leading-[10px] px-[9px] sm:text-[10px] sm:leading-[12px] xl:text-[18px] xl:leading-[22px] text-center text-white ">
              Removing the skillset barrier.
            </p>
          </div>
        </div>

        <Link href={process.env.NEXT_PUBLIC_APP_URL + "/demo"}>
          <button className="inline-flex justify-center items-center gap-3 font-medium h-[36px] md:h-[52px] rounded-[30px] hover:border-none  bg-gradient-to-r from-[#B631B1] to-[#7048D7]  p-5 border-solid cursor-pointer text-white hover:shadow-buttonShadow buttonShadowTransition text-[14px] xl:text-[18px] mb-[47px] xl:mb-[112px]">
            Book a Demo
          </button>
        </Link>
      </div>
    </>
  );
};

export default WhyNyx;
