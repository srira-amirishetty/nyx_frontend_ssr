"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import Profileicon from "@nyx-frontend/main/components/Profileicon";

const BrandCanvas = dynamic(
  () => import("./BrandCanvas").then((a) => a.default),
  {
    ssr: false,
  }
);

export default function BrandCanvasPage() {
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = "Changes you made may not be saved."; //Required for Chrome to show the dialog
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="w-[96%] px-4 pt-4 flex items-center">
          <div className="flex-1 text-center">
            <div className="text-[#8297BD] text-[20px] md:text-[24px] font-bold">
              Brand Canvas
            </div>
          </div>
          <div className="ml-auto">
            <Profileicon hide={""} />
          </div>
        </div>
        <div className="flex-1 h-[calc(100vh-80px)] overflow-hidden">
          <BrandCanvas />
        </div>
      </div>
    </div>
  );
}
