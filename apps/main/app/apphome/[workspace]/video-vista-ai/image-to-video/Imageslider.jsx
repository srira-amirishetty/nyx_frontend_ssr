/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { reactionServices } from "@nyx-frontend/main/services/imageToVideo";
import Button from "@nyx-frontend/main/components/Button";
import { nanoid } from "nanoid";
import Modal from "react-modal";
import { savePopupStyle, changeLocationPopupStyle } from "@nyx-frontend/main/utils/modalstyles";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { toast } from "react-toastify";

const Imageslider = ({
  videourl,
  videoRef,
  generateVideoID,
  imageDimensions,
}) => {
  const [like, setLike] = useState(false);
  const [disLike, setDislike] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const [savePopUp, setSavePopUP] = useState(false);
  const handleDownload = async (videourl) => {
    // Get the current image URL
    try {
      const response = await fetch(videourl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "NyxVideo.mp4";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };
  console.log(imageDimensions);
  const mutateAddreaction = useMutation({
    mutationKey: ["reaction-api"],
    mutationFn: reactionServices,
  });

  const VideoReactionClick = (action) => {
    let data = {
      file_id: generateVideoID,
      action: action,
    };
    mutateAddreaction.mutate(data, {
      onSuccess: (response) => {
        if (action == "like") {
          setDislike(false);
          setLike(true);
        } else if (action == "dislike") {
          setLike(false);
          setDislike(true);
        }

        if (action === "download") {
        } else if (action == "save") {
          toast.success(
            <>
              <span className="text-white text-[20px]">Video Saved</span>
              <br />
              <span className="text-white text-[16px]">
                {" "}
                Video has been saved in the default location!
              </span>
            </>,
            { autoClose: 5000 },
          )
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  const openBrandCanvas = () => {
    const videoID = nanoid();
    localStorage.setItem(videoID, videourl);
    window.open(
      `/apphome/${workspace}/brand-canvas?videoID=${videoID}&platform=image-to-video`,
    );
  };

  return (
    <>
      <div className="group p-2 relative flex justify-center items-center w-full h-full">
        <div className="flex flex-col justify-between h-full w-full">
          <div className="text-white font-bold text-[24px] ml-4">Generated Video</div>
          <div className="bg-black h-full rounded-xl m-6"><div className="bg-[#3B226F]  w-full rounded-lg flex justify-center items-center overflow-hidden relative  h-full  z-0 object-contain">
        <video
          src={videourl}
          className={`w-[${imageDimensions?.width}px] h-[${imageDimensions?.height}px] max-h-[50vh]`}
          autoPlay
          controls={true}
          loop
          ref={videoRef}
        />
      </div></div>
          <div className="flex justify-center">
            <div className="w-[95%]   rounded-full z-30 flex mb-2  justify-between h-[46px] ">
              <div>
                <div>
                  <Button
                    className=" rounded-full text-nyx-yellow hover:bg-transparent hover:shadow-none hover:text-nyx-yellow cursor-pointer h-[37px]"
                    onClick={openBrandCanvas}
                  >
                    Open with Brand Canvas
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="relative group/button">
                  <button
                    className={`text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
                    onClick={() => {
                      handleDownload(videourl);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                        fill="white"
                      />
                    </svg>
                  </button>

                  <div className="absolute top-[-32px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                    Download
                  </div>
                </div>

                {/* <button
            className="text-white border border-white rounded-full p-2 disabled:opacity-50 focus:bg-[#5E32FF] hover:bg-[#5E32FF] "
            // onClick={handleRegenerateButton}
            // disabled={imageurl.length === 4}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 20C9.76667 20 7.875 19.225 6.325 17.675C4.775 16.125 4 14.2333 4 12C4 9.76667 4.775 7.875 6.325 6.325C7.875 4.775 9.76667 4 12 4C13.15 4 14.25 4.2375 15.3 4.7125C16.35 5.1875 17.25 5.86667 18 6.75V4H20V11H13V9H17.2C16.6667 8.06667 15.9375 7.33333 15.0125 6.8C14.0875 6.26667 13.0833 6 12 6C10.3333 6 8.91667 6.58333 7.75 7.75C6.58333 8.91667 6 10.3333 6 12C6 13.6667 6.58333 15.0833 7.75 16.25C8.91667 17.4167 10.3333 18 12 18C13.2833 18 14.4417 17.6333 15.475 16.9C16.5083 16.1667 17.2333 15.2 17.65 14H19.75C19.2833 15.7667 18.3333 17.2083 16.9 18.325C15.4667 19.4417 13.8333 20 12 20Z"
                fill="white"
              />
            </svg>
          </button> */}
                <div className="relative group/button">
                  <button
                    className={` text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
                    onClick={() => VideoReactionClick("save")}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <div className="absolute top-[-32px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                    Save
                  </div>
                </div>

                <div className="relative group/button">
                  <button
                    className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
                      disLike ? "bg-nyx-sky border-nyx-sky" : "border-[#FFFFFF]"
                    }`}
                    onClick={() => VideoReactionClick("dislike")}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 0H16V13L9 20L7.75 18.75C7.63333 18.6333 7.5375 18.475 7.4625 18.275C7.3875 18.075 7.35 17.8833 7.35 17.7V17.35L8.45 13H2C1.46667 13 1 12.8 0.6 12.4C0.2 12 0 11.5333 0 11V9C0 8.88333 0.0166667 8.75833 0.05 8.625C0.0833333 8.49167 0.116667 8.36667 0.15 8.25L3.15 1.2C3.3 0.866667 3.55 0.583333 3.9 0.35C4.25 0.116667 4.61667 0 5 0ZM14 2H5L2 9V11H11L9.65 16.5L14 12.15V2ZM16 13V11H19V2H16V0H21V13H16Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <div className="absolute top-[-32px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                    Dislike
                  </div>
                </div>

                <div className="relative group/button">
                  <button
                    className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
                      like ? "bg-nyx-sky border-nyx-sky" : "border-[#FFFFFF]"
                    }`}
                    onClick={() => VideoReactionClick("like")}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 21.5H7V8.5L14 1.5L15.25 2.75C15.3667 2.86667 15.4625 3.025 15.5375 3.225C15.6125 3.425 15.65 3.61667 15.65 3.8V4.15L14.55 8.5H21C21.5333 8.5 22 8.7 22.4 9.1C22.8 9.5 23 9.96667 23 10.5V12.5C23 12.6167 22.9833 12.7417 22.95 12.875C22.9167 13.0083 22.8833 13.1333 22.85 13.25L19.85 20.3C19.7 20.6333 19.45 20.9167 19.1 21.15C18.75 21.3833 18.3833 21.5 18 21.5ZM9 19.5H18L21 12.5V10.5H12L13.35 5L9 9.35V19.5ZM7 8.5V10.5H4V19.5H7V21.5H2V8.5H7Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <div className="absolute top-[-32px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                    Like
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      {savePopUp ? (
        <Modal isOpen={savePopUp} style={savePopupStyle}>
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">Video Saved</div>
            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setSavePopUP(false);
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
          {/* <div className="w-full my-10">
            <p className="w-full text-center text-[#FFFFFF] text-base">
              {folderChanged
                ? "Your default location is Updated Image has been saved in the New location!"
                : "Image has been saved in the default location!"}
            </p>
          </div> */}
          <div className="w-full my-10">
            <p className="w-full text-center text-[#FFFFFF] text-base">
              Video has been saved in the default location!
            </p>
          </div>

          {/* <div className="w-full flex gap-4 mt-6 justify-center items-center">
            <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopup(false);
                setChangeLocationPopup(true);
              }}
            >
              Change Location
            </Button>
            <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopup(false);
                setFolderChanged(false);
              }}
            >
              {folderChanged ? "Ok" : "Open File"}
            </Button>
          </div> */}

          <div className="w-full flex gap-4 mt-6 justify-center items-center">
            <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopUP(false);
              }}
            >
              Ok
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Imageslider;
