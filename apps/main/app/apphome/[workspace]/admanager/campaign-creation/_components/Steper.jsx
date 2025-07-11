import React, { useEffect, useState } from "react";
import classNames from "@nyx-frontend/main/utils/classNames";
import useStore from "./Store";
import "./index.css";

const Step = ({
  isActive,
  isWorking,
  lineActive,
  title,
  progressstep,
  hasAfter = true,
}) => {
  return (
    <li>
      <div className="flex items-center ml-2 my-[24px] font-medium w-full">
        {isActive ? (
          <>
            {" "}
            {/* <svg
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
            </svg> */}
          </>
        ) : (
          <>
            {" "}
            {!isWorking ? (
              // <svg
              //   width="18"
              //   height="17"
              //   viewBox="0 0 18 17"
              //   fill="none"
              //   xmlns="http://www.w3.org/2000/svg"
              // >
              //   <path
              //     d="M8.79427 0.207031C4.19427 0.207031 0.460938 3.94036 0.460938 8.54036C0.460938 13.1404 4.19427 16.8737 8.79427 16.8737C13.3943 16.8737 17.1276 13.1404 17.1276 8.54036C17.1276 3.94036 13.3943 0.207031 8.79427 0.207031ZM8.79427 15.207C5.11094 15.207 2.1276 12.2237 2.1276 8.54036C2.1276 4.85703 5.11094 1.8737 8.79427 1.8737C12.4776 1.8737 15.4609 4.85703 15.4609 8.54036C15.4609 12.2237 12.4776 15.207 8.79427 15.207Z"
              //     fill={isWorking ? "#FFCB54" : "#A6A6A6"}
              //   />
              // </svg>
              <></>
            ) : (
              // <svg
              //   width="20"
              //   height="20"
              //   viewBox="0 0 15 15"
              //   fill="none"
              //   xmlns="http://www.w3.org/2000/svg"
              // >
              //   <circle cx="7.5" cy="7.5" r="4.5" fill="#FFC01D" />
              //   <circle cx="7.5" cy="7.5" r="7" stroke="#FFC01D" />
              // </svg>
              <></>
            )}
          </>
        )}

        <div className="mx-2 block">
          <span
            className={classNames(
              "text-base font-normal text-[14px]",
              isWorking && !isActive
                ? "text-[#FFCB54]  "
                : lineActive
                  ? "text-[#fff]"
                  : "text-gray-400",
            )}
          >
            {title}
          </span>
        </div>
        {title != "Confirmation" && (
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.84397 1.96383C3.68904 2.12831 3.602 2.35136 3.602 2.58394C3.602 2.81651 3.68904 3.03957 3.84397 3.20404L7.93484 7.54566L3.84397 11.8873C3.69343 12.0527 3.61013 12.2743 3.61202 12.5042C3.6139 12.7342 3.70081 12.9542 3.85404 13.1168C4.00727 13.2794 4.21455 13.3717 4.43124 13.3737C4.64793 13.3757 4.85669 13.2873 5.01256 13.1275L9.68772 8.16577C9.84265 8.00129 9.92969 7.77823 9.92969 7.54566C9.92969 7.31309 9.84265 7.09003 9.68772 6.92556L5.01256 1.96383C4.85758 1.7994 4.64741 1.70703 4.42827 1.70703C4.20912 1.70703 3.99895 1.7994 3.84397 1.96383Z"
              fill={isWorking ? "#fff" : "#A6A6A6"}
            />
          </svg>
        )}
      </div>
    </li>
  );
};

const Steper = ({}) => {
  const [progressstep, setprogressstep] = useState(0);
  const { state, toggleElement1, setElement } = useStore();

  useEffect(() => {
    if (state.element3) {
      setprogressstep(3);
    } else if (state.element2) {
      setprogressstep(2);
    } else if (state.element1) {
      setprogressstep(1);
    } else {
      setprogressstep(0);
    }
  }, [state]);

  return (
    <>
      <div className="">
        <ol className="overflow-hidden overflow-x-auto flex items-center italic stepperHorScroll">
          <Step
            isActive={progressstep >= 1}
            isWorking={progressstep >= 0}
            title={"Add List"}
            lineActive={progressstep >= 1}
            progressstep={progressstep}
          />

          <Step
            isActive={progressstep >= 2}
            isWorking={progressstep >= 1}
            title={"Map Identifiers "}
            lineActive={progressstep >= 2}
            progressstep={progressstep}
          />

          <Step
            isActive={progressstep >= 3}
            isWorking={progressstep >= 2}
            title={"Confirmation"}
            lineActive={progressstep >= 3}
            progressstep={progressstep}
          />
          {/* <Step
            isActive={progressstep >= 4}
            isWorking={progressstep >= 3}
            title={"Confirmation"}
            lineActive={progressstep > 4}
            progressstep={progressstep}
          /> */}
        </ol>
      </div>
    </>
  );
};

export default Steper;
