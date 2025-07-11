/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Modal from "react-modal";
import Button from "@nyx-frontend/main/components/Button";
import { addImageStyle } from "@nyx-frontend/main/utils/modalstyles";
import FileComp from "./FileComp";

const upload = IMAGE_URL + "/assets/textvideo/upArrow.svg";
function UploadButton({ id ,setUploadedFile}) {
  const [uploaded, setUploaded] = useState(null);
  const [addProductPopup, setAddProductPopup] = useState(false);

  const inputId = `file-upload-button-${id}`;

  const handleAddProductModal = () => {
    setAddProductPopup(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploaded(file);
    setAddProductPopup(false);
    setUploadedFile(file)
  };

  const handleRemoveFile = () => {
    setUploaded(null);
    setUploadedFile(null)
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {uploaded ? (
        <>
          <div className="relative flex items-center justify-center mt-10">
            <img
              src={URL.createObjectURL(uploaded)}
              alt="Uploaded"
              className="w-full h-[361px] "
            />
            <button
              className="absolute top-0 right-8 bg-black text-white rounded-full p-1 m-2 focus:outline-none"
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
              className="h-[361px] w-full rounded-md m-auto bg-gradient-to-r mt-10 from-gray-300/40 to-gray-500/25 flex justify-center flex-col items-center z-0  gap-3 cursor-pointer "
              onClick={() => setAddProductPopup(true)}
            >
              <div>
                <img
                  src={upload}
                  alt="upload-audio"
                  width={"90px"}
                  height={"90px"}
                />
              </div>
              <div className="text-[#FFFFFF] z-50 text-[14px]  font-semibold text-center leading-[17px]">
                Drop your Creative here or click to browse
              </div>
            </div>
          </div>
        </>
      )}
      {addProductPopup ? (
        <Modal
          isOpen={addProductPopup}
          style={addImageStyle}
          onRequestClose={handleAddProductModal}
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
                onClick={handleAddProductModal}
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
              <div className="w-full flex flex-row mb-10 mt-2 flex-wrap justify-between">
                <FileComp type={1} />
                <FileComp />
                <FileComp />
                <FileComp />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor={inputId}>
                  <div className="w-full border border-[#FFCB54] rounded-[12px] text-center cursor-pointer p-2 text-white  hover:shadow-glow">
                    Browse from System
                  </div>
                </label>

                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  accept=".png, .jpg, .jpeg, .svg, .webp"
                  onChange={handleFileUpload}
                />
                <Button className=" rounded-[12px] bg-[#FFCB54] text-black">
                  Upload from Drive
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default UploadButton;
