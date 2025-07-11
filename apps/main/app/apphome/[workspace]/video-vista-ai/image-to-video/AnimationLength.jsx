/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState,useContext  } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Slider } from "rsuite";
import "./rsuiteSlider.css";
import { IMAGE_TO_VIDEO_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const AnimationLength = ({ tab, setBrandTab, updatedata,imageUploaded ,setgeneratebuttonloading,tabControl,reset}) => {
  const [RangeSliderValue, setRangeSliderValue] = useState(4);

  useEffect(()=>{
    setRangeSliderValue(4)
    setgeneratebuttonloading(false)
  },[reset])

  const AnimationLengthValue = () => {
    //console.log(RangeSliderValue)
    updatedata("AnimationLength", RangeSliderValue);
    setgeneratebuttonloading(true)
    if(tabControl==="1"){
      setBrandTab("")
    }
    else{
      setBrandTab("")
      //setBrandTab(IMAGE_TO_VIDEO_TABS.FOCUSPOINT);
    }
  
  };
  const OpenAnimation =()=>{
    if(imageUploaded===0){
      toast.warn(
        <>
          <span className="text-white text-[20px]"> Image Missing!</span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please Upload Image First.
          </span>
        </>,
        { autoClose: 5000 },
      );
    }else{
      if(tab===IMAGE_TO_VIDEO_TABS.LENGTH)
      {
        setBrandTab("")
      }
      else{
        setBrandTab(IMAGE_TO_VIDEO_TABS.LENGTH)
      }
    }
  }

  const { displayMessagePopup } = useContext(MessagePopupContext);
  return (
    <>
      <div className="bg-[#3B226F] rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === IMAGE_TO_VIDEO_TABS.LENGTH
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-[#3B226F] text-[#FFFFFF] rounded-lg`}
            // onClick={() => setBrandTab(IMAGE_TO_VIDEO_TABS.LENGTH)}
            onClick={() => OpenAnimation()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === IMAGE_TO_VIDEO_TABS.LENGTH
                    ? "text-[#FFCB54] text-lg"
                    : "text-[#FFFFFF] text-sm"
                }`}
              >
                Animation Duration
              </div>
            </div>

            <span
              className={`${
                tab === IMAGE_TO_VIDEO_TABS.LENGTH
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
            height: tab === IMAGE_TO_VIDEO_TABS.LENGTH ? "auto" : 0,
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
              defaultValue={4}
              min={0}
              step={1}
              max={6}
              value={RangeSliderValue}
              graduated
              progress
              onChange={(value) => {
                setRangeSliderValue(value);
              }}
              className="my-2 h-4"
            />
            <div className="flex justify-end items-center">
              <p className={`text-16 font-medium ${RangeSliderValue ?'text-[#FFCB54]' : "text-[#8297BD]"}`}>
              {RangeSliderValue ? (<>{RangeSliderValue}s</>):(<>0s</>) }
              </p>
            </div>
            <div className="text-center mt-4 mb-2">
              {/* <Button
                className="rounded-full bg-[#F1BB2E] text-[#000000] px-[40px]"
                onClick={AnimationLengthValue}
              >
                Save
              </Button> */}
               { RangeSliderValue ? (
                  <Button
                    className="rounded-full w-[109px] hover:shadow-none font-semibold py-1.5 hover:bg-nyx-yellow hover:text-black text-nyx-yellow focus:shadow-glow"
                    onClick={AnimationLengthValue}
                  >
                    Next
                  </Button>
                ) : (
                  <button className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-[109px] hover:shadow-none  py-1.5 cursor-not-allowed">
                    Next
                  </button>
                )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AnimationLength;
