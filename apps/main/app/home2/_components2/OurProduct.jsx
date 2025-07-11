/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Link from "next/link";

const OurProduct = () => {
  return (
    <div className="product_sec bg-[#130625] h-auto pb-[3rem]">
      <h2 className="text-[24px] leading-[30px] md:text-[36px] md:leading-[44px] xl:text-[40px] xl:leading-[48px] text-white font-bold text-center py-[40px] md:py-[80px]">
        Our Products
      </h2>
      <div className="boxes px-[10px] md:px-[50px] flex justify-center items-center gap-4 md:gap-7 flex-wrap">
        <Link href="/image-craft-ai">
          <div className="box_morphism md:hover:border-[#B631B1] w-[234px] h-[220px] md:w-[292px] md:h-[278px] xl:w-[302px] xl:h-[258px] relative rounded-[15px] cursor-pointer group">
            <div className="bg-card relative ">
              <Image
                src={`${IMAGE_URL}/assets/images/home/ImageProduct.png`}
                width={70}
                height={70}
                className="rounded-[15px] bg-card-first-img absolute top-[35%] left-[30%]"
                alt="ImageProduct"
              />
            </div>

            <div className="box_morphism_content absolute group-hover:pr-4 ">
              <p className=" text-[20px]  leading-[24px] md:text-[24px]  md:leading-[30px] font-bold text-[#F4F4F4] pl-[25px] pt-[22px] md:pt-[20px]">
                ImageCraft AI
              </p>
              <p className="text-[12px] group-hover:pr-4  leading-[20px] md:leading-[22px] md:text-[18px]  font-normal text-[#F4F4F4] pl-[25px]  mt-2 md:mt-0 ">
                Craft high-converting <br className="hidden max-md:block" />
                images
              </p>
            </div>
          </div>
        </Link>

        <Link href="/video-vista-ai">
          <div className="box_morphism md:hover:border-[#B631B1] w-[234px] h-[220px] md:w-[292px] md:h-[278px] xl:w-[302px] xl:h-[258px] relative rounded-[15px] cursor-pointer group">
            <div className="bg-card relative">
              <Image
                src={`${IMAGE_URL}/assets/images/home/VideoProduct.png`}
                width={94}
                height={94}
                className="rounded-[15px]  absolute top-[25%] left-[25%]"
                alt="VideoProduct"
              />
            </div>
            <div className="box_morphism_content absolute group-hover:pr-4">
              <p className=" text-[20px]  leading-[24px] md:text-[24px]  md:leading-[30px] font-bold text-[#F4F4F4] pl-[25px] pt-[22px] md:pt-[20px]">
                VideoVista AI
              </p>
              <p className="text-[12px] group-hover:pr-4 leading-[16px] md:leading-[22px] md:text-[18px] text-[#F4F4F4] pl-[25px]  mt-1 md:mt-0 ">
                Create Instant Videos
              </p>
            </div>
          </div>
        </Link>
        <Link href="/campulse-ai">
          <div className="box_morphism md:hover:border-[#B631B1] w-[234px] h-[220px] md:w-[292px] md:h-[278px] xl:w-[302px] xl:h-[258px] relative rounded-[15px] cursor-pointer group">
            <div className="bg-card relative ">
              <Image
                src={`${IMAGE_URL}/assets/images/home/CampulseProduct.png`}
                width={94}
                height={94}
                alt="SonicProduct"
                className="rounded-[15px]  absolute top-[25%] left-[25%]"
              />
            </div>
            <div className="box_morphism_content absolute group-hover:pr-4">
              <p className=" text-[20px]  leading-[24px] md:text-[24px]  md:leading-[30px] font-bold text-[#F4F4F4] pl-[25px] pt-[22px] md:pt-[20px]">
                CamPulse AI
              </p>
              <p className="text-[12px] group-hover:pr-4 leading-[16px] md:leading-[22px] md:text-[18px] text-[#F4F4F4] pl-[25px] mt-1 md:mt-0">
                Automate Campaign <br className="hidden max-md:block" /> Success
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OurProduct;
