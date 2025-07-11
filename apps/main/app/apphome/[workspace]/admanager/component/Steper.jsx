import React, { useEffect, useState } from "react";
import classNames from "@nyx-frontend/main/utils/classNames";
import useStore from "./store";
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
      <div className="flex items-center ml-2 font-medium w-full">
        {isWorking ? (
          <>
            {!isActive ? (
              <>
                {" "}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="7.5" r="4.5" fill="#FFC01D" />
                  <circle cx="7.5" cy="7.5" r="7" stroke="#FFC01D" />
                </svg>
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="7"
                    fill="#FFC01D"
                    stroke="#FFC01D"
                  />
                  <path
                    d="M4 7.66667L6.66667 10L12 5"
                    stroke="#383D98"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </>
        ) : (
          <>
            {" "}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7.5" cy="7.5" r="7" stroke="white" />
            </svg>
          </>
        )}

        <div className="mx-2 block mt-[-8px]">
          <span
            className={classNames(
              "text-base font-medium text-[14px]",
              isWorking
                ? `${!isActive ? `text-[#FFC01D] font-bold` : `text-[#fff] font-medium`}`
                : "text-white",
            )}
          >
            {title}
          </span>
        </div>
        {progressstep != 5 && (
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <path
              d="M3.84397 1.96383C3.68904 2.12831 3.602 2.35136 3.602 2.58394C3.602 2.81651 3.68904 3.03957 3.84397 3.20404L7.93484 7.54566L3.84397 11.8873C3.69343 12.0527 3.61013 12.2743 3.61202 12.5042C3.6139 12.7342 3.70081 12.9542 3.85404 13.1168C4.00727 13.2794 4.21455 13.3717 4.43124 13.3737C4.64793 13.3757 4.85669 13.2873 5.01256 13.1275L9.68772 8.16577C9.84265 8.00129 9.92969 7.77823 9.92969 7.54566C9.92969 7.31309 9.84265 7.09003 9.68772 6.92556L5.01256 1.96383C4.85758 1.7994 4.64741 1.70703 4.42827 1.70703C4.20912 1.70703 3.99895 1.7994 3.84397 1.96383Z"
              fill="#fff"
            /> */}
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
    if (state.element5) {
      setprogressstep(5);
    } else if (state.element4) {
      setprogressstep(4);
    } else if (state.element3) {
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
      <div>
        <ol className="overflow-hidden overflow-x-auto flex items-center justify-center pt-2 italic stepperHorScroll">
          <Step
            isActive={progressstep >= 1}
            isWorking={progressstep >= 0}
            title={"Brand details"}
            lineActive={progressstep >= 1}
            progressstep={progressstep}
          />

          <Step
            isActive={progressstep >= 2}
            isWorking={progressstep >= 1}
            title={"Setup campaign"}
            lineActive={progressstep >= 2}
            progressstep={progressstep}
          />

          <Step
            isActive={progressstep >= 3}
            isWorking={progressstep >= 2}
            title={"Ad Creative upload"}
            lineActive={progressstep >= 3}
            progressstep={progressstep}
          />
          <Step
            isActive={progressstep >= 4}
            isWorking={progressstep >= 3}
            title={"Schedule & budget"}
            lineActive={progressstep > 4}
            progressstep={progressstep}
          />
          <Step
            isActive={progressstep >= 5}
            isWorking={progressstep >= 4}
            title={"Summary & launch"}
            lineActive={progressstep > 5}
            progressstep={5}
          />
        </ol>
      </div>
    </>
  );
};

export default Steper;
