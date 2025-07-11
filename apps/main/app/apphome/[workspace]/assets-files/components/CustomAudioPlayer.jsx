"use client";
import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import Button from "@nyx-frontend/main/components/Button";
import DownloadIcon from "@nyx-frontend/main/components/Icons/DownloadSVGIcon";

const PLAYIN_BUTTON = (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.8125 9.49988C17.813 9.70148 17.7613 9.89977 17.6625 10.0755C17.5636 10.2512 17.421 10.3983 17.2484 10.5026L6.555 17.0442C6.37471 17.1546 6.16822 17.2149 5.95685 17.2188C5.74549 17.2227 5.53691 17.1701 5.35266 17.0665C5.17016 16.9644 5.01813 16.8156 4.91222 16.6354C4.8063 16.4551 4.7503 16.2499 4.75 16.0408V2.95898C4.7503 2.7499 4.8063 2.54467 4.91222 2.3644C5.01813 2.18412 5.17016 2.03532 5.35266 1.93328C5.53691 1.82963 5.74549 1.77705 5.95685 1.78097C6.16822 1.78488 6.37471 1.84515 6.555 1.95555L17.2484 8.49719C17.421 8.60144 17.5636 8.74858 17.6625 8.92428C17.7613 9.09999 17.813 9.29828 17.8125 9.49988Z"
      fill="white"
    />
  </svg>
);

const PAUSE_BUTTON = (
  <svg
    width="19"
    height="19"
    viewBox="0 0 12 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="4" height="15" rx="2" fill="white" />
    <rect x="8" width="4" height="15" rx="2" fill="white" />
  </svg>
);

const CustomAudio = ({ url, name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
    audioPlayer.current.addEventListener("ended", () => {
      setIsPlaying(false);
      progressBar.current.value = 0;
      setCurrentTime(progressBar.current.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState ]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinutes}:${returnedSeconds}`;
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrentTime(progressBar.current.value);
  };

  const handlePlay = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const downloadSong = async (songUrl) => {
    try {
      // Fetch the song from the URL
      const response = await fetch(songUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "song.mp3"; // Set the download attribute with a filename

      // Append the link to the body (this is necessary for the link to work in some browsers)
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      console.log("Song downloaded successfully!");
    } catch (error) {
      console.error("Failed to download the song:", error);
    }
  };

  return (
    <>
      <div className="w-full h-[190px] p-2 rounded-md bg-[#28134B] flex flex-col justify-between items-center">
        <div className="w-full flex justify-between">
          <div className=" text-white text-left text-base pb-2">{name}</div>
        </div>
        <div className="audio-player w-full ml-8 ">
          <audio className="w-full" ref={audioPlayer} src={url} />
          <div className="mt-4">
            <input
              type="range"
              className="progress-bar cursor-pointer"
              ref={progressBar}
              defaultValue="0"
              onChange={changeRange}
            />
          </div>
          <div className="flex w-[750px] justify-between text-white font-light cursor-pointer">
            <div>{calculateTime(currentTime)}</div>
            <div>{duration !== 0 ? calculateTime(duration) : "00:00"}</div>
          </div>
        </div>
        <Button
          onClick={handlePlay}
          className="w-[91px] py-3 rounded-full flex justify-center items-center"
        >
          {isPlaying ? PAUSE_BUTTON : PLAYIN_BUTTON}
        </Button>
      </div>
    </>
  );
};

export default CustomAudio;
