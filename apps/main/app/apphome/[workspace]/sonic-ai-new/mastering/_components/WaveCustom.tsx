import classNames from "@nyx-frontend/main/utils/classNames";
import { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

type Props = { url: string; id: string; title?: string };

function WaveCustom({ id, url, title }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingFile, setLoadingFile] = useState(true);
  const [timing, setTiming] = useState({
    totalTime: 0,
    currentTime: 0,
    remainingTime: 0,
  });

  const onClick = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  const onSeeking = (currentTime: any) => {
    const totalTime = wavesurfer.current.getDuration();
    const remainingTime = totalTime - currentTime;
    setTiming({ totalTime, currentTime, remainingTime });
  };

  const onInteraction = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  const onReady = () => {
    setLoadingFile(false);
    const totalTime = wavesurfer.current.getDuration();
    setTiming({ ...timing, totalTime });
  }

  useEffect(() => {
    if (elRef.current && !wavesurfer.current) {
      const isTablet = window.innerWidth > 768;
      wavesurfer.current = WaveSurfer.create({
        container: "#" + id,
        waveColor: "#3B226F",
        // progressColor: "#FFCB54",
        progressColor: "#3B226F",
        cursorWidth: 0,
        cursorColor: "#63058F",
        url: url,
        width: (window.innerWidth > 1010 ? 1010 : window.innerWidth) - 150,
        height: isTablet ? 80 : 40,
        barWidth: isTablet ? 6 : 3,
        barGap: isTablet ? 3 : 1,
        barRadius: isTablet ? 4 : 2,
      });

      wavesurfer.current.on("interaction", onInteraction);
      wavesurfer.current.on("timeupdate", onSeeking);
      wavesurfer.current.on("ready", onReady);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!url) {
    return null;
  }

  return (
    <div>
      {title ? (
        <h3 className="text-white text-lg lg:text-3xl font-semibold mb-6">
          {title}
        </h3>
      ) : null}
      <div className="bg-nyx-purple rounded-full flex justify-center items-center py-4 md:py-8">
        <span className="text-white pl-2 pr-2.5 md:pr-4 text-sm lg:text-base w-16 text-right">
          {timing.currentTime.toFixed(1)}
        </span>
        {loadingFile ? <span className="text-nyx-yellow text-sm md:text-base">Loading...</span> : null}
        <div className="relative z-0">
          <div id={id} ref={elRef} className="z-10"></div>
          <div className="absolute inset-0 m-auto z-20 pointer-events-none">
            <div className="absolute inset-0 m-auto w-full h-1 md:h-1.5 rounded-md bg-black"></div>
            <div
              className="absolute inset-y-0 m-auto h-1 md:h-1.5 rounded-md bg-nyx-yellow"
              style={{
                width: `${(timing.currentTime / timing.totalTime) * 100}%`,
              }}
            ></div>
            <div
              className={classNames("absolute inset-y-0 m-auto w-4 h-4 md:w-6 md:h-6 rounded-full bg-nyx-yellow", loadingFile ? "hidden" : "")}
              style={{
                left: timing.currentTime
                  ? `calc(${
                      (timing.currentTime / timing.totalTime) * 100
                    }% - 12px)`
                  : "-12px",
              }}
            ></div>
          </div>
        </div>
        <span className="text-white pl-2.5 md:pl-4 pr-2 text-sm lg:text-base w-16 text-left">
          {timing.totalTime.toFixed(1)}
        </span>
      </div>
      <div className="flex justify-center items-center pt-6">
        <button onClick={onClick} className="rounded-full bg-nyx-purple p-4">
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-10"
              fill="#fff"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-10"
              fill="#fff"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default WaveCustom;
