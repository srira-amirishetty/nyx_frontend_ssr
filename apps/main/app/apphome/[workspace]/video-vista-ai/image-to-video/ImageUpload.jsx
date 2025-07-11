"use client";
import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { IMAGE_TO_VIDEO_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import { toast } from "react-toastify";
const ImageUpload = ({
  tab,
  setBrandTab,
  updatedata,
  imageUploaded,
  tabControl,
  reset,
  handleUploadImageProcess,
  mutateUploadImage,
  notSupported,
  loading,
  setGeneratedImage,
  imageError,
  generatedImage,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdstatus, setSelectedIdstatus] = useState(false);

  useEffect(() => {
    setSelectedId(null);
  }, [reset]);

  const findStyleById = (id) => {
    const animationStyle = AnimationStyles.find((style) => style.id === id);
    return animationStyle ? animationStyle.style : null;
  };

  //   const clickonnextinbranding = () => {
  //     if (imageUploaded === 0) {
  //       toast.warn(
  //         <>
  //           <span className="text-white text-[20px]"> Image Missing!</span>
  //           <br />
  //           <span className="text-white text-[16px]">
  //             {" "}
  //             Please Upload Image First.
  //           </span>
  //         </>,
  //         { autoClose: 5000 },
  //       );
  //     }else{
  //     const style = findStyleById(selectedId);
  //     updatedata("AnimationStyle", style);
  //     if (tabControl === "1") {
  //       setBrandTab("");
  //     } else {
  //       console.log("inside style :", tabControl);
  //       setBrandTab(IMAGE_TO_VIDEO_TABS.MOTION);
  //     }
  //   }
  //   };

  const OpenAnimation = () => {
    if (tab === IMAGE_TO_VIDEO_TABS.IMAGE) {
      setBrandTab("");
    } else {
      setBrandTab(IMAGE_TO_VIDEO_TABS.IMAGE);
    }
  };

  const setvalueOfAnimaion = (value) => {
    setSelectedId(value);
    setSelectedIdstatus(true);
  };

  const removeImage = () => {
    setGeneratedImage("");
  };

  const clickonnextinImage = () => {
    if (tabControl === "1") {
      setBrandTab("");
    } else {
      setBrandTab(IMAGE_TO_VIDEO_TABS.STYLE);
    }
  };

  const { displayMessagePopup } = useContext(MessagePopupContext);
  return (
    <>
      <div className="bg-nyx-blue-4 rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === IMAGE_TO_VIDEO_TABS.IMAGE
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg`}
            // onClick={() => setBrandTab(IMAGE_TO_VIDEO_TABS.STYLE)}
            onClick={() => OpenAnimation()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === IMAGE_TO_VIDEO_TABS.IMAGE
                    ? "text-nyx-yellow  text-lg"
                    : "text-white text-sm"
                }`}
              >
                Image Upload
              </div>
            </div>

            <span
              className={`${
                tab === IMAGE_TO_VIDEO_TABS.IMAGE
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
            height: tab === IMAGE_TO_VIDEO_TABS.IMAGE ? "auto" : 0,
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
          <div className="flex flex-col  justify-center items-center ">
            {generatedImage?.length > 0 &&
            imageError == false &&
            loading == false &&
            notSupported == false ? (
              <div className=" rounded-lg relative flex justify-center items-center p-4">
                <img
                  src={generatedImage}
                  alt="Default Image"
                  className="w-auto h-auto max-h-[50vh]  object-contain "
                />
                <button
                  className="absolute top-5 right-5 bg-black text-white rounded-full p-1 m-2 focus:outline-none"
                  onClick={removeImage}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <div className="h-full w-full flex flex-col items-center justify-center px-5">
                  <div
                    className="w-full h-[375px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-6"
                    // style={{
                    //   background: "linear-gradient(#ffffff7f, #FFFFFF33)",
                    // }}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="101"
                        height="101"
                        viewBox="0 0 101 101"
                        fill="none"
                      >
                        <path
                          d="M46.2943 67.332V33.0341L35.3526 43.9758L29.4609 37.8737L50.5026 16.832L71.5443 37.8737L65.6526 43.9758L54.7109 33.0341V67.332H46.2943ZM25.2526 84.1654C22.938 84.1654 20.9566 83.3412 19.3083 81.693C17.6601 80.0447 16.8359 78.0633 16.8359 75.7487V63.1237H25.2526V75.7487H75.7526V63.1237H84.1693V75.7487C84.1693 78.0633 83.3451 80.0447 81.6969 81.693C80.0486 83.3412 78.0672 84.1654 75.7526 84.1654H25.2526Z"
                          fill="white"
                        />
                      </svg>
                      <div className="text-sm text-[#FFFFFF]">
                        Drag & drop your Image here
                      </div>
                      <div className="text-sm text-[#FFFFFF] mt-4 mb-2 font-light">
                        or
                      </div>
                      <div>
                        <Button
                          className="w-[150px] shadow-sm rounded-full text-black bg-[#F1BB2E] cursor-pointer my-3 mt-2 font-semibold  disabled:cursor-not-allowed"
                          onClick={handleUploadImageProcess}
                          disabled={mutateUploadImage.isPending}
                        >
                          {mutateUploadImage.isPending ? (
                            <ButtonLoading />
                          ) : (
                            "Upload"
                          )}
                        </Button>
                      </div>
                      <div className=" text-[11px] text-[#FFFFFF] mt-2 flex flex-col justify-center items-center leading-3.5 font-light">
                        <p> Supports: JPG, PNG, or WEBP</p>
                        <p> File Size Limit: 30MB</p>
                      </div>
                      {notSupported && (
                        <span className="text-[#E26971] mt-2">
                          File not Supported!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {generatedImage?.length ? (
              <Button
                className="rounded-full w-[109px] hover:shadow-none font-semibold mt-6 text-nyx-yellow  hover:text-black py-1.5 mb-4 hover:bg-nyx-yellow focus:shadow-glow "
                onClick={clickonnextinImage}
              >
                Next
              </Button>
            ) : (
              <button className="shadow-nyx-gray-1 bg-nyx-gray-1 border-nyx-gray-1 text-black hover:bg-nyx-gray-1 rounded-full w-[109px] hover:shadow-none  py-1.5 cursor-not-allowed mt-6 mb-4 font-semibold">
                Next
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ImageUpload;
