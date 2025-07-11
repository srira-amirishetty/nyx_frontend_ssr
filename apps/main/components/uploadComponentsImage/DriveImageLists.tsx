/* eslint-disable @next/next/no-img-element */
import {
  TDriveImageList,
  TDriveImageListProps,
  TDriveImageListsProps,
} from "./DriveImageLists.types";
import { getDriveImageService } from "@nyx-frontend/main/services/imageSerice";
import classNames from "@nyx-frontend/main/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export function DriveImageList({ data, onSelect, selectedItem }: TDriveImageListProps) {
  const { name, size,url } = data;
  const onClick = () => {
    onSelect(data);
  };

  return (
    <div
      className={classNames(
        `w-[100px] md:w-[155px] h-[130px] md:h-[186px] bg-[#3B226F] py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2`,
        selectedItem?.name === name ? "bg-[#5E32FF]" : ""
      )}
      onClick={onClick}
    >
      <img
        className="w-[90px] md:w-[141px] h-[105px] rounded-lg"
        src={url}
        alt="AI Generated Image"
        decoding="async"
        loading="lazy"
      />
      <div className="flex flex-col w-full p-2">
        <p className="text-[#FFF] text-xs md:text-sm">
          {name.slice(0, 8) + "..."}
        </p>
        <p className="text-[#FFF] text-xs md:text-sm">
          {(size / 1048576).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
}

export default function DriveLists({ onSelect }: TDriveImageListsProps) {
  const [selectedItem, setSelected] = useState<TDriveImageList | any>();
  const { data, isSuccess } = useQuery({
    queryKey: ["drive-data"],
    queryFn: getDriveImageService,
    select: (response) => response?.banners,
  });

  const onDriveListSelect = (data: TDriveImageList) => {
    onSelect(data);
    setSelected(data);
  };

  if (!data?.length) return null;

  return (
    <>
      <div
        className={`grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-3 my-3 overflow-y-auto overflow-x-hidden ${
          isSuccess ? "h-[380px]" : "h-0"
        }`}
      >
        {data?.map((list: Exclude<TDriveImageList, "index">, index: number) => (
          <DriveImageList
            data={{ ...list, index }}
            key={list.name}
            onSelect={onDriveListSelect}
            selectedItem={selectedItem}
          />
        ))}
      </div>
    </>
  );
}
