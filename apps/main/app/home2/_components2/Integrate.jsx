import Image from "next/image";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const Integrate = () => {
  return (
    <>
      <div
        className="relative bg-[#0F031F] flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${IMAGE_URL}/assets/images/home/integrateBg.png)`,
        }}
      >
        <h3 className="text-center text-[#FFFAFA] font-bold text-[20px] leading-[30px] sm:text-[28px] sm:leading-[30px] xl:text-[36px] xl:leading-[52px] pt-[47px] sm:pt-[65px] xl:pt-[100px] pb-[60px]">
          Integrate and manage <br /> all your marketing efforts with one
          platform.
        </h3>
        <div className="max-h-[550px]">
          <Image
            src={`${IMAGE_URL}/assets/images/home/integrate.png`}
            width={800}
            height={600}
            alt=""
            className="hidden sm:block"
          />
          <Image
            src={`${IMAGE_URL}/assets/images/home/integrateMobile.png`}
            width={330}
            height={348}
            alt=""
            className="block sm:hidden"
          />
        </div>
      </div>
    </>
  );
};

export default Integrate;
