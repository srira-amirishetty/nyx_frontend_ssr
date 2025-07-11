/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import PaginationCarousel from "./PaginationCarousel";

export default function HowItWorks({ data }) {
  const [HwiData, setHWI] = useState(data);
  const [hiwActive, setHIWActive] = useState(0);

  return (
    <>
      <div
        style={{
          background: `rgba(0, 49, 99, 1)`,
        }}
        className="hidden md:grid bg-no-repeat border border-amber-400 grid-cols-3 mt-8 rounded-md shadow-lg"
      >
        {/* <div style={{ backgroundImage: `url(${blue_bg_img})`}} className="hidden md:grid relative bg-cover bg-no-repeat border border-amber-400 grid-cols-3 mt-8 rounded-md shadow-lg" > */}
        <div className="col-span-1">
          {HwiData?.map((val, index) => (
            <div
              key={index}
              onMouseOver={() => setHIWActive(index)}
              className={`flex items-center rounded-md border gap-4 md:px-4 lg:px-6 md:py-6 lg:py-8 cursor-pointer ${
                index === hiwActive
                  ? "text-amber-400 faq_hover text-sm font-bold border-amber-400"
                  : "text-white font-light bg-black border-amber-400"
              } `}
            >
              <p className={`${index === hiwActive ? "text-xl" : "text-md"}`}>
                {index + 1}.
              </p>
              <p className="text-md"> {val.title}</p>
            </div>
          ))}
        </div>

        <div className="col-span-2 flex flex-col justify-center">
          <img
            src={HwiData[hiwActive].icon}
            alt="HwiData"
            className="w-52 mx-auto"
            loading="lazy"
            decoding="async"
          />
          <p className="text-white font-light text-center mt-4 xl:px-28">
            {HwiData[hiwActive].content}
          </p>
        </div>
      </div>

      <div className="block md:hidden">
        <PaginationCarousel data={HwiData} />
      </div>
    </>
  );
}
