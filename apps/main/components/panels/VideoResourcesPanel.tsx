"use client";
import React, { useState, useRef } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { observer } from "mobx-react";
import { VideoResource } from "../entity/VideoResource";
import UploadBrandCanvas from "@nyx-frontend/main/components/UploadBrandCanvas";
import Modal from "react-modal";
import { brandcanvaGeneratePopupStyle } from "@nyx-frontend/main/utils/modalstyles";
import { fetchVideoAndConvertToBlob } from "@nyx-frontend/main/utils/helper";

export const VideoResourcesPanel = observer(() => {
  const fileInputRef = useRef<any>(null);
  const [uploadProcess, setUploadProcess] = useState<boolean>(false);
  const [generateVideoPopup, setGenerateVideoPopup] = useState<boolean>(false);
  const [notSupported, setNotSupported] = useState<boolean>(false);
  const [datanotloaded, setDataNotLoaded] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<string>("");
  const [selectedDriveVideo, setSelectedDriveVideo] = useState<any>();
  const store = React.useContext(StoreContext);

  const handleCloseModal = () => {
    setUploadProcess(false);
  };

  const handleSystemButtonClick = () => {
    // Trigger click event on file input
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current?.click();
    }
  };

  const systemUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const allowedExtensions = ["mp4", "mkv", "x-m4v"];
    //@ts-ignore
    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setNotSupported(true);
      setUploadProcess(false);
      return;
    }

    if (!file) return;
    store.addVideoResource(URL.createObjectURL(file));
    setUploadProcess(false);
    setNotSupported(false);
  };

  const driveFileSelected = async (data: any) => {
    const video = await fetchVideoAndConvertToBlob(
      `/api/video/${data?.file_details?.signed_video_url}`,
    );
    const objectUrl = URL.createObjectURL(video as Blob);
    setSelectedDriveVideo(objectUrl);
    setDataNotLoaded(true);
  };

  const handleDriveButtonClick = () => {
    store.addVideoResource(selectedDriveVideo);
    setUploadProcess(false);
    setNotSupported(false);
    setDataNotLoaded(false);
  };

  const generateVideoButtonClick = () => {
    setUploadProcess(false);
    setGenerateVideoPopup(true);
  };

  return (
    <>
      <div className="w-full flex flex-wrap gap-5">
        {store.videos.map((video, index) => {
          return <VideoResource key={video} video={video} index={index} />;
        })}
        <div>
          <div className="bg-[#1D1138] w-[125px] h-[55px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
            Add Videos
          </div>
          <div className="bg-[#50387B] w-[125px] h-[60px] rounded-b-lg flex justify-center items-center flex-col">
            <button
              className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal"
              onClick={() => {
                setUploadProcess(true);
                setUploadType("video");
              }}
            >
              <svg
                viewBox="0 0 17 17"
                className="w-4 h-4 fill-current text-nyx-yellow"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {notSupported && (
        <span className="text-[#E26971] mt-2 ">File not supported!</span>
      )}

      {uploadProcess ? (
        <UploadBrandCanvas
          datanotloaded={datanotloaded}
          onClose={handleCloseModal}
          onSelected={driveFileSelected}
          handleSystemButtonClick={handleSystemButtonClick}
          systemUpload={systemUpload}
          handleDriveButtonClick={handleDriveButtonClick}
          fileInputRef={fileInputRef}
          uploadType={uploadType}
          generateVideoButtonClick={generateVideoButtonClick}
        />
      ) : null}

      {generateVideoPopup ? (
        <Modal
          isOpen={generateVideoPopup}
          style={brandcanvaGeneratePopupStyle}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-lg font-bold text-[#FFFFFF]">
              Generate Video
            </div>

            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setGenerateVideoPopup(false);
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
          <div className="w-full my-5">
            <p className="w-full text-center text-[#FFFFFF] text-base font-bold">
              Comming Soon...
            </p>
          </div>
        </Modal>
      ) : null}
    </>
  );
});
