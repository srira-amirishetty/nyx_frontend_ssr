/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import clsx from "clsx";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Modal from "react-modal";
import Button from "@nyx-frontend/main/components/Button";
import { addImageStyle } from "@nyx-frontend/main/utils/modalstyles";
import FileComp from "./FileComp";
import { driveImage } from "@nyx-frontend/main/services/image2imageService";
import { useQuery } from "@tanstack/react-query";

const upload = IMAGE_URL + "/assets/textvideo/upArrow.svg";
function UploadButton({
  id,
  setUploadedFile,
  disabled,
  uploadedFile,
  setUploaded,
  uploaded,
}) {
  // const [uploaded, setUploaded] = useState(null);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [notSupported, setNotSupported] = useState(false);
  const [selectedDriveImage, setSelectedDriveImage] = useState(null);
  const [driveImageClicked, setDriveImageClicked] = useState(false);
  const [driveImageClickedIndex, setDriveImageClickedIndex] = useState(null);

  const inputId = `file-upload-button-${id}`;

  const openProductPopup = () => {
    if (disabled) return;
    setNotSupported(false);
    setAddProductPopup(true);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["drive-data-img-img"],
    queryFn: async () => {
      const res = await driveImage(localStorage.getItem("workspace_id"));
      return res;
    },
  });

  const closeProductPopup = () => {
    setAddProductPopup(false);
    setSelectedDriveImage(null);
    setDriveImageClicked(false);
    setDriveImageClickedIndex(null);
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
    setUploaded(URL.createObjectURL(file));
    setAddProductPopup(false);
    setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploaded(null);
    setUploadedFile(null);
    setSelectedDriveImage(null);
    setDriveImageClicked(false);
    setDriveImageClickedIndex(null);
  };

  const driveImageSelected = (data, index) => {
    onSelected(data);
    setDriveImageClicked(true);
    setDriveImageClickedIndex(index);
  };

  const onSelected = (newSelectedFile) => {
    setSelectedDriveImage(newSelectedFile);
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
    setUploaded(fileDropped);
    setUploadedFile(fileDropped);
    setNotSupported(false);
  };

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  const driveUpload = () => {
    setUploaded(selectedDriveImage?.file_details?.signed_image_url);
    setUploadedFile(selectedDriveImage?.file_details?.signed_image_url);
    setAddProductPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {uploadedFile ? (
        <>
          <div className="relative flex items-center justify-center mt-1 px-5">
            <img src={uploaded} alt="Uploaded" className="h-[360px] w-full" />
            <button
              className="absolute top-0 right-5 bg-black text-white rounded-full p-1 m-2 focus:outline-none"
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
          <div className="flex flex-col w-full justify-center items-center gap-5 px-5">
            <div
              onDrop={handleOnDrop}
              onDragOver={handleOnDragOver}
              className="relative h-[360px] w-full rounded-md m-auto bg-gradient-to-r mt-1 from-gray-300/40 to-gray-500/25 flex justify-evenly flex-col items-center z-0  gap-3 cursor-default"
            >
              <div className="flex flex-col items-center">
                <div>
                  <img
                    src={upload}
                    alt="upload-audio"
                    width={"50px"}
                    height={"50px"}
                  />
                </div>
                <div className="text-[#FFFFFF] z-50 text-[14px] mt-5 font-semibold text-center leading-[17px]">
                  Drag & drop your Image here
                </div>
              </div>
              <div className="absolute -translate-y-2 text-white">or</div>
              <div className="text-center">
                <Button
                  className={clsx({
                    ["rounded-full relative -top-[14px] w-[120px]"]: true,
                    ["bg-nyx-yellow text-black"]: !disabled,
                    ["bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent  border-none"]:
                      disabled,
                  })}
                  onClick={openProductPopup}
                >
                  Upload
                </Button>
                <div className="text-white text-xs text-center font-light">
                  <span className="block">Supports: JPG, PNG, or WEBP</span>
                  <span className="block">File Size Limit: 20MB</span>
                  <span className="block">
                    Images over 4K resolution will be automatically downsized
                  </span>
                </div>
              </div>
              {notSupported && (
                <span className="text-[#E26971] mt-2 ">
                  File not supported!
                </span>
              )}
            </div>
          </div>
        </>
      )}
      {addProductPopup ? (
        <Modal
          isOpen={addProductPopup}
          style={addImageStyle}
          onRequestClose={closeProductPopup}
        >
          <div>
            <div className="flex flex-row w-full justify-end relative">
              <div className=" cursor-pointer" onClick={closeProductPopup}>
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
            <div className="flex justify-between mt-2">
              <div className="text-xl font-bold text-[#FFFFFF]">
                <div className=" leading-[27px]  font-bold text-[22px]">
                  Upload your Creative
                </div>
              </div>

              <div>
                <label htmlFor={inputId}>
                  <div className="flex flex-row gap-1 justify-center items-center text-white cursor-pointer hover:text-nyx-yellow">
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.164062 0.332031H14.8307V2.9987H13.4974V1.66536H1.4974V10.332H7.4974V11.6654H0.164062V0.332031ZM8.83073 4.33203H15.4974V13.6654H8.83073V4.33203ZM10.1641 5.66536V12.332H14.1641V5.66536H10.1641ZM11.4961 10.3307H12.8321V11.6667H11.4961V10.3307ZM2.83073 12.332H7.4974V13.6654H2.83073V12.332Z"
                        fill="currentColor"
                      />
                    </svg>

                    <p className="underline text-[12px] leading-[17px] font-medium min-w-[140px] text-left">
                      Browse from System
                    </p>
                  </div>
                </label>

                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.svg,.webp"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between w-full">
              {isSuccess ? (
                <>
                  {" "}
                  <div
                    className={`grid grid-cols-4 gap-5 my-3 items-center justify-center overflow-y-auto overflow-x-hidden ${
                      isSuccess
                        ? "bg-[#23145A] rounded-md h-[300px] p-4"
                        : "bg-[#23145A] rounded-md h-[50px] px-4 pt-2"
                    }`}
                  >
                    {Array.isArray(data) && data ? (
                      <>
                        {data?.map((item, index) => (
                          <div
                            key={index}
                            className={`w-[120px] h-[120px]  py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2 ${
                              driveImageClicked &&
                              driveImageClickedIndex === index
                                ? "bg-[#5E32FF]"
                                : ""
                            } 
                    `}
                            onClick={() => driveImageSelected(item, index)}
                          >
                            <img
                              className="w-full h-full object-contain"
                              src={item?.file_details?.signed_image_url}
                              alt="AI Generated Image"
                              decoding="async"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-[14] justify-center flex items-center text-nyx-yellow col-span-4">
                        No images in assets, upload some to use NYX drive.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div
                    className={` flex flex-wrap gap-3 h-10 my-3 overflow-y-auto overflow-x-hidden `}
                  >
                    <p className="text-[14] justify-center flex items-center text-nyx-yellow">
                      No images in assets, upload some to use NYX drive.
                    </p>
                  </div>
                </>
              )}

              <div className="flex flex-row items-center justify-center gap-3 mt-2">

              <Button
                  className=" w-[136px] rounded-full font-semibold text-nyx-yellow hover:shadow-none disabled:cursor-not-allowed  disabled:text-black disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:shadow-none"
                 
                  onClick={closeProductPopup}
                >
                  Back
                </Button>
                <Button
                  className=" w-[136px] rounded-full font-semibold text-nyx-yellow hover:shadow-none disabled:cursor-not-allowed  disabled:text-black disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:shadow-none"
                  disabled={selectedDriveImage === null}
                  onClick={driveUpload}
                >
                  Select
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
