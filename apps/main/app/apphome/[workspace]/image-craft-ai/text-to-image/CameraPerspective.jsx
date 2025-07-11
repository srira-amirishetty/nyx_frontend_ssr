/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  CAMERA_TABS,
  CAMERAPERSPECTIVEDATA,
} from "@nyx-frontend/main/utils/productConstants";

const CameraPerspective = ({
  cameraTab,
  setCameraTab,
  cameraPerspective,
  clickPerspective,
  clickIndexPerspective,
}) => {
  return (
    <>
      <div className="bg-[#3B226F] rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              cameraTab === CAMERA_TABS.CAMERA_PERSPECTIVE
            } group relative flex w-full items-center border-0 py-4 text-left text-base cursor-pointer bg-[#3B226F] text-[#FFFFFF] rounded-lg`}
            onClick={() => setCameraTab(CAMERA_TABS.CAMERA_PERSPECTIVE)}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  cameraTab === CAMERA_TABS.CAMERA_PERSPECTIVE
                    ? "text-[#FFFFFF] text-base"
                    : "text-[#FFFFFF] text-base"
                }`}
              >
                Camera Perspective{" "}
              </div>
            </div>

            <span
              className={`${
                cameraTab === CAMERA_TABS.CAMERA_PERSPECTIVE
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
            height: cameraTab === CAMERA_TABS.CAMERA_PERSPECTIVE ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(`bg-[#3B226F] w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 px-1">
            <div className="flex flex-col gap-5">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex gap-3">
                  <div className="w-full grid grid-cols-4 grid-flow-row gap-2">
                    {CAMERAPERSPECTIVEDATA.map((item, index) => (
                      <button
                        key={item.id}
                        className={`flex flex-col transition-colors text-sm cursor-pointer text-center rounded-md hover:shadow-gray-800 shadow-none hover:shadow-md w-[93px] ${
                          clickPerspective && clickIndexPerspective === index
                            ? "border-2 border-[#5e32ff] bg-[#5e32ff]"
                            : "border-2 border-transparent"
                        }`}
                        onClick={() => cameraPerspective(item?.title, index)}
                        title={item.title}
                      >
                        <img
                          src={item.imgsrc}
                          alt="imges"
                          className="w-[100%] h-[70px] rounded-t-md"
                        />
                        <div
                          className={`${clickPerspective && clickIndexPerspective === index ? "bg-[#5e32ff]" : "bg-black "} h-full text-white w-full rounded-b-md text-[10px]`}
                          title={item.title} // Show full title on hover
                        >
                          {item.title.length > 12
                            ? `${item.title.substring(0, 12)}...`
                            : item.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CameraPerspective;
