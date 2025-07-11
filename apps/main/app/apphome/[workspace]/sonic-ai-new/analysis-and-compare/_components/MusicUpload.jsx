"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { SONIC_AI_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";
import Toggle from "./Toggle";
import Modal from "react-modal";
import { onetimeemailverification ,welcomePopUpStyle} from "@nyx-frontend/main/utils/modalstyles";

const MusicUpload = ({
  tab,
  setTab,
  uploadButtonClick,
  originalLoading,
  referenceLoading,
  reference2Loading,
  reference3Loading,
  reference4Loading,
  originalSuccess,
  referenceSuccess,
  reference2Success,
  reference3Success,
  reference4Success,
  anlysisClick,
  originalsongname,
  reference3songname,
  reference2songname,
  reference1songname,
  reference4songname,
  generaselected,
}) => {
  const [selectedValue, setSelectedValue] = useState(false);
  const [generanotselected, setgeneranotselected] = useState(false);
  const [array, setArray] = useState([1]); // initialize an empty array

  const handleClick = () => {
    if (array.length < 4) {
      const newArray = [...array, `Element ${array.length + 1}`];
      setArray(newArray);
    }
  };

  const handleToggleChange = (value) => {
    setSelectedValue(value);
    console.log(value);
  };

  const OpenUpload = () => {
    if (generaselected) {
      if (tab === SONIC_AI_TABS.MUSICUPLOAD) {
        setTab("");
      } else {
        setTab(SONIC_AI_TABS.MUSICUPLOAD);
      }
    } else {
      setgeneranotselected(true)
    }
  };
  const close = ()=>{
    setgeneranotselected(false)
    setTab(SONIC_AI_TABS.MUSICGENRE)

  }

  return (
    <>
      <div className="bg-nyx-blue-4 rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === SONIC_AI_TABS.MUSICUPLOAD
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg`}
            onClick={() => OpenUpload()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === SONIC_AI_TABS.MUSICUPLOAD
                    ? "text-nyx-yellow  text-lg"
                    : "text-white text-base"
                }`}
              >
                Music Upload
              </div>
            </div>

            <span
              className={`${
                tab === SONIC_AI_TABS.MUSICUPLOAD
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
            height: tab === SONIC_AI_TABS.MUSICUPLOAD ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={classNames(
            `bg-nyx-blue-4 w-full overflow-hidden rounded-lg`,
          )}
        >
          <div className="flex flex-col mt-2">
            <div className="w-full px-5">
              <p className="w-full text-white flex justify-start items-start text-[14px] font-bold ">
                Original Song <span className="ml-1 text-red-500">*</span>
              </p>
              <div className="flex flex-col py-2 text-white">
                {originalSuccess ? (
                  <div className="flex flex-col">
                    <div className="w-full h-[100px] bg-[#A388C4] rounded-t-lg flex justify-center items-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.451 0.546411C24.8568 0.478731 25.2725 0.500245 25.6692 0.609456C26.0659 0.718668 26.434 0.912957 26.748 1.17882C27.062 1.44468 27.3143 1.77573 27.4874 2.14896C27.6605 2.52219 27.7503 2.92865 27.7504 3.34008V20.0851C27.7502 21.3325 27.3383 22.5449 26.5788 23.5343C25.8192 24.5238 24.7544 25.235 23.5495 25.5576C22.3446 25.8803 21.0668 25.7963 19.9145 25.3188C18.7621 24.8413 17.7995 23.9969 17.176 22.9166C16.5524 21.8363 16.3027 20.5804 16.4656 19.3437C16.6286 18.107 17.195 16.9586 18.0771 16.0766C18.9591 15.1947 20.1076 14.6284 21.3443 14.4656C22.581 14.3028 23.8368 14.5526 24.9171 15.1763V9.00674L10.7504 11.3683V21.5017C10.7504 21.5867 10.7434 21.6675 10.7292 21.7482C10.8309 22.8376 10.5694 23.9301 9.9855 24.8553C9.40159 25.7806 8.52802 26.4868 7.50091 26.8638C6.4738 27.2408 5.35083 27.2675 4.30696 26.9398C3.26309 26.612 2.35694 25.9482 1.72969 25.0517C1.10244 24.1552 0.789327 23.0765 0.839125 21.9835C0.888923 20.8905 1.29884 19.8447 2.00501 19.009C2.71117 18.1732 3.67393 17.5945 4.74329 17.3631C5.81264 17.1316 6.92853 17.2603 7.9171 17.7292V5.70166C7.91702 5.03096 8.15487 4.38197 8.58834 3.87016C9.02181 3.35835 9.62278 3.01691 10.2844 2.90658L24.451 0.546411ZM10.7504 8.49674L24.9171 6.13516V3.34008L10.7504 5.70166V8.49674Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="w-full h-[30px] bg-[#5E32FF] rounded-b-lg text-center text-sm">
                      <p className="mt-1">{originalsongname}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    className="w-full h-[130px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-2 cursor-pointer"
                    onClick={uploadButtonClick("ORIGINAL")}
                  >
                    {originalLoading ? (
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <ButtonLoading />
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          viewBox="0 0 101 101"
                          fill="none"
                        >
                          <path
                            d="M46.2943 67.332V33.0341L35.3526 43.9758L29.4609 37.8737L50.5026 16.832L71.5443 37.8737L65.6526 43.9758L54.7109 33.0341V67.332H46.2943ZM25.2526 84.1654C22.938 84.1654 20.9566 83.3412 19.3083 81.693C17.6601 80.0447 16.8359 78.0633 16.8359 75.7487V63.1237H25.2526V75.7487H75.7526V63.1237H84.1693V75.7487C84.1693 78.0633 83.3451 80.0447 81.6969 81.693C80.0486 83.3412 78.0672 84.1654 75.7526 84.1654H25.2526Z"
                            fill="white"
                          />
                        </svg>
                        <div className="text-sm text-[14px] text-[#FFFFFF]">
                          Upload your song here
                        </div>
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
            {selectedValue === false && (
              <p className="flex justify-start items-start text-[10px]  font-normal italic ml-6 mr-6 text-white">
                Upload your MP3, AIFF, or WAV file by clicking the button at the
                top of the home page. The song will then be sent to our AI
                engine.
              </p>
            )}
            <div
              className={
                selectedValue
                  ? `w-full px-5 text-white`
                  : `w-full px-5 text-white mt-2`
              }
            >
              <div className="flex justify-between items-center mb-4 mt-[-10px] ml-1 mr-2">
                <p className="text-[14px] mb-[-10px]">
                  Compare with a reference song
                </p>
                <Toggle
                  id={1}
                  value={selectedValue}
                  onChange={handleToggleChange}
                  option1={false}
                  option2={true}
                />
              </div>
              <div className="flex justify-center  gap-[15px] px-3">
                {selectedValue && (
                  <div className="flex w-full min-w-[50%] flex-col py-2 text-white">
                    {referenceSuccess ? (
                      <div className="flex flex-col">
                        <div className="w-full h-[100px] bg-[#A388C4] rounded-t-lg flex justify-center items-center">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24.451 0.546411C24.8568 0.478731 25.2725 0.500245 25.6692 0.609456C26.0659 0.718668 26.434 0.912957 26.748 1.17882C27.062 1.44468 27.3143 1.77573 27.4874 2.14896C27.6605 2.52219 27.7503 2.92865 27.7504 3.34008V20.0851C27.7502 21.3325 27.3383 22.5449 26.5788 23.5343C25.8192 24.5238 24.7544 25.235 23.5495 25.5576C22.3446 25.8803 21.0668 25.7963 19.9145 25.3188C18.7621 24.8413 17.7995 23.9969 17.176 22.9166C16.5524 21.8363 16.3027 20.5804 16.4656 19.3437C16.6286 18.107 17.195 16.9586 18.0771 16.0766C18.9591 15.1947 20.1076 14.6284 21.3443 14.4656C22.581 14.3028 23.8368 14.5526 24.9171 15.1763V9.00674L10.7504 11.3683V21.5017C10.7504 21.5867 10.7434 21.6675 10.7292 21.7482C10.8309 22.8376 10.5694 23.9301 9.9855 24.8553C9.40159 25.7806 8.52802 26.4868 7.50091 26.8638C6.4738 27.2408 5.35083 27.2675 4.30696 26.9398C3.26309 26.612 2.35694 25.9482 1.72969 25.0517C1.10244 24.1552 0.789327 23.0765 0.839125 21.9835C0.888923 20.8905 1.29884 19.8447 2.00501 19.009C2.71117 18.1732 3.67393 17.5945 4.74329 17.3631C5.81264 17.1316 6.92853 17.2603 7.9171 17.7292V5.70166C7.91702 5.03096 8.15487 4.38197 8.58834 3.87016C9.02181 3.35835 9.62278 3.01691 10.2844 2.90658L24.451 0.546411ZM10.7504 8.49674L24.9171 6.13516V3.34008L10.7504 5.70166V8.49674Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className="w-full h-[30px] bg-[#5E32FF] rounded-b-lg text-center text-[12px]">
                          <p className="mt-2 truncate px-2">
                            {reference1songname}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full h-[130px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-6 cursor-pointer"
                        onClick={uploadButtonClick("REFERENCE")}
                      >
                        {referenceLoading ? (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <ButtonLoading />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="35"
                              viewBox="0 0 101 101"
                              fill="none"
                            >
                              <path
                                d="M46.2943 67.332V33.0341L35.3526 43.9758L29.4609 37.8737L50.5026 16.832L71.5443 37.8737L65.6526 43.9758L54.7109 33.0341V67.332H46.2943ZM25.2526 84.1654C22.938 84.1654 20.9566 83.3412 19.3083 81.693C17.6601 80.0447 16.8359 78.0633 16.8359 75.7487V63.1237H25.2526V75.7487H75.7526V63.1237H84.1693V75.7487C84.1693 78.0633 83.3451 80.0447 81.6969 81.693C80.0486 83.3412 78.0672 84.1654 75.7526 84.1654H25.2526Z"
                                fill="white"
                              />
                            </svg>
                            <div className="text-sm text-[14px] text-[#FFFFFF]">
                              Upload your reference song here
                            </div>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                )}
                {selectedValue && referenceSuccess && (
                  <div className="flex  flex-col min-w-[50%] py-2 text-white">
                    {reference2Success ? (
                      <div className="flex flex-col">
                        <div className="w-full h-[100px] bg-[#A388C4] rounded-t-lg flex justify-center items-center">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24.451 0.546411C24.8568 0.478731 25.2725 0.500245 25.6692 0.609456C26.0659 0.718668 26.434 0.912957 26.748 1.17882C27.062 1.44468 27.3143 1.77573 27.4874 2.14896C27.6605 2.52219 27.7503 2.92865 27.7504 3.34008V20.0851C27.7502 21.3325 27.3383 22.5449 26.5788 23.5343C25.8192 24.5238 24.7544 25.235 23.5495 25.5576C22.3446 25.8803 21.0668 25.7963 19.9145 25.3188C18.7621 24.8413 17.7995 23.9969 17.176 22.9166C16.5524 21.8363 16.3027 20.5804 16.4656 19.3437C16.6286 18.107 17.195 16.9586 18.0771 16.0766C18.9591 15.1947 20.1076 14.6284 21.3443 14.4656C22.581 14.3028 23.8368 14.5526 24.9171 15.1763V9.00674L10.7504 11.3683V21.5017C10.7504 21.5867 10.7434 21.6675 10.7292 21.7482C10.8309 22.8376 10.5694 23.9301 9.9855 24.8553C9.40159 25.7806 8.52802 26.4868 7.50091 26.8638C6.4738 27.2408 5.35083 27.2675 4.30696 26.9398C3.26309 26.612 2.35694 25.9482 1.72969 25.0517C1.10244 24.1552 0.789327 23.0765 0.839125 21.9835C0.888923 20.8905 1.29884 19.8447 2.00501 19.009C2.71117 18.1732 3.67393 17.5945 4.74329 17.3631C5.81264 17.1316 6.92853 17.2603 7.9171 17.7292V5.70166C7.91702 5.03096 8.15487 4.38197 8.58834 3.87016C9.02181 3.35835 9.62278 3.01691 10.2844 2.90658L24.451 0.546411ZM10.7504 8.49674L24.9171 6.13516V3.34008L10.7504 5.70166V8.49674Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className="w-full h-[30px] bg-[#5E32FF] rounded-b-lg text-center text-[12px]">
                          <p className="mt-2 truncate px-2">
                            {reference2songname}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full h-[130px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-6 cursor-pointer"
                        onClick={uploadButtonClick("REFERENCE_TWO")}
                      >
                        {reference2Loading ? (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <ButtonLoading />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="35"
                              viewBox="0 0 101 101"
                              fill="none"
                            >
                              <path
                                d="M46.2943 67.332V33.0341L35.3526 43.9758L29.4609 37.8737L50.5026 16.832L71.5443 37.8737L65.6526 43.9758L54.7109 33.0341V67.332H46.2943ZM25.2526 84.1654C22.938 84.1654 20.9566 83.3412 19.3083 81.693C17.6601 80.0447 16.8359 78.0633 16.8359 75.7487V63.1237H25.2526V75.7487H75.7526V63.1237H84.1693V75.7487C84.1693 78.0633 83.3451 80.0447 81.6969 81.693C80.0486 83.3412 78.0672 84.1654 75.7526 84.1654H25.2526Z"
                                fill="white"
                              />
                            </svg>
                            <div
                              className={
                                referenceSuccess
                                  ? ` text-[12px] text-[#FFFFFF] px-3 mt-1`
                                  : `text-sm text-[14px] text-[#FFFFFF]`
                              }
                            >
                              Upload your reference song here
                            </div>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div
                className={
                  reference3Success
                    ? `flex justify-center  gap-[15px] px-3`
                    : `flex justify-center  gap-[15px] px-1`
                }
              >
                {selectedValue && reference2Success && (
                  <div className="flex w-full min-w-[50%] flex-col py-2 text-white">
                    {reference3Success ? (
                      <div className="flex flex-col">
                        <div className="w-full h-[100px] bg-[#A388C4] rounded-t-lg flex justify-center items-center">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24.451 0.546411C24.8568 0.478731 25.2725 0.500245 25.6692 0.609456C26.0659 0.718668 26.434 0.912957 26.748 1.17882C27.062 1.44468 27.3143 1.77573 27.4874 2.14896C27.6605 2.52219 27.7503 2.92865 27.7504 3.34008V20.0851C27.7502 21.3325 27.3383 22.5449 26.5788 23.5343C25.8192 24.5238 24.7544 25.235 23.5495 25.5576C22.3446 25.8803 21.0668 25.7963 19.9145 25.3188C18.7621 24.8413 17.7995 23.9969 17.176 22.9166C16.5524 21.8363 16.3027 20.5804 16.4656 19.3437C16.6286 18.107 17.195 16.9586 18.0771 16.0766C18.9591 15.1947 20.1076 14.6284 21.3443 14.4656C22.581 14.3028 23.8368 14.5526 24.9171 15.1763V9.00674L10.7504 11.3683V21.5017C10.7504 21.5867 10.7434 21.6675 10.7292 21.7482C10.8309 22.8376 10.5694 23.9301 9.9855 24.8553C9.40159 25.7806 8.52802 26.4868 7.50091 26.8638C6.4738 27.2408 5.35083 27.2675 4.30696 26.9398C3.26309 26.612 2.35694 25.9482 1.72969 25.0517C1.10244 24.1552 0.789327 23.0765 0.839125 21.9835C0.888923 20.8905 1.29884 19.8447 2.00501 19.009C2.71117 18.1732 3.67393 17.5945 4.74329 17.3631C5.81264 17.1316 6.92853 17.2603 7.9171 17.7292V5.70166C7.91702 5.03096 8.15487 4.38197 8.58834 3.87016C9.02181 3.35835 9.62278 3.01691 10.2844 2.90658L24.451 0.546411ZM10.7504 8.49674L24.9171 6.13516V3.34008L10.7504 5.70166V8.49674Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className="w-full h-[30px] bg-[#5E32FF] rounded-b-lg text-center text-[12px]">
                          <p className="mt-2 truncate px-2">
                            {reference3songname}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full h-[130px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-6 cursor-pointer"
                        onClick={uploadButtonClick("REFERENCE_THREE")}
                      >
                        {reference3Loading ? (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <ButtonLoading />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="35"
                              viewBox="0 0 101 101"
                              fill="none"
                            >
                              <path
                                d="M46.2943 67.332V33.0341L35.3526 43.9758L29.4609 37.8737L50.5026 16.832L71.5443 37.8737L65.6526 43.9758L54.7109 33.0341V67.332H46.2943ZM25.2526 84.1654C22.938 84.1654 20.9566 83.3412 19.3083 81.693C17.6601 80.0447 16.8359 78.0633 16.8359 75.7487V63.1237H25.2526V75.7487H75.7526V63.1237H84.1693V75.7487C84.1693 78.0633 83.3451 80.0447 81.6969 81.693C80.0486 83.3412 78.0672 84.1654 75.7526 84.1654H25.2526Z"
                                fill="white"
                              />
                            </svg>
                            <div className="text-sm text-[14px] text-[#FFFFFF]">
                              Upload your reference song here
                            </div>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                )}
                {selectedValue && reference3Success && (
                  <div className="flex min-w-[50%] flex-col py-2 text-white">
                    {reference4Success ? (
                      <div className="flex flex-col">
                        <div className="w-full h-[100px] bg-[#A388C4] rounded-t-lg flex justify-center items-center">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M24.451 0.546411C24.8568 0.478731 25.2725 0.500245 25.6692 0.609456C26.0659 0.718668 26.434 0.912957 26.748 1.17882C27.062 1.44468 27.3143 1.77573 27.4874 2.14896C27.6605 2.52219 27.7503 2.92865 27.7504 3.34008V20.0851C27.7502 21.3325 27.3383 22.5449 26.5788 23.5343C25.8192 24.5238 24.7544 25.235 23.5495 25.5576C22.3446 25.8803 21.0668 25.7963 19.9145 25.3188C18.7621 24.8413 17.7995 23.9969 17.176 22.9166C16.5524 21.8363 16.3027 20.5804 16.4656 19.3437C16.6286 18.107 17.195 16.9586 18.0771 16.0766C18.9591 15.1947 20.1076 14.6284 21.3443 14.4656C22.581 14.3028 23.8368 14.5526 24.9171 15.1763V9.00674L10.7504 11.3683V21.5017C10.7504 21.5867 10.7434 21.6675 10.7292 21.7482C10.8309 22.8376 10.5694 23.9301 9.9855 24.8553C9.40159 25.7806 8.52802 26.4868 7.50091 26.8638C6.4738 27.2408 5.35083 27.2675 4.30696 26.9398C3.26309 26.612 2.35694 25.9482 1.72969 25.0517C1.10244 24.1552 0.789327 23.0765 0.839125 21.9835C0.888923 20.8905 1.29884 19.8447 2.00501 19.009C2.71117 18.1732 3.67393 17.5945 4.74329 17.3631C5.81264 17.1316 6.92853 17.2603 7.9171 17.7292V5.70166C7.91702 5.03096 8.15487 4.38197 8.58834 3.87016C9.02181 3.35835 9.62278 3.01691 10.2844 2.90658L24.451 0.546411ZM10.7504 8.49674L24.9171 6.13516V3.34008L10.7504 5.70166V8.49674Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className="w-full h-[30px] bg-[#5E32FF] rounded-b-lg text-center text-[12px]">
                          <p className="mt-2 truncate px-2">
                            {reference4songname}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full h-[130px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-6 cursor-pointer"
                        onClick={uploadButtonClick("REFERENCE_FOUR")}
                      >
                        {reference4Loading ? (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <ButtonLoading />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="35"
                              viewBox="0 0 101 101"
                              fill="none"
                            >
                              <path
                                d="M46.2943 67.332V33.0341L35.3526 43.9758L29.4609 37.8737L50.5026 16.832L71.5443 37.8737L65.6526 43.9758L54.7109 33.0341V67.332H46.2943ZM25.2526 84.1654C22.938 84.1654 20.9566 83.3412 19.3083 81.693C17.6601 80.0447 16.8359 78.0633 16.8359 75.7487V63.1237H25.2526V75.7487H75.7526V63.1237H84.1693V75.7487C84.1693 78.0633 83.3451 80.0447 81.6969 81.693C80.0486 83.3412 78.0672 84.1654 75.7526 84.1654H25.2526Z"
                                fill="white"
                              />
                            </svg>
                            <div
                              className={
                                reference3Success
                                  ? `text-[12px] text-[#FFFFFF] px-3 mt-1`
                                  : `text-sm text-[14px] text-[#FFFFFF]`
                              }
                            >
                              Upload your reference song here
                            </div>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-4 mb-4">
            <Button
              className={
                originalSuccess && referenceSuccess
                  ? `rounded-full w-[250px] text-[14px] mb-4  hover:shadow-none text-[black] bg-[#FFC01D] font-regular py-[8px]  disabled:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-none font-semibold`
                  : `rounded-full  w-[250px] text-[14px] mb-4 hover:bg-nyx-gray-1  hover:shadow-none text-black font-regular py-[8px] cursor-not-allowed bg-nyx-gray-1 border-none font-semibold`
              }
              onClick={anlysisClick}
              disabled={originalSuccess && referenceSuccess ? false : true}
            >
              Compare and Analyze
            </Button>
          </div>
        </motion.div>
      </div>
      {generanotselected ? (
        <Modal
          isOpen={generanotselected}
          style={welcomePopUpStyle}
          // onRequestClose={onLastClose}
        >
          <div className="w-[300px] h-[150px] p-6 flex flex-col gap-5 bg-[#3B226F] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <p className="font-semibold  text-[20px] text-[#FFC01D] flex justify-center items-center">
                Please select Genre 
              </p>
            </div>
            <div className="flex justify-center items-center gap-6 mb-4 mt-[10px]">
            <Button
              className="rounded-full  w-[200px] text-[14px] mb-4  hover:shadow-none text-[white] border-[1px] border-[#FFC01D]  font-regular py-[6px]  disabled:cursor-not-allowed "
              onClick={close}
            >
              Continue
            </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default MusicUpload;
