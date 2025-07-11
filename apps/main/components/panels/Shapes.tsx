/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@nyx-frontend/main/store";
import "./emoji.css";

export const Shapes = observer(() => {
  const store = React.useContext(StoreContext);

  const circleClick = () => {
    store.addCircle();
  };

  const triangleClick = () => {
    store.addTriangle();
  };

  const squareClick = () => {
    store.addSquare();
  };

  const lineClick = () => {
    store.addLine();
  };

  const hexagonClick = () => {
    store.addHexagon();
  };

  const semiCircleClick = () => {
    store.addSemiCircle();
  };

  const parallelogramClick = () => {
    store.addParallelogram();
  };

  return (
    <div className="w-full flex flex-wrap gap-2 p-3 h-[200px]">
      <button
        onClick={circleClick}
        className="hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="13.2969" cy="13.2305" r="13.125" fill="#e8eaed" />
        </svg>
      </button>
      <button
        onClick={triangleClick}
        className="hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 42 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4901 0.722656L41.5588 33.7363H0.507812L20.4901 0.722656Z"
            fill="#e8eaed"
          />
        </svg>
      </button>
      <button
        onClick={squareClick}
        className="hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 0.0252643H30.9085V30.4337H0.5V0.0252643Z"
            fill="#e8eaed"
          />
        </svg>
      </button>
      <button
        onClick={lineClick}
        className="hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="0"
            x2="31"
            y2="31"
            stroke="#e8eaed"
            strokeWidth="3"
          />
        </svg>
      </button>

      <button
        onClick={hexagonClick}
        className="hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md"
      >
        <svg
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9582 0.376953L25.5047 7.6207V22.1082L12.9582 29.3519L0.411658 22.1082V7.6207L12.9582 0.376953Z"
            fill="white"
          />
        </svg>
      </button>

      <button
        onClick={semiCircleClick}
        className="hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md"
      >
        <svg
          width="39"
          height="20"
          viewBox="0 0 39 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.5441 19.23C38.5441 14.2491 36.5654 9.47208 33.0433 5.94999C29.5212 2.42791 24.7442 0.449219 19.7632 0.449219C14.7823 0.449218 10.0053 2.42791 6.4832 5.94999C2.96111 9.47208 0.982423 14.249 0.982422 19.23L19.7632 19.23H38.5441Z"
            fill="white"
            transform="rotate(180 19.5 10)"
          />
        </svg>
      </button>

      <button
        onClick={parallelogramClick}
        className="hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md"
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 25 L75 25 L50 75 L0 75 Z"
            fill="white"
            transform="rotate(180 50 50)"
          />
        </svg>
      </button>
    </div>
  );
});
