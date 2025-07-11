"use client";
import React, { useState } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { formatTimeToMinSecMili } from "@nyx-frontend/main/utils";
import { observer } from "mobx-react";

type VideoResourceProps = {
  video: string;
  index: number;
};
export const VideoResource = observer(
  ({ video, index }: VideoResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLVideoElement>(null);
    const [formatedVideoLength, setFormatedVideoLength] =
      React.useState("00:00.00");
    const [videoClick, setVideoClick] = useState<boolean>(false);
    const [videoClickIndex, setVideoClickIndex] = useState(null);
    const [timelength, setTimelength] = useState(0);

    console.log("time", timelength * 1000, store.maxTime);

    const videoSelected = (index: any) => {
      store.addVideo(index);
      setVideoClick(true);
      setVideoClickIndex(index);

      if (
        store.editorElements.length <= 1 ||
        timelength * 1000 > store.maxTime
      ) {
        store.setMaxTime(Number(timelength) * 1000);
      }
    };

    return (
      <button
        className={`rounded-lg flex flex-col bg-[#1D1138] w-[125px] h-[115px] relative ${videoClick && videoClickIndex === index ? "border-2 border-nyx-sky" : ""}`}
        onClick={() => videoSelected(index)}
      >
        <div className="bg-transparent text-white py-1 absolute text-sm top-2 right-2">
          {formatedVideoLength}
        </div>
        <video
          onLoadedData={() => {
            const videoLength = ref.current?.duration ?? 0;
            setTimelength(videoLength);
            setFormatedVideoLength(formatTimeToMinSecMili(videoLength * 1000));
          }}
          ref={ref}
          className="w-[125px] rounded-lg h-[80px]"
          src={video}
          height={100}
          width={200}
          id={`video-${index}`}
        ></video>
        <p className="text-white text-center w-full pt-2">Video {index + 1}</p>
      </button>
    );
  },
);
