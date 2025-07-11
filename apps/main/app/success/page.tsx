"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../index.css";

export default function Success({ params, searchParams }: { params: any; searchParams: any }) {
  const router = useRouter();

  const sendToDashBoard = () => {
    const workspace = localStorage.getItem("workspace_name");
    if (workspace) {
      router.push(`/apphome/${workspace}/dashboard`);
    }
  };

  return (
    <div className="bg-[#130625] errorpage ">
      <div className=" h-screen flex flex-col justify-center items-center">
        <h3 className="text-3xl mb-6 font-bold text-green-600">
          Payment Success
        </h3>
        <div>
          <div className="text-white mb-5 px-5">
            <span className="mr-3 font-bold">Transaction ID :</span>
            {searchParams?.["transaction_id"]}
          </div>
          <div className="text-white mb-5 px-5">
            <span className="mr-3 font-bold ">Order ID :</span>
            {searchParams?.["orderId"]}
          </div>
        </div>
        <button
          className={`mt-6 inline-flex justify-center items-center gap-3 p-2 cursor-pointer text-[14px] px-[14px] py-[10px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition`}
          onClick={sendToDashBoard}
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
};

