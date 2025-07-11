"use client";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { useContext, useEffect, useState } from "react";

function FileExplorer(props) {
  const { setModalConfig } = useContext(UseContextData);
  const [indexFile, setCurrentIndex] = useState(-1);

  const onSubmit = () => {
    props.onClose(props.data[indexFile]);
    setModalConfig(MODAL_RESET);
  };  
  return (
    <>
      <div className="flex justify-between pb-4">
        <p className="text-white font-[600] text-[20px]">Select file</p>
        <div
          className="cursor-pointer"
          onClick={() => setModalConfig(MODAL_RESET)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector8"
              d="M0.35 13.5029C0.583333 13.721 0.855555 13.8301 1.16667 13.8301C1.47778 13.8301 1.75 13.721 1.98333 13.5029L7 8.81305L12.0556 13.5392C12.263 13.7331 12.5287 13.824 12.8528 13.8119C13.1769 13.7998 13.4426 13.6968 13.65 13.5029C13.8833 13.2847 14 13.0303 14 12.7394C14 12.4486 13.8833 12.1941 13.65 11.9759L8.63333 7.28613L13.6889 2.55995C13.8963 2.36605 13.9935 2.11763 13.9806 1.81467C13.9676 1.51171 13.8574 1.26328 13.65 1.06938C13.4167 0.851253 13.1444 0.742188 12.8333 0.742188C12.5222 0.742188 12.25 0.851253 12.0167 1.06938L7 5.75921L1.94444 1.03303C1.73704 0.839134 1.4713 0.748246 1.14722 0.760365C0.823148 0.772483 0.557407 0.87549 0.35 1.06938C0.116667 1.28752 0 1.542 0 1.83284C0 2.12369 0.116667 2.37817 0.35 2.5963L5.36667 7.28613L0.311111 12.0123C0.103703 12.2062 0.00648092 12.4546 0.0194439 12.7576C0.0324068 13.0605 0.142593 13.309 0.35 13.5029Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap m-4 gap-3">
        {props.data.map((file, index) => (
          <div
            key={file.name}
            className={`hover:border-[#5E32FF] hover:border-2 ${index == indexFile && "bg-[#5E32FF]"}  md:w-[12rem] w-[7rem] h-[9rem] pl-3 rounded-sm pt-3  cursor-pointer`}
          >
            <div
              onClick={() => {
                setCurrentIndex(index);
              }}
              className="bg-[#0FF0FF] h-20 rounded-lg w-[7rem] md:w-[10rem] flex justify-center pt-5  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="43"
                height="42"
                viewBox="0 0 43 42"
                fill="none"
              >
                <path
                  d="M0 42V6C0 4.9 0.382765 3.95833 1.1483 3.175C1.91383 2.39167 2.83409 2 3.90909 2H25.4091C26.4841 2 27.4044 2.39167 28.1699 3.175C28.9354 3.95833 29.3182 4.9 29.3182 6V6.85C28.5364 7.21667 27.8197 7.66667 27.1682 8.2C26.5167 8.73333 25.9303 9.33333 25.4091 10V6H3.90909V30H25.4091V22C25.9303 22.6667 26.5167 23.2667 27.1682 23.8C27.8197 24.3333 28.5364 24.7833 29.3182 25.15V30C29.3182 31.1 28.9354 32.0417 28.1699 32.825C27.4044 33.6083 26.4841 34 25.4091 34H7.81818L0 42ZM7.81818 26H15.6364V22H7.81818V26ZM33.2273 22C31.5985 22 30.214 21.4167 29.0739 20.25C27.9337 19.0833 27.3636 17.6667 27.3636 16C27.3636 14.3333 27.9337 12.9167 29.0739 11.75C30.214 10.5833 31.5985 10 33.2273 10C33.5856 10 33.9277 10.0333 34.2534 10.1C34.5792 10.1667 34.8886 10.25 35.1818 10.35V0H43V4H39.0909V16C39.0909 17.6667 38.5208 19.0833 37.3807 20.25C36.2405 21.4167 34.8561 22 33.2273 22ZM7.81818 20H21.5V16H7.81818V20ZM7.81818 14H21.5V10H7.81818V14Z"
                  fill="black"
                />
              </svg>
            </div>
            <p className="text-white font-500 pt-1">{file.title}.txt</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center pb-2 gap-3">
        <ButtonElement
          onSubmit={() => setModalConfig(MODAL_RESET)}
          name="Cancel"
        ></ButtonElement>
        <ButtonElement name="Open File" onSubmit={onSubmit}></ButtonElement>
      </div>
    </>
  );
}

export default FileExplorer;
