import React from "react";
import Marquee from "react-fast-marquee";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Link from "next/link";

const TrustedBy = () => {
  return (
    <>
      <div className="pt-[40px] md:pt-[96px]  bg-[#130625] flex flex-col items-center justify-center">
        <h3 className="font-bold  text-[20px] leading-[24px] sm:text-[32px] sm:leading-[39px] xl:text-[40px] xl:leading-[48px] text-center text-white pb-[11px] md:pb-[38px]">
          Trusted by
        </h3>
        <Marquee>
          <div className="flex items-center gap-[60px] sm:gap-[67px] xl:gap-[119px] mr-[70px] mt-5 md:mt-0">
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru1.png`}
              width={158}
              height={78}
              alt=""
              className="w-[64px] h-[32px] sm:w-[77px] sm:h-[67px] xl:w-[158px] xl:h-[78px] "
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru2.png`}
              width={145}
              height={80}
              alt=""
              className="w-[59px] h-[32px] sm:w-[61px] sm:h-[53px] xl:w-[145px] xl:h-[80px]"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru3.png`}
              width={159}
              height={97}
              alt=""
              className="w-[58px] h-[35px] sm:w-[86px] sm:h-[53px] xl:w-[159px] xl:h-[97px] "
            />

            <Image
              src={`${IMAGE_URL}/assets/images/home/tru4.png`}
              width={140}
              height={81}
              alt=""
              className="w-[59px] h-[34px] sm:w-[87px] sm:h-[53px] xl:w-[180px] xl:h-[71px]"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru5.png`}
              width={97}
              height={97}
              alt=""
              className="w-[41px] h-[41px] sm:w-[61px] sm:h-[53px] xl:w-[97px] xl:h-[97px] "
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru1.png`}
              width={158}
              height={78}
              alt=""
              className="w-[64px]  h-[32px] sm:w-[77px] sm:h-[67px] xl:w-[158px] xl:h-[78px]"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru2.png`}
              width={145}
              height={80}
              alt=""
              className="w-[59px] h-[32px] sm:w-[61px] sm:h-[53px] xl:w-[145px] xl:h-[80px]"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru3.png`}
              width={159}
              height={97}
              alt=""
              className="w-[58px] h-[35px] sm:w-[86px] sm:h-[53px] xl:w-[159px] xl:h-[97px] "
            />

            <Image
              src={`${IMAGE_URL}/assets/images/home/tru4.png`}
              width={140}
              height={81}
              alt=""
              className="w-[59px] h-[34px] sm:w-[87px] sm:h-[53px] xl:w-[180px] xl:h-[71px]"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/tru5.png`}
              width={97}
              height={97}
              alt=""
              className="w-[41px] h-[41px] sm:w-[61px] sm:h-[53px] xl:w-[97px] xl:h-[97px]"
            />
          </div>
        </Marquee>
        <Link href={process.env.NEXT_PUBLIC_APP_URL + "/demo"}>
          <button className="text-[14px] lg:text-[18px] h-[36px] w-[130px] md:h-[52px] md:w-[197px] md:px-[22px] md:py-[8px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition mb-[46px] md:mb-[112px] mt-[38px]">
            Book a Demo
          </button>
        </Link>
      </div>
    </>
  );
};

export default TrustedBy;
