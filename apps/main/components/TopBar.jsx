"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import "../css/toolResponsive.css";
import React from "react";
import Profileicon from "@nyx-frontend/main/components/Profileicon";

const TopBar = ({ title = '', subTitle = '' }) => {

  return (
    <div className="flex justify-between items-center w-full py-2 px-2">
      {subTitle ?
        <div className="w-full relative">
          <div className="absolute top-5 left-2">
            <div className="text-[#FFFFFF] text-2xl font-bold">{title}</div>
            <div className="text-[#FFFFFF] text-sm font-light mt-2">{subTitle}</div>
          </div>
        </div>
        :
        <div className="w-full text-[#8297BD] text-[20px] md:text-[24px] font-bold text-center">
          {title}
        </div>}
      <Profileicon position="relative" />
    </div>
  );
};

export default TopBar;