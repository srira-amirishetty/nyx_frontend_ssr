/* eslint-disable @next/next/no-img-element */
import "../index.css";
import { useEffect, useState, useRef } from "react";

const PLAYIN_BUTTON = (
  <svg
    width="12"
    height="12"
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
    width="12"
    height="12"
    viewBox="0 0 12 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="4" height="15" rx="2" fill="white" />
    <rect x="8" width="4" height="15" rx="2" fill="white" />
  </svg>
);

const MUSIC_ICON = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3301_22837)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1419 1.99968C19.426 1.95229 19.7171 1.96736 19.9948 2.04383C20.2726 2.12029 20.5303 2.25633 20.7502 2.44249C20.97 2.62864 21.1467 2.86044 21.2679 3.12177C21.3891 3.38311 21.452 3.6677 21.4521 3.95578V15.6804C21.4519 16.5538 21.1635 17.4028 20.6317 18.0956C20.0999 18.7884 19.3543 19.2864 18.5106 19.5123C17.6669 19.7382 16.7723 19.6794 15.9654 19.3451C15.1586 19.0107 14.4846 18.4195 14.048 17.663C13.6113 16.9066 13.4365 16.0272 13.5506 15.1613C13.6647 14.2954 14.0613 13.4913 14.6789 12.8738C15.2965 12.2562 16.1006 11.8597 16.9666 11.7457C17.8325 11.6318 18.7118 11.8067 19.4682 12.2434V7.92352L9.54886 9.57707V16.6724C9.54886 16.7319 9.5439 16.7884 9.53398 16.845C9.6052 17.6078 9.42212 18.3727 9.01326 19.0205C8.60441 19.6684 7.99275 20.1629 7.27358 20.4268C6.55441 20.6908 5.76812 20.7095 5.03721 20.48C4.3063 20.2505 3.67182 19.7857 3.23263 19.158C2.79344 18.5303 2.5742 17.775 2.60907 17.0097C2.64394 16.2444 2.93095 15.5121 3.42541 14.927C3.91986 14.3418 4.59397 13.9366 5.34272 13.7745C6.09147 13.6124 6.87281 13.7026 7.56499 14.0309V5.60933C7.56493 5.13971 7.73147 4.6853 8.03498 4.32694C8.33849 3.96857 8.75929 3.7295 9.22251 3.65225L19.1419 1.99968ZM9.54886 7.56642L19.4682 5.91287V3.95578L9.54886 5.60933V7.56642Z"
        fill="#A388C4"
      />
    </g>
    <defs>
      <clipPath id="clip0_3301_22837">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0.777344 0.144531)"
        />
      </clipPath>
    </defs>
  </svg>
);
export const AudioCard = ({ item, handlePopUp }) => {
  const imageURL = "https://i.ibb.co/p1jYgq5/Group-1707478842.png";

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
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

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

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrentTime(progressBar.current.value);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  return (
    <div
      className="audio-player  w-full h-full "
      onClick={() => handlePopUp(item)}
    >
      <img
        className="rounded-lg w-[242px] h-[242px] cursor-pointer object-contain bg-[#28134B] absolute top-2"
        width={242}
        height={242}
        alt=""
        src="https://i.ibb.co/p1jYgq5/Group-1707478842.png"
      />
      <audio
        className="w-[242px]"
        ref={audioPlayer}
        src={item.file_details.original_song_url}
      />
      <div className="absolute right-4 top-4">{MUSIC_ICON}</div>
      <div className="mt-4 absolute bottom-24 w-[242px] ">
        <input
          type="range"
          className="progress-bar cursor-pointer ml-1"
          ref={progressBar}
          defaultValue="0"
          onChange={changeRange}
        />
        <div className="flex w-[242px] absolute bottom-50 justify-between text-white font-light text-[12px] cursor-pointer px-1">
          <div>{calculateTime(currentTime)}</div>
          <div>{duration !== 0 ? calculateTime(duration) : "00:00"}</div>
        </div>
      </div>
      <div
        onClick={handlePlay}
        className="w-fit py-2 px-2 bg-black absolute top-4 left-4 rounded-full flex justify-center items-center"
      >
        {isPlaying ? PAUSE_BUTTON : PLAYIN_BUTTON}
      </div>
    </div>
  );
};
