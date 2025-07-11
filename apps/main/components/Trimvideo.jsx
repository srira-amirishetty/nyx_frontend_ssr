import React, { useEffect, useRef, useState } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { urlToBlob } from "@nyx-frontend/main/utils/helper";
import Slider from "@mui/material/Slider";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";

export default function VideoTrimmer({ setTrim, DeleteElement }) {
  const store = React.useContext(StoreContext);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [data, setData] = useState();
  const [loading, setloading] = useState(false);

  const handleSliderChange = (event, newValue) => {
    setTrimStart(newValue[0]);
    setTrimEnd(newValue[1]);
  };

  useEffect(() => {
    const activeElement = store.selectedElement;
    const dataURL = activeElement?.properties?.src;
    const endTime = activeElement?.timeFrame?.end;
    if (!dataURL?.length) return;

    setData(dataURL);
    setVideoDuration(endTime / 1000);
    setTrimEnd(endTime / 1000);
  }, [store.selectedElement]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [data]);

  const playTrimmedVideo = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!video || !canvas) return;

    video.currentTime = trimStart;
    video.play();

    const step = () => {
      if (video.currentTime >= trimEnd) {
        video.pause();
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      if (!video.paused && !video.ended) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const replaceVideo = () => {
    setloading(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chunks = [];
    const stream = canvas.captureStream(); // Capture the canvas stream
    const audioStream = video.captureStream().getAudioTracks(); // Capture the audio from video
    stream.addTrack(audioStream[0]);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" }); // Use a supported MIME type

    if (!video || !canvas) return;

    // Set the canvas dimensions to match the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Ensure video starts at trimStart
    video.currentTime = trimStart;

    // Handle data available event
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    // Handle recording stop event
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      console.log("Trimmed video blob:", blob);
      DeleteElement(); // Remove Existing Video
      store.addVideoFromBlob(blob, trimEnd - trimStart); // Add Trimmed Video
      setTrim(false);
    };

    // Start recording and playing video
    recorder.start();
    video.play();

    // Drawing function
    const step = () => {
      if (video.currentTime >= trimEnd) {
        video.pause();
        recorder.stop(); // Stop recording when trimEnd is reached

        setloading(false);
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      if (!video.paused && !video.ended) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!video || !canvas) return;

    video.currentTime = trimStart;

    const step = () => {
      if (video.currentTime >= trimEnd) {
        video.pause();
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      if (!video.paused && !video.ended) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trimStart, trimEnd]);

  return (
    <div className="w-[600px] h-[500px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px] overflow-hidden overflow-y-auto text-white">
      <div className="flex justify-end cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          onClick={() => {
            setTrim(false);
          }}
        >
          <path
            fill="#FFFFFF"
            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
          />
        </svg>
      </div>
      <video
        ref={videoRef}
        style={{ display: "none", maxWidth: "400px", maxHeight: "250px" }}
        preload="metadata"
      >
        {data && <source src={data} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          maxWidth: "400px",
          maxHeight: "250px",
          margin: "0 auto",
        }}
      ></canvas>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label>Start Time: {trimStart}s</label>
        <label>End Time: {trimEnd}s</label>
      </div>
      <Slider
        min={0}
        max={videoDuration}
        value={[trimStart, trimEnd]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        step={0.5}
      />
      <div className="flex justify-center gap-4">
       
        <button
          onClick={playTrimmedVideo}
          type="submit"
          className={` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`}
        >
          Play
        </button>
        <button
          onClick={replaceVideo}
          type="submit"
          className={` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`}
        >
          {loading ? <ButtonLoading /> : "Replace"}
        </button>
      </div>
    </div>
  );
}
