/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function ShowOrderStatus() {
  const navigate = useRouter();

  const [workspace, setWorkspace] = useState("");

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  return (
    <div
      className={
        "flex justify-between flex-col gap-8 bg-transparent outline-none w-full text-sm text-white rounded-md placeholder-blue"
      }
    >
      <div className="flex flex-col gap-4 bg-transparent outline-none pl-2 text-sm py-2 md:py-1 text-white rounded-md placeholder-blue">
        <span className="font-bold text-[#FFCB54] text-[18px]">
          Thank you for purchasing the subscription.{" "}
        </span>
        Your credits will start reflecting in your profile.
      </div>
      <div className="flex w-full justify-center items-center">
        <button
          className={
            "w-full md:w-[40%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400 font-bold rounded-full md:py-2 text-center mr-2"
          }
          onClick={() => navigate.push(`/apphome/${workspace}/dashboard`)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

const OrderModal = ({ onClose, orderStatus }) => {
  return (
    <>
      <div className="right-5 top-4 absolute"></div>
      <div className="p-2">
        <div className="flex justify-end"></div>
        <div className="m-auto w-[96%] mt-3">
          <ShowOrderStatus onClose={onClose} orderStatus={orderStatus} />
        </div>
      </div>
    </>
  );
};

export default OrderModal;
