"use client";
import "./index.css";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { tabLandscapePopUpStyle } from "@nyx-frontend/main/utils/modalstyles";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const landscapeIcon = IMAGE_URL + "/assets/mwebappicon.png";

function LandscapePopUp() {
  const [tabLandscapePopUp, setTabLandscapePopUp] = useState<boolean>(false);

  const onClick = () => {
    setTabLandscapePopUp(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setTabLandscapePopUp(false); // Ensure the modal does not show below 600px
      } else if (window.innerWidth < 1024) {
        setTabLandscapePopUp(true); // Show the modal between 600px and 1024px
      } else {
        setTabLandscapePopUp(false); // Hide the modal above 1024px
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {tabLandscapePopUp ? (
        <Modal
          isOpen={tabLandscapePopUp}
          style={tabLandscapePopUpStyle}
          ariaHideApp={false}
        >
          <div className="w-[474px] h-[442px] relative p-2 rounded-[10px]">
            <button
              className="absolute right-2"
              onClick={onClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="text-white size-6"
              >
                <path
                  fill="currentColor"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </button>
            <div className="mt-5">
              <Image
                src={landscapeIcon}
                width={104}
                height={104}
                alt="Landscape Icon"
                className="text-center mx-auto"
              />
              <p className="mt-[49px] text-[20px] leading-[32px] text-center font-bold text-white">
                Hello, our app loves big screens.
              </p>
              <p className="text-[16px] leading-[32px] text-center font-normal mt-8 text-white">
                {" "}
                Grab your laptop/desktop or tab, let&apos;s create content
              </p>
              <Link href="/">
                <p className="text-[#FFC01D] text-[20px] leading-[22px] text-center font-bold mt-[35px] underline">
                  Back to home
                </p>
              </Link>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default LandscapePopUp;
