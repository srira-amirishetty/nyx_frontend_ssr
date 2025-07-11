/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { BRAND_TABS } from "@nyx-frontend/main/utils/productConstants";

import { CreativesTabTextToImage } from "@nyx-frontend/main/shared/inputs";
import { PROMPT_TYPE } from "@nyx-frontend/main/utils/utils";

import { BrandImageGenerationContext } from "@nyx-frontend/main/hooks/BrandImageGenerationContext";

import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import classNames from "@nyx-frontend/main/utils/classNames";

const PromptSection = ({
  Promptvalue,
  setPromptvalue,
  onClickGenerateHandler,
  isGenerateButtonDisabled,
  generatePending,
}) => {
  /**
   * Use Context
   */
  const { tab, setBrandTab, mediaResponse } = useContext(
    BrandImageGenerationContext
  );

  const [promptTabState, setPromptTabState] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);


  const onExpandHandler = () => {
    if (mediaResponse) {
      if (tab !== BRAND_TABS.PROMPT) {
        setBrandTab(BRAND_TABS.PROMPT);
      } else {
        setBrandTab("");
      }
    } else {
      (function () {
        const error = () => {
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please select creative design and click next.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };
        error();
      })();
    }
  };

  const handleGenerateClick = () => {
    onClickGenerateHandler();
    setHasGenerated(true);
  };

  return (
    <div
      className={`${
        tab === BRAND_TABS.PROMPT ? "bg-[#332270]" : "bg-[#23145A]"
      } rounded-lg`}
    >
      <h2 className="mb-0">
        <div
          className="group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-white rounded-lg"
          onClick={onExpandHandler}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <div className="flex w-full justify-between items-center">
            <div
              className={`w-[50%] md:w-full font-semibold flex ${
                tab === BRAND_TABS.PROMPT
                  ? "text-nyx-yellow text-xl font-bold"
                  : "text-white text-sm font-bold"
              }`}
            >
              Prompt
            </div>
          </div>
          <span
            className={`${
              tab === BRAND_TABS.PROMPT
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
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: tab === BRAND_TABS.PROMPT ? "auto" : 0,
          opacity: 1,
        }}
        exit={{ height: 0, opacity: 0 }}
        className={clsx("w-full overflow-hidden rounded-lg")}
      >
        <div className="py-2 md:px-5 sm:px-4">
          <div className="flex flex-col gap-5">
            <div className="w-full">
              <CreativesTabTextToImage
                data={PROMPT_TYPE}
                tabState={setPromptTabState}
                tabStatus={promptTabState}
              />
            </div>

            <div className="w-full">
              {promptTabState === 0 && (
                <div className="flex flex-col items-center">
                  <textarea
                    className="w-full h-[365px] bg-transparent border border-x-nyx-gray-1 rounded p-5 text-white outline-none placeholder:italic"
                    placeholder="Write description of the desired image..."
                    value={Promptvalue}
                    onChange={(e) => {
                      setPromptvalue(e.target.value);
                    }}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder =
                        "Write description of the desired image...")
                    }
                  />
                  {/* Increased margin-top (mt-8) to create more space between the textarea and button */}
                  <div className="w-full flex justify-center my-4">
                    <Button
                      className={classNames(
                        "px-10 h-[37px] flex items-center hover:shadow-none text-sm font-semibold shadow-sm rounded-full",
                        !isGenerateButtonDisabled &&
                          Promptvalue &&
                          (!hasGenerated)
                          ? ""
                          : " bg-[#8297BD] border-[#8297BD] text-black hover:bg-[#8297BD] cursor-not-allowed"
                      )}
                      onClick={handleGenerateClick}
                      disabled={
                        !Promptvalue ||
                        isGenerateButtonDisabled ||
                        (hasGenerated)
                      }
                    >
                      {generatePending ? <ButtonLoading /> : "Generate"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PromptSection;
