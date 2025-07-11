"use client";

import React, { useState } from "react";
import Toggle from "./_components/Toggle";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import Modal from "react-modal";
import { motion } from "framer-motion";
import colors from "color-name";
import { VIRTUAL_TRYON_TABS } from "@nyx-frontend/main/utils/productConstants";
import ArrowIcon from "@nyx-frontend/main/components/Icons/ArrowIcon";
import classNames from "@nyx-frontend/main/utils/classNames";
import AddTop from "./_components/AddTop";
import AddBottom from "./_components/AddBottom";
import { addTopPopup } from "@nyx-frontend/main/utils/modalstyles";
import Button from "@nyx-frontend/main/components/Button";
import { VIRTUAL_TRYON_BACKGROUND } from "@nyx-frontend/main/utils/utils";
import BgColor from "./_components/BgColor";
import { nanoid } from "nanoid";
import UploadButton2 from "./_components/UploadButton2";
import LockSVGIcon from "@nyx-frontend/main/components/Icons/LockSVGIcon";

function BackGroundOptions({ tab, setBrandTab, fashionKitId }) {
  const [creativeTabState, setCreativeTabState] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [selectbackgroundColor, setSelectBackgroundColor] = useState([]);
  const [selectedColors, setSelectedColors] = useState(new Set());
  const [selectedColorButton, setSelectedColorButton] = useState([]);

  const OpenAnimation = () => {
    return;
    // if (tab === VIRTUAL_TRYON_TABS.BACKGROUND) {
    //   setBrandTab("");
    // } else {
    //   setBrandTab(VIRTUAL_TRYON_TABS.BACKGROUND);
    // }
  };

  const handleTextareaChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 100) {
      setTextareaValue(inputValue);
    }
  };

  const charactersLeft = 100 - textareaValue.length;

  function hexToColorName(hex) {
    // Remove any leading # from the hex code
    hex = hex.replace("#", "");

    // Split the hex code into red, green, and blue components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Find the nearest color name for the given RGB components
    let nearestColor = "";
    let shortestDistance = Infinity;
    for (const name in colors) {
      const color = colors[name];
      const distance = Math.sqrt(
        (r - color[0]) ** 2 + (g - color[1]) ** 2 + (b - color[2]) ** 2,
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestColor = name;
      }
    }

    return nearestColor;
  }

  const onChangeBackgroundColor = (value) => {
    setSelectBackgroundColor([...selectbackgroundColor, value]);
  };

  const deleteColor = (color) => {
    const updatedColors = selectbackgroundColor.filter((bg) => bg !== color);

    setSelectBackgroundColor(updatedColors);
  };

  const selectedColorButtonClick = (data) => {
    let hColor = hexToColorName(data);
    let colors = new Set([...selectedColorButton, hColor]);

    if (colors.size > 3) {
      // Use the global error popup to display error
      displayMessagePopup(
        "selected-color-limit-exceeded",
        "error",
        "Error",
        "You can only select maximum upto 3 colors.",
      );
    } else {
      if (selectedColors.has(data)) {
        selectedColors.delete(data);
        setSelectedColorButton((prevColors) =>
          prevColors.filter((color) => color !== hColor),
        );
      } else {
        selectedColors.add(data);
        setSelectedColorButton((prevColors) => [...prevColors, hColor]);
      }
      setSelectedColors(new Set(selectedColors));
    }
  };

  return (
    <>
      <div className="bg-[#3B226F] rounded-lg">
        <h2 className="mb-0">
          <div
            className={classNames(
              `group relative flex w-full items-center border-0 px-5 py-4 text-left text-base  cursor-not-allowed bg-nyx-blue-4 text-white rounded-lg`,
            )}
            onClick={() => OpenAnimation()}
            aria-expanded={
              tab === VIRTUAL_TRYON_TABS.BACKGROUND ? "true" : "false"
            }
            aria-controls="collapseOne"
          >
            <div className="flex items-center">
              <div
                className={classNames(
                  `w-[50%] md:w-full flex font-bold`,
                  tab === VIRTUAL_TRYON_TABS.BACKGROUND
                    ? "text-nyx-yellow text-xl "
                    : "text-[#D3D3D3] text-sm",
                )}
              >
                Background options
              </div>
            </div>
            <span
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
                tab === VIRTUAL_TRYON_TABS.BACKGROUND
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`,
              )}
            >
              {/* <ArrowIcon className="h-6 w-6" /> */}
              <LockSVGIcon className="h-5 w-5" />
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === VIRTUAL_TRYON_TABS.BACKGROUND ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="bg-[#3B226F] w-full overflow-hidden rounded-lg"
        >
          <div className="py-2 md:px-3 sm:px-1  cursor-not-allowed">
            <div className="flex flex-col gap-5 h-[500px] overflow-auto ">
              <div className="w-full">
                <CreativesTab
                  data={VIRTUAL_TRYON_BACKGROUND}
                  tabState={setCreativeTabState}
                  tabStatus={creativeTabState}
                />
              </div>
              <div className="w-full flex justify-between">
                {creativeTabState === 2 && (
                  <>
                    <div className="w-full flex flex-col items-end justify-center gap-5 mt-1 ">
                      <textarea
                        name=""
                        id=""
                        value={textareaValue} // Set value to state variable
                        onChange={handleTextareaChange} // Handle textarea value change
                        className="w-full h-[260px] bg-transparent border border-[#8297BD] text-white p-4  "
                        placeholder="Enter prompt here (maximum 100 characters)"
                        maxLength={100}
                      />
                      <span className="text-white text-sm  text-end -mt-4  ">
                        {charactersLeft}/100
                      </span>
                    </div>
                  </>
                )}
                {creativeTabState === 1 && (
                  <div className="w-full flex  justify-center items-center flex-col gap-3">
                    <UploadButton2
                      id="uniqueId4"
                      setUploadedFile={setUploadedFile}
                      disabled={false}
                      uploadedFile={uploadedFile}
                    />
                  </div>
                )}
                {creativeTabState === 0 && (
                  <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm ml-2 ">
                    <p className="font-semibold py-2">Color Composition</p>

                    <div className="w-full my-2 flex flex-wrap gap-5 h-[300px] overflow-auto">
                      <BgColor onChange={onChangeBackgroundColor} />

                      {selectbackgroundColor.map((bg) => (
                        <div
                          key={nanoid()}
                          className="group relative inline-block "
                        >
                          <button
                            className={`group w-[100px] h-[110px] rounded-xl overflow-hidden hover:bg-nyx-sky ${
                              selectedColors.has(bg)
                                ? "bg-nyx-sky text-[#FFFFFF]"
                                : "bg-[#6F559A] text-[#FFFFFF]"
                            }`}
                            onClick={() => selectedColorButtonClick(bg)}
                          >
                            <div
                              className="w-full h-[84px]  "
                              style={{ backgroundColor: bg }}
                            ></div>
                            <p className="text-[10px] mt-1.5 uppercase text-center">
                              {bg.replace(/#/g, "")}
                            </p>
                          </button>
                          <button
                            onClick={() => deleteColor(bg)}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-8px] right-[-8px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex  flex-cols justify-center items-center">
                <Button className=" bg-nyx-yellow text-black rounded-full">
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export const CreativesTab = (props) => {
  return (
    <div className={`flex gap-4 justify-center`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className=" text-center cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div>
            <h2
              className={`mb-[4px] text-[14px]  text-white ${index === props.tabStatus ? "  text-nyx-yellow underline decoration-4 underline-offset-8 decoration-nyx-yellow font-semibold" : "text-white font-light"}`}
            >
              {item.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackGroundOptions;
