/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import classNames from "@nyx-frontend/main/utils/classNames";

const Step = ({ isActive,lineActive, title, hasAfter = true }) => {
  return (
    <li
      className={classNames(
        `relative flex-1`,
        lineActive ? "after:bg-nyx-yellow" : "after:bg-nyx-gray-1",
        hasAfter
          ? "after:content-[''] after:w-0.5 after:h-full after:inline-block after:absolute after:left-[9px]"
          : ""
      )}
    >
      <div className="flex items-center font-medium w-full  ">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
            fill={`${isActive ? "#FFCB54" : "#8297BD"}`}
          />
        </svg>

        <div className="mx-2 block">
          <span
            className={classNames(
              " text-base  font-normal",
              isActive ? "text-white" : "text-gray-400",
            )}
          >
            {title}
          </span>
        </div>
      </div>
    </li>
  );
};

const Steper = ({ tab ,generate }) => {
  const [progressstep, setprogressstep] = useState(0);
  useEffect(() => {
    if (tab === "camaign") {
      setprogressstep(1);
    } else if (tab === "creative") {
      setprogressstep(2);
    } else if (tab === "media") {
      setprogressstep(3);
    } else if(tab=="settings") {
      setprogressstep(4);
    } else if (tab=="painting"){
      setprogressstep(4);
    }else if(generate==1){
      setprogressstep(5);
    }
    
    else{
      setprogressstep(0);
    }
  }, [tab]);

  return (
    <>
      <div className="flex justify-start mt-4 items-center pl-4  pt-4 overflow-y-auto italic font-normal">
        <ol className=" overflow-hidden space-y-4">
          <Step
            isActive={progressstep >= 0}
            title={"Select Brand for which you want to create Video"}
            lineActive={progressstep >0 }
          />
          <Step
            isActive={progressstep >= 1}
            title={"Select the Product and Target Audience (or create new)"}
            lineActive={progressstep >=2 }
          />
          <Step
            isActive={progressstep >= 2}
            title={"Give context and use AI-writer or write your own script"}
            lineActive={progressstep >=3 }
          />
          <Step
            isActive={progressstep >= 3}
            title={
              "Choose the type of content you need in video"
            }
            lineActive={progressstep >=4 }
          />
          <Step
            isActive={progressstep >= 4}
            title={
              "Customize the video generated with audio/video settings"
            }
            lineActive={progressstep >=5 }
            
          />
          <Step
            isActive={progressstep>=5}
            hasAfter={false}
            title={
              "Add Startslate/Endslate"
            }
          />
          <li className="text-base text-gray-400 ml-[30px] leading-[80px]">
          After Video Generation, save video and add branding elements
          </li>
            {" "}
        </ol>
      </div>
     
    </>
  );
};

export default Steper;
