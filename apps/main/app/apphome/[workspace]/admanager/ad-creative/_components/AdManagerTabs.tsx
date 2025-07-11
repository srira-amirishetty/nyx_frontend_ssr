import React from "react";
import classNames from "@nyx-frontend/main/utils/classNames";
import { MEDIA_TABS_AD_MANAGER } from "@nyx-frontend/main/utils/utils";


const ADManagerTabs = ({
  data,
  activeTabName,
  onTabChange,
}: {
  data: string[];
  activeTabName: string;
  onTabChange: (newActiveTab: string) => void;
}) => {
  return (
    <div
      className={`flex gap-6 rounded-t-lg items-center justify-center whitespace-nowrap md:whitespace-normal h-[35px] xl:h-[61px] pt-[18px]`}
    >
      {data?.map((item: string, index: number) => (
        <div
          key={`${item}-${index}`}
          className="w-auto text-center cursor-pointer"
          onClick={() => onTabChange(item)}
        >
          <div
            className={classNames(
              "xl:border-b-2 text-base mt-[-5px]  flex flex-col justify-center items-center gap-1 ",
              item == activeTabName
                ? "text-[#FFC01D] border-[#FFC01D] font-bold"
                : "text-white border-none font-normal",
            )}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  MEDIA_TABS_AD_MANAGER.find(
                    (media) =>
                      media?.name?.toLowerCase() === item.toLowerCase(),
                  )?.logo ?? "",
              }}
            />
            <p className="text-xs leading-[10px] pt-1 xl:pt-[3px] pb-[12px]">
              {item}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ADManagerTabs;
