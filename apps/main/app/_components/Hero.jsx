/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import Typewriter from "typewriter-effect";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const Hero = () => {
  const conref = useRef();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSafariBrowser, setISafariBrowser] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [muted, setMuted] = useState(true);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const goToLogin = () => {
    router.push("apphome/login");
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onClickPlayerHandler = () => {
    if (!conref.current) return;

    if (conref.current.paused) {
      conref.current.play();
      setShowPlayButton(false);
    } else {
      conref.current.pause();
      setShowPlayButton(true);
    }
  };

  const onVolumeHandler = () => {
    if (muted) {
      conref.current.volume = 1;
      conref.current.muted = false;
      setMuted(false);
    } else {
      conref.current.volume = 0;
      conref.current.muted = true;
      setMuted(true);
    }
  };

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setISafariBrowser(isSafari);
    if (conref.current && !isSafari) {
      conref.current.play();
      setShowPlayButton(false);
    }
  }, []);

  return (
    <div className=" relative overflow-hidden bg-[#130625]">
      <div className="flex flex-col items-center justify-center hero_content_home pt-24 relative z-10">
        <h1 className="hero_content_title text-[41px] leading-[50px] sm:text-[64px]  sm:leading-[100px] xl:text-[92px]  xl:leading-[100px] text-[#D9D9D9] text-center max-w-max-content font-bold hero_head_size">
          Transform with NYX
        </h1>
        <div
          id="changingText"
          className="typingText text-[41px] leading-[50px] sm:text-[64px] md:text-[92px] md:leading-normal xl:text-[100px] text-center lg:leading-[121px] font-bold mt-2 bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent relative hero_head_size"
          style={{ display: "inline-block" }}
        >
          <Typewriter
            options={{
              strings: ["Creatives", "Design", "Digital Ads"],
              autoStart: true,
              loop: true,
            }}
          />
          <span className="cursor" />
        </div>

        <h3 className="text-[12px] leading-[18px] sm:text-[14px] sm:leading-[21px] sm:px-[60px]  lg:text-[18px] lg:leading-[27px] text-center font-normal text-white px-[0px] xl:px-[100px] mt-4">
          Unlock Twin AI Platform for Rapid High-Converting Content
        </h3>
        <div className="text-center mt-[50px]">
          <button
            onClick={goToLogin}
            className="text-[14px] lg:text-[18px] h-[36px] w-[130px] md:h-[52px] md:w-[172px] md:px-[22px] md:py-[8px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition"
          >
            Start for free
          </button>
          <Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />
        </div>
      </div>
      <video
        loop
        muted
        playsInline
        controls={false}
        ref={conref}
        preload={isSafariBrowser ? "none" : ""}
        className="max-w-full max-h-full w-full h-[100vh] m-auto object-cover z-[2147483647]"
      >
        <source
          src={`${IMAGE_URL}/video/phone%20mp4.png0001-0864.mp4`}
          type="video/mp4"
          media="all and (max-width: 639px)"
        />
        <source
          src={`${IMAGE_URL}/video/phone%20webmp.png0001-0864.webm`}
          type="video/webm"
          media="all and (max-width: 639px)"
        />
        <source
          src={`${IMAGE_URL}/video/desktop%20mp4.png0001-0864.mp4`}
          type="video/mp4"
          media="all and (min-width: 640px)"
        />
        <source
          src={`${IMAGE_URL}/video/desktop%20webmp.png0001-0864.webm`}
          type="video/webm"
          media="all and (min-width: 640px)"
        />
      </video>
      <div className="absolute right-4 bottom-8 flex gap-4 justify-center items-center">
        {/* <button className="opacity-80" onClick={onVolumeHandler}>
          {muted ? (
            <SpeakerXMarkIcon className="w-6 h-6 fill-white" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6 fill-white" />
          )}
        </button> */}
        <button
          className={`opacity-55 ${isSafariBrowser ? "" : "hidden"}`}
          onClick={onClickPlayerHandler}
        >
          {showPlayButton ? (
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 107 106"
              className="w-10 h-10 fill-white"
            >
              <path
                d="M47.537 69.563 69.07 55.761c1.03-.662 1.546-1.583 1.546-2.76 0-1.178-.516-2.098-1.546-2.76L47.537 36.437c-1.104-.736-2.226-.791-3.367-.166-1.141.626-1.712 1.602-1.712 2.927v27.604c0 1.325.57 2.3 1.712 2.926 1.14.626 2.263.57 3.367-.166ZM53.5 97.167c-6.11 0-11.852-1.16-17.225-3.478-5.374-2.319-10.048-5.465-14.023-9.44-3.975-3.975-7.122-8.65-9.44-14.023C10.491 64.852 9.332 59.11 9.332 53c0-6.11 1.16-11.852 3.478-17.225 2.32-5.374 5.466-10.048 9.441-14.023 3.975-3.975 8.65-7.122 14.023-9.44C41.648 9.992 47.39 8.833 53.5 8.833c6.11 0 11.851 1.16 17.225 3.478 5.374 2.319 10.048 5.466 14.023 9.44 3.975 3.976 7.122 8.65 9.44 14.024 2.32 5.373 3.479 11.115 3.479 17.225 0 6.11-1.16 11.851-3.478 17.225-2.32 5.373-5.466 10.048-9.441 14.023-3.975 3.975-8.65 7.121-14.023 9.44-5.374 2.319-11.115 3.478-17.225 3.478Zm0-8.833c9.864 0 18.219-3.423 25.064-10.269 6.846-6.846 10.27-15.2 10.27-25.064s-3.424-18.22-10.27-25.065C71.72 21.09 63.364 17.667 53.5 17.667S35.28 21.09 28.435 27.937C21.59 34.781 18.167 43.136 18.167 53s3.422 18.218 10.268 25.064S43.636 88.334 53.5 88.334Z"
                fill="#fff"
              />
            </svg>
          ) : (
            <PauseCircleIcon className="w-10 h-10 fill-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Hero;
