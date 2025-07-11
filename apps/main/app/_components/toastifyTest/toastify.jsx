"use client";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.css";

const toastify = () => {
  // Info Toastify
  const info = () =>
    toast.info(
      <>
        <span className="text-white text-[16px] leading-[20px]">
          {" "}
          Brand Name Missing!
        </span>
        <br />
        <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
          {" "}
          Please provide the brand name.
        </span>
      </>,
      { autoClose: 5000 },
    );
  // Warning Toastify
  const warning = () =>
    toast.warn(
      <>
        <span className="text-white text-[16px] leading-[20px]">
          {" "}
          Brand Name Missing!
        </span>
        <br />
        <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
          {" "}
          Please provide the brand name.
        </span>
      </>,
      { autoClose: 5000 },
    );
  // Error Toastify
  const error = () =>
    toast.error(
      <>
        <span className="text-white text-[16px] leading-[20px]">
          {" "}
          Brand Name Missing!
        </span>
        <br />
        <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
          {" "}
          Please provide the brand name.
        </span>
      </>,
      { autoClose: 5000 },
    );
  // Success Toastify
  const success = () =>
    toast.success(
      <>
        <span className="text-white text-[16px] leading-[20px]">
          {" "}
          Brand Name Missing!
        </span>
        <br />
        <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
          {" "}
          Please provide the brand name.Please provide the brand name.Please
          provide the brand name.Please provide the brand name.
        </span>
      </>,
      { autoClose: 5000 },
    );
  return (
    <div className="text-center  py-5 mx-auto">
      <button
        onClick={info}
        className="border border-black rounded-[6px] px-4 py-2 text-center mr-3 "
      >
        Info
      </button>
      <button
        onClick={warning}
        className="border border-black rounded-[6px] px-4 py-2 text-center mr-3 "
      >
        Warning
      </button>
      <button
        onClick={error}
        className="border border-black rounded-[6px] px-4 py-2 text-center mr-3"
      >
        Error
      </button>
      <button
        onClick={success}
        className="border border-black rounded-[6px] px-4 py-2 text-center mr-3"
      >
        Success
      </button>

      <ToastContainer className="toastifyStyles" />
    </div>
  );
};

export default toastify;
