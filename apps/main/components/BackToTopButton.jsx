"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    const top = window.scrollY;
    setIsVisible(top > 1000); // Adjust the threshold as needed
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          id="top"
          // className="flex items-center gap-[9px] justify-center text-white mx-auto pt-[76.5px] cursor-pointer"
          className="fixed bottom-6 right-3 sm:bottom-10 sm:right-10 flex items-center gap-[9px] text-white rounded-full p-3 cursor-pointer"
          onClick={scrollToTop}
        >
          <span className="text-[14px] md:text-[18px] font-normal hidden sm:block backTotopText">
           
          </span>
          <Image
            src={`${IMAGE_URL}/assets/images/home/backtotop.svg`}
            alt="backtotop"
            width={28}
            height={28}
          />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
