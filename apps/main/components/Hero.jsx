/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UseContextData } from "../hooks/usecontext";
import { usePathname } from "next/navigation";
import CustomLink from "@nyx-frontend/main/components/Link";

const hero = IMAGE_URL + "/assets/images/hero.png";
const heroM = IMAGE_URL + "/assets/images/banners/HeroM2.png";
const collection_nft = IMAGE_URL + "/assets/images/home/collection_nft.svg";
const event_nft = IMAGE_URL + "/assets/images/home/event_nft.svg";
const music_nft = IMAGE_URL + "/assets/images/home/music_nft.svg";
const video_nft = IMAGE_URL + "/assets/images/home/video_nft.svg";

function Hero() {
  const { isLoggedIn } = useContext(UseContextData);

  const navigate = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  let url_path = usePathname();

  useEffect(() => {
    setIsHome(url_path === "about" ? false : true);
    setIsSmallScreen(window.innerWidth < 768 ? true : false);
  }, [url_path]);


  return (
    <>
      <section
        className={`bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${isHome && isSmallScreen
              ? heroM
              : isHome
                ? hero
                : isSmallScreen
                  ? heroM
                  : hero
            })`,
        }}
      >
        <div className="flex h-[550px] md:h-[654px] justify-center md:justify-start items-end md:items-center md:pl-[5%]">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold leading-3 text-amber-400">
              Invest. Distribute. Earn.
            </h2>
            <h3 className="mt-5 text-gray-300 text-base lg:text-lg">
              Choose from the wide range of{" "}
            </h3>
            <h3 className="font-bold text-white text-base lg:text-lg">
              NYX Entertainment Shares.
            </h3>

            <div className="mt-6">
              {!isLoggedIn ? (
                <CustomLink
                  href={process.env.NEXT_PUBLIC_APP_URL + "/apphome/login"}
                  className="text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-3 py-2 text-center"
                >
                  Get started for free
                </CustomLink>
              ) : (
                <CustomLink
                  href="/marketplace"
                  className="mt-6 text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-2 text-center"
                >
                  Start Investing
                </CustomLink>
              )}
            </div>
          </div>
        </div>

        {/* <div className="md:hidden mx-10 md:mx-auto flex gap-4 text-white">
          <div className="absolute mt-8 grid grid-cols-2 gap-4 items-center justify-center">
            <span
              onClick={() => navigate("/music")}
              className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
            >
              <img src={music_nft} alt="" className="h-8" />
              <p className="font-semibold"> Music </p>
            </span>
            <span
              onClick={() => navigate("/video")}
              className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
            >
              <img src={video_nft} alt="" className="h-8" />
              <p className="font-semibold"> Videos </p>
            </span>
            <span
              onClick={() => navigate("/apphome/event")}
              className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
            >
              <img src={event_nft} alt="" className="h-8" />
              <p className="font-semibold"> Events </p>
            </span>
            <span
              onClick={() => navigate("/collectibles")}
              className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
            >
              <img src={collection_nft} alt="" className="h-8" />
              <p className="font-semibold"> Collectibles </p>
            </span>
          </div>
        </div> */}

        <div className="flex flex-wrap md:flex-no-wrap mt-10 md:mt-0 items-center justify-center gap-4 text-white m-auto pb-5">
          <span
            onClick={() => navigate.push("/music")}
            className="hero_btn border-none cursor-pointer gap-2 w-40 rounded-md  flex items-center py-2"
          >
            <img
              src={music_nft}
              alt="music_nft"
              className="h-10 pl-4"
              loading="lazy"
              decoding="async"
            />
            <p className="font-normal"> Music </p>
          </span>
          <span
            onClick={() => navigate.push("/video")}
            className="hero_btn border-none cursor-pointer gap-2 w-40 rounded-md  flex items-center py-2"
          >
            <img
              src={video_nft}
              alt="video_nft"
              className="h-10 pl-4"
              loading="lazy"
              decoding="async"
            />
            <p className="font-normal"> Videos </p>
          </span>
          <span
            onClick={() => navigate.push("/event")}
            className="hero_btn border-none cursor-pointer gap-2 w-40 rounded-md  flex items-center py-2"
          >
            <img
              src={event_nft}
              alt="event_nft"
              className="h-10 pl-4"
              loading="lazy"
              decoding="async"
            />
            <p className="font-normal"> Events </p>
          </span>
          <span
            onClick={() => navigate.push("/collectibles")}
            className="hero_btn border-none cursor-pointer gap-2 w-40 rounded-md  flex items-center py-2"
          >
            <img
              src={collection_nft}
              alt="collection_nft"
              className="h-10 pl-2"
              loading="lazy"
              decoding="async"
            />
            <p className="font-normal"> Collectibles </p>
          </span>
        </div>
      </section>

      {/* <section className={`block md:hidden relative bg-center bg-no-repeat`}>
        <div className="relative">
          <img src={isHome ? heroM : about_heroM} className="w-full" alt="" />
          <div className="absolute text-amber-400 bottom-12 left-1/2 text-center w-2/3 -translate-x-1/2">
            <div className="text-xl md:text-2xl lg:text-4xl leading-none md:leading-3 text-amber-400">
              <h3 className="font-black">Invest. Distribute. Earn.</h3>
              <h3 className="mt-5 text-gray-300 text-sm">
                Choose from the wide range of <b> NYX Entertainment Shares.</b>
              </h3>
            </div>
            {!isLoggedIn ? (
              <button className="mt-10">
                <span
                  onClick={() => navigate("/apphome/login")}
                  className="mt-5 text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-2 text-center mr-2 mb-2"
                >
                  Get started for free
                </span>
              </button>
            ) : (
              <button className="mt-10">
                <span
                  onClick={() => navigate("/marketplace")}
                  className="mt-5 text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-2 text-center mr-2 mb-2"
                >
                  Start Investing
                </span>
              </button>
            )}
          </div>
        </div>
        {isHome === true && (
          <>
            <div className="md:hidden mx-10 md:mx-auto flex gap-4 text-white">
              <div className="absolute mt-8 grid grid-cols-2 gap-4 items-center justify-center">
                <span
                  onClick={() => navigate("/music")}
                  className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
                >
                  <img src={music_nft} alt="" className="h-8" />
                  <p className="font-semibold"> Music </p>
                </span>
                <span
                  onClick={() => navigate("/video")}
                  className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
                >
                  <img src={video_nft} alt="" className="h-8" />
                  <p className="font-semibold"> Videos </p>
                </span>
                <span
                  onClick={() => navigate("/event")}
                  className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
                >
                  <img src={event_nft} alt="" className="h-8" />
                  <p className="font-semibold"> Events </p>
                </span>
                <span
                  onClick={() => navigate("/collectibles")}
                  className="hero_btn border-none text-sm cursor-pointer px-4 gap-2 w-36 rounded-md  flex items-center justify-center py-2"
                >
                  <img src={collection_nft} alt="" className="h-8" />
                  <p className="font-semibold"> Collectibles </p>
                </span>
              </div>
            </div>

            <div className="hidden md:absolute md:flex gap-4 text-white mt-[-1.5em] left-1/2 -translate-x-1/2">
              <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="flex gap-4 items-center justify-center">
                      <span
                        onClick={() => navigate("/music")}
                        className="hero_btn border-none cursor-pointer px-4 gap-2 w-48 rounded-md  flex items-center justify-center py-2"
                      >
                        <img src={music_nft} alt="" className="h-12" />
                        <p className="font-semibold"> Music </p>
                      </span>
                      <span
                        onClick={() => navigate("/video")}
                        className="hero_btn border-none cursor-pointer px-4 gap-2 w-48 rounded-md  flex items-center justify-center py-2"
                      >
                        <img src={video_nft} alt="" className="h-12" />
                        <p className="font-semibold"> Videos </p>
                      </span>
                      <span
                        onClick={() => navigate("/event")}
                        className="hero_btn border-none cursor-pointer px-4 gap-2 w-48 rounded-md  flex items-center justify-center py-2"
                      >
                        <img src={event_nft} alt="" className="h-12" />
                        <p className="font-semibold"> Events </p>
                      </span>
                      <span
                        onClick={() => navigate("/collectibles")}
                        className="hero_btn border-none cursor-pointer px-4 gap-2 w-48 rounded-md  flex items-center justify-center py-2"
                      >
                        <img src={collection_nft} alt="" className="h-12" />
                        <p className="font-semibold"> Collectibles </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section> */}
    </>
  );
}

export default Hero;
