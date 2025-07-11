/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import clsx from "clsx";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Modal from "react-modal";
import Button from "@nyx-frontend/main/components/Button";
import { addImageStyle } from "@nyx-frontend/main/utils/modalstyles";
import FileComp from "./FileComp";

const upload = IMAGE_URL + "/assets/textvideo/upArrow.svg";
function UploadButton2({ id, setUploadedFile, disabled, uploadedFile }) {
  const [uploaded, setUploaded] = useState(null);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const[notSupported,setNotSupported]=useState(false);

  const inputId = `file-upload-button-${id}`;

  const openProductPopup = () => {
    if (disabled) return;
    setNotSupported(false)
    setAddProductPopup(true);
  }

  const closeProductPopup = () => {
    setAddProductPopup(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  const allowedExtensions = ["png", "jpg", "jpeg", "svg", "webp"];
  const extension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    // Invalid file extension
    setNotSupported(true);
    setAddProductPopup(false);
    return;
  }

  // File extension is valid
  setUploaded(file);
  setAddProductPopup(false);
  setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploaded(null);
    setUploadedFile(null)
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items.length > 1) return;
    const fileDropped = event.dataTransfer.items[0].getAsFile();
    const allowedExtensions = ["png", "jpg", "jpeg", "svg", "webp"];
    const extension = fileDropped.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      // Invalid file extension
      setNotSupported(true);
      
      return;
    }
    console.log(fileDropped)
    setUploaded(fileDropped);
    setUploadedFile(fileDropped);
    setNotSupported(false);
  }

  const handleOnDragOver = (event) => {
    event.preventDefault();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {uploadedFile ? (
        <>
          <div className="relative flex items-center justify-center mt-1">
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Uploaded"
              className="w-[434px] h-auto"
            />
            <button
              className="absolute top-0 right-0 bg-black text-white rounded-full p-1 m-2 focus:outline-none"
              onClick={handleRemoveFile}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full justify-center items-center gap-5">
            <div
              onDrop={handleOnDrop}
              onDragOver={handleOnDragOver}
              className="relative h-[288px] w-[434px] rounded-md m-auto bg-gradient-to-r mt-1 from-gray-300/40 to-gray-500/25 flex justify-evenly flex-col items-center z-0  gap-3 cursor-default"
            >
              <div className="flex flex-col items-center">
                <div onClick={openProductPopup} className=" cursor-pointer">
                  <img
                    src={upload}
                    alt="upload-audio"
                    width={"50px"}
                    height={"50px"}
                  />
                </div>
                <div className="text-[#FFFFFF] z-50 text-[14px] mt-5 font-semibold text-center leading-[17px]">
                  Drag & drop your Image here or click to browse
                </div>
              </div>
              
              {/* <div className="text-center">
                <Button
                  className={clsx({
                    ["rounded-full relative -top-[14px] w-[120px]"]: true,
                    ["bg-nyx-yellow text-black"]: !disabled,
                    [`bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent  border-none`]: disabled
                  })}
                  
                >
                  Upload
                </Button>
                
              </div> */}
              {notSupported && <span className="text-[#E26971] mt-2 ">File not supported!</span>}
            </div>
          </div>
          
        </>
      )}
      {addProductPopup ? (
        <Modal
          isOpen={addProductPopup}
          style={addImageStyle}
          onRequestClose={closeProductPopup}
          ariaHideApp={false}
        >
          <div>
            <div className="flex justify-between mt-5">
              <div className="text-xl font-bold text-[#FFFFFF]">
                <div className=" leading-[27px]  font-bold text-[22px]">
                  Upload file
                </div>
                <div className=" leading-[27px] font-normal text-[14px]">
                  Creative Drive
                </div>
              </div>

              <div
                className="pr-3 cursor-pointer"
                onClick={closeProductPopup}
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
            <div className="flex flex-col justify-between w-full">
              <div className="mb-10"></div>
              {/* <div className="flex flex-col gap-3">
              <Button className="w-full rounded-full  text-nyx-yellow hover:shadow-none font-semibold disabled:bg-nyx-gray-1  disabled:border-nyx-gray-1 disabled:text-black  disabled:cursor-not-allowed">
                Upload from drive
                </Button>

                <label htmlFor={inputId}>
                  <Button className="w-full rounded-full  text-nyx-yellow hover:shadow-none font-semibold">
                    Browse from System
                  </Button>
                

                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.svg,.webp"
                  onChange={handleFileUpload}
                />
                </label>
              </div> */}
              <div className="flex flex-col gap-3">
                

                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.svg,image/webp"
                  onChange={handleFileUpload}
                />
                <Button className="w-full rounded-full  text-nyx-yellow hover:shadow-none font-semibold disabled:bg-nyx-gray-1  disabled:border-nyx-gray-1 disabled:text-black  disabled:cursor-not-allowed "
                disabled={true} >
                Upload from drive
                  
                </Button>

                <label htmlFor={inputId}>
                  <div className="w-full border border-[#FFCB54] rounded-full font-semibold text-center cursor-pointer p-2 text-nyx-yellow hover:bg-nyx-yellow hover:text-black focus:shadow-glow">
                    Browse from System
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default UploadButton2;
