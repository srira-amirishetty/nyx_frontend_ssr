"use client";
import React from "react";

type Props = {
  onClose?: () => void;
};

export default function SecondUpload({ onClose = () => {} }: Props = {}) {
  const onCloseEvent = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 m-auto bg-black/50 z-40"></div>
      <div className="fixed top-10 z-50 inset-x-0 mx-auto w-3/4 h-max rounded-3xl bg-[#3B226F] py-10 px-10 gap-5 flex justify-center flex-col items-center">
        <div className="flex flex-row w-full justify-end">
          <button className="px-2 py-1" onClick={onCloseEvent}>
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

        <div className="flex flex-row w-full">
          <h2 className="text-[#FFF] font-[700]">Mastering in progress...</h2>
          <p className="text-[#FFF] font-[400]">
            Audio File Uploaded{" "}
            <span className="text-[#00D8D8] font-[400]">MySong2.mp3</span>
          </p>
        </div>
        <div className="w-full h-max flex justify-center items-center ">
          <div className="p-4 rounded-full bg-[#000] w-[160px] h-[160px] mt-4 flex justify-center items-center border-[10px] border-yellow-400">
            <span className="text-[#FFCB54] font-[700] text-4xl">82%</span>
          </div>
        </div>
        <div className="fles flex-row w-full">
          <div className="flex">
            <h2 className="text-[#FFF] font-[700]">Mastering Tips & Tracks</h2>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M17.8484 23.6389L9.42344 14.3056C9.32344 14.1944 9.25277 14.0741 9.21144 13.9444C9.16944 13.8148 9.14844 13.6759 9.14844 13.5278C9.14844 13.3796 9.16944 13.2407 9.21144 13.1111C9.25277 12.9815 9.32344 12.8611 9.42344 12.75L17.8484 3.38889C18.0818 3.12963 18.3734 3 18.7234 3C19.0734 3 19.3734 3.13889 19.6234 3.41667C19.8734 3.69444 19.9984 4.01852 19.9984 4.38889C19.9984 4.75926 19.8734 5.08333 19.6234 5.36111L12.2734 13.5278L19.6234 21.6944C19.8568 21.9537 19.9734 22.273 19.9734 22.6522C19.9734 23.0322 19.8484 23.3611 19.5984 23.6389C19.3484 23.9167 19.0568 24.0556 18.7234 24.0556C18.3901 24.0556 18.0984 23.9167 17.8484 23.6389Z"
                  fill="#8297BD"
                />
              </svg>
            </span>
            <h3 className="text-[#FFF] font-[400]">1/4</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M10.1516 4.36111L18.5766 13.6944C18.6766 13.8056 18.7472 13.9259 18.7886 14.0556C18.8306 14.1852 18.8516 14.3241 18.8516 14.4722C18.8516 14.6204 18.8306 14.7593 18.7886 14.8889C18.7472 15.0185 18.6766 15.1389 18.5766 15.25L10.1516 24.6111C9.91823 24.8704 9.62656 25 9.27656 25C8.92656 25 8.62656 24.8611 8.37656 24.5833C8.12656 24.3056 8.00156 23.9815 8.00156 23.6111C8.00156 23.2407 8.12656 22.9167 8.37656 22.6389L15.7266 14.4722L8.37656 6.30555C8.14323 6.0463 8.02656 5.72704 8.02656 5.34778C8.02656 4.96778 8.15156 4.63889 8.40156 4.36111C8.65156 4.08333 8.94323 3.94444 9.27656 3.94444C9.6099 3.94444 9.90156 4.08333 10.1516 4.36111Z"
                fill="#8297BD"
              />
            </svg>
          </div>
        </div>
        <div className="fles flex-row w-full">
          <div className="flex">
            <p className="text-[#FFF] font-[400]">
              Validating File format & Evaluating File Size
              <br />
              Anticipate an approximate 1 min for uploading and analysing your
              song.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
