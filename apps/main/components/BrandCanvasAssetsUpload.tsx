/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useContext } from "react";
import "swiper/css";
import type { UploadDriveBrandCanvasProps } from "./AnalysisLoading.types";
import Button from "@nyx-frontend/main/components/Button";
import { getBrandCanvasAssets } from "@nyx-frontend/main/services/asset";
import { useQuery, useMutation } from "@tanstack/react-query";
import classNames from "@nyx-frontend/main/utils/classNames";
import { admanagerSystemUpload } from "@nyx-frontend/main/services/admanagerServices";
import { nanoid } from "nanoid";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";

export const generateThumbnail = (
  videoUrl: string,
  timeInSeconds: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    video.crossOrigin = "anonymous";
    video.src = videoUrl;

    video.addEventListener("loadeddata", () => {
      video.currentTime = timeInSeconds;
    });

    video.addEventListener("seeked", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        // Draw the video frame on the canvas
        //@ts-ignore
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL("image/png");

        // Convert base64 data URL to Blob
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

        const arrayBuffer = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          arrayBuffer[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: mimeString });

        // Create a File object from the Blob
        const file = new File([blob], "thumbnail.png", { type: mimeString });
        resolve(file);
      } else {
        reject(new Error("Invalid video dimensions"));
      }
    });

    video.addEventListener("error", (error) => {
      reject(error);
    });
  });
};

const BrandCanvasAssetsUpload = ({
  onClose = () => {},
  handleSystemButtonClick = () => {},
  fileInputRef,
  uploadType,
  driveClickedArray,
  setDriveClickedArray,
  driveVideoClickedArray,
  setDriveVideoClickedArray,
  targetGroup,
}: UploadDriveBrandCanvasProps = {}) => {
  const { displayMessagePopup } = useContext(MessagePopupContext);

  const onCloseEvent = () => {
    onClose();
  };

  const {
    data,
    isSuccess,
    isPending: driveDataPending,
    refetch: driveDataRefetch,
  } = useQuery({
    queryKey: ["drive-data23"],
    queryFn: async () => {
      const res = await getBrandCanvasAssets(
        localStorage.getItem("workspace_id")
      );
      return res;
    },
  });
  const mutateUploadfromSyetem = useMutation({
    mutationKey: ["upload-system"],
    mutationFn: admanagerSystemUpload,
  });

  const getAcceptType = () => {
    switch (uploadType) {
      case "image":
        return "image/*";
      case "audio":
        return "audio/*";
      case "video":
        return "video/*";
      default:
        return "";
    }
  };

  const isEqual = (a: any, b: any) => {
    return (
      a.name === b.name &&
      a.type === b.type &&
      a.signed_image_url === b.signed_image_url
    );
  };

  const isEqualVideo = (a: any, b: any) => {
    return (
      a.name === b.name &&
      a.type === b.type &&
      a.signed_video_url === b.signed_video_url
    );
  };

  const driveFileSelected = async (data: any, index: any) => {
    if (uploadType == "image") {
      setDriveClickedArray((clickedData: any) => {
        const newItem = {
          id: nanoid(),
          targetGroup: targetGroup,
          file_id: data?.file_id,
          name: data?.name,
          type: "images",
          signed_image_url: data?.file_details?.signed_image_url,
        };

        if (clickedData?.some((item: any) => isEqual(item, newItem))) {
          return clickedData.filter((item: any) => !isEqual(item, newItem));
        } else {
          return [...clickedData, newItem];
        }
      });
    } else if (uploadType == "video") {
      const videoUrl = data?.file_details?.signed_video_url;

      setDriveVideoClickedArray((clickedData: any) => {
        const newItem = {
          id: nanoid(),
          targetGroup: targetGroup,
          file_id: data?.file_id,
          name: data?.name,
          type: "videos",
          signed_video_url: videoUrl,
        };

        if (clickedData.some((item: any) => isEqualVideo(item, newItem))) {
          return clickedData.filter(
            (item: any) => !isEqualVideo(item, newItem)
          );
        } else {
          return [...clickedData, newItem];
        }
      });
    }
  };

  const systemUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mediaFile = event.target.files?.[0];

    if (!mediaFile) {
      console.error("No file selected.");
      return;
    }

    const workspaceId = localStorage.getItem("workspace_id");

    if (!workspaceId) {
      console.error("Workspace ID not found.");
      return;
    }

    const formData = new FormData();
    formData.append("type", "admanager");
    formData.append("workspace_id", workspaceId);
    formData.append("file", mediaFile);

    mutateUploadfromSyetem.mutate(formData, {
      onSuccess: (response: any) => {
        console.log(response);
        driveDataRefetch();
      },
      onError: (res: any) => {
        console.log(res);
      },
    });
  };

  return (
    <>
      <div className="fixed inset-0 m-auto bg-black/50 z-40"></div>
      <div className="fixed z-50 inset-0 m-auto flex justify-center items-end md:items-center">
        <div className="w-full md:w-[639px] rounded-lg bg-[#332270] py-8 px-5">
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

          <div className="w-full flex justify-between">
            <div className="text-white w-full text-base md:text-lg font-semibold">
              Upload your Creative
            </div>

            <button
              className="flex items-center gap-1 text-white hover:text-nyx-yellow"
              onClick={handleSystemButtonClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="w-full h-full pointer-events-none text-white bg-gray-100 border-white mr-2 opacity-0 absolute"
                name="uploadProcess"
                accept={getAcceptType()}
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

          {driveDataPending ? (
            <svg
              width="25"
              height="25"
              className="inline text-gray-200 text-center animate-spin dark:text-transparent"
              viewBox="0 0 25 25"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z" />
            </svg>
          ) : null}

          <div
            className={` flex flex-wrap gap-3 my-3 overflow-y-auto overflow-x-hidden ${
              isSuccess
                ? "bg-[#23145A] rounded-md h-[300px] p-4"
                : "bg-[#23145A] rounded-md h-[50px] px-4 pt-2"
            }`}
          >
            {uploadType === "image" && (
              <>
                {data?.filter((item: any) => item.type === "Images").length >
                0 ? (
                  data
                    ?.filter((item: any) => item.type === "Images")
                    .reverse()
                    .map((item: any, index: any) => {
                      const isSelectedImage = driveClickedArray.some(
                        (clickedItem: any) =>
                          clickedItem?.signed_image_url ===
                          item?.file_details?.signed_image_url
                      );
                      return (
                        <div
                          key={index}
                          className={classNames(
                            `w-[120px] h-[120px] py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2 cursor-pointer p-2`,
                            {
                              "bg-[#5E32FF]": isSelectedImage,
                              "bg-transparent": !isSelectedImage,
                            }
                          )}
                          onClick={() => driveFileSelected(item, index)}
                        >
                          <img
                            className="w-[141px] h-[105px] rounded-lg"
                            src={item?.file_details?.signed_image_url}
                            alt="AI Generated Image"
                            loading="lazy"
                            decoding="async"
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
            )}

            {uploadType === "video" && (
              <>
                {data?.filter((item: any) => item.type === "Videos").length >
                0 ? (
                  data
                    ?.filter((item: any) => item.type === "Videos")
                    .reverse()
                    .map((item: any, index: any) => {
                      const isSelectedVideo = driveVideoClickedArray.some(
                        (clickedItem: any) =>
                          clickedItem?.signed_video_url ===
                          item?.file_details?.signed_video_url
                      );
                      return (
                        <div
                          key={index}
                          className={classNames(
                            `w-[120px] h-[120px] py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2 p-2 cursor-pointer`,
                            {
                              "bg-[#5E32FF]": isSelectedVideo,
                              "bg-transparent": !isSelectedVideo,
                            }
                          )}
                          onClick={() => driveFileSelected(item, index)}
                        >
                          <video
                            className="w-[141px] h-[105px] rounded-lg"
                            src={item?.file_details?.signed_video_url}
                            controls={false}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div className="text-center text-white">
                    No videos available
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex gap-4 items-center justify-center mt-6">
            <Button
              className="w-[136px] rounded-full  text-nyx-yellow hover:shadow-none font-semibold"
              onClick={onCloseEvent}
            >
              Back
            </Button>
            {/* <Button
              className={classNames(
                "rounded-full w-44 font-semibold text-black ",
                mutateUploadfromSyetem.isPending ||
                  driveVideoClickedArray.length == 0 ||
                  driveClickedArray.length == 0
                  ? " w-[136px] bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                  : "w-[136px] bg-nyx-yellow hover:shadow-none text-black"
              )}
              onClick={onCloseEvent}
              disabled={
                mutateUploadfromSyetem.isPending ||
                driveVideoClickedArray.length == 0 ||
                driveClickedArray.length == 0
              }
            >
              {mutateUploadfromSyetem.isPending ? (
                <svg
                  width="25"
                  height="25"
                  className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                  viewBox="0 0 25 25"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z" />
                </svg>
              ) : (
                "Select"
              )}
            </Button> */}
            <Button
              className={classNames(
                "rounded-full font-semibold w-[136px] bg-nyx-yellow hover:shadow-none text-black"
              )}
              onClick={onCloseEvent}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCanvasAssetsUpload;
