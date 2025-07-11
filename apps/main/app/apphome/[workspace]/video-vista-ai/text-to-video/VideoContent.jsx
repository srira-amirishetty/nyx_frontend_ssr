import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { VIDEO_CONTENT } from "@nyx-frontend/main/utils/utils";
import { CreativesTab } from "@nyx-frontend/main/shared/inputs";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateTextToVideo } from "@nyx-frontend/main/services/videoGenerationServices";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import ButtonLoading from "./ButtonLoading";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { toast } from "react-toastify";

const VideoContent = ({
  tab,
  setBrandTab,
  campaignId,
  creativeDone,
  settingVideoConDone,
  brandDetails,
}) => {
  const IMAGE_SIZE = [
    {
      id: 1,
      width: "64.12px",
      height: "64.12px",
      title: "Square",
      diamension: "1080 x 1080",
      resolution: "Square",
      diamension2: "(1080,1080)",
    },
    {
      id: 2,
      width: "81.79px",
      height: "49.07px",
      title: "Landscape",
      diamension: "1200 x 628",
      resolution: "Landscape",
      diamension2: "(1200,628)",
    },
    {
      id: 3,
      width: "64.12px",
      height: "80.48px",
      title: "Potrait",
      diamension: "1080 x 1350",
      resolution: "Potrait",
      diamension2: "(1080,1350)",
    },
    {
      id: 4,
      width: "64.12px",
      height: "80.48px",
      title: "Story",
      diamension: "1080 x 1920",
      resolution: "Story",
      diamension2: "(1080,1920)",
    },
    {
      id: 5,
      width: "36.79px",
      height: "61.31px",
      title: "Pin",
      diamension: "1000 x 1500",
      resolution: "Pin",
      diamension2: "(1000,1500)",
    },
  ];

  const [creativeTabState, setCreativeTabState] = useState(0);

  const [videoStructure, setVideoStructure] = useState(
    "AI Images (Photorealistic)"
  );
  const [videoSize, setVideoSize] = useState("(1200,680)");
  const [videoRes, setVideoRes] = useState("Landscape");
  const [clicked, setClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  const onOptionChange = (e) => {
    setVideoStructure(e.target.value);
  };
  const nextToScript = () => {
    if (videoSize == null && videoStructure != null) {
      const data = {
        video_content: {
          video_structure: videoStructure,
        },
      };

      const args = { campaignId, data };

      updateCampaign.mutate(args, {
        onSuccess: (response) => {
          setBrandTab(BRAND_TABS_Three.SETTINGS);
          settingVideoConDone(true);
          setCreativeTabState(0);
        },
        onError: (res) => {
          console.log(res);
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {res?.response?.data?.message}
              </span>
              <br />
            </>,
            { autoClose: 5000 }
          );
        },
      });
    } else if (videoStructure == null && videoSize != null) {
      const data = {
        video_content: {
          video_size: {
            orientation: videoRes,
            resolution: videoSize,
          },
        },
      };

      const args = { campaignId, data };

      updateCampaign.mutate(args, {
        onSuccess: (response) => {
          setBrandTab(BRAND_TABS_Three.SETTINGS);
          settingVideoConDone(true);
          setCreativeTabState(0);
        },
        onError: (res) => {
          console.log(res);
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {res?.response?.data?.message}
              </span>
              <br />
            </>,
            { autoClose: 5000 }
          );
        },
      });
    } else if (videoSize == null && videoStructure == null) {
      const data = {
        video_content: {},
      };

      const args = { campaignId, data };

      updateCampaign.mutate(args, {
        onSuccess: (response) => {
          setBrandTab(BRAND_TABS_Three.SETTINGS);
          settingVideoConDone(true);
          setCreativeTabState(0);
        },
        onError: (res) => {
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {res?.response?.data?.message}
              </span>
              <br />
            </>,
            { autoClose: 5000 }
          );
          console.log(res);
        },
      });
    } else {
      const data = {
        video_content: {
          video_size: {
            orientation: videoRes,
            resolution: videoSize,
          },
          video_structure: videoStructure,
        },
      };

      const args = { campaignId, data };

      updateCampaign.mutate(args, {
        onSuccess: (response) => {
          setBrandTab(BRAND_TABS_Three.SETTINGS);
          settingVideoConDone(true);
          setCreativeTabState(0);
        },
        onError: (res) => {
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {res?.response?.data?.message}
              </span>
              <br />
            </>,
            { autoClose: 5000 }
          );
          console.log(res);
        },
      });
    }
  };

  const handleDiamensionButtonClick = (value, index, resolution) => {
    setClicked(true);
    if (videoSize == value) {
      setVideoSize(null);
      setVideoRes(null);
    } else {
      setClickedIndex(index);
      setVideoSize(value);
      setVideoRes(resolution);
    }
  };

  const updateCampaign = useMutation({
    mutationKey: ["Update-campaign-vidCon"],
    mutationFn: updateTextToVideo,
  });

  const handleTab = () => {
    if (creativeDone) {
      if (tab !== BRAND_TABS_Three.MEDIA) {
        setBrandTab(BRAND_TABS_Three.MEDIA);
      } else {
        setBrandTab("");
      }
    } else {
      toast.warn(
        <>
          <span className="text-white text-[20px]"> Script is Missing!</span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please complete Script First.
          </span>
        </>,
        { autoClose: 5000 }
      );
    }
  };

  const nextToVideoSize = () => {
    setCreativeTabState(1);
  };

  const backToVideoSize = () => {
    setCreativeTabState(0);
  };
  const { displayMessagePopup } = useContext(MessagePopupContext);
  return (
    <>
      <div className={`${tab === BRAND_TABS_Three.MEDIA?  "bg-[#332270]":"bg-[#23145A]"} rounded-lg`}>
        <h2 className="mb-0">
          <div
            className={`${
              tab === BRAND_TABS_Three.MEDIA
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-[#FFFFFF] rounded-lg`}
            onClick={handleTab}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS_Three.MEDIA
                    ? "text-[#FFCB54] text-lg"
                    : "text-[#FFFFFF] text-sm"
                }`}
              >
                Video Content{" "}
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS_Three.MEDIA
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
            height: tab === BRAND_TABS_Three.MEDIA ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={` w-full overflow-hidden rounded-lg`}
        >
          <div className="py-2 md:px-7 sm:px-4">
            <div className="flex flex-col gap-2 ">
              <div className="w-full hidden">
                <CreativesTab
                  data={VIDEO_CONTENT}
                  tabState={setCreativeTabState}
                  tabStatus={creativeTabState}
                />
              </div>

              {creativeTabState === 0 && (
                <>
                  {/* <div className="grid grid-cols-2  gap-y-1 mt-4">
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value="AI Images (Photorealistic)"
                        onChange={onOptionChange}
                        name="default-radio"
                        checked
                        className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-[#8297BD] rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="cursor-pointer ms-2 text-sm font-medium  text-white"
                      >
                        AI Images (Photorealistic)
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        disabled
                        id="default-radio-4"
                        type="radio"
                        value="AI Images (Art)"
                        onChange={onOptionChange}
                        checked={videoStructure === "AI Images (Art)"}
                        name="default-radio"
                        className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-[#8297BD] rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                      />
                      <label
                        htmlFor="default-radio-4"
                        className="cursor-pointer ms-2 text-sm font-medium text-white"
                      >
                        AI Images (Art)
                      </label>
                    </div>
                  </div> */}
                  <div className="grid grid-cols-2 gap-y-1 mt-4">
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value="AI Images (Photorealistic)"
                        onChange={onOptionChange}
                        name="default-radio"
                        checked={
                          videoStructure === "AI Images (Photorealistic)"
                        }
                        className="cursor-pointer appearance-none bg-transparent w-4 h-4 border-2 border-[#8297BD] rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="cursor-pointer ms-2 text-sm font-medium text-white"
                      >
                        AI Images <br /> (Photorealistic)
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        disabled
                        id="default-radio-4"
                        type="radio"
                        value="AI Images (Art)"
                        onChange={onOptionChange}
                        checked={videoStructure === "AI Images (Art)"}
                        name="default-radio"
                        className="cursor-pointer appearance-none bg-transparent w-4 h-4 border-2 border-[#8297BD] rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                      />
                      <label
                        htmlFor="default-radio-4"
                        className="cursor-pointer ms-2 text-sm font-medium text-white"
                      >
                        AI Images (Art)
                      </label>
                    </div>
                  </div>

                  <div className="w-full flex justify-center items-center gap-3 my-2">
                    {/* <Button
                      className=" rounded-full w-32  text-nyx-yellow hover:shadow-none hover:bg-nyx-yellow focus:shadow-glow focus:bg-nyx-yellow focus:text-black font-semibold"
                      onClick={nextToVideoSize}
                    >
                      Next
                    </Button> */}
                    <Button
                      className={`rounded-full w-32  text-nyx-yellow font-semibold  hover:shadow-none focus:bg-nyx-yellow focus:shadow-glow focus:text-black ${
                        (updateCampaign.isPending || videoSize == null) &&
                        " text-black bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"
                      } disabled:cursor-not-allowed`}
                      onClick={nextToScript}
                      disabled={updateCampaign.isPending || videoSize == null}
                    >
                      {updateCampaign.isPending ? <ButtonLoading /> : "Next"}
                    </Button>
                  </div>
                </>
              )}
              {creativeTabState == 1 && (
                <>
                  <div className="w-full flex flex-col gap-4 mt-2">
                    <div className=" text-white font-bold text-[16px] leading-[30px]">
                      Aspect Ratio
                    </div>
                    <div className="flex w-full items-end gap-2">
                      {IMAGE_SIZE.map((item, index) => (
                        <div
                          key={item?.id}
                          className="w-full flex flex-col gap-1 justify-center items-center"
                        >
                          <button
                            key={item?.id}
                            style={{
                              width: item.width,
                              height: item.height,
                              backgroundColor:
                                videoSize == item?.diamension2
                                  ? "#5E32FF"
                                  : "#6F559A",
                            }}
                            className="rounded-md flex justify-center items-center"
                            onClick={() =>
                              handleDiamensionButtonClick(
                                item?.diamension2,
                                index,
                                item?.resolution
                              )
                            }
                          ></button>
                          <div className="w-full text-center text-[#FFFFFF] text-xs">
                            {item.title}
                          </div>
                          <div
                            className="w-full text-center text-[#FFFFFF] text-xs "
                            style={{ width: "max-content" }}
                          >
                            {`(${item.diamension})`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-3 my-2">
                    {/* <Button
                      className="rounded-full w-32 text-[#F1BB2E] font-semibold hover:shadow-none focus:bg-nyx-yellow focus:shadow-glow focus:text-black"
                      onClick={backToVideoSize}
                    >
                      Back
                    </Button> */}
                    <Button
                      className={`rounded-full w-32  text-nyx-yellow font-semibold  hover:shadow-none focus:bg-nyx-yellow focus:shadow-glow focus:text-black ${
                        (updateCampaign.isPending || videoSize == null) &&
                        " text-black bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"
                      } disabled:cursor-not-allowed`}
                      onClick={nextToScript}
                      disabled={updateCampaign.isPending || videoSize == null}
                    >
                      {updateCampaign.isPending ? <ButtonLoading /> : "Next"}
                    </Button>
                  </div>
                </>
              )}
              {/* "border px-3.5 py-2.5 rounded-md font-light text-nyx-white-1 border-[#8297BD] text-sm/[17px] cursor-pointer" */}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VideoContent;
