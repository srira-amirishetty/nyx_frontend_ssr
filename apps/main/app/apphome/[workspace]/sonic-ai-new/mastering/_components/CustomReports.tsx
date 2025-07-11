"use client";
import React from "react";
import "./index.css";
import CustomPlayer from "./CustomeAudioPlayer";
import Button from "@nyx-frontend/main/components/Button";
import { useQuery } from "@tanstack/react-query";
import { customeMasteringServices } from "@nyx-frontend/main/services/uploadService";

const CustomMasterReport = ({ customData, customMasterPayload }: any) => {
  const mutateCustomMastering = useQuery({
    queryKey: ["custom-matering", customMasterPayload],

    queryFn: async () => {
      if (customMasterPayload) {
        const response = await customeMasteringServices(customMasterPayload);
        return response;
      }
      return null;
    },
  });

  console.log(
    "mutateCustomMastering",
    mutateCustomMastering.data.nyx_mastered.mastered.original_song,
  );
  return (
    <>
      <div className="w-full">
        <div className="w-full my-2 flex flex-col gap-2">
          <CustomPlayer
            name={"Original Song"}
            url={
              mutateCustomMastering?.data?.nyx_mastered?.mastered?.original_song
                ?.url
            }
          />

          <CustomPlayer
            name={"Enhanced Song"}
            url={
              mutateCustomMastering?.data?.nyx_mastered?.mastered
                ?.ai_mastered_song_hd_wav?.url
            }
          />
        </div>
        <div className="w-full h-auto rounded-full bg-black p-2 flex gap-2 justify-center items-center">
          <Button className="text-sm font-semibold text-[#FFCB54] rounded-full hover:shadow-none">
            Predict music success
          </Button>
          <Button className="text-sm font-semibold text-[#FFCB54] rounded-full hover:shadow-none">
            Analyze your music
          </Button>
          <Button className="text-sm font-semibold text-[#FFCB54] rounded-full hover:shadow-none">
            Consult Experts
          </Button>

          <div className="relative group/button">
            <button
              className={`text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
              // onClick={() => {
              //   downLoadButtonClick({
              //     activeId: tabId,
              //     activeIndex: activeIndex,
              //     index: imageIndex,
              //     details: imageurl[imageIndex],
              //   });
              //   handleDownload(imageurl[imageIndex].image);
              // }}
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
                  fill={true ? "white" : "white"}
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
              // onClick={() =>
              //   saveButtonClicked({
              //     activeId: tabId,
              //     activeIndex: activeIndex,
              //     index: imageIndex,
              //     details: imageurl[imageIndex],
              //   })
              // }
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
                  fill={true ? "white" : "white"}
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
              className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
                true ? "bg-nyx-sky border-nyx-sky" : "border-[#FFFFFF]"
              }`}
              // onClick={() =>
              //   hitDisLikeButton({
              //     activeId: tabId,
              //     activeIndex: activeIndex,
              //     index: imageIndex,
              //     details: imageurl[imageIndex],
              //   })
              // }
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
                  fill={true ? "white" : "white"}
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
              className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
                true ? "bg-nyx-sky border-nyx-sky" : "border-[#FFFFFF]"
              }`}
              // onClick={() =>
              //   hitLikeButton({
              //     activeId: tabId,
              //     activeIndex: activeIndex,
              //     index: imageIndex,
              //     details: imageurl[imageIndex],
              //   })
              // }
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
                  fill={true ? "white" : "white"}
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
    </>
  );
};

export default CustomMasterReport;
