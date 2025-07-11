/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../index.css";

const TopNav2: React.FC = () => {
  const [showVerticalMenu, setShowVerticalMenu] = useState(false);

  const handleClickScroll = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScroll = () => {
    const productsSection = document.getElementById("image");
    const whyNyxSection = document.getElementById("whyNyxSection");

    if (productsSection && whyNyxSection) {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      // Adjust the thresholds as needed
      const productsThreshold = productsSection.offsetTop - 200;
      const whyNyxThreshold = whyNyxSection.offsetTop - 200;

      // Toggle the vertical menu visibility based on scroll position
      setShowVerticalMenu(
        scrollPosition >= productsThreshold && scrollPosition < whyNyxThreshold,
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showVerticalMenu && (
        <div
          className="fixed w-[3rem]  z-30"
          style={{ top: "50%", transform: "translate(0, -50%)" }}
        >
          <div className="flex flex-col gap-4 cursor-pointer">
            <Link href="/">
              <div
                title="Home"
                className=" bg-[#311F4C] flex justify-center menu-item items-center rounded-r-3xl  gap-4 w-[50px] md:w-[60px] h-[50px] sm:hover:w-[12rem]  verticalNavigationTransition "
              >
                <img
                  className="w-[35px] md:w-[2rem] "
                  src={"homeicon.png"}
                  alt="image"
                  loading="lazy"
                  decoding="async"
                ></img>
                <span className="menu-text text-white pt-1 font-semibold hidden xs:block">
                  Home
                </span>
              </div>
            </Link>
            <Link href="/image-craft-ai">
              <div
                title=" ImageCraft AI"
                className="bg-[#311F4C] verticalNavigationTransition flex justify-center menu-item items-center rounded-r-3xl  gap-4 w-[50px] md:w-[60px] h-[50px] sm:hover:w-[12rem]   "
                onClick={() => handleClickScroll("image")}
              >
                <img
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/assets/images/home/ImageProduct.png`
                  }
                  alt="image"
                  className="w-[26px] md:w-[1.5rem] "
                  loading="lazy"
                  decoding="async"
                ></img>
                <span className="menu-text text-white pt-1 font-semibold hidden md:block">
                  ImageCraft AI
                </span>
              </div>
            </Link>

            <Link href="/campulse-ai">
              <div
                title="Campulse-AI"
                className=" bg-[#311F4C] flex justify-center menu-item items-center rounded-r-3xl  gap-4 w-[50px] md:w-[60px] h-[50px] sm:hover:w-[12rem]  verticalNavigationTransition "
              >
                <img
                  className="w-[35px] md:w-[2rem] "
                  src={
                    "https://storage.googleapis.com/nyxassets-new/assets/images/home/CampulseProduct.png"
                  }
                  alt="image"
                  loading="lazy"
                  decoding="async"
                ></img>
                <span className="menu-text text-white pt-1 font-semibold hidden xs:block">
                  CamPulse AI
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav2;
