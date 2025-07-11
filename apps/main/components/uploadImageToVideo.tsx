"use client";
/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useState } from "react";
import "swiper/css";
import type { UploadDriveProps } from "./AnalysisLoading.types";
import Button from "@nyx-frontend/main/components/Button";
import { getDriveImageServiceImageToVideo } from "@nyx-frontend/main/services/imageToVideo";
import { useQuery } from "@tanstack/react-query";
import classNames from "@nyx-frontend/main/utils/classNames";
import { admanagerSystemUpload } from "@nyx-frontend/main/services/admanagerServices";
import { getBrandCanvasAssets,getAssetImage } from "@nyx-frontend/main/services/asset";

const UploadImageToVideo = ({
  onClose = () => {},
  onSelected = () => {},
  handleSystemButtonClick = () => {},
  systemUpload = (e: ChangeEvent<HTMLInputElement>) => {},
  handleDriveButtonClick = () => {},
  fileInputRef,
}: UploadDriveProps = {}) => {
  const onCloseEvent = () => {
    onClose();
  };

  const [driveImageClicked, setDriveImageClicked] = useState<boolean>(false);
  const [driveImageClickedIndex, setDriveImageClickedIndex] =
    useState<any>(null);

    const {
      data,
      isSuccess,
      isPending,
      refetch: driveImageRefetch,
    } = useQuery({
      queryKey: ["drive-data-admanager"],
      queryFn: async () => {
        const res = await getAssetImage(
          localStorage.getItem("workspace_id"),
        );
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
        <div className="w-full md:w-[639px] rounded-lg bg-[#332270] py-8 px-5 ">
          <div className="flex flex-row w-full justify-end relative">
            <div className="flex flex-col w-full gap-2">
              <p className="text-white w-full text-base md:text-lg font-semibold">
              Upload your Creative
              </p>
              
            </div>
            <div >
            <button
              className="flex items-center gap-1 text-white hover:text-nyx-yellow"
              onClick={handleSystemButtonClick}
            >
              <input
                 ref={fileInputRef}
                type="file"
                className="w-full h-full pointer-events-none text-white bg-gray-100 border-white mr-2 opacity-0 absolute"
                name="uploadProcess"
                accept=".jpg, .jpeg, .png"
                onChange={systemUpload}
              />

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
            </button>
            </div>
            <button
              className=" absolute -top-4 -right-2"
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
            className={`grid grid-cols-4 gap-5 my-3 items-center justify-center overflow-y-auto overflow-x-hidden ${
                      isSuccess
                        ? "bg-[#23145A] rounded-md h-[300px] p-4"
                        : "bg-[#23145A] rounded-md h-[50px] px-4 pt-2"
                    }`}
          >
            {/* {data?.map((item: any, index: any) => (
              <div
                key={index}
                className={classNames(
                  `w-[120px] h-[120px]  py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2`,
                  driveImageClicked && driveImageClickedIndex === index
                    ? "bg-[#5E32FF]"
                    : "",
                )}
                onClick={() => driveImageSelected(item, index)}
              >
                <img
                  className="w-full h-full object-contain"
                  src={item?.image_details?.signed_img_url}
                  alt="AI Generated Image"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            ))} */}

<>
                {data?.data?.filter((item: any) => item.type === "Images").length >
                0 ? (
                  data
                    ?.data?.filter((item: any) => item.type === "Images")

                    .map((item: any, index: any) => {
                      const isSelected = index === driveImageClickedIndex;
                      return (
                        <div
                          key={index}
                          className={classNames(
                            `w-[120px] h-[120px] py-2 rounded-md flex flex-col items-center bg-transparent hover:border-[#5E32FF] border-transparent border-2 cursor-pointer p-2`,
                            {
                              "bg-[#5E32FF]": isSelected, // Apply blue background if selected
                              "bg-transparent": !isSelected,
                            },
                          )}
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
                      );
                    })
                ) : (
                  <div className="text-center text-white">
                    No images available
                  </div>
                )}
              </>

            {isPending && 
            <>
            <div className="text-center text-white w-full col-span-4">
                    No images available
                  </div>
            </>
            }
          </div>

          <div className="flex flex-row gap-4 items-center justify-center mt-6">
          <Button
              className=" w-[136px] rounded-full  text-nyx-yellow hover:shadow-none font-semibold"
              onClick={onCloseEvent}
              
            >
              
              Back
            </Button>
            <Button
              className="w-[136px] rounded-full  text-nyx-yellow hover:shadow-none font-semibold disabled:bg-nyx-gray-1  disabled:border-nyx-gray-1 disabled:text-black  disabled:cursor-not-allowed"
              onClick={handleDriveButtonClick}
              disabled={driveImageClicked==false}
            >
              Select
            </Button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImageToVideo;
