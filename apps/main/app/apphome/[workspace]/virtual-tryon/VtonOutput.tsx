import React, { useState, useEffect } from "react";
import Image from "next/image";
import Select from "react-select";
import { brandPaintingStyles } from "@nyx-frontend/main/utils/productStyle";
import { imageLikeDisLikeService } from "@nyx-frontend/main/services/virtual-tryon";
import Button from "@nyx-frontend/main/components/Button";
import { useMutation } from "@tanstack/react-query";
import { savePopupStyle } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";
import { nanoid } from "nanoid";
import BackView from "./BackView";
import Frontand45View from "./Frontand45View";

type OutputImageKeys = "full_body_front" | "full_body_45" | "full_body_back";

function VtonOutput({ vtonResponse,selectedTab }: any) {
  const brandPaintingOptions = [
    { value: "Open with Brand Canvas", label: "Open with Brand Canvas" },
  ];

  // const [selectedTab, setSelectedTab] =
  //   useState<OutputImageKeys>("full_body_front");

  const [likedStatus, setLikedStatus] = useState<any>({});
  const [dislikedStatus, setDisLikedStatus] = useState<any>({});
  const [savePopup, setSavePopup] = useState(false);
  const [workspace, setWorkspace] = useState("");

  useEffect(() => {
    const initialLikedStatus: any = {};
    const initialDislikeStatus: any = {};
    Object.keys(vtonResponse.file_id).forEach((tab) => {
      initialLikedStatus[tab] = false;
      initialDislikeStatus[tab] = false;
    });
    setLikedStatus(initialLikedStatus);
    setDisLikedStatus(initialDislikeStatus);
  }, [vtonResponse]);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    // @ts-ignore
    setWorkspace(work);
  }, []);

  const handleDownload = async (imageUrl: any) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "NYXImage.png";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  const saveImage = (file_id: any) => {
    const data = {
      file_id: file_id,
      action: "save",
    };

    muateLike.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);
        setSavePopup(true);
      },
    });
  };

  const onChange = (option: any) => {
    if (option.value === "Open with Brand Canvas") {
      const imageID = nanoid();
      localStorage.setItem(
        imageID,
        vtonResponse.generated_photos.output_image[selectedTab],
      );
      window.open(
        `/apphome/${workspace}/brand-canvas?imageID=${imageID}&platform=fashion-catalogue`,
      );
    }
  };

  const likeImage = (file_id: any, tab: any) => {
    setLikedStatus((prevStatus: any) => ({
      ...prevStatus,
      [tab]: !prevStatus[tab], // Set liked status to true
    }));

    // Set dislike status to false
    setDisLikedStatus((prevStatus: any) => ({
      ...prevStatus,
      [tab]: false,
    }));

    const data = {
      file_id: file_id,
      action: "like",
    };

    muateLike.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);
      },
    });
  };

  const dislikeImage = (file_id: any, tab: any) => {
    setDisLikedStatus((prevStatus: any) => ({
      ...prevStatus,
      [tab]: !prevStatus[tab],
    }));

    setLikedStatus((prevStatus: any) => ({
      ...prevStatus,
      [tab]: false, // Set liked status to true
    }));

    const data = {
      file_id: file_id,
      action: "dislike",
    };

    muateLike.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);
      },
    });
  };

  const muateLike = useMutation({
    mutationKey: ["vton_like"],
    mutationFn: imageLikeDisLikeService,
  });



  return (
    <>
      <div className="flex h-100 flex-col items-center justify-center">
       
        <div
          className="flex items-center justify-center w-[90%] h-[55vh] mt-10 rounded-lg"
          style={{
            background:
              "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
          }}
        >
          <Image
            width={500}
            height={500}
            src={
              vtonResponse?.generated_photos?.output_image[selectedTab] ||
              "https://picsum.photos/500"
            }
            alt={selectedTab}
            className="w-[352.8px] h-[100%] "
          />
        </div>
        <div className="flex flex-row items-center  justify-between bg-black/30 text-white rounded-[40px] w-[93%] h-[46px] mt-[20px]">
          <div className="flex p-0 h-[37px] pl-2 cursor-pointer">
            <Select
              className="rounded-full cursor-pointer hover:text-black "
              options={brandPaintingOptions}
              defaultValue={brandPaintingOptions[0]}
              styles={brandPaintingStyles}
              menuPlacement={"top"}
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={onChange}
            />
          </div>
          <div className="flex gap-1 pr-2">
            <div className="relative group/button">
              <button
                className={`text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
                onClick={() => {
                  //   downloadButtonClick({
                  //     //   activeId: tabId,
                  //     //   activeIndex: activeIndex,
                  //     index: imageIndex,
                  //     details: imageurl[imageIndex],
                  //   });
                  handleDownload(
                    vtonResponse.generated_photos.output_image[selectedTab],
                  );
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
                    fill={"white"}
                  />
                </svg>
              </button>
              <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                Download
              </div>
            </div>
            <div className="relative group/button">
              <button
                data-testid="save"
                className={` text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
                onClick={() => saveImage(vtonResponse.file_id[selectedTab])}
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
                    fill={"white"}
                  />
                </svg>
                <span className="sr-only">Save</span>
              </button>
              <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                Save
              </div>
            </div>
            <div className="relative group/button">
              <button
                data-testid="dislike"
                className={`text-[#FFFFFF] border rounded-full p-2 focus:outline-none  ${
                  dislikedStatus[selectedTab]
                    ? "bg-nyx-sky border-nyx-sky"
                    : "border-white"
                }`}
                onClick={() =>
                  dislikeImage(vtonResponse.file_id[selectedTab], selectedTab)
                }
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
                    fill={"white"}
                  />
                </svg>
                <span className="sr-only">Dislike</span>
              </button>
              <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                Dislike
              </div>
            </div>
            <div className="relative group/button">
              <button
                data-testid="like"
                className={`text-[#FFFFFF] border rounded-full p-2 focus:outline-none  ${
                  likedStatus[selectedTab]
                    ? "bg-nyx-sky border-nyx-sky"
                    : "border-white"
                }`}
                onClick={() =>
                  likeImage(vtonResponse.file_id[selectedTab], selectedTab)
                }
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
                    fill={"white"}
                  />
                  <span className="sr-only">Like</span>
                </svg>
              </button>
              <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                Like
              </div>
            </div>
          </div>
        </div>
      </div>

      {savePopup ? (
        <Modal isOpen={savePopup} style={savePopupStyle} ariaHideApp={false}>
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">Image Saved</div>
            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setSavePopup(false);
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
          <div className="w-full my-10">
            <p className="w-full text-center text-[#FFFFFF] text-base">
              Image has been saved in the default location!
            </p>
          </div>

          <div className="w-full flex gap-4 mt-6 justify-center items-center">
            {/* <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopup(false);
                setChangeLocationPopup(true);
              }}
            >
              Change Location
            </Button>
            {folderChanged ? (
              <Button
                className="rounded-full w-60"
                onClick={() => setSavePopup(false)}
              >
                Ok
              </Button>
            ) : (
              <Link href={"/assets"} target="_blank">
                <Button className="rounded-full w-60">
                  {folderChanged ? "Ok" : "Open File"}
                </Button>
              </Link>
            )} */}

            <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopup(false);
              }}
            >
              Ok
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default VtonOutput;
