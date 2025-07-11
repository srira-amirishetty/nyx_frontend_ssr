"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { getAnalysisService, getAnalysisCompareService } from "@nyx-frontend/main/services/uploadService";
import type { AnalysisDataType, AnalysisProps } from "./AnalysisLoading.types";

const BottomSlide = memo(() => {
  const [swiper, setSwiper] = useState({});
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="flex items-center mb-4">
          <h2 className="text-white text-base md:text-xl font-bold">
            Analysing Status
          </h2>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              onClick={() => {
                // @ts-ignore
                swiper.slidePrev();
              }}
            >
              <path
                d="M17.8484 23.6389L9.42344 14.3056C9.32344 14.1944 9.25277 14.0741 9.21144 13.9444C9.16944 13.8148 9.14844 13.6759 9.14844 13.5278C9.14844 13.3796 9.16944 13.2407 9.21144 13.1111C9.25277 12.9815 9.32344 12.8611 9.42344 12.75L17.8484 3.38889C18.0818 3.12963 18.3734 3 18.7234 3C19.0734 3 19.3734 3.13889 19.6234 3.41667C19.8734 3.69444 19.9984 4.01852 19.9984 4.38889C19.9984 4.75926 19.8734 5.08333 19.6234 5.36111L12.2734 13.5278L19.6234 21.6944C19.8568 21.9537 19.9734 22.273 19.9734 22.6522C19.9734 23.0322 19.8484 23.3611 19.5984 23.6389C19.3484 23.9167 19.0568 24.0556 18.7234 24.0556C18.3901 24.0556 18.0984 23.9167 17.8484 23.6389Z"
                fill="#8297BD"
              />
            </svg>
            <h3 className="text-[#FFF]">{active}/4</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              onClick={() => {
                // @ts-ignore
                swiper?.slideNext();
              }}
            >
              <path
                d="M10.1516 4.36111L18.5766 13.6944C18.6766 13.8056 18.7472 13.9259 18.7886 14.0556C18.8306 14.1852 18.8516 14.3241 18.8516 14.4722C18.8516 14.6204 18.8306 14.7593 18.7886 14.8889C18.7472 15.0185 18.6766 15.1389 18.5766 15.25L10.1516 24.6111C9.91823 24.8704 9.62656 25 9.27656 25C8.92656 25 8.62656 24.8611 8.37656 24.5833C8.12656 24.3056 8.00156 23.9815 8.00156 23.6111C8.00156 23.2407 8.12656 22.9167 8.37656 22.6389L15.7266 14.4722L8.37656 6.30555C8.14323 6.0463 8.02656 5.72704 8.02656 5.34778C8.02656 4.96778 8.15156 4.63889 8.40156 4.36111C8.65156 4.08333 8.94323 3.94444 9.27656 3.94444C9.6099 3.94444 9.90156 4.08333 10.1516 4.36111Z"
                fill="#8297BD"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => {
            setActive(swiper.activeIndex + 1);
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          onSwiper={setSwiper}
        >
          <SwiperSlide>
            <p className="text-white text-sm md:text-base font-normal">
              AI engine is currently listening your track
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-white text-sm md:text-base font-normal">
              Extracting features from the audio
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-white text-sm md:text-base font-normal">
              Generating spectrogram image from the audio and processing to
              obtain embeddings
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-white text-sm md:text-base font-normal">
              Loading model for hit/flop prediction & calculating probabilities
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
});

BottomSlide.displayName = "BottomSlide";

const AnalysisLoading = (
  { onProgressComplete = () => { }, fileName, refId }: AnalysisProps = {
    fileName: undefined,
    refId: "",
  },
) => {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const timerID = useRef<ReturnType<typeof setTimeout>>(null);
  const [time, setTime] = useState(1000);
  const queryAnanlysis = useQuery({
    queryKey: ["analysis", refId],
    queryFn: async () => {
      if (refId) {
        const response = await getAnalysisCompareService(
          refId,
          Number(localStorage.getItem("workspace_id")),
        );
        localStorage.setItem("id", refId);
        return response;
      }

      return null;
    },
    select: (data: AnalysisDataType) => data?.nyx_upload_token,
  });

  const onCloseEvent = () => {
    if (timerID.current) clearTimeout(timerID.current);
    if (timer.current) clearTimeout(timer.current);
  };

  const circleUpdate = (value: number) => {
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

  const onEndHandler = () => {
    setProgress(100);
    circleUpdate(100);
    if (timerID.current) clearTimeout(timerID.current);
    onProgressComplete();
  };

  const resetToEighty = () => {
    setProgress(progress - 19);
    circleUpdate(progress - 19);
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      if (
        Object.keys(queryAnanlysis?.data?.parameters?.original?.key || {})
          .length
      ) {
        onEndHandler();
        queryAnanlysis.refetch();
        // onEndHandler();
        //  if(queryAnanlysis?.data?.struct_url && queryAnanlysis?.data?.struct_url !== null){
        //      onEndHandler();
        //  }else{
        //   queryAnanlysis.refetch();
        //  }
        //refetch upload token status ....when you get paramaters.original.key? close loader but cannot stop refetching until we find struct_url.
      } else if (
        queryAnanlysis?.data?.parameters?.original?.key &&
        queryAnanlysis?.data?.struct_url
      ) {
        onEndHandler();
      } else {
        if (progress < 99) {
          const max = Math.min(progress + 5, 99);
          setProgress(max);
          circleUpdate(max);
          setTime((old) => old + 500);
        } else {
          resetToEighty();
        }
        queryAnanlysis.refetch();
      }
    }, time);

    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, queryAnanlysis]);

  return (
    <>
      <div className="w-full h-[75%] rounded-lg bg-[#28134B]">
        <div className="w-full p-3">
          <h2 className="text-white text-xl md:text-3xl font-bold mb-2 w-full">
            Upload in progress...
          </h2>
          <p className="text-[#FFF] text-[12px] md:text-base font-thin">
            Audio File Uploaded{" "}
            <span className="text-white font-bold">{fileName}</span>
          </p>

          <div className="w-full relative flex justify-center items-center py-10">
            <div className="w-44 md:w-80 absolute">
              <svg
                id="svg"
                viewBox="0 0 200 200"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full -rotate-90"
              >
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
            <div className="rounded-full bg-[#000] w-[140px] h-[140px] md:w-[256px] md:h-[256px] flex relative justify-center items-center z-0 overflow-hidden">
              <img
                src="https://assets.nyx.today/uploading.gif"
                alt="loading"
                className="absolute inset-0 w-full h-full -z-10"
              />
              <span className="text-nyx-yellow font-bold text-base md:text-4xl relative z-10">
                {progress}%
              </span>
            </div>
          </div>
          {/* <BottomSlide />
          <div className="w-full"></div> */}
        </div>
      </div>
    </>
  );
};

export default AnalysisLoading;
