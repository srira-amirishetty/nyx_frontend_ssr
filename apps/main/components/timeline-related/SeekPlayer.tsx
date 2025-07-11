"use client";
import React, { useState, useEffect } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { formatTimeToMinSecMili } from "@nyx-frontend/main/utils";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import { ScaleRangeInput } from "./ScaleRangeInput";
import Modal from "react-modal";
import { exportVideoStyle } from "@nyx-frontend/main/utils/modalstyles";
import Select from "react-select";
import { brandcanvacolourStyles } from "@nyx-frontend/main/utils/productStyle";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import { useRouter } from "next/navigation";

const MARKINGS = [
  {
    interval: 5000,
    color: "black",
    size: 16,
    width: 1,
  },
  {
    interval: 1000,
    color: "black",
    size: 8,
    width: 1,
  },
];

export type SeekPlayerProps = {};

type AspectRatio = "4:5" | "16:9" | "2:3" | "1:1" | "19:4";
type AspectRatioFrame = "4:5" | "4:3" | "2:3" | "1:1" | "16:9";
interface Resolution {
  value: AspectRatio;
  label: string;
}
interface ResolutionFrame {
  value: AspectRatioFrame;
  label: string;
}

const resolution: Resolution[] = [
  { value: "4:5", label: "4:5" },
  { value: "16:9", label: "16:9" },
  { value: "2:3", label: "2:3" },
  { value: "1:1", label: "1:1" },
  { value: "19:4", label: "19:4" },
];
const resolutionFrame: ResolutionFrame[] = [
  { value: "4:5", label: "4:5" },
  { value: "4:3", label: "4:3" },
  { value: "2:3", label: "2:3" },
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
];

export const SeekPlayer = observer((_props: SeekPlayerProps) => {
  const [exportVideo, setExportVideo] = useState(false);
  const [exportFrame, setExportFrame] = useState(false);
  const [browserSpecific, setbrowserSpecific] = useState(false);
  const [loading, setLoading] = useState(false);

  const store = useContext(StoreContext);
  const Icon = store.playing ? MdPause : MdPlayArrow;
  const formattedTime = formatTimeToMinSecMili(store.currentTimeInMs);
  const formattedMaxTime = formatTimeToMinSecMili(store.maxTime);
  const router = useRouter();
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(
    resolution[0],
  );
  const [selectedResolutionFrame, setSelectedResolutionFrame] = useState<ResolutionFrame>(
    resolutionFrame[0],
  );

  const handleChange = (selectedOption: Resolution) => {
    setSelectedResolution(selectedOption);
    store.setResolution(selectedOption.value);
  };
  const handleChangeFrame = (selectedOption: ResolutionFrame) => {
    setSelectedResolutionFrame(selectedOption);
  };

  useEffect((): any => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Edg")) {
      setbrowserSpecific(false);
    } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
      setbrowserSpecific(false);
    } else if (
      userAgent.includes("Chrome") &&
      !userAgent.includes("Chromium")
    ) {
      setbrowserSpecific(true);
    } else if (
      userAgent.includes("Safari") &&
      !userAgent.includes("Chrome") &&
      !userAgent.includes("Chromium")
    ) {
      setbrowserSpecific(true);
    } else if (userAgent.includes("Firefox")) {
      setbrowserSpecific(false);
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
      setbrowserSpecific(false);
    } else {
      setbrowserSpecific(true);
    }
  }, []);

  const [remainingTime, setRemainingTime] = useState(store.maxTime / 1000);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [loading]);

  const videoHandle = () => {
    setExportVideo(false);
    setExportFrame(false);
  };

  const onFrameHandler = () => {
    switch (selectedResolutionFrame.value) {
      case "4:5":
        store.canvas?.setWidth(320);
        store.canvas?.setHeight(400);
        break;
      case "4:3":
        store.canvas?.setWidth(530);
        store.canvas?.setHeight(400);
        
        break;
      case "2:3":
        store.canvas?.setWidth(270);
        store.canvas?.setHeight(400);
        break;
      case "1:1":
        store.canvas?.setWidth(400);
        store.canvas?.setHeight(400);
        break;
      case "16:9":
        store.canvas?.setWidth(700);
        store.canvas?.setHeight(400);
        break;
    }
    const blob = store.canvas?.toDataURL({
      format: "png",
      quality: 0.8,
    });
    if (blob) {
      const link = document.createElement("a") as HTMLAnchorElement;
      link.download = "curentFrame.png";
      link.href = blob;
      link.click();
    }
    store.canvas?.setWidth(700);
    store.canvas?.setHeight(400);
    setExportFrame(false)
  };

  const iconStyle = {
    color: "white", // Set the color to white
  };

  return (
    <>
      <div className="seek-player flex flex-col">
        <div className="flex flex-row items-center px-2">
          <div className="w-1/2 flex items-center">
            {store.editorElements.length > 0 ? (
              <div
                className="w-[80px] rounded px-2 py-2 cursor-pointer"
                onClick={() => {
                  store.setPlaying(!store.playing);
                }}
              >
                <Icon size="40" style={iconStyle}></Icon>
              </div>
            ) : (
              <div className="w-[80px] rounded px-2 py-2 cursor-not-allowed">
                <MdPlayArrow size="40" style={iconStyle}></MdPlayArrow>
              </div>
            )}

            <span className="font-mono text-white">{formattedTime}</span>
            <div className="w-[1px] h-[25px] bg-white mx-[10px]"></div>
            <span className="font-mono text-white">{formattedMaxTime}</span>
          </div>
          {store.editorElements.length > 0 ? (
            <div className="w-1/2 flex gap-5 items-center justify-center">
              <button
                className="bg-[#F1BB2E] rounded-full w-40 py-2"
                onClick={() => setExportVideo(true)}
              >
                Export Video
              </button>
              <button
                className="bg-[#F1BB2E] rounded-full w-40 py-2"
                onClick={() => setExportFrame(true)}
              >
                Export Frame
              </button>
            </div>
          ) : (
            <div className="w-1/2 flex gap-5 items-center justify-center">
              <div className="bg-[#8297BD] cursor-not-allowed rounded-full w-40 py-2 text-center text-[10px] xl:text-[16px]">
                Export Video
              </div>
              <div className="bg-[#8297BD] cursor-not-allowed rounded-full w-40 py-2 text-center text-[10px] xl:text-[16px]">
                Export Frame
              </div>
            </div>
          )}
        </div>

        <ScaleRangeInput
          max={store.maxTime}
          value={store.currentTimeInMs}
          onChange={(value) => {
            store.handleSeek(value);
          }}
          height={30}
          markings={MARKINGS}
          backgroundColor="#8297BD"
        />
      </div>

      {exportVideo ? (
        <Modal
          isOpen={exportVideo}
          style={exportVideoStyle}
          onRequestClose={videoHandle}
        >
          <div className="flex gap-3">
            <p className="text-white font-[700] text-[24px]">Export Video</p>
            <button
              className="px-2 py-1 absolute top-2 right-2"
              onClick={videoHandle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M0.35 13.65C0.583333 13.8833 0.855555 14 1.16667 14C1.47778 14 1.75 13.8833 1.98333 13.65L7 8.63333L12.0556 13.6889C12.263 13.8963 12.5287 13.9935 12.8528 13.9806C13.1769 13.9676 13.4426 13.8574 13.65 13.65C13.8833 13.4167 14 13.1444 14 12.8333C14 12.5222 13.8833 12.25 13.65 12.0167L8.63333 7L13.6889 1.94444C13.8963 1.73704 13.9935 1.4713 13.9806 1.14722C13.9676 0.823148 13.8574 0.557407 13.65 0.35C13.4167 0.116667 13.1444 0 12.8333 0C12.5222 0 12.25 0.116667 12.0167 0.35L7 5.36667L1.94444 0.311111C1.73704 0.103703 1.4713 0.00648092 1.14722 0.0194439C0.823148 0.0324068 0.557407 0.142593 0.35 0.35C0.116667 0.583333 0 0.855555 0 1.16667C0 1.47778 0.116667 1.75 0.35 1.98333L5.36667 7L0.311111 12.0556C0.103703 12.263 0.00648092 12.5287 0.0194439 12.8528C0.0324068 13.1769 0.142593 13.4426 0.35 13.65Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <>
            <div className="w-full flex mt-5">
              <div className="flex flex-col gap-2 my-2 w-1/2">
                <div className="text-[14px] text-white font-semibold mr-2">
                  Video Length:
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="rounded border-2 border-[#8297BD] bg-transparent px-2 text-white h-[39px]"
                    value={store.maxTime / 1000}
                    onChange={(e) => {
                      const value = e.target.value;
                      store.setMaxTime(Number(value) * 1000);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 my-2 w-1/2">
                <div className="text-[14px] text-white font-semibold mr-2">
                  Canvas Resolution:
                </div>
                <Select
                  className="text-sm md:text-base"
                  options={resolution}
                  defaultValue={resolution.find((res) => res.value === "19:4")}
                  styles={brandcanvacolourStyles}
                  onChange={(option) => handleChange(option as Resolution)}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col my-6">
              <div className="text-[14px] text-white font-semibold mr-2">
                Video Format:
              </div>
              <div className="flex flex-row items-center my-2">
                {browserSpecific ? (
                  <>
                    <input
                      type="radio"
                      className="mr-2 cursor-pointer"
                      name="video-format"
                      value="gif"
                      checked={store.selectedVideoFormat === "webm"}
                      onChange={(e) => {
                        store.setVideoFormat("webm");
                      }}
                    />
                    <div className="text-[14px] text-white font-[400] mr-2">
                      webm
                    </div>
                    <input
                      type="radio"
                      className="mr-2 cursor-pointer"
                      name="video-format"
                      value="mp4"
                      checked={store.selectedVideoFormat === "mp4"}
                      onChange={(e) => {
                        store.setVideoFormat("mp4");
                      }}
                    />
                    <div className="text-[14px] text-white font-[400] mr-2">
                      MP4
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="radio"
                      className="mr-2 cursor-pointer"
                      name="video-format"
                      value="gif"
                      checked={store.selectedVideoFormat === "webm"}
                      onChange={(e) => {
                        store.setVideoFormat("webm");
                      }}
                    />
                    <div className="text-[14px] text-white font-[400] mr-2">
                      webm
                    </div>
                  </>
                )}
              </div>
            </div>

            {loading ? (
              <p className="w-full text-center text-white my-1 text-sm font-light">
                Video Rendering will take{" "}
                <span className="font-bold">{Math.round(remainingTime)}</span>{" "}
                Seconds to complete
              </p>
            ) : null}

            <div className="w-full flex items-center justify-center">
              <button
                className="bg-[#F1BB2E] rounded-full w-72 py-2 px-4"
                onClick={() => {
                  setRemainingTime(store.maxTime / 1000);
                  setLoading(true);
                  store.handleSeek(0);
                  store.setSelectedElement(null);
                  setTimeout(() => {
                    store.setPlaying(true);
                    store.saveCanvasToVideoWithAudio();
                  }, 1000);
                  setTimeout(() => {
                    setLoading(false);
                    setExportVideo(false);
                  }, store.maxTime);
                }}
              >
                {loading ? (
                  <ButtonLoading />
                ) : (
                  `Export Video ${store.selectedVideoFormat === "mp4" ? "mp4" : "webm"}`
                )}
              </button>
            </div>
          </>
        </Modal>
      ) : null}
      {exportFrame ? (
        <Modal
          isOpen={exportFrame}
          style={exportVideoStyle}
          onRequestClose={videoHandle}
        >
          <div className="flex gap-3">
            <p className="text-white font-[700] text-[24px]">Export Frame</p>
            <button
              className="px-2 py-1 absolute top-2 right-2"
              onClick={videoHandle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M0.35 13.65C0.583333 13.8833 0.855555 14 1.16667 14C1.47778 14 1.75 13.8833 1.98333 13.65L7 8.63333L12.0556 13.6889C12.263 13.8963 12.5287 13.9935 12.8528 13.9806C13.1769 13.9676 13.4426 13.8574 13.65 13.65C13.8833 13.4167 14 13.1444 14 12.8333C14 12.5222 13.8833 12.25 13.65 12.0167L8.63333 7L13.6889 1.94444C13.8963 1.73704 13.9935 1.4713 13.9806 1.14722C13.9676 0.823148 13.8574 0.557407 13.65 0.35C13.4167 0.116667 13.1444 0 12.8333 0C12.5222 0 12.25 0.116667 12.0167 0.35L7 5.36667L1.94444 0.311111C1.73704 0.103703 1.4713 0.00648092 1.14722 0.0194439C0.823148 0.0324068 0.557407 0.142593 0.35 0.35C0.116667 0.583333 0 0.855555 0 1.16667C0 1.47778 0.116667 1.75 0.35 1.98333L5.36667 7L0.311111 12.0556C0.103703 12.263 0.00648092 12.5287 0.0194439 12.8528C0.0324068 13.1769 0.142593 13.4426 0.35 13.65Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <>
            <div className="w-full flex mt-5">
              <div className="flex flex-col gap-2 my-2 w-1/2">
                <div className="text-[14px] text-white font-semibold mr-2">
                  Canvas Resolution:
                </div>
                <Select
                  className="text-sm md:text-base"
                  options={resolutionFrame}
                  defaultValue={resolutionFrame[0]}
                  styles={brandcanvacolourStyles}
                  onChange={(option) => handleChangeFrame(option as ResolutionFrame)}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-14">
              <button className="bg-[#F1BB2E] rounded-full w-72 py-2 px-4"
              onClick={onFrameHandler}
              >
               Export Frame
              </button>
            </div>
          </>
        </Modal>
      ) : null}
    </>
  );
});
