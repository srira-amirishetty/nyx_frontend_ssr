/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const OurProduct = () => {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="product_sec bg-[#130625] h-auto pb-[3rem]">
      <h2 className="text-[24px] leading-[30px] md:text-[36px] md:leading-[44px] xl:text-[54px] xl:leading-[50px] text-white font-medium text-center py-[40px] md:py-[80px]">
        Our Products
      </h2>
      <div className="boxes px-[10px] md:px-[50px] flex justify-center items-center gap-4 md:gap-7 flex-wrap">
        <div
          className="box_morphism md:hover:border-[#B631B1] w-[157px] h-[160px] md:w-[292px] md:h-[278px] xl:w-[302px] xl:h-[258px] relative rounded-[15px] cursor-pointer"
          onClick={() => handleClick("image")}
        >
          <div className="bg-card relative">
            <Image
              src={`${IMAGE_URL}/assets/images/home/ImageProduct.png`}
              width={70}
              height={70}
              className="rounded-[15px] bg-card-first-img absolute top-[35%] left-[30%]"
              alt="ImageProduct"
            />
          </div>

          <div className="box_morphism_content absolute">
            <p className="box_morphism_content_first_para text-[14px]  leading-[17px] md:text-[24px]  md:leading-[30px] font-bold text-[#F4F4F4] pl-[25px] pt-[10px] md:pt-[20px]">
              ImageCraft AI
            </p>
            <p className="text-[12px] box_morphism_content_second_para leading-[16px] md:leading-[22px] md:text-[18px]  font-normal text-[#F4F4F4] pl-[25px]  mt-1 md:mt-0 ">
              Craft high-converting images
            </p>
          </div>
        </div>

        <div
          className="box_morphism md:hover:border-[#B631B1] w-[157px] h-[160px] md:w-[292px] md:h-[278px] xl:w-[302px] xl:h-[258px] relative rounded-[15px] cursor-pointer"
          onClick={() => handleClick("video")}
        >
          <div className="bg-card relative">
            <Image
              src={`${IMAGE_URL}/assets/images/home/VideoProduct.png`}
              width={94}
              height={94}
              className="rounded-[15px]  absolute top-[25%] left-[25%]"
              alt="VideoProduct"
            />
          </div>
          <div className="box_morphism_content absolute">
            <p className="box_morphism_content_first_para text-[14px]  leading-[17px] md:text-[24px]  md:leading-[30px] font-bold text-[#F4F4F4] pl-[25px] pt-[10px] md:pt-[20px]">
              VideoVista AI
            </p>
            <p className="text-[12px] box_morphism_content_second_para leading-[16px] md:leading-[22px] md:text-[18px] text-[#F4F4F4] pl-[25px]  mt-1 md:mt-0 ">
              Create Instant Videos
            </p>
          </div>
        </div>

        <div
          className="box_morphism md:hover:border-[#B631B1] w-[157px] h-[160px] md:w-[292px] md:h-[278px] xl:w-[302px] xl:h-[258px] relative rounded-[15px] cursor-pointer"
          onClick={() => handleClick("music")}
        >
          <div className="bg-card relative">
            <Image
              src={`${IMAGE_URL}/assets/images/home/CampulseProduct.png`}
              width={94}
              height={94}
              alt="SonicProduct"
              className="rounded-[15px]  absolute top-[25%] left-[25%]"
            />
          </div>
          <div className="box_morphism_content absolute">
            <p className="box_morphism_content_first_para text-[14px]  leading-[17px] md:text-[24px]  md:leading-[30px] font-bold text-[#F4F4F4] pl-[25px] pt-[10px] md:pt-[20px]">
              CamPulse AI
            </p>
            <p className="text-[12px] box_morphism_content_second_para leading-[16px] md:leading-[22px] md:text-[18px] text-[#F4F4F4] pl-[25px] mt-1 md:mt-0">
              Automate Campaign Success
            </p>
          </div>
        </div>
        <div
          className="box_morphism md:hover:border-[#B631B1] w-[157px] h-[160px] md:w-[292px] md:h-[278px] xl:w-[302px] xl:h-[258px] relative rounded-[15px] cursor-pointer"
          onClick={() => handleClick("lyrics")}
        >
          <div className="bg-card relative">
            <Image
              src={`${IMAGE_URL}/assets/images/home/LyricsProduct.png`}
              width={61}
              height={61}
              alt="LyricsProduct"
              className="rounded-[15px] bg-card-third-img absolute top-[40%] left-[35%]"
            />
          </div>
          <div className="box_morphism_content absolute">
            <p className="box_morphism_content_first_para text-[14px]  leading-[17px] md:text-[24px]  md:leading-[30px] font-bold text-[#F4F4F4] pl-[20px] pt-[10px] md:pt-[20px]">
              LyricGenius AI
            </p>
            <p className="box_morphism_content_second_para text-[12px]  leading-[16px] md:leading-[22px] md:text-[18px] text-[#F4F4F4] pl-[20px] mt-1 md:mt-0 ">
              Compose Engaging Lyrics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
