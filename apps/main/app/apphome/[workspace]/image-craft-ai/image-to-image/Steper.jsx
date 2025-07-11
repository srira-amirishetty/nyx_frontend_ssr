import React, { useEffect, useState } from "react";
import classNames from "@nyx-frontend/main/utils/classNames";

const Step = ({ isActive, lineActive, title, hasAfter = true, isWorking }) => {
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
        {isWorking ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="7.5" r="4.5" fill="#FFC01D" />
            <circle cx="7.5" cy="7.5" r="7" stroke="#FFC01D" />
          </svg>
        ) : (
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
        )}

        <div className="mx-2 block">
          <span
            className={classNames(
              "text-base font-normal",
              isWorking
                ? `text-nyx-yellow font-medium`
                : isActive
                  ? `text-white `
                  : `text-gray-400`,
            )}
          >
            {title}
          </span>
        </div>
      </div>
    </li>
  );
};

const Steper = ({ tab }) => {
  const [progressstep, setprogressstep] = useState(0);
  useEffect(() => {
    if (tab === "name") {
      setprogressstep(-1);
    } else if (tab === "image") {
      setprogressstep(0);
    } else if (tab === "backdrops") {
      setprogressstep(1);
    } else if (tab === "generate") {
      setprogressstep(2);
    } else {
      setprogressstep(-1);
    }
  }, [tab]);

  return (
    <>
      <div className="flex justify-start  items-center p-4 overflow-y-auto italic mb-8">
        <ol className=" overflow-hidden space-y-3">
          <Step
            isActive={progressstep >= 0}
            isWorking={progressstep < 0}
            title={"Provide Product Name"}
            lineActive={progressstep >= 0}
          />
          <Step
            isActive={progressstep >= 1}
            isWorking={progressstep < 1 && progressstep >= 0}
            title={"Add Product image, we will remove background automatically"}
            lineActive={progressstep >= 1}
          />
          <Step
            isActive={progressstep >= 2}
            isWorking={progressstep < 2 && progressstep >= 1}
            title={"Position your product in Image layout"}
            lineActive={progressstep >= 2}
          />
          <Step
            isActive={progressstep >= 2}
            isWorking={progressstep < 2 && progressstep >= 1}
            title={"Use one of the methods to generate backdrop"}
            lineActive={progressstep >= 2}
          />
          <Step
            isActive={progressstep >= 3}
            isWorking={progressstep < 3 && progressstep >= 2}
            hasAfter={false}
            title={"Generate your AI Image"}
          />{" "}
        </ol>
      </div>
    </>
  );
};

export default Steper;
