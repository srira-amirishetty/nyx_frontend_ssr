/* eslint-disable react-hooks/exhaustive-deps */
import {
  TDriveList,
  TDriveListProps,
  TDriveListsProps,
} from "./DriveLists.types";
import { driveUploadService } from "@nyx-frontend/main/services/uploadService";
import classNames from "@nyx-frontend/main/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export function DriveList({ data, onSelect, selectedItem }: TDriveListProps) {
  const { index, name, size } = data;
  const onClick = () => {
    onSelect(data);
  };

  return (
    <div
      className={classNames(
        `w-[100px] md:w-[155px] h-[130px] md:h-[186px] bg-[#3B226F] py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2`,
        selectedItem?.index === index ? "bg-[#5E32FF]" : "",
      )}
      onClick={onClick}
    >
      <div className="w-[90px] md:w-[141px] h-[105px] bg-[#FFCB54] rounded-md flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 38 48"
          fill="#000"
          className="w-[20px] h-[30px] md:w-[38px] md:h-[48px]"
        >
          <path
            d="M12.7416 48C9.33434 48 6.41752 46.9556 3.99114 44.8667C1.56475 42.7778 0.351562 40.2667 0.351562 37.3333C0.351562 34.4 1.56475 31.8889 3.99114 29.8C6.41752 27.7111 9.33434 26.6667 12.7416 26.6667C13.929 26.6667 15.026 26.7889 16.0327 27.0333C17.0394 27.2778 18.0074 27.6444 18.9366 28.1333V0H37.5217V10.6667H25.1316V37.3333C25.1316 40.2667 23.9185 42.7778 21.4921 44.8667C19.0657 46.9556 16.1489 48 12.7416 48Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="flex flex-col w-full p-2">
        <p className="text-[#FFF] text-xs md:text-sm">
          {name.slice(0, 8) + "..."}
        </p>
        <p className="text-[#FFF] text-xs md:text-sm">
          {(size).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
}

export default function DriveLists({ onSelect }: TDriveListsProps) {
  const [selectedItem, setSelected] = useState<TDriveList | any>();
  const { data, isSuccess } = useQuery({
    queryKey: ["drive-data"],
    queryFn: () =>
      driveUploadService(Number(localStorage.getItem("workspace_id"))),
    select: (response) => response,
  });

  const onDriveListSelect = (data: TDriveList) => {
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
        {data?.map((list: Exclude<TDriveList, "index">, index: number) => (
          <DriveList
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
