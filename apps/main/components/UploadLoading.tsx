"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { postUploadFileService } from "@nyx-frontend/main/services/uploadService";
import { toast } from "react-toastify";

type Props = {
  onClose?: () => void;
  onProgressComplete?: (states: Object) => void;
  onError?: (states: Object) => void;
  file: File | null;
  refID: string;
  track: string;
  genre: string;
  type?: "ORIGINAL" | "REFERENCE";
};

const UploadLoading = (
  {
    onClose = () => {},
    onProgressComplete = () => {},
    onError = () => {},
    file,
    refID,
    track,
    genre,
    type,
  }: Props = {
    file: null,
    refID: "",
    track: "",
    genre: "",
    type: "REFERENCE",
  }
) => {
  const [progress, setProgress] = useState(0);
  // "I want to make an API call only once and then set a value to 'false.'"
  const [dSaved, setDSaved] = useState(false);
  const queryFileQuery = useQuery({
    queryKey: ["upload-file", file, track, genre, type],
    retry: false,
    queryFn: async () => {
      const data = new FormData();
      // @ts-ignore
      data.append("token", file);
      data.append("trackType", track);
      data.append("songName", file?.name || "");
      data.append("genre", genre);
      data.append("uploadType", `${type}`);
      data.append("processType", "Probability")
      data.append("referenceId", refID ?? "");
      data.append("workspace_id", String(localStorage.getItem("workspace_id")));
      // if here check the value is false then execute this code 
      return file && !dSaved
        ? postUploadFileService(data, {
            onUploadProgress: (progressEvent: any) => {
              const { loaded, total } = progressEvent;
              let percent = Math.floor((loaded * 100) / total);
              if (percent < 100) {
                setProgress(percent);
                circleUpdate(percent);
                // here state value is true and progres  and circleUpdate is update
                setDSaved(true)
              }
            },
          })
        : null;
    },
  });

  const circleRef = useRef<SVGCircleElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const timerID = useRef<ReturnType<typeof setTimeout>>(null);
  const [time, setTime] = useState(100);
  const onCloseEvent = () => {
    if (timerID.current) clearTimeout(timerID.current);
    if (timer.current) clearTimeout(timer.current);
    onClose();
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

  useEffect(() => {
    if (queryFileQuery.isSuccess) {
      setProgress(100);
      circleUpdate(100);
      onProgressComplete({ ...queryFileQuery.data, file: file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFileQuery.isSuccess]);

  useEffect(() => {
    timerID.current = setTimeout(() => {
        if (progress < 100) {
          setProgress(progress + 100);
          circleUpdate(progress + 100);
          setTime((old) => old + 100);
      }
    }, time);

    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  useEffect(() => {
    if (queryFileQuery.isError) {
      onError(queryFileQuery.error);
      toast.error("Oops! " + queryFileQuery.error.message);
      onCloseEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFileQuery.isError]);

  return (
    <>
      <div className="fixed inset-0 m-auto bg-black/50 z-40"></div>
      <div className="fixed z-50 inset-0 m-auto flex justify-center items-end md:items-center">
        <div className="w-full md:w-3/4 rounded-lg bg-[#3B226F] py-10 px-4 md:px-10">
          <div className="flex flex-row w-full justify-end relative">
            <button
              className="px-2 py-1 absolute -top-4 -right-4"
              onClick={onCloseEvent}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M0.35 13.65C0.583333 13.8833 0.855555 14 1.16667 14C1.47778 14 1.75 13.8833 1.98333 13.65L7 8.63333L12.0556 13.6889C12.263 13.8963 12.5287 13.9935 12.8528 13.9806C13.1769 13.9676 13.4426 13.8574 13.65 13.65C13.8833 13.4167 14 13.1444 14 12.8333C14 12.5222 13.8833 12.25 13.65 12.0167L8.63333 7L13.6889 1.94444C13.8963 1.73704 13.9935 1.4713 13.9806 1.14722C13.9676 0.823148 13.8574 0.557407 13.65 0.35C13.4167 0.116667 13.1444 0 12.8333 0C12.5222 0 12.25 0.116667 12.0167 0.35L7 5.36667L1.94444 0.311111C1.73704 0.103703 1.4713 0.00648092 1.14722 0.0194439C0.823148 0.0324068 0.557407 0.142593 0.35 0.35C0.116667 0.583333 0 0.855555 0 1.16667C0 1.47778 0.116667 1.75 0.35 1.98333L5.36667 7L0.311111 12.0556C0.103703 12.263 0.00648092 12.5287 0.0194439 12.8528C0.0324068 13.1769 0.142593 13.4426 0.35 13.65Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="w-full">
            <h2 className="text-white text-xl md:text-3xl font-bold mb-2 w-full">
              Upload in progress...
            </h2>
            <p className="text-white text-sm md:text-base font-normal">
              Audio File Uploaded{" "}
              <span className="text-nyx-blue font-bold">{file?.name}</span>
            </p>
          </div>
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
          <div className="flex flex-row w-full">
            <div className="flex">
              <h4 className="text-white text-base md:text-xl font-bold mb-4">
                Mastering Tips & Tracks
              </h4>
            </div>
          </div>

          <div className="flex flex-row w-full">
            <div className="flex">
              <p className="text-white text-sm md:text-base font-normal">
                Validating File format & Evaluating File Size
                <br />
                Anticipate an approximate 1 min for uploading and analysing your
                song.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadLoading;