import React from "react";

function NxyAdvantage({ data }) {
  return (
    <div className="flex flex-wrap justify-around gap-2 md:gap-0 mb-16">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col bg-transparent justify-between border border-amber-400 rounded-xl w-[48%] md:w-[24%] h-[225px] md:h-[296px]"
          >
            <div className="flex flex-col text-amber-400 text-lg md:text-2xl py-12 px-2 md:px-5 font-semibold h-[50%] md:h-[60%]">
              <h2>{item.title1}</h2>
              <h2>{item.title2}</h2>
            </div>
            <p className="text-white text-sm md:text-[15px] md:text-base py-4 md:py-6 px-2 md:px-5 xl:w-[80%] h-[50%]">
              {item.data}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default NxyAdvantage;
