import Image from "next/image";
import React, { useState } from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import "../index.css";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import { useRouter } from "next/navigation";

const Discover = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const goToLogin = () => {
    router.push("apphome/login");
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div className="bg-[#15072A] md:pt-[77px] md:pb-[72px] py-5 px-5 md:px-[83px]">
      <h3 className="font-semibold text-[20px] leading-[40px] md:text-[40px] md:leading-[58px] text-center text-white">
        Discover Our Toolset
      </h3>
      <div className="flex items-center justify-center flex-wrap gap-[41px] mt-5 md:mt-[120px]">
        {/* First card */}
        <div
          className="w-[395px] h-[480px] md:h-[540px] rounded-[16px] px-2 py-4 md:pt-[36px] md:pl-[25px] md:pr-[23px] md:pb-[50px] border border-solid border-[#fff] border-opacity-[30%] hover:border-[#B631B1] transition 
            duration-1000 ease-in-out"
        >
          <Image
            src={`${IMAGE_URL}/assets/images/home/vd1.png`}
            width={350}
            height={200}
            alt=""
            className="min-h-[200px] object-cover"
          />
          <h3 className="mt-[38px] font-normal text-[24px] leading-[30px] text-center text-white mb-4">
            Generate{" "}
            <span className="font-bold">
              {" "}
              Text To Video <br /> Ads
            </span>
          </h3>
          <p className="font-normal text-[16px] leading-[20px] text-center text-white mb-[40px]">
            Effortlessly turn scripts or ideas into videos, leaving the days of
            manual editing behind.
          </p>
          {/* <div className="relative flex w-[80px] h-[32px]  md:w-[148px] xl:h-[40px] mx-auto">
            <button
              className="absolute top-0  xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r "
              onClick={goToLogin}
            >
              <span
                className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[32px] md:w-[136px] 
                        md:h-[52px] rounded-full bg-[#261936] 
                      hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
              >
                <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium">
                  Try it out
                </span>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div> */}

          <div className="relative flex w-[110px] h-[32px]  md:w-[200px] xl:h-[40px] mx-auto">
            <button
              className="absolute top-0  xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r "
            >
              <span
                className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[32px] md:w-[172px] 
                        md:h-[52px] rounded-full bg-[#261936] 
                      hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
              >
                <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium">
                  Coming Soon
                </span>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div>
        </div>
        {/* Second Card */}

        <div
          className="w-[395px] h-[480px] md:h-[540px] rounded-[16px] px-2 py-4 md:pt-[36px] md:pl-[25px] md:pr-[23px] md:pb-[50px] border border-solid border-[#fff] border-opacity-[30%] hover:border-[#B631B1] transition 
            duration-1000 ease-in-out"
        >
          <Image
            src={`${IMAGE_URL}/assets/images/home/vd2.png`}
            width={350}
            height={200}
            alt=""
            className="min-h-[200px] object-cover"
          />
          <h3 className="mt-[38px] font-normal text-[24px] leading-[30px] text-center text-white mb-4">
            Generate <span className="font-bold">Short Product Animations</span>
          </h3>
          <p className="font-normal text-[16px] leading-[20px] text-center text-white mb-[40px]">
            Turns static images into captivating product videos with VO, music,
            and animation.
          </p>
          {/* <div className="relative flex w-[80px] h-[32px]  md:w-[148px] xl:h-[40px] mx-auto">
            <button
              className="absolute top-0  xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r "
              onClick={goToLogin}
            >
              <span
                className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[32px] md:w-[136px] 
                         md:h-[52px] rounded-full bg-[#261936] 
                      hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
              >
                <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium">
                  Try it out
                </span>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div> */}
          <div className="relative flex w-[110px] h-[32px]  md:w-[200px] xl:h-[40px] mx-auto">
            <button
              className="absolute top-0  xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r "
            >
              <span
                className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[32px] md:w-[172px] 
                        md:h-[52px] rounded-full bg-[#261936] 
                      hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
              >
                <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium">
                  Coming Soon
                </span>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div>
        </div>
        {/* Third Card */}

        <div
          className="w-[395px] h-[480px] md:h-[540px] rounded-[16px] px-2 py-4 md:pt-[36px] md:pl-[25px] md:pr-[23px] md:pb-[50px] border border-solid border-[#fff] border-opacity-[30%] hover:border-[#B631B1] transition 
            duration-1000 ease-in-out"
        >
          <Image
            src={`${IMAGE_URL}/assets/images/home/vd3.png`}
            width={350}
            height={200}
            alt=""
            className="min-h-[200px] object-cover"
          />
          <h3 className="mt-[38px] font-normal text-[24px] leading-[30px] text-center text-white mb-4">
            Edit{" "}
            <span className="font-bold">
              Your <br /> Creatives
            </span>
          </h3>
          <p className="font-normal text-[16px] leading-[20px] text-center text-white mb-[40px]">
            Use our robust editing tools to add animations, music, and more for
            a remarkable outcome!
          </p>
          {/* <div className="relative flex w-[80px] h-[32px]  md:w-[148px] xl:h-[40px] mx-auto">
            <button
              className="absolute top-0  xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r "
              onClick={goToLogin}
            >
              <span
                className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[32px] md:w-[136px] 
                         md:h-[52px] rounded-full bg-[#261936] 
                      hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
              >
                <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium">
                  Try it out
                </span>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div> */}
          <div className="relative flex w-[110px] h-[32px]  md:w-[200px] xl:h-[40px] mx-auto">
            <button
              className="absolute top-0  xl:top-0 px-[0.9px] py-[0.9px] rounded-full 
                    bg-gradient-to-r from-[#B631B1] to-[#7048D7] border-gradient-to-r "
            >
              <span
                className="px-4 py-2 xl:px-6 xl:py-2 flex items-center justify-center h-[32px] md:w-[172px] 
                        md:h-[52px] rounded-full bg-[#261936] 
                      hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] hover:shadow-buttonShadow buttonShadowTransition"
              >
                <span className="w-full text-white text-[10px] md:text-[18px] font-normal xl:font-medium">
                  Coming Soon
                </span>
              </span>
            </button>
            {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
