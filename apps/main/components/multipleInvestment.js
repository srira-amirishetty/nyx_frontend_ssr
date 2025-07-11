/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import React, { useState, useEffect } from "react";
const points = IMAGE_URL + "/assets/images/icons/points.svg";
export default function MultipleInvestment({ data }) {
  const [slideCount, setSlideCount] = useState(2);

  useEffect(() => {
    setSlideCount(window.innerWidth);
  }, []);
  return (
    <div className="flex gap-2 md:gap-4 justify-center mb-40">
      {data.map((item, index) => {
        {
          var screenWidth = slideCount;
          if (screenWidth < 600) {
            item.title = item.title.replace(/\s/g, "\n");
          }
        }
        return (
          <div
            key={index}
            className="flex flex-col bg-black border border-amber-400 rounded-xl py-10 px-2 md:px-10 w-[50%] md:w-[350px]"
          >
            <h3 className="text-amber-400 md:ml-6 mb-5 font-bold text-sm md:text-normal whitespace-pre-line">
              {item.title}
            </h3>
            <div className="md:w-[80%] md:ml-6 ">
              <div
                className="flex items-center mb-5 py-2.5 pl-1 md:pl-6 rounded-md "
                style={{ background: "rgba(0, 49, 99, 1)" }}
              >
                <img
                  className="mr-1 w-3 h-3"
                  alt="points"
                  src={points}
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-white font-light text-[10px]">
                  {item.point1}
                </p>
              </div>
              <div
                className="flex items-center mb-5 py-2.5 pl-1 md:pl-6 rounded-md "
                style={{ background: "rgba(0, 49, 99, 1)" }}
              >
                <img
                  className="mr-2 w-3 h-3"
                  alt="points"
                  src={points}
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-white font-light text-[10px]">
                  {item.point2}
                </p>
              </div>
              <div
                className="flex items-center mb-5 py-2.5 pl-1 md:pl-6 rounded-md "
                style={{ background: "rgba(0, 49, 99, 1)" }}
              >
                <img
                  className="mr-2 w-3 h-3"
                  alt="points"
                  src={points}
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-white font-light text-[10px]">
                  {item.point3}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
