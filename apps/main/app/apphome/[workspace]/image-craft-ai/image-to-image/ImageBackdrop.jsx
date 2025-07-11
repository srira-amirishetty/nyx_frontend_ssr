/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Button from "@nyx-frontend/main/components/Button";
import { BRAND_TABS_Two } from "@nyx-frontend/main/utils/productConstants";
import { IMAGE_BACKDROPS_TABS } from "@nyx-frontend/main/utils/utils";
import UploadButton from "./UploadButton";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

const ApiMapper = {
  Prompt: "prompt",
  "Reference Image": "ref_img",
  "Auto Genearte": "auto",
};

const ImageBackdrop = ({
  tab,
  setBrandTab,
  onGenerate,
  disabled,
  generateImageLoading,
  textareaValue,
  uploadedFile,
  setUploadedFile,
  setTextareaValue,
  setGenerationtype,
  Generationtype,
  generateImage,
  buttonLoading,
}) => {
  const [creativeTabState, setCreativeTabState] = useState(0);
  const [uploaded, setUploaded] = useState(null);
  const [isGenerationComplete, setIsGenerationComplete] = useState(false);

  const handleTextareaChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 100) {
      setTextareaValue(inputValue);
    }
  };

  const charactersLeft = 100 - textareaValue.length;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const generateImage_new = async () => {
    if (creativeTabState == 2) {
      await generateImage("auto");
    } else if (creativeTabState == 0) {
      await generateImage("prompt");
    } else if (creativeTabState == 1) {
      await generateImage("ref_img");
    }
    setIsGenerationComplete(true);
  };

  return (
    <>
      <div className={`${tab === BRAND_TABS_Two.IMAGEBACKDROPS ? "bg-[#332270]" : "bg-[#23145A]"} rounded-lg`}>
        <h2 className="mb-0">
          <div
            className={clsx(
              tab === BRAND_TABS_Two.IMAGEBACKDROPS && "group",
              "relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-[#FFFFFF] rounded-lg",
            )}
            onClick={() =>
              setBrandTab((prevBrandTab) => {
                return prevBrandTab !== BRAND_TABS_Two.IMAGEBACKDROPS
                  ? BRAND_TABS_Two.IMAGEBACKDROPS
                  : "";
              })
            }
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={clsx(
                  "w-[50%] md:w-full font-semibold flex",
                  tab === BRAND_TABS_Two.IMAGEBACKDROPS
                    ? "text-nyx-yellow text-xl "
                    : "text-white text-sm",
                )}
              >
                Image Backdrops
              </div>
            </div>

            <span
              className={clsx(
                tab === BRAND_TABS_Two.IMAGEBACKDROPS
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`,
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
              )}
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
            height: tab === BRAND_TABS_Two.IMAGEBACKDROPS ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(` w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 ">
            <div className="flex flex-col gap-5">
              <div className="w-full px-5">
                <CreativesTab
                  data={IMAGE_BACKDROPS_TABS}
                  tabState={setCreativeTabState}
                  tabStatus={creativeTabState}
                />
              </div>
              <div className="w-full">
                {creativeTabState === 0 && (
                  <div className="w-full flex flex-col items-center justify-center gap-5 mt-1 px-2 -py-3">
                    <textarea
                      name=""
                      id=""
                      disabled={disabled}
                      value={textareaValue} // Set value to state variable
                      onChange={handleTextareaChange} // Handle textarea value change
                      className="w-full h-[315px] bg-transparent border border-[#8297BD] text-white p-5"
                      placeholder="Enter prompt here (maximum 100 characters)"
                      maxLength={100}
                    />
                    <p className="w-full text-white text-sm text-right">
                      {charactersLeft}/100
                    </p>
                  </div>
                )}
                {creativeTabState === 1 && (
                  <div className="w-full flex flex-col gap-3">
                    <UploadButton
                      id="uniqueId2"
                      setUploadedFile={setUploadedFile}
                      disabled={disabled}
                      uploadedFile={uploadedFile}
                      uploaded={uploaded}
                      setUploaded={setUploaded}
                    />
                  </div>
                )}
                {creativeTabState === 2 && (
                  <div className="flex items-center justify-center px-5">
                    <div className="w-full h-[360px] rounded-md  px-2 m-auto bg-gradient-to-r mt-1 from-gray-300/40 to-gray-500/25 flex justify-center flex-col items-center z-0  gap-3 cursor-pointer ">
                      <span className="text-white text-center italic">
                        Let us create a perfect backdrop for your amazing
                        product while you sit back and watch
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full flex mb-3 justify-center items-center px-5">
                <Button
                  className={clsx({
                    ["rounded-full px-20  font-semibold text-nyx-yellow hover:shadow-none focus:shadow-glow disabled:bg-nyx-gray-1  disabled:border-nyx-gray-1 disabled:text-black disabled:cursor-not-allowed"]: true,
                    [`bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent  border-none`]:
                      (creativeTabState === 0 && textareaValue === "") ||
                      (creativeTabState === 1 && uploadedFile === null) ||
                      (creativeTabState === 2 && disabled),
                  })}
                  onClick={generateImage_new}
                  disabled={ (generateImageLoading === 0 && Generationtype === "") || isGenerationComplete }
                >
                  {generateImageLoading === 0 && Generationtype === "" ? <ButtonLoading /> : "Generate"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export const CreativesTab = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="w-32 md:w-72 text-center cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index === props.tabStatus
                ? "border-amber-400 text-white border-b-4 text-[14px]/3 mt-2 "
                : " mt-2 border-b-4 text-[14px]/3 border-slate-700 text-gray-400"
            }
          >
            <h2
              className={`mb-4 text-sm  text-white ${index === props.tabStatus ? " font-bold" : "font-medium"}`}
            >
              {item.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageBackdrop;