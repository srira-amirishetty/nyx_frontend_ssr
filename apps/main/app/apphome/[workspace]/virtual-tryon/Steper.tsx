"use client";
import React, { useEffect, useState } from "react";
import classNames from "@nyx-frontend/main/utils/classNames";

interface StepProps {
  isActive: boolean;
  lineActive: boolean;
  title: string;
  hasAfter?: boolean;
}

const Step: React.FC<StepProps> = ({
  isActive,
  lineActive,
  title,
  hasAfter = true,
}) => {
  return (
    <li
      className={classNames(
        `relative flex-1`,
        lineActive ? "after:bg-nyx-yellow" : "after:bg-nyx-gray-1",
        hasAfter
          ? "after:content-[''] after:w-0.5 after:h-full after:inline-block after:absolute after:left-[9px]"
          : "",
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
        <div className="block mx-2">
          <span
            className={classNames(
              "text-sm",
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

interface SteperProps {
  tab: string;
  steperpro:any;
}

const Steper: React.FC<SteperProps> = ({ tab,steperpro }) => {
  const [progressstep, setprogressstep] = useState(0);
  useEffect(() => {
    // Validate `steperpro` value
    if (steperpro < 0 || steperpro > 4) {
      console.error('Invalid steperpro value:', steperpro);
      setprogressstep(0);
      return;
    }

    setprogressstep(steperpro);
  }, [tab, steperpro]);

  return (
    <>
      <div className="flex flex-col p-4 overflow-y-auto italic mb-8">
        <div className="text-white not-italic text-[24px] font-bold leading-9 mt-4 mb-8">Steps for generating Product Catalogue images</div>
        <ol className=" overflow-hidden space-y-3">
          <Step
            isActive={progressstep >= 0}
            title={"Upload your fashion kit"}
            lineActive={progressstep > 0}
          />
          <Step
            isActive={progressstep >= 1}
            title={"Please provide apparel images preferably with both angles."}
            lineActive={progressstep >= 2}
          />
          <Step
            isActive={progressstep >= 2}
            title={"Upload your own models. "}
            lineActive={progressstep >= 3}
          />
          <Step
            isActive={progressstep >= 3}
            title={"Select one or more angles to generate output in."}
            lineActive={progressstep>=4}
          />
          <Step
            isActive={progressstep >= 4}
            title={"Click on generate and watch the magic happen"}
            lineActive={false}
          />
        </ol>
      </div>
    </>
  );
};

export default Steper;
