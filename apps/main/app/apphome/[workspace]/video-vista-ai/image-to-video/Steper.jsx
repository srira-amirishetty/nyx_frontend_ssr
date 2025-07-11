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
        <span
          className={classNames(
            " border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-[#3B236F] w-[20px] h-[20px]",
            isActive ? "bg-nyx-yellow" : "bg-nyx-gray-1"
          )}
        >
          &#10003;
        </span>
        <div className="block">
          <span
            className={classNames(
              "text-sm",
              isActive ? "text-white" : "text-gray-400"
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
    if (tab === "image") {
      setprogressstep(0);
    } else if (tab === "style") {
      setprogressstep(1);
    } else if (tab === "motion") {
      setprogressstep(2);
    }else if (tab === "length") {
      setprogressstep(3);
    }else if (tab === "focuspoint") {
      setprogressstep(4);
    } else {
      setprogressstep(5);
    }
  }, [tab]);

  return (
    <>
      <div className="flex justify-start mt-8 items-center p-4 overflow-y-auto italic mb-8">
        <ol className=" overflow-hidden space-y-4">
          <Step
            isActive={progressstep >= 0}
            title={"Upload the image you wish to convert into a video"}
            lineActive={progressstep >1 }
          />
          <Step
            isActive={progressstep >= 1}
            title={"Select Animation Style of your choice."}
            lineActive={progressstep >=2 }
          />
          <Step
            isActive={progressstep >= 2}
            title={"Choose the Amount of motion you want in your video."}
            lineActive={progressstep >=3 }
          />
          <Step
            isActive={progressstep >= 3}
            title={"Select duration of your video."}
            lineActive={progressstep >=4 }
          />
          <Step
            isActive={progressstep >= 4}
            hasAfter={false}
            title={
              "Click generate button and wait for your video"
            }
          />
          {/* <li className="text-sm text-gray-400 ml-4">
            After Image Generation Save Image and Add Branding elements
          </li> */}
            {" "}
        </ol>
      </div>
    </>
  );
};

export default Steper;
