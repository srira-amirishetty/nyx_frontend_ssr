import Link from "next/link";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const Usecases = () => {
  return (
    <div className="bg-[#2C1E3A] relative py-[46px] sm:py-[7rem] px-[30px] xl:px-[132px] overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center xl:gap-[60px]">
        <Image
          src={`${IMAGE_URL}/assets/images/home/usecaseColorful.png`}
          width={500}
          height={300}
          alt="usecase Image"
          className="block sm:hidden"
        />
        <Image
          src={`${IMAGE_URL}/assets/images/home/usecaseColorful.png`}
          width={500}
          height={300}
          alt="usecase Image"
          className="hidden sm:block w-[307px] h-[255px] xl:w-[524px] xl:h-[435px]"
        />
        <div>
          <h3 className="horizontal_spacing lg:w-auto  z-10 text-[20px] leading-[28px] md:text-[32px] md:leading-[40px] xl:text-[56px]  xl:leading-[67px]  text-center font-semibold text-white pb-[1.5rem] md:pb-[3rem] sm:px-[79px] xl:px-[0px] mt-8 md:mt-0">
            Discover the <br /> capabilities of NYX AI.
          </h3>

          <div className="mt-3 flex justify-center items-center">
            <Link href="/gallery" className="z-10">
              <span className="cursor-pointer  text-[14px] md:text-[18px] md:py-[15px] px-[32px] py-[10px] h-[36px] md:h-[52px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition">
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
