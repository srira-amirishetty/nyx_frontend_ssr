/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Slider } from "rsuite";
import "./rsuiteSlider.css";
import { IMAGE_TO_VIDEO_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { toast } from "react-toastify";

const FocusPoint = ({ tab, setBrandTab, updatedata, imageUploaded,setgeneratebuttonloading }) => {
  const [focusElement, setFocusElement] = useState(null);
  const [focusElementTab, setFocusElementTab] = useState(true);

  const FocusPointData = () => {
    if (focusElementTab) {
      setFocusElement("1");
    }
    console.log(focusElement);
    updatedata("FocusPoint", focusElement);
    setgeneratebuttonloading(true)
    setBrandTab(IMAGE_TO_VIDEO_TABS.PAINTING);
  };
  const OpenAnimation = () => {
    if (imageUploaded === 0) {
      toast.error("Please Upload Image First");
    } else {
      if(tab===IMAGE_TO_VIDEO_TABS.FOCUSPOINT)
      {
        setBrandTab("")
      }
      else{
        setBrandTab(IMAGE_TO_VIDEO_TABS.FOCUSPOINT)
      }
    }
  };

  return (
    <>
      <div className="bg-[#3B226F] rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === IMAGE_TO_VIDEO_TABS.FOCUSPOINT
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-[#3B226F] text-[#FFFFFF] rounded-lg`}
            // onClick={() => setBrandTab(IMAGE_TO_VIDEO_TABS.FOCUSPOINT)}
            onClick={() => OpenAnimation()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === IMAGE_TO_VIDEO_TABS.FOCUSPOINT
                    ? "text-[#FFCB54] text-base"
                    : "text-[#FFFFFF] text-sm"
                }`}
              >
                Focus Point
              </div>
            </div>

            <span
              className={`${
                tab === IMAGE_TO_VIDEO_TABS.FOCUSPOINT
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === IMAGE_TO_VIDEO_TABS.FOCUSPOINT ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(`bg-[#3B226F] w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 md:px-7 sm:px-4 animationLength">
            <Slider
              defaultValue={0}
              min={0}
              step={1}
              max={5}
              graduated
              progress
              className="my-2"
              onChange={(value) => {
                setFocusElement(value);
              }}
              onClick={() => setFocusElementTab(false)}
            />
            <div className="flex justify-between items-center">
              <p className="text-[#8297BD] text-xs font-medium" id="rangeValue">
                Close
              </p>
              <p className="text-[#8297BD] text-xs font-medium">Far</p>
            </div>
            <div className="text-center mt-4 mb-2">
              {/* <Button
                className="rounded-full bg-[#F1BB2E] text-[#000000] px-[40px]"
                onClick={FocusPointData}
              >
                Save
              </Button> */}
               { focusElement ? (
                  <Button
                    className="rounded-full w-[109px] hover:shadow-none font-semibold py-[6px]"
                    onClick={FocusPointData}
                  >
                    Save
                  </Button>
                ) : (
                  <button className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-[109px] hover:shadow-none py-[8px] cursor-not-allowed">
                    Save
                  </button>
                )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FocusPoint;
