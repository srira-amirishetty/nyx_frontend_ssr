/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  BRAND_TABS,
  FOCUS_ELEMENT,
  CONTEXT_IMAGE,
} from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { CreativesTabTextToImage } from "@nyx-frontend/main/shared/inputs";
import { CREATIVES_TABS_IMAGE } from "@nyx-frontend/main/utils/utils";
import CameraPerspective from "./CameraPerspective";
import CameraFilter from "./CameraFilters";
import ShutterSpeed from "./ShutterSpeed";
import LightingOption from "./LightingOption";
import { IMAGESTYLEDATA } from "@nyx-frontend/main/utils/productConstants";
import BgColorButton from "@nyx-frontend/main/components/_components/BgColorButton";
import { popupHeader2 } from "@nyx-frontend/main/utils/modalstyles";
import { BrandImageGenerationContext } from "@nyx-frontend/main/hooks/BrandImageGenerationContext";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import classNames from "@nyx-frontend/main/utils/classNames";


const CreativeType = ({ brandDetails, finalSubmit }) => {
  /**
   * Use Context
   */
  const {
    onChangeBackgroundColor,
    deleteColor,
    selectbackgroundColor,
    selectedColors,
    selectedColorButtonClick,
    setSelectBackgroundColor,
    contextImage,
    setContextImage,
    setImageStyle,
    focusElement,
    setFocusElement,
    creativeSubmitButtonClick,
    tab,
    setBrandTab,
    mediaResponse,
    setcameraPerspectiveValue,
    setCameraFilterValue,
    setShutterValue,
    setLightValue,
    creativePending,
    setIsGenerateButtonDisabled,
  } = useContext(BrandImageGenerationContext);
  const { displayMessagePopup } = useContext(MessagePopupContext);

  const [creativeTabState, setCreativeTabState] = useState(0);
  const [cameraTab, setCameraTab] = useState("");
  const [focusClicked, setFocusClicked] = useState(false);
  const [focusClickedIndex, setFocusClickedIndex] = useState(null);
  const [contextImageClicked, setContextImageClicked] = useState(false);
  const [contextImageClickedIndex, setContextImageClickedIndex] =
    useState(null);
  const [imageStyleClick, setImageStyleClick] = useState(false);
  const [imageStyleIndex, setImageStyleIndex] = useState(null);
  const [clickPerspective, setClickPerspective] = useState(false);
  const [clickIndexPerspective, setClickIndexPerspective] = useState(null);
  const [clickFilter, setclickFilter] = useState(false);
  const [clickIndexFilter, setclickIndexFilter] = useState(null);
  const [clickShutter, setclickShutter] = useState(false);
  const [clickIndexShutter, setclickIndexShutter] = useState(null);

  const [clickLight, setclickLight] = useState(false);
  const [clickIndexLight, setclickIndexLight] = useState(null);

  useEffect(() => {
    if (brandDetails) {
      setSelectBackgroundColor(brandDetails?.colors);
    }
  }, [brandDetails]);

  const handleFocusElementButtonClick = (value, index) => {
    setFocusClicked(true);
    setFocusClickedIndex(index);
    setFocusElement(value);
  };

  const handleContextImageButtonClick = (value, index) => {
    setContextImageClicked(true);
    setContextImageClickedIndex(index);
    setContextImage(value);
    if (value === "Global" && focusElement === "People") {
      setFocusClicked(true);
      setFocusClickedIndex(index);
      setFocusElement("Object");
    }
  };

  const selectedImageStyle = (value, index) => {
    setImageStyleClick(true);
    setImageStyleIndex(index);
    setImageStyle(value);
  };

  function cameraPerspective(value, index) {
    setClickPerspective(true);
    setClickIndexPerspective(index);
    setcameraPerspectiveValue(value);
  }

  function cameraFilter(value, index) {
    setclickFilter(true);
    setclickIndexFilter(index);
    setCameraFilterValue(value);
  }

  function shutterSetting(value, index) {
    setclickShutter(true);
    setclickIndexShutter(index);
    setShutterValue(value);
  }

  function lightOptions(value, index) {
    setclickLight(true);
    setclickIndexLight(index);
    setLightValue(value);
  }

  const onExpandHandler = () => {
    if (mediaResponse) {
      if (tab !== BRAND_TABS.CREATIVE) {
        setBrandTab(BRAND_TABS.CREATIVE);
      } else {
        setBrandTab("");
      }
    } else {
      // displayMessagePopup(
      //   "handle-input-prod-logo",
      //   "error",
      //   "Error",
      //   "Please select media channel and click next.",
      // );
      (function () {
        const error = () => {
         ;

          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please select media channel and click next.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    }
  };

  return (
    <>
      <div className={`${tab === BRAND_TABS.CREATIVE?  "bg-[#332270]":"bg-[#23145A]"} rounded-lg`}>
        <h2 className="mb-0">
          <div
            className="group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-white rounded-lg"
            onClick={() => onExpandHandler()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS.CREATIVE
                    ? "text-nyx-yellow text-xl font-bold"
                    : "text-white text-sm font-bold"
                }`}
              >
                Creative Design{" "}
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS.CREATIVE
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
            height: tab === BRAND_TABS.CREATIVE ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(` w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 md:px-5 sm:px-4">
            <div className="flex flex-col gap-5">
              <div className="w-full">
                <CreativesTabTextToImage
                  data={CREATIVES_TABS_IMAGE}
                  tabState={setCreativeTabState}
                  tabStatus={creativeTabState}
                />
              </div>
              <div className="w-full">
                {creativeTabState === 0 && (
                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-col">
                      <div style={popupHeader2}>Color Composition</div>
                      <div className="flex w-full gap-2 flex-wrap">
                        <BgColorButton onChange={onChangeBackgroundColor} />
                        {selectbackgroundColor.map((bg) => (
                          <div key={bg} className="group relative inline-block">
                            <button
                              className={`group w-[70px] h-[70px] rounded-xl overflow-hidden  hover:shadow-gray-800 shadow-none shadow-[#1D1138] hover:shadow-md ${
                                selectedColors.has(bg)
                                  ? "bg-[#5e32ff] text-nyx-yellow"
                                  : "bg-[#6653B4] text-white"
                              }`}
                              onClick={() => selectedColorButtonClick(bg)}
                            >
                              <div
                                className="w-full h-[50px] mx-auto mt-[-8px]"
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

                    <div className="w-full flex flex-col">
                      <div style={popupHeader2}>
                        Set Context of Image (Experimental)
                      </div>
                      <div className="w-full flex gap-3">
                        {CONTEXT_IMAGE?.map((item, index) => (
                          <button
                            key={index}
                            className={`transition-colors text-sm border rounded cursor-pointer hover:text-white min-w-[100px] text-center py-2 px-4 hover:shadow-gray-800 shadow-none shadow-[#1D1138] hover:shadow-md ${
                              (item?.title === "Indian" &&
                                contextImageClickedIndex === null) ||
                              (contextImageClicked &&
                                contextImageClickedIndex === index)
                                ? "bg-[#5e32ff] text-nyx-yellow font-bold border-[#5e32ff]"
                                : "bg-transparent text-white font-normal border-[#8297BD]"
                            }`}
                            onClick={() =>
                              handleContextImageButtonClick(item?.title, index)
                            }
                          >
                            {item?.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full flex flex-col">
                      <div style={popupHeader2}>
                        Focus Elements of My Image (Experimental)
                      </div>
                      <div className="w-full flex gap-3 flex-wrap">
                        {FOCUS_ELEMENT?.map((item, index) => (
                          <button
                            key={item.id}
                            //className="hover:bg-nyx-sky transition-colors text-sm font-normal border border-[#8297BD] hover:border-nyx-sky rounded text-white cursor-pointer hover:text-black w-1/3 text-center py-2 px-4"
                            className={` transition-colors text-sm border  rounded hover:text-white min-w-[100px] text-center py-2 px-4 hover:shadow-gray-800 shadow-none shadow-[#1D1138] hover:shadow-md ${
                              (item?.title === "People" &&
                                focusClickedIndex === null &&
                                contextImage !== "Global") ||
                              (focusClicked && focusClickedIndex === index)
                                ? "bg-[#5e32ff] text-nyx-yellow font-bold cursor-pointer border-[#5e32ff]"
                                : contextImage === "Global" &&
                                    item.title === "People"
                                  ? "bg-[#8297BD] text-black cursor-not-allowed border-[#8297BD]"
                                  : "bg-transparent text-white font-normal cursor-pointer border-[#8297BD]"
                            }`}
                            onClick={() =>
                              handleFocusElementButtonClick(item?.title, index)
                            }
                            disabled={
                              contextImage === "Global" &&
                              item.title === "People"
                            }
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full flex flex-col">
                      <div style={popupHeader2}>Image Style</div>
                      <div className="w-full flex flex-wrap gap-2">
                        {IMAGESTYLEDATA.map((item, index) => (
                          <button
                            key={item.id}
                            className={`flex flex-col transition-colors text-sm cursor-pointer text-center rounded-md hover:shadow-gray-800 shadow-none hover:shadow-md w-[88px] ${
                              (item.title === "Photographic" &&
                                imageStyleIndex === null) ||
                              (imageStyleClick && imageStyleIndex === index)
                                ? "border-2 border-[#5e32ff] bg-[#5e32ff]"
                                : "border-2 border-transparent"
                            }`}
                            onClick={() => selectedImageStyle(item?.key, index)}
                            title={item.title}
                          >
                            <img
                              src={item.imgsrc}
                              alt="imges"
                              className="w-[100%] h-[70px] rounded-md"
                            />
                            <div
                              className={`${
                                (item.title === "Photographic" &&
                                  imageStyleIndex === null) ||
                                (imageStyleClick && imageStyleIndex === index)
                                  ? " text-nyx-yellow"
                                  : " text-white"
                              } h-full  w-full rounded-b-md text-[10px]`}
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
                )}
                {creativeTabState === 1 && (
                  <div className="w-full flex flex-col gap-3">
                    <CameraPerspective
                      cameraTab={cameraTab}
                      setCameraTab={setCameraTab}
                      cameraPerspective={cameraPerspective}
                      clickIndexPerspective={clickIndexPerspective}
                      clickPerspective={clickPerspective}
                    />
                    <CameraFilter
                      cameraTab={cameraTab}
                      setCameraTab={setCameraTab}
                      cameraFilter={cameraFilter}
                      clickFilter={clickFilter}
                      clickIndexFilter={clickIndexFilter}
                    />
                    <ShutterSpeed
                      cameraTab={cameraTab}
                      setCameraTab={setCameraTab}
                      shutterSetting={shutterSetting}
                      clickShutter={clickShutter}
                      clickIndexShutter={clickIndexShutter}
                    />
                    <LightingOption
                      cameraTab={cameraTab}
                      setCameraTab={setCameraTab}
                      lightOptions={lightOptions}
                      clickLight={clickLight}
                      clickIndexLight={clickIndexLight}
                    />
                  </div>
                )}
              </div>
              <div className="w-full flex gap-4 mb-10 justify-center items-center">
                {/* <Button
                  className="rounded-full w-[109px] hover:shadow-none font-semibold py-1.5"
                  onClick={() => setBrandTab(BRAND_TABS.MEDIA)}
                >
                  Back
                </Button> */}
                <Button
                  className="rounded-full w-[109px] hover:shadow-none font-semibold py-1.5 text-nyx-yellow"
                  onClick={() => {
                    creativeSubmitButtonClick();
                    finalSubmit();
                  }}
                >
                  {creativePending ? <ButtonLoading /> : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CreativeType;
