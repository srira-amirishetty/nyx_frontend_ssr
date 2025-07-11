"use client";
import React, { useContext } from "react";
import { MessagePopupContext } from "../../hooks/MessagePopupContext";
import Modal from "react-modal";
import { deletePopupStyle } from "@nyx-frontend/main/utils/modalstyles";

function MessagePopup() {
  const {
    messageType,
    setMessageType,
    isOpenFlag,
    setIsOpenFlag,
    messageContent,
    setMessageContent,
    messageTitle,
    setMessageTitle,
    handleRequsetClose,
  } = useContext(MessagePopupContext);

  let className = "";

  if (messageType == "error") {
    className += " text-red ";
  }

  const modalStyle = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "10px",
      transform: "translate(-50%, -50%)",
      zIndex: "99",
      height: "auto",
      width: "40%",
      backgroundColor: "#3B226F",
      borderRadius: "10px",
      borderColor: "transparent",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "1000",
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpenFlag}
        style={modalStyle}
        onRequestClose={handleRequsetClose}
        ariaHideApp={false}
        className={`${className}`}
        overlayClassName=""
      >
        <div className="p-5">
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">
              {messageTitle}
            </div>
            <div
              className="text-3xl font-bold text-[#FFFFFF] -mt-1 cursor-pointer"
              onClick={handleRequsetClose}
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
          <div className="text-white font-normal my-3">{messageContent}</div>
          <div className="w-full flex gap-4 my-6 justify-center items-center">
            <button
              onClick={handleRequsetClose}
              className="nyx-button border border-amber-400 text-white hover:text-black hover:bg-amber-300 hover:shadow-none text-base font-normal px-5 py-2 text-center rounded-full w-40"
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MessagePopup;
