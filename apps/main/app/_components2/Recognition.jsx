/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import "./tabs/index.css";
import Marquee from "react-fast-marquee";

const Recognition = () => {
  return (
    <>
      <div className="bg-[#15072A] w-full pb-10 hidden lg:block">
        <h3 className="font-bold text-[20px] leading-[18px] sm:text-[32px] sm:leading-[52px] xl:text-[40px] xl:leading-[58px] text-center text-white pt-6 sm:pt-[20px] xl:pt-[32px]">
          Our Recognitions
        </h3>
        <div className="flex items-center justify-start sm:justify-center gap-[25px] sm:gap-[25px] xl:gap-[51px] px-[16px] mt-[24px] overflow-hidden overflow-x-auto scrollbar-hide ">
          <Image
            src={`${IMAGE_URL}/assets/images/home/nsr_new.png`}
            width={210}
            height={134}
            alt="Nvidia Recognition"
            className="w-[150px] h-[52px]"
          />
          {/* <Image
            src={`${IMAGE_URL}/assets/images/home/producthunt.png`}
            width={210}
            height={134}
            alt="NSRCEL Recognition"
            className="w-[226px] h-[50px]"
          /> */}
          {/* <a
            href="https://www.producthunt.com/posts/nyx?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-nyx"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=866240&theme=light&period=daily&t=1740297149051"
              alt="NYX - Your&#0032;AI&#0045;powered&#0032;performance&#0032;marketing&#0032;co&#0045;pilot&#0046; | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a> */}
          <a
            href="https://www.producthunt.com/posts/nyx?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-nyx"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=866240&theme=dark&period=daily&t=1740811890177"
              alt="NYX - Your&#0032;AI&#0045;powered&#0032;performance&#0032;marketing&#0032;co&#0045;pilot&#0046; | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
          <Image
            src={`${IMAGE_URL}/assets/images/home/microsoft3.png`}
            width={210}
            height={134}
            alt="Microsoft Recognition"
            className="w-[188px] h-[55px]"
          />
          <Image
            src={`${IMAGE_URL}/assets/images/home/nvidia3.png`}
            width={210}
            height={134}
            alt="StartupIndia recognition"
            className="w-[155px] h-[50px] sm:w-[150px] sm:h-[75px] lg:w-[155px] lg:h-[50px]"
          />
        </div>
      </div>

      <div className="bg-[#15072A] w-full pb-5 block lg:hidden">
        <h3 className="font-bold text-[20px] leading-[18px] sm:text-[32px] sm:leading-[52px] xl:text-[40px] xl:leading-[58px] text-center text-white pt-6 sm:pt-[20px] xl:pt-[32px]">
          Our Recognitions
        </h3>
        <Marquee>
          <div className="flex items-center justify-start sm:justify-center gap-[25px] xl:gap-[51px] px-[25px] mt-[24px] overflow-hidden overflow-x-auto scrollbar-hide ">
            <Image
              src={`${IMAGE_URL}/assets/images/home/nsr_new.png`}
              width={210}
              height={134}
              alt="Nvidia Recognition"
              className="w-[150px] h-[52px]"
            />
            {/* <Image
              src={`${IMAGE_URL}/assets/images/home/producthunt.png`}
              width={210}
              height={134}
              alt="NSRCEL Recognition"
              className="w-[226px] h-[50px]"
            /> */}
            {/* <a
              href="https://www.producthunt.com/posts/nyx?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-nyx"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=866240&theme=light&period=daily&t=1740297149051"
                alt="NYX - Your&#0032;AI&#0045;powered&#0032;performance&#0032;marketing&#0032;co&#0045;pilot&#0046; | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a> */}
            <a
              href="https://www.producthunt.com/posts/nyx?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-nyx"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=866240&theme=dark&period=daily&t=1740811890177"
                alt="NYX - Your&#0032;AI&#0045;powered&#0032;performance&#0032;marketing&#0032;co&#0045;pilot&#0046; | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a>
            <Image
              src={`${IMAGE_URL}/assets/images/home/microsoft3.png`}
              width={210}
              height={134}
              alt="Microsoft Recognition"
              className="w-[188px] h-[55px]"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/nvidia3.png`}
              width={210}
              height={134}
              alt="StartupIndia recognition"
              className="w-[155px] h-[50px] sm:w-[150px] sm:h-[75px] lg:w-[155px] lg:h-[50px]"
            />
          </div>
        </Marquee>
      </div>
    </>
  );
};

export default Recognition;
