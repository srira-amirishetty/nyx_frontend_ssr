"use client";
/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useState } from "react";
import "swiper/css";
import type { UploadDriveProps } from "./AnalysisLoading.types";
import Button from "@nyx-frontend/main/components/Button";
import { getUploadProfileService } from "@nyx-frontend/main/services/imageToVideo";
import { useQuery } from "@tanstack/react-query";
import classNames from "@nyx-frontend/main/utils/classNames";

const UploadProfile = ({
  onClose = () => {},
  onSelected = () => {},
  handleSystemButtonClick = () => {},
  systemUpload = (e: ChangeEvent<HTMLInputElement>) => {},
  handleDriveButtonClick = () => {},
  fileInputRef,
  selectedDriveImage
}: UploadDriveProps = {}) => {
  const onCloseEvent = () => {
    onClose();
  };

  const [driveImageClicked, setDriveImageClicked] = useState<boolean>(false);
  const [driveImageClickedIndex, setDriveImageClickedIndex] =
    useState<any>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ["drive-data"],
    queryFn: async () => {
      const res = await getUploadProfileService(localStorage.getItem("workspace_id") as string);
      return res;
    },
  });



  const driveImageSelected = (data: any, index: any) => {
    onSelected(data);
    setDriveImageClicked(true);
    setDriveImageClickedIndex(index);
  };

  return (
    <>
      <div className="fixed inset-0 m-auto bg-black/50 z-40"></div>
      <div className="fixed z-50 inset-0 m-auto flex justify-center items-end md:items-center">
        <div className="w-full md:w-1/2 rounded-lg bg-[#3B226F] py-10 px-4 md:px-10">
          <div className="flex flex-row w-full justify-end relative">
            <div className="flex flex-col w-full gap-2">
              <p className="text-white w-full text-base md:text-lg font-semibold">
                Update Profile Picture
              </p>
              <p className="text-white w-full text-base font-light">
                Creative Drive
              </p>
            </div>
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
          <div
            className={` flex flex-wrap gap-3 my-3 overflow-y-auto overflow-x-hidden ${
              isSuccess ? "h-[280px]" : "h-0"
            }`}
          >
            {data?.map((item: any, index: any) => (
              <div
                key={index}
                className={classNames(
                  `w-[155px] h-[155px] bg-[#3B226F] py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2`,
                  driveImageClicked && driveImageClickedIndex === index
                    ? "bg-[#5E32FF]"
                    : "",
                )}
                onClick={() => driveImageSelected(item, index)}
              >
                <img
                  className="w-[90px] md:w-[141px] h-[105px] rounded-lg"
                  src={item?.file_details?.signed_image_url}
                  alt="AI Generated Image"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 items-center justify-center mt-6">
            <Button
              className="w-full  shadow-nyx-yellow rounded-full disabled:bg-nyx-gray-1 disabled:text-black disabled:border-nyx-gray-1 disabled:hover:shadow-none disabled:cursor-not-allowed  font-semibold"
              onClick={handleDriveButtonClick}
              disabled={!selectedDriveImage}
              
            >
              Upload from Drive
            </Button>
            <Button
              className="w-full  shadow-nyx-yellow rounded-full font-semibold"
              onClick={handleSystemButtonClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="w-full h-full pointer-events-none text-white bg-gray-100 border-white mr-2 opacity-0 absolute"
                name="uploadProcess"
                accept=".png, .jpg, .webp"
                onChange={systemUpload}
              />
              Browse from System
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProfile;
