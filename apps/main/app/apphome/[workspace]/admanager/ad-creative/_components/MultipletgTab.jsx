import React from "react";
import classNames from "@nyx-frontend/main/utils/classNames";

const MultipletgTab = ({ data, activeTg, setActiveTg }) => {
  return (
    <div className="w-full flex justify-center">
      {data?.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex-1 text-center cursor-pointer min-w-0"
          onClick={() => setActiveTg(item.id)}
          title={item.name} // Tooltip for full text on hover
        >
          <div
            className={classNames(
              "text-base flex flex-col px-4 justify-center items-center",
              item.id == activeTg
                ? "border-b-[2px] text-[#FFC01D] border-[#FFC01D] font-bold"
                : "border-b-[1px] text-white border-[#8297BD] font-normal"
            )}
          >
            <p className="text-sm leading-[15px] pt-1 xl:pt-[8px] pb-[12px] truncate w-full">
              {item.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipletgTab;
