"use client";
import React, { useState, useRef } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { observer } from "mobx-react";
import { AudioResource } from "../entity/AudioResource";
import UploadBrandCanvas from "@nyx-frontend/main/components/UploadBrandCanvas";

export const AudioResourcesPanel = observer(() => {
  const fileInputRef = useRef<any>(null);
  const [uploadProcess, setUploadProcess] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<string>("");
  const [notSupported, setNotSupported] = useState<boolean>(false);
  const [selectedDriveAudio, setSelectedDriveAudio] = useState<any>();
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
    const allowedExtensions = ["mp3","wav","m4a","aif","wma","flac","aiff","aax","ogg"];
    //@ts-ignore
    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setNotSupported(true);
      setUploadProcess(false);
      return;
    }
    if (!file) return;
    store.addAudioResource(URL.createObjectURL(file));
    setUploadProcess(false);
    setNotSupported(false);
  };

  const driveFileSelected = (data: any) => {
    //setSelectedDriveAudio(data?.file_details?.signed_video_url);
  };

  const handleDriveButtonClick = () => {
    store.addAudioResource(selectedDriveAudio);
    setUploadProcess(false);
    setNotSupported(false);
  };
  return (
    <>
      <div className="w-full flex flex-wrap gap-5">
        {store.audios.map((audio, index) => {
          return <AudioResource key={audio} audio={audio} index={index} />;
        })}
        <div>
          <div className="bg-[#1D1138] w-[125px] h-[55px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
            Add Audios
          </div>
          <div className="bg-[#50387B] w-[125px] h-[60px] rounded-b-lg flex justify-center items-center flex-col">
            <button
              className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal"
              onClick={() => {
                setUploadProcess(true);
                setUploadType("audio");
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
          onClose={handleCloseModal}
          onSelected={driveFileSelected}
          handleSystemButtonClick={handleSystemButtonClick}
          systemUpload={systemUpload}
          handleDriveButtonClick={handleDriveButtonClick}
          fileInputRef={fileInputRef}
          uploadType={uploadType}
        />
      ) : null}
    </>
  );
});
