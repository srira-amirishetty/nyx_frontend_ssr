"use client";
import "@nyx-frontend/main/css/upload_lyrics_loader.css";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { useContext, useEffect, useRef, useState } from "react";
export default function UploadLyricsLoader() {
  const circleRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const { setModalConfig, apiLoaded } = useContext(UseContextData);
  // Function to update progress at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      // Increase progress by 10% until 100%
      setProgress((prevProgress) =>
        prevProgress + 10 > 100 ? 100 : prevProgress + 10
      );
    }, 200); // Adjust the interval duration as needed

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const circleUpdate = (value) => {
    let val = value;
    const radius = 90;
    const circle = Math.PI * (radius * 2);
    if (val < 0) {
      val = 0;
    }
    if (val > 100) {
      val = 100;
    }
    const pct = ((100 - val) / 100) * circle;
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = `${pct}`;
    }
  };

  useEffect(() => {
    if (progress >= 100 && apiLoaded) {
      setModalConfig(MODAL_RESET);
    } else {
      circleUpdate(progress);
    }
  }, [progress, apiLoaded]);

  return (
    <div className="">
      <div className="w-full">
        <h2 className="text-white text-3xl font-bold mb-2 w-full">
          Upload in progress...
        </h2>
        <p className="text-white text-base font-[200]">
          Lyrics getting uploaded...
          <span className="text-nyx-blue font-bold"></span>
        </p>
      </div>
      <div className="w-full relative flex justify-center items-center py-10">
        <div className="md:w-80 absolute">
          <svg
            id="svg"
            viewBox="0 0 200 200"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full -rotate-90"
          >
            {/* Modify strokeDasharray and strokeDashoffset based on progress */}
            <circle
              r="90"
              cx="100"
              cy="100"
              fill="transparent"
              strokeDasharray="565.48"
              strokeDashoffset="0"
              style={{ strokeDashoffset: 565.48 }}
              className="stroke-nyx-yellow svg-round [stroke-width:0.5rem] md:[stroke-width:0.9rem]"
              ref={circleRef}
            ></circle>
          </svg>
        </div>
        <div className="rounded-full bg-[#000] w-[240px] h-[240px] flex relative justify-center items-center z-0 overflow-hidden">
          <img
            src="https://nyxassets.s3.ap-south-1.amazonaws.com/uploading.gif"
            alt="loading"
            className="absolute inset-0 w-full h-full -z-10"
          />
          <span className="text-nyx-yellow font-bold text-4xl relative z-10">
            {progress} %
          </span>
        </div>
      </div>
      <div className="fles flex-row w-full">
        <div className="flex">
          <p className="text-white text-base font-[200]">
            Validating File format & Evaluating File Size
            <br />
            Anticipate an approximate 1 min for uploading and analysing your
            song.
          </p>
        </div>
      </div>
    </div>
  );
}
