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
    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
  };

  const onSeeking = (currentTime: any) => {
    const totalTime = wavesurfer.current.getDuration();
    const remainingTime = totalTime - currentTime;
    setTiming({ totalTime, currentTime, remainingTime });
  };

  const onInteraction = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
        progressColor: "#FFFFFF",
        // progressColor: "#3B226F",
        cursorWidth: 0,
        
        cursorColor: "#63058F",
        url: url,
        width: (window.innerWidth > 300 ? 300 : window.innerWidth) - 150,
        height: isTablet ? 40 : 40,
        barWidth: isTablet ? 4 : 3,
        barGap: isTablet ? 3 : 1,
        barRadius: isTablet ? 4 : 2,
        
      });

      wavesurfer.current.on("interaction", onInteraction);
      wavesurfer.current.on("timeupdate", onSeeking);
      wavesurfer.current.on("ready", onReady);
      wavesurfer.current.on("finish", () => {
        setIsPlaying(false); // Set isPlaying to false when playback finishes
      });
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!url) {
    return null;
  }

  return (
    <div  className="flex flex-row items-center gap-2">
      
      <div className=" rounded-full flex justify-center items-center ">
        
        
        
        <div className={`relative z-0  ${isPlaying?"block":"hidden"}`}>
            
            <div id={id} ref={elRef} className=" z-50"></div>
          
        </div>
        {isPlaying &&
        
        <span className="text-white  text-sm lg:text-base w-[40px]">
        {formatTime(timing.currentTime)}
        </span>
        }
      </div>
      <div className="flex justify-center items-center ">
        <button onClick={onClick} className="rounded-full ">
          {isPlaying ? (
            <svg width="9" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y=".756" width="2.953" height="11.075" rx="1.477" fill="#fff"/><rect x="5.907" y=".756" width="2.953" height="11.075" rx="1.477" fill="#fff"/></svg>
          ) : (
            <svg width="11" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.428 5.644c.835.465.838 1.05 0 1.576l-6.476 4.368c-.814.434-1.366.178-1.424-.762L1.5 1.686C1.482.82 2.195.574 2.874.99l6.554 4.654Z" stroke="#fff" strokeWidth="1.5"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default WaveCustom;