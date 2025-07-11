/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import clsx from "clsx";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { CreativesTab } from "@nyx-frontend/main/shared/inputs";
import { VIDEO_SETTINGS_CREATIVES_TABS } from "@nyx-frontend/main/utils/utils";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { updateTextToVideo } from "@nyx-frontend/main/services/videoGenerationServices";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import ButtonLoading from "./ButtonLoading";
import ProgressAudio from "./_components/ProgressAudio";
import WaveCustom from "./_components/WaveCustom";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

const rightArrow = IMAGE_URL + "/assets/textvideo/rightArrow.svg";
const upload = IMAGE_URL + "/assets/textvideo/pause.svg";
const VideoSettings = ({
  tab,
  setBrandTab,
  campaignId,
  brandDetails,
  videoConDone,
  settingVideoset,
}) => {
  const musicUrls = {
    music1: {
      id: "mCQMfsqGDT6IDkEKR20a",
      url: IMAGE_URL + "/voiceover/voice1.mp3",
    },
    music2: {
      id: "VZyYADHcMi33m0wO9zD1",
      url: IMAGE_URL + "/voiceover/voice2.mp3",
    },
    music3: {
      id: "bUTE2M5LdnqaUCd5tJB3",
      url: IMAGE_URL + "/voiceover/voice3.mp3",
    },
    music4: {
      id: "zs7UfyHqCCmny7uTxCYi",
      url: IMAGE_URL + "/voiceover/voice4.mp3",
    },
    music5: {
      id: "tTZ0TVc9Q1bbWngiduLK",
      url: IMAGE_URL + "/voiceover/voice5.mp3",
    },
    music6: {
      id: "P7vsEyTOpZ6YUTulin8m",
      url: IMAGE_URL + "/voiceover/voice6.mp3",
    },
    music7: {
      id: "jNoQBSsAUV0DpAYKDl4u",
      url: IMAGE_URL + "/voiceover/voice7.mp3",
    },
    music8: {
      id: "LHJy3mhZWsvhUjy0zUM1",
      url: IMAGE_URL + "/voiceover/voice8.mp3",
    },
    music9: {
      id: "ftDdhfYtmfGP0tFlBYA1",
      url: IMAGE_URL + "/voiceover/voice9.mp3",
    },
    music10: {
      id: "vghiSqG5ezdhd8F3tKAD",
      url: IMAGE_URL + "/voiceover/voice10.mp3",
    },
    music11: {
      id: "HBwtuRG9VQfaoE2YVMYf",
      url: IMAGE_URL + "/voiceover/voice11.mp3",
    },
    music12: {
      id: "ynkbQM1aYB3vamJqvwzD",
      url: IMAGE_URL + "/voiceover/voice12.mp3",
    },
  };

  const [creativeTabState, setCreativeTabState] = useState(0);
  const [cameraTab, setCameraTab] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);
  const [color, setColor] = useState("hide");
  const [pace, setPace] = useState("fast");
  // const [voice,setVoice]=useState(null)
  const [voice, setVoice] = useState(musicUrls.music1.id); //musicUrls.music1
  const [hex, setHex] = useState("#D9D9D9");
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // const audioRef = useRef(null);

  useEffect(() => {
    setColor("hide");
    setPace("fast");
    // setVoice(null);
    // setVoice(musicUrls.music1.id); //musicUrls.music1
    setCreativeTabState(0);
  }, [brandDetails]);

  // useEffect(() => {
  //   audioRef.current = new Audio(musicUrls.music1.url);
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       audioRef.current.removeEventListener('ended', handleAudioEnded);
  //       audioRef.current.removeEventListener('play', startUpdatingTime);
  //     }
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);

  const togglePlayPause = (music) => {
    const { id, url } = music;
    if (currentlyPlaying !== id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleAudioEnded);
        audioRef.current.removeEventListener("play", startUpdatingTime);
      }
      audioRef.current = new Audio(url);
      audioRef.current.addEventListener("play", startUpdatingTime);
      audioRef.current.addEventListener("ended", handleAudioEnded);
      audioRef.current.play();
      setCurrentlyPlaying(id);
    } else {
      if (audioRef.current.paused) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setCurrentlyPlaying(id);
      } else {
        audioRef.current.pause();
        setCurrentlyPlaying(null);
        clearInterval(intervalRef.current);
      }
    }
  };

  const hideShow = (e) => {
    setColor(e.target.value);
  };

  const hexChnage = (e) => {
    setHex(e.target.value);
  };

  const onOptionChange = (e) => {
    setPace(e.target.value);
  };

  const musichange = (event) => {
    const newVoice = event.target.value;
    setVoice(newVoice);
    // setCurrentlyPlaying(null);
    // if (audioRef.current) {
    //   audioRef.current.pause();
    //   audioRef.current.removeEventListener('ended', handleAudioEnded);
    //   audioRef.current.removeEventListener('play', startUpdatingTime);
    // }
    // setCurrentTime(0);
    // clearInterval(intervalRef.current);
  };

  // const startUpdatingTime = () => {
  //   clearInterval(intervalRef.current);
  //   intervalRef.current = setInterval(() => {
  //     setCurrentTime(audioRef.current.currentTime);
  //   }, 1000);
  // };

  // useEffect(() => {

  //   return () => {
  //     audioRef.current.removeEventListener("ended", handleAudioEnded);
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);

  const handleAudioEnded = () => {
    setCurrentlyPlaying(null);
    setCurrentTime(0);
    clearInterval(intervalRef.current);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const backToVideoSett = () => {
    setBrandTab(BRAND_TABS_Three.CREATIVE);
  };

  const nextToBrandPrinting = () => {
    if (pace == null) {
      toast.error(
        <>
          <span className="text-white text-[20px]">Bad Request</span>
          <br />
          <span className="text-white text-[16px]">
            Please select * marked section
          </span>
          <br />
        </>,
        { autoClose: 5000 }
      );
    } else {
      if (color == "show") {
        const data = {
          video_settings: {
            pace: pace,
            voice: voice, //voice to be changed
            captions: {
              color_code: "#D9D9D9",
            },
          },
        };

        const args = { campaignId, data };

        updateCampaign3.mutate(args, {
          onSuccess: (response) => {
            setBrandTab(BRAND_TABS_Three.PAINTING);
            settingVideoset(true);
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
      } else if (color == "hide") {
        const data = {
          video_settings: {
            pace: pace,
            voice: voice, //voice to be changed
            captions: {},
          },
        };

        const args = { campaignId, data };

        updateCampaign3.mutate(args, {
          onSuccess: (response) => {
            setBrandTab(BRAND_TABS_Three.PAINTING);
            settingVideoset(true);
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
          video_settings: {
            pace: pace,
            voice: voice,
          },
        };

        const args = { campaignId, data };

        updateCampaign3.mutate(args, {
          onSuccess: (response) => {
            setBrandTab(BRAND_TABS_Three.PAINTING);
            settingVideoset(true);
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
    }
  };

  const nextToVoice = () => {
    if (pace == null) {
      toast.error(
        <>
          <span className="text-white text-[20px]">Bad Request</span>
          <br />
          <span className="text-white text-[16px]">Choose the pace</span>
          <br />
        </>,
        { autoClose: 5000 }
      );
    } else {
      setCreativeTabState(1);
    }
  };

  const nextToCaption = () => {
    if (voice == null) {
      toast.error(
        <>
          <span className="text-white text-[20px]">Bad Request</span>
          <br />
          <span className="text-white text-[16px]">Choose the voice</span>
          <br />
        </>,
        { autoClose: 5000 }
      );
    } else {
      setCreativeTabState(2);
    }
  };

  const updateCampaign3 = useMutation({
    mutationKey: ["Update-campaign3"],
    mutationFn: updateTextToVideo,
  });

  const handleTab = () => {
    if (videoConDone) {
      if (tab !== BRAND_TABS_Three.SETTINGS) {
        setBrandTab(BRAND_TABS_Three.SETTINGS);
      } else {
        setBrandTab("");
      }
    } else {
      toast.warn(
        <>
          <span className="text-white text-[20px]">
            Video Content is Missing
          </span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please Complete Video Content First.
          </span>
        </>,
        { autoClose: 5000 }
      );
    }
  };
  const { displayMessagePopup } = useContext(MessagePopupContext);
  return (
    <>
      <div
        className={`${
          tab === BRAND_TABS_Three.SETTINGS ? "bg-[#332270]" : "bg-[#23145A]"
        } rounded-lg`}
      >
        <h2 className="mb-0">
          <div
            className={`${
              tab === BRAND_TABS_Three.SETTINGS
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-[#FFFFFF] rounded-lg`}
            onClick={handleTab}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS_Three.SETTINGS
                    ? "text-[#FFCB54] text-lg"
                    : "text-[#FFFFFF] text-sm"
                }`}
              >
                Video Settings{" "}
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS_Three.SETTINGS
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
            height: tab === BRAND_TABS_Three.SETTINGS ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(` w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 md:px-7 sm:px-4">
            <div className="flex flex-col gap-5">
              <div className="w-full">
                <CreativesTab
                  data={VIDEO_SETTINGS_CREATIVES_TABS}
                  tabState={setCreativeTabState}
                  tabStatus={creativeTabState}
                />
              </div>
              <div className="w-full">
                {creativeTabState === 0 && (
                  <>
                    <div className="w-full flex flex-col gap-3">
                      <label htmlFor="radio-fast">
                        <div className="cursor-pointer  py-[6px] px-[10px] flex items-center gap-[12px] bg-[#4A2B89] rounded-[4px] ">
                          <input
                            type="radio"
                            name="pacebtn"
                            value="fast"
                            id="radio-fast"
                            onChange={onOptionChange}
                            checked
                            className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                          />
                          <div>
                            <p className="text-sm font-normal text-white">
                              Fast
                            </p>
                            <p className="text-[12px]  font-normal text-white">
                              Image switches scene every 5 to 10 words
                            </p>
                          </div>
                        </div>
                      </label>

                      <label htmlFor="radio-medium">
                        <div className="radio-button-container py-[6px] px-[10px] flex items-center gap-[12px] bg-[#4A2B89] rounded-[4px] cursor-pointer">
                          <input
                            type="radio"
                            id="radio-medium"
                            name="pacebtn"
                            onChange={onOptionChange}
                            checked={pace === "medium"}
                            value="medium"
                            disabled
                            className=" cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-[#8297BD] rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                          />

                          <div>
                            <p className="text-sm font-normal text-[#8297BD]">
                              Medium
                            </p>
                            <p className="text-[12px]  font-normal text-[#8297BD]">
                              Switches scene every 10 to 25 words
                            </p>
                          </div>
                        </div>
                      </label>

                      <label htmlFor="radio-slow">
                        <div className="cursor-pointer  py-[6px] px-[10px] flex items-center gap-[12px] bg-[#4A2B89] rounded-[4px] ">
                          <input
                            type="radio"
                            value="slow"
                            name="pacebtn"
                            id="radio-slow"
                            onChange={onOptionChange}
                            checked={pace === "slow"}
                            disabled
                            className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-[#8297BD] rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                          />
                          <div>
                            <p className="text-sm font-normal text-[#8297BD]">
                              Slow
                            </p>
                            <p className="text-[12px]  font-normal text-[#8297BD]">
                              Switches scene every 20 to 35 words
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="w-full flex justify-center items-center gap-3 my-5">
                      <Button
                        className={`font-semibold ${
                          pace != null
                            ? "rounded-full w-32 text-nyx-yellow hover:shadow-none focus:text-black focus:bg-nyx-yellow focus:shadow-glow"
                            : "hover:cursor-not-allowed rounded-full w-32  hover:shadow-none  hover:bg-nyx-gray-1 hover:text-black  text-black  bg-nyx-gray-1 border-none"
                        }`}
                        onClick={nextToVoice}
                      >
                        Next
                      </Button>
                      {/* <Button
                        className={`rounded-full w-32  text-nyx-yellow font-semibold  hover:shadow-none focus:bg-nyx-yellow focus:shadow-glow focus:text-black ${updateCampaign3.isPending && " bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"} disabled:cursor-not-allowed`}
                        onClick={nextToBrandPrinting}
                        disabled={updateCampaign3.isPending}
                      >
                        {updateCampaign3.isPending ? <ButtonLoading /> : "Next"}
                      </Button> */}
                    </div>
                  </>
                )}
                {creativeTabState === 1 && (
                  <>
                    <div className="w-full flex flex-col gap-3">
                      {Object.keys(musicUrls).map((key, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer relative py-[6px] px-[10px] flex items-center justify-between gap-[12px] ${
                            voice === musicUrls[key].id
                              ? " bg-[#5E32FF]"
                              : "bg-[#4A2B89] "
                          } rounded-[4px]`}
                          onClick={() => {
                            setVoice(musicUrls[key].id);
                            // Trigger the change event programmatically
                            const event = {
                              target: { value: musicUrls[key].id },
                            };
                            musichange(event);
                          }}
                        >
                          <div className=" flex items-center gap-2">
                            <input
                              type="radio"
                              name="musicbtn"
                              id={key}
                              onChange={musichange}
                              value={musicUrls[key].id}
                              checked={voice === musicUrls[key].id}
                              className="cursor-pointer appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                            />
                            <label htmlFor={key}>
                              <p className="cursor-pointer text-sm font-normal text-white">
                                Voice {index + 1}
                              </p>
                            </label>
                          </div>

                          <div onClick={(e) => e.stopPropagation()}>
                            <WaveCustom
                              url={musicUrls[key].url}
                              id={key + 1}
                              title={"text"}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex justify-center items-center gap-3 my-5">
                      <Button
                        className={`font-semibold ${
                          voice != null
                            ? "rounded-full w-32 text-nyx-yellow hover:shadow-none focus:text-black focus:bg-nyx-yellow focus:shadow-glow"
                            : "hover:cursor-not-allowed rounded-full w-32 hover:shadow-none hover:bg-nyx-gray-1 hover:text-black text-black bg-nyx-gray-1 border-none"
                        }`}
                        onClick={nextToCaption}
                        disabled={voice == null}
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}
                {creativeTabState === 2 && (
                  <>
                    <div className="flex flex-row gap-4">
                      <div className="w-full flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="caption"
                            id="hideCaption"
                            value="hide"
                            onChange={hideShow}
                            checked={color == "hide"}
                            className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                          />
                          <label htmlFor="hideCaption">
                            <span className="cursor-pointer text-sm text-white font-light">
                              Hide Captions
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            id="showCaption"
                            type="radio"
                            name="caption"
                            value="show"
                            onChange={hideShow}
                            checked={color == "show"}
                            className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                          />
                          <label htmlFor="showCaption">
                            <span className="cursor-pointer text-sm text-white font-light">
                              Show Captions
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-3 my-5">
                      {/* <Button
                        className="rounded-full w-32 text-[#F1BB2E] font-semibold hover:shadow-none focus:bg-nyx-yellow focus:shadow-glow focus:text-black"
                        onClick={() => setCreativeTabState(1)}
                      >
                        Back
                      </Button> */}
                      <Button
                        className={`rounded-full w-32  text-nyx-yellow font-semibold  hover:shadow-none focus:bg-nyx-yellow focus:shadow-glow focus:text-black ${
                          updateCampaign3.isPending &&
                          " bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"
                        } disabled:cursor-not-allowed`}
                        onClick={nextToBrandPrinting}
                        disabled={updateCampaign3.isPending}
                      >
                        {updateCampaign3.isPending ? <ButtonLoading /> : "Next"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VideoSettings;
