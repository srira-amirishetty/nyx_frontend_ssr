"use client";
import React from "react";
import { useState } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const tabs = [
  {
    name: "LinkedIn",
    svg: (
      <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.9167 0.25C23.6681 0.25 24.3888 0.548511 24.9201 1.07986C25.4515 1.61122 25.75 2.33189 25.75 3.08333V22.9167C25.75 23.6681 25.4515 24.3888 24.9201 24.9201C24.3888 25.4515 23.6681 25.75 22.9167 25.75H3.08333C2.33189 25.75 1.61122 25.4515 1.07986 24.9201C0.548511 24.3888 0.25 23.6681 0.25 22.9167V3.08333C0.25 2.33189 0.548511 1.61122 1.07986 1.07986C1.61122 0.548511 2.33189 0.25 3.08333 0.25H22.9167ZM22.2083 22.2083V14.7C22.2083 13.4751 21.7218 12.3005 20.8557 11.4343C19.9895 10.5682 18.8149 10.0817 17.59 10.0817C16.3858 10.0817 14.9833 10.8183 14.3033 11.9233V10.3508H10.3508V22.2083H14.3033V15.2242C14.3033 14.1333 15.1817 13.2408 16.2725 13.2408C16.7985 13.2408 17.303 13.4498 17.6749 13.8217C18.0469 14.1937 18.2558 14.6982 18.2558 15.2242V22.2083H22.2083ZM5.74667 8.12667C6.37788 8.12667 6.98324 7.87592 7.42958 7.42958C7.87592 6.98324 8.12667 6.37788 8.12667 5.74667C8.12667 4.42917 7.06417 3.3525 5.74667 3.3525C5.11169 3.3525 4.50273 3.60474 4.05374 4.05374C3.60474 4.50273 3.3525 5.11169 3.3525 5.74667C3.3525 7.06417 4.42917 8.12667 5.74667 8.12667ZM7.71583 22.2083V10.3508H3.79167V22.2083H7.71583Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    svg: (
      <svg
        width="25"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m3.242 3 7.096 10.14L3.615 21h2.64l5.265-6.17L15.835 21h6.91l-7.422-10.625L21.615 3h-2.6l-4.869 5.688L10.175 3H3.242Zm3.84 2h2.049l9.777 14h-2.031L7.082 5Z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    svg: (
      <svg
        width="25"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.375 3c-2.757 0-5 2.243-5 5v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5h-8Zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3h-8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    svg: (
      <svg
        width="25"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <path
            d="M22.375 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5c0-1.93 1.57-3.5 3.5-3.5h2.5v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
            fill="#fff"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" transform="translate(.375)" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: "Snapchat",
    svg: (
      <svg
        width="25"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.879 2a6 6 0 0 0-6 6v1.875l-.9-.675a1 1 0 1 0-1.2 1.6l1.865 1.4c-.444 1.168-1.527 2.39-3.28 3.443a1.01 1.01 0 0 0-.318 1.412C4.164 18.732 5.938 20 7.878 20c1.784 0 3.008 2 5 2 2.011 0 3.21-2 5-2 1.94 0 3.715-1.268 4.832-2.945a1.011 1.011 0 0 0-.318-1.412c-1.752-1.053-2.835-2.275-3.28-3.443l1.867-1.4a1 1 0 1 0-1.2-1.6l-.9.675V8a6 6 0 0 0-6-6Z"
          fill="#fff"
        />
      </svg>
    ),
  },
];

const Campaign = () => {
  const [selectedTab, setSelectedTab] = useState("Google Ads");
  const [channlesArray, setChannelsArray] = useState<any>([]);

  const handleTabClick = (tabName: any) => {
    setChannelsArray((prevChannelsArray: any) => {
      if (prevChannelsArray.includes(tabName)) {
        return prevChannelsArray.filter((channel: any) => channel !== tabName);
      } else {
        return [...prevChannelsArray, tabName];
      }
    });
  };

  return (
    <>
      <div className="bg-[#28134B]">
        <div className="font-medium text-[16px] bg-[#000000] h-[60px] px-[62px] text-white pt-[20px]">
          {" "}
          Ad Integration
        </div>
        <div className="py-4 px-12 h-[60vh] relative">
          {/* name url chanel */}
          <div className=" ">
            <div className="mb-5">
              <div className="flex gap-4 flex-wrap">
                {tabs.map((tab) => (
                  <div
                    key={tab.name}
                    className={`w-[128px] h-[40px] rounded flex justify-center items-center px-5 cursor-pointer border  ${
                      channlesArray.includes(tab.name)
                        ? "bg-[#5E32FF] border-[#5E32FF]"
                        : " bg-[#4A2B89] border-none"
                    }`}
                    onClick={() => handleTabClick(tab.name)}
                  >
                    <div className="flex gap-2 items-center justify-center text-[#3B226F]">
                      <div className="w-[24px] h-[24px]">{tab.svg}</div>
                      <div
                        className={` text-sm font-normal ${
                          channlesArray.includes(tab.name)
                            ? " text-nyx-yellow"
                            : " text-white"
                        }`}
                      >
                        {tab.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-[45px] left-1/2  transform -translate-x-1/2 -translate-y-1/2 ">
            <button className="w-[154px] h-[37px] rounded-[72px] bg-[#FFCB54]">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaign;
