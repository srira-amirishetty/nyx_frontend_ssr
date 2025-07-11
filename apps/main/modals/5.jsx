"use client"
import { useContext } from "react";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";

function ShareModal() {
  const { setModal } = useContext(UseContextData);
  return (
    <>
      <div className="pt-5">
        <div className="flex justify-between">
          <p className="text-white font-bold pl-4 ">Share Link</p>
          <div
            className="pr-3 cursor-pointer"
            onClick={() => {
              setModal(MODAL_RESET);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#FFFFFF"
                d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
              />
            </svg>
          </div>
        </div>

        <div className="m-auto w-[96%] mt-3">
          <input
            className="bg-transparent outline-none w-full  border border-blue py-3 pl-2 text-sm text-white rounded-md placeholder-blue"
            placeholder="Link *"
          ></input>

          <div className="flex justify-center">
            <ButtonElement
              name="Share"
              width="mt-4 w-full md:w-[20%]"
            ></ButtonElement>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareModal;
