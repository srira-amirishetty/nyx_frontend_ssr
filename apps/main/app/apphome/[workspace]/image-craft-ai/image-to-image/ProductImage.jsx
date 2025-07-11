"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Button from "@nyx-frontend/main/components/Button";
import { BRAND_TABS_Two } from "@nyx-frontend/main/utils/productConstants";
import UploadButton from "./UploadButton";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ProductImage = ({
  tab,
  setBrandTab,
  next,
  disabled,
  productImageLoading,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };
  const [uploaded, setUploaded] = useState(null);
  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleNextClick = async () => {
    if (uploadedFile) await next(uploadedFile);
    else
      
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Product Image Missing!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Cannot proceed before uploading the product image
          </span>
        </>,
        { autoClose: 5000 },
      );
  };

  return (
    <>
      <div className={`${tab === BRAND_TABS_Two.PRODUCTIMAGE?  "bg-[#332270]":"bg-[#23145A]"} rounded-lg`}>
        <h2 className="mb-0">
          <div
            className={`${
              tab === BRAND_TABS_Two.PRODUCTIMAGE
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-[#FFFFFF] rounded-lg`}
            onClick={() =>
              setBrandTab((prevBrandTab) => {
                return prevBrandTab !== BRAND_TABS_Two.PRODUCTIMAGE
                  ? BRAND_TABS_Two.PRODUCTIMAGE
                  : "";
              })
            }
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS_Two.PRODUCTIMAGE
                    ? "text-nyx-yellow text-xl "
                    : "text-white text-sm"
                }`}
              >
                Product Image{" "}
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS_Two.PRODUCTIMAGE
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
            height: tab === BRAND_TABS_Two.PRODUCTIMAGE ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(` w-full overflow-hidden rounded-lg`)}
        >
          <div
            className={`w-full flex flex-col gap-3 ${uploadedFile !== null && "mb-5"}`}
          >
            <UploadButton
              id="uniqueId1"
              setUploadedFile={setUploadedFile}
              disabled={disabled}
              uploadedFile={uploadedFile}
              uploaded={uploaded}
              setUploaded={setUploaded}
            />
          </div>

          {uploadedFile === null && (
            <div className="text-white text-base pl-5 m-10 mt-5 mb-5">
              <div className="relative mb-2 font-normal text-[14px] leading-[22px]">
                <div className="absolute left-[-1em] top-0">•</div>
                Start by uploading an image of your product.
              </div>
              <div className="relative mb-2 font-normal text-[14px] leading-[22px]">
                <div className="absolute left-[-1em] top-0">•</div>
                For best results, use transparent PNGs.
              </div>
              <div className="relative mb-2 font-normal text-[14px] leading-[22px]">
                <div className="absolute left-[-1em] top-0">•</div>
                Else, we will remove the background using our AI technology.
              </div>
            </div>
          )}
          <div className="w-full flex justify-center items-center gap-3 mb-5">
            <Button
              className={`  font-semibold w-32  disabled:text-black disabled:cursor-not-allowed disabled:bg-nyx-gray-1  disabled:border-nyx-gray-1 disabled:hover:bg-nyx-gray-1 disabled: ${
                uploadedFile
                  ? `rounded-full hover:shadow-none focus:shadow-glow text-nyx-yellow  cursor-pointer`
                  : `bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent  border-none`
              }`}
              onClick={handleNextClick}
              disabled={productImageLoading == 0}
            >
              {productImageLoading == 0 ? <ButtonLoading /> : "Next"}
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductImage;
