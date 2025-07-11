import React from "react";
import classNames from "@nyx-frontend/main/utils/classNames";

const MultipletgTab = ({ data, activeTg, setActiveTg }) => {
  return (
    <div
      className={`w-full flex gap-6 justify-center whitespace-nowrap md:whitespace-normal`}
    >
      {data?.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="w-auto text-center cursor-pointer"
          onClick={() => setActiveTg(index)}
        >
          <div
            className={classNames(
              "xl:border-b-2 text-base mt-1  flex flex-col justify-center items-center gap-1 ",
              index == activeTg
                ? "text-[#FFC01D] border-[#FFC01D] font-bold"
                : "text-white border-none font-normal"
            )}
          >
            <p className="text-sm leading-[15px] pt-1 xl:pt-[8px] pb-[12px]">
              {item.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipletgTab;
