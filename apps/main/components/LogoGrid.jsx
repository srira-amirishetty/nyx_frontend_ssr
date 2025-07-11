/* eslint-disable @next/next/no-img-element */
import React from "react";

function LogoGrid({ data, cols = 3, smcols = 3 }) {
  let smCols = "grid-cols-" + smcols;
  let mdCols = "md:grid-cols-" + cols;
  return (
    <>
      <div
        className={`mt-14 mx-auto grid gap-y-10 gap-4 md:gap-x-8 md:max-w-none ${smCols} ${mdCols}`}
      >
        {data?.map((item, index) => (
          <div
            key={index}
            className="text-center sm:text-left lg:block lg:text-center"
          >
            <div className="sm:flex-shrink-0">
              <div className="flow-root">
                <img
                  className="w-12 md:w-20 mx-auto"
                  // style={{ height: "50px", width: "89px" }}
                  src={item.icon}
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="mt-3 sm:ml-6 lg:mt-6 lg:ml-0">
              <h3 className="text-sm md:text-lg font-normal ">{item.title}</h3>
              <p className="mt-2 text-xs font-light text-gray-300">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LogoGrid;
