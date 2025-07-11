"use client";
import React, { useState } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { formatTimeToMinSecMili } from "@nyx-frontend/main/utils";
import { observer } from "mobx-react";

export type AudioResourceProps = {
  audio: string;
  index: number;
};
export const AudioResource = observer(
  ({ audio, index }: AudioResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLAudioElement>(null);
    const [formatedAudioLength, setFormatedAudioLength] =
      React.useState("00:00.00");
    const [audioClick, setAudioClick] = useState<boolean>(false);
    const [audioClickIndex, setAudioClickIndex] = useState(null);

    const audioSelected = (index: any) => {
      store.addAudio(index);
      setAudioClick(true);
      setAudioClickIndex(index);
    };

    return (
      <button
        className={`rounded-lg flex flex-col bg-[#1D1138] w-[125px] h-[115px] relative ${audioClick && audioClickIndex === index ? "border-2 border-nyx-sky" : ""}`}
        onClick={() => audioSelected(index)}
      >
        <div className="bg-transparent text-white py-1 absolute text-sm top-2 right-2">
          {formatedAudioLength}
        </div>
        <div className="w-full h-[80px] rounded-lg bg-[#A388C4]">
          <svg
            width="122"
            height="68"
            viewBox="0 0 125 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5748_12589)">
              <path
                d="M0 4.71875C0 2.50961 1.79086 0.71875 4 0.71875H121C123.209 0.71875 125 2.50961 125 4.71875V67.7188H0V4.71875Z"
                fill="#A388C4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M72.4491 21.5446C72.8549 21.4769 73.2706 21.4984 73.6672 21.6076C74.0639 21.7168 74.432 21.9111 74.746 22.177C75.06 22.4428 75.3123 22.7739 75.4855 23.1471C75.6586 23.5204 75.7483 23.9268 75.7485 24.3382V41.0832C75.7482 42.3306 75.3364 43.543 74.5768 44.5325C73.8173 45.522 72.7525 46.2332 71.5475 46.5558C70.3426 46.8784 69.0649 46.7945 67.9125 46.317C66.7602 45.8395 65.7976 44.9951 65.174 43.9148C64.5505 42.8344 64.3008 41.5785 64.4637 40.3419C64.6266 39.1052 65.193 37.9568 66.0751 37.0748C66.9572 36.1928 68.1056 35.6265 69.3423 35.4638C70.579 35.301 71.8349 35.5508 72.9151 36.1745V30.0049L58.7485 32.3665V42.4999C58.7485 42.5849 58.7414 42.6657 58.7272 42.7464C58.8289 43.8358 58.5675 44.9282 57.9836 45.8535C57.3996 46.7788 56.5261 47.485 55.499 47.862C54.4719 48.239 53.3489 48.2657 52.305 47.9379C51.2611 47.6102 50.355 46.9464 49.7277 46.0499C49.1005 45.1534 48.7874 44.0746 48.8372 42.9817C48.887 41.8887 49.2969 40.8428 50.0031 40.0071C50.7092 39.1714 51.672 38.5927 52.7413 38.3612C53.8107 38.1298 54.9266 38.2585 55.9151 38.7273V26.6998C55.9151 26.0291 56.1529 25.3801 56.5864 24.8683C57.0199 24.3565 57.6208 24.0151 58.2824 23.9047L72.4491 21.5446ZM58.7485 29.4949L72.9151 27.1333V24.3382L58.7485 26.6998V29.4949Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_5748_12589">
                <path
                  d="M0 4.71875C0 2.50961 1.79086 0.71875 4 0.71875H121C123.209 0.71875 125 2.50961 125 4.71875V67.7188H0V4.71875Z"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <audio
          onLoadedData={() => {
            const audioLength = ref.current?.duration ?? 0;
            setFormatedAudioLength(formatTimeToMinSecMili(audioLength*1000));
          }}
          ref={ref}
          className="max-h-[100px] max-w-[150px] min-h-[50px] min-w-[100px]"
          // controls
          src={audio}
          id={`audio-${index}`}
        ></audio>
        <p className="text-white text-center w-full pt-2">Audio {index + 1}</p>
      </button>
    );
  },
);
