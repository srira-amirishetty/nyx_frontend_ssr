"use client";
import React, { useState, Fragment } from "react";
import PaginationCarousel2 from "./PaginationCarousel2";

export default function HowItWorks2({ data }) {
  const [HwiData, setHWI] = useState(data);
  const [hiwActive, setHIWActive] = useState(0);

  return (
    <>
      <div className="hidden md:flex mt-8 shadow-lg">
        <div className="w-1/3">
          {HwiData?.map((val, index) => (
            <div
              key={index}
              onMouseOver={() => setHIWActive(index)}
              className={`flex items-center rounded-l-md border gap-4 md:px-4 lg:px-6 md:py-6 lg:py-8 cursor-pointer ${
                index === hiwActive
                  ? "text-nyx-yellow bg-[#22184C] text-sm font-bold border-nyx-yellow"
                  : "text-white font-light  border-nyx-yellow"
              } `}
            >
              <p className={`${index === hiwActive ? "text-xl" : "text-md"}`}>
                {index + 1}.
              </p>
              <p className={`${index === hiwActive ? "text-xl" : "text-md"}`}>
                {" "}
                {val.title}
              </p>
            </div>
          ))}
        </div>

        <div className="w-2/3 border border-l-0 flex-grow border-nyx-yellow bg-[#22184C] relative rounded-r-md">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <section className="py-16 h-full overflow-y-auto md:px-16 xl:px-24">
              <h3 className="text-white font-Montserrat text-justify mt-2">
                {HwiData[hiwActive].content}
              </h3>
              <ul className="text-white font-Montserrat text-justify pl-4">
                {Array(7)
                  .fill(1)
                  .map((_, index) => (
                    <Fragment key={`content${index + 1}`}>
                      {HwiData[hiwActive][`content${index + 1}`] ? (
                        <li className="text-white font-Montserrat text-justify mt-4 list-disc">
                          {HwiData[hiwActive][`content${index + 1}`]}
                        </li>
                      ) : null}
                    </Fragment>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <div className="block md:hidden mx-3">
        <PaginationCarousel2 data={HwiData} />
      </div>
    </>
  );
}
