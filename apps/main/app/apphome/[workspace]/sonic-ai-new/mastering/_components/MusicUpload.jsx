"use client";
import React from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { SONIC_AI_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";

const MusicUpload = ({
  tab,
  setTab,
  uploadButtonClick,
  originalLoading,
  referenceLoading,
  originalSuccess,
  referenceSuccess,
  autoMasterClick,
  customMasterClick,
  originalsongname,
  referencesongname,
  autoMasterActive,
  costumMasterActive,
}) => {
  const OpenUpload = () => {
    if (tab === SONIC_AI_TABS.MUSICUPLOAD) {
      setTab("");
    } else {
      setTab(SONIC_AI_TABS.MUSICUPLOAD);
    }
  };

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
                      {originalsongname}
                    </div>
                  </div>
                ) : (
                  <button
                    className="w-full h-[130px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-6 cursor-pointer"
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
            <div className="w-full px-5">
              <p className="text-white flex justify-start items-start text-[14px] font-bold ">
                Reference Song <span className="ml-1 text-red-500">*</span>
              </p>
              <div className="flex flex-col py-2 text-white">
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
                    <div className="w-full h-[30px] bg-[#5E32FF] rounded-b-lg text-center text-sm">
                      {referencesongname}
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
                          Upload your song here
                        </div>
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {originalSuccess && referenceSuccess ? (
            <div className="w-full flex gap-3 p-5">
              {autoMasterActive ? (
                <button className="rounded-full w-1/2 shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 hover:shadow-none font-semibold py-[8px] cursor-not-allowed">
                  Costum Mastering
                </button>
              ) : (
                <Button
                  className="rounded-full w-1/2 text-base hover:shadow-none font-semibold"
                  onClick={customMasterClick}
                >
                  Custom Mastering
                </Button>
              )}

              {costumMasterActive ? (
                <button className="rounded-full w-1/2 shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 hover:shadow-none font-semibold py-[8px] cursor-not-allowed">
                  Auto Master
                </button>
              ) : (
                <Button
                  className="rounded-full w-1/2 text-base hover:shadow-none font-semibold"
                  onClick={autoMasterClick}
                >
                  Auto Master
                </Button>
              )}
            </div>
          ) : (
            <div className="w-full flex gap-3 p-5">
              <button className="rounded-full w-1/2 shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 hover:shadow-none font-semibold py-[8px] cursor-not-allowed">
                Custom Mastering
              </button>
              <button className="rounded-full w-1/2 shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 hover:shadow-none font-semibold py-[8px] cursor-not-allowed">
                Auto Master
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default MusicUpload;
