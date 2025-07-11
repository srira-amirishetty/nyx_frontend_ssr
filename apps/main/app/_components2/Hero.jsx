/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import Typewriter from "typewriter-effect";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Hero = () => {
  const conref = useRef();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSafariBrowser, setISafariBrowser] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

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
      <div className="flex flex-col items-center justify-center hero_content_home sm:pt-24 relative z-10">
        <h1 className="hero_content_title text-[24px] leading-[35px] sm:text-[40px]  sm:leading-[64px] xl:text-[48px]  xl:leading-[64px] text-[#D9D9D9] text-center max-w-max-content font-bold hero_head_size ">
          Maximize ROI <br className="sm:hidden" /> With NYX AI Agents
        </h1>
        <div
          id="changingText"
          className="typingText text-[20px] pb-2 leading-[30px] mt-[12px] sm:text-[40px]  sm:leading-[64px] xl:text-[36px] text-center lg:leading-[44px] font-bold  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent relative hero_head_size"
          style={{ display: "inline-block" }}
        >
          <Typewriter
            options={{
              strings: ["High Performing Creatives", "Smart Ad Management"],
              autoStart: true,
              loop: true,
              deleteSpeed: 0,
            }}
          />

          <span className="cursor" />
        </div>

        <div className="text-center mt-[50px]">
          <Link href={process.env.NEXT_PUBLIC_APP_URL + "/apphome/login"}>
            <button className="text-[14px] lg:text-[18px] h-[36px] w-[130px] md:h-[52px] md:w-[172px] md:px-[22px] md:py-[8px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition">
              Get Started
            </button>
          </Link>

          <Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />
        </div>

        {/* <div className="w-full flex justify-center mt-5 lg:hidden">
          <a
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
          </a>
        </div> */}
      </div>
      <video
        loop
        muted
        playsInline
        controls={false}
        ref={conref}
        preload={isSafariBrowser ? "none" : ""}
        className="max-w-full max-h-full w-full h-[70vh] m-auto object-cover z-[2147483647]"
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
      {/* <div className="w-full flex justify-end mt-5 max-lg:hidden absolute right-5 bottom-5">
        <a
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
        </a>
      </div> */}
    </div>
  );
};

export default Hero;
