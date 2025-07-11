"use client";
import "../index.css";
import HeroOverlap from "@nyx-frontend/main/components/HeroOverlap";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/solid";
import { detectAutoplay } from "@nyx-frontend/main/utils/detect-autoplay";

const Hero = () => {
  const [show, setShow] = useState(false);
  const [network, setNetwork] = useState("");
  const [isSafariBrowser, setISafariBrowser] = useState(false);
  const [bgPoster, setBgPoster] = useState(
    `${IMAGE_URL}/assets/images/posters/lyrics-poster-mobile.png`,
  );
  /**
   * Show play/pause icon button
   * True: Show Pause Button
   * False: Show Play Button
   */
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef();
  const containerRef = useRef();
  const isInView = useInView(containerRef);
  const onEnded = () => {
    setShow(true);
    setShowPlayButton(true);
    setMuted(true);
  };

  const onReplay = () => {
    setShow(false);
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.volume = 0.3;
      videoRef.current.muted = false;
      setMuted(false);
      setShowPlayButton(false);
    }
  };

  const onClickPlayerHandler = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setShowPlayButton(false);
    } else {
      videoRef.current.pause();
      setShowPlayButton(true);
    }
  };

  const onVolumeHandler = () => {
    if (muted) {
      videoRef.current.volume = 1;
      videoRef.current.muted = false;
      setMuted(false);
    } else {
      videoRef.current.volume = 0;
      videoRef.current.muted = true;
      setMuted(true);
    }
  };

  useEffect(() => {
    if (navigator?.connection?.effectiveType === "4g") {
      setNetwork("high");
    } else {
      setNetwork("low");
    }

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setISafariBrowser(isSafari);
    if (videoRef.current && !isSafari) {
      videoRef.current?.play();
      setShowPlayButton(false);
    }
  }, []);

  useEffect(() => {
    detectAutoplay().then(() => {
      if (isInView) {
        videoRef.current?.play();
        setShowPlayButton(false);
      } else {
        videoRef.current?.pause();
        setShowPlayButton(true);
      }
    });
  }, [isInView]);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than a certain threshold
      if (window.innerWidth > 600) {
        setBgPoster(`${IMAGE_URL}/assets/images/posters/lyrics-poster.png`);
      } else {
        setBgPoster(
          `${IMAGE_URL}/assets/images/posters/lyrics-poster-mobile.png`,
        );
      }
    };

    // Call handleResize initially to set welcome state based on screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div
      className="hero_sec_pdp max-h-full max-sm:min-h-[100vw] relative"
      ref={containerRef}
    >
      {network === "high" && (
        <video
          muted
          onEnded={onEnded}
          preload={isSafariBrowser ? "none" : ""}
          controls={false}
          className="max-w-full max-sm:min-h-[100vw] max-h-full w-full lg:h-[100vh]"
          ref={videoRef}
          //poster={`${IMAGE_URL}/assets/images/posters/lyrics-poster.png`}
          // poster={
          //   window.innerWidth < 600
          //     ? `${IMAGE_URL}/assets/images/posters/lyrics-poster-mobile.png`
          //     : `${IMAGE_URL}/assets/images/posters/lyrics-poster.png`
          // }
          poster={bgPoster}
          onloadedmetadata={() => setShowPlayButton(true)}
        >
          <source
            src={`${IMAGE_URL}/video/lyrics/high/Lyrics%20AI.mp4`}
            type="video/mp4"
            media="all and (min-width: 640px)"
          />
          <source
            src={`${IMAGE_URL}/video/lyrics/high/Lyrics%20AI.webm`}
            type="video/webm"
            media="all and (min-width: 640px)"
          />
          <source
            src={`${IMAGE_URL}/video/lyrics/high/Lyrics%20AI(Mobile).mp4`}
            type="video/mp4"
            media="all and (max-width: 639px)"
          />
          <source
            src={`${IMAGE_URL}/video/lyrics/high/Lyrics%20AI(Mobile).webm`}
            type="video/webm"
            media="all and (max-width: 639px)"
          />
        </video>
      )}
      {network === "low" && (
        <video
          muted
          onEnded={onEnded}
          preload={isSafariBrowser ? "none" : ""}
          controls={false}
          className="max-w-full max-sm:min-h-[100vw] max-h-full w-full"
          ref={videoRef}
          poster={`${IMAGE_URL}/assets/images/posters/image-craft-poster.png`}
          onloadedmetadata={() => setShowPlayButton(true)}
        >
          <source
            src={`${IMAGE_URL}/video/lyrics/Lyrics-AI.mp4`}
            type="video/mp4"
            media="all and (min-width: 640px)"
          />
          <source
            src={`${IMAGE_URL}/video/lyrics/Lyrics-AI.webm`}
            type="video/webm"
            media="all and (min-width: 640px)"
          />
          <source
            src={`${IMAGE_URL}/video/lyrics/high/Lyrics%20AI(Mobile).mp4`}
            type="video/mp4"
            media="all and (max-width: 639px)"
          />
          <source
            src={`${IMAGE_URL}/video/lyrics/high/Lyrics%20AI(Mobile).webm`}
            type="video/webm"
            media="all and (max-width: 639px)"
          />
        </video>
      )}
      <div className="absolute right-4 bottom-8 flex gap-2 justify-center items-center">
        <button className={`opacity-80`} onClick={onVolumeHandler}>
          {muted ? (
            <SpeakerXMarkIcon className="w-6 h-6 fill-white" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6 fill-white" />
          )}
        </button>
        <button className={`opacity-55`} onClick={onClickPlayerHandler}>
          {showPlayButton ? (
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 107 106"
              className="w-10 h-10 fill-white"
            >
              <path
                d="M47.537 69.563 69.07 55.761c1.03-.662 1.546-1.583 1.546-2.76 0-1.178-.516-2.098-1.546-2.76L47.537 36.437c-1.104-.736-2.226-.791-3.367-.166-1.141.626-1.712 1.602-1.712 2.927v27.604c0 1.325.57 2.3 1.712 2.926 1.14.626 2.263.57 3.367-.166ZM53.5 97.167c-6.11 0-11.852-1.16-17.225-3.478-5.374-2.319-10.048-5.465-14.023-9.44-3.975-3.975-7.122-8.65-9.44-14.023C10.491 64.852 9.332 59.11 9.332 53c0-6.11 1.16-11.852 3.478-17.225 2.32-5.374 5.466-10.048 9.441-14.023 3.975-3.975 8.65-7.122 14.023-9.44C41.648 9.992 47.39 8.833 53.5 8.833c6.11 0 11.851 1.16 17.225 3.478 5.374 2.319 10.048 5.466 14.023 9.44 3.975 3.976 7.122 8.65 9.44 14.024 2.32 5.373 3.479 11.115 3.479 17.225 0 6.11-1.16 11.851-3.478 17.225-2.32 5.373-5.466 10.048-9.441 14.023-3.975 3.975-8.65 7.121-14.023 9.44-5.374 2.319-11.115 3.478-17.225 3.478Zm0-8.833c9.864 0 18.219-3.423 25.064-10.269 6.846-6.846 10.27-15.2 10.27-25.064s-3.424-18.22-10.27-25.065C71.72 21.09 63.364 17.667 53.5 17.667S35.28 21.09 28.435 27.937C21.59 34.781 18.167 43.136 18.167 53s3.422 18.218 10.268 25.064S43.636 88.334 53.5 88.334Z"
                fill="#fff"
              />
            </svg>
          ) : (
            <PauseCircleIcon className="w-10 h-10 fill-white" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {show ? (
          <HeroOverlap onReplay={onReplay} url={""} PageName="LyricGenius" />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
