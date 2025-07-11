"use client";
import React from "react";
import { sortList } from "./Experts.constants";
import { TList } from "./Experts.types";
import useSearchQuery from "@nyx-frontend/main/hooks/useSearchQuery";

const SortList: React.FC<{ data: TList }> = ({ data }) => {
  const { updateSearch } = useSearchQuery();

  const onClick = () => {
    updateSearch("sort", data.value);
  };

  return (
    <li
      onClick={onClick}
      className="flex w-full p-2 text-sm cursor-pointer text-white hover:bg-[#192f73] hover:text-nyx-yellow"
    >
      <span>{data.label}</span>
    </li>
  );
};

export default function Sort() {
  return (
    <div className="relative group">
      <span className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="50"
          viewBox="0 0 18 16"
          fill="none"
        >
          <path
            d="M8.00106 16C7.71772 16 7.48022 15.9042 7.28856 15.7125C7.09689 15.5208 7.00106 15.2833 7.00106 15V9L1.20106 1.6C0.951057 1.26667 0.913557 0.916667 1.08856 0.55C1.26356 0.183333 1.56772 0 2.00106 0H16.0011C16.4344 0 16.7386 0.183333 16.9136 0.55C17.0886 0.916667 17.0511 1.26667 16.8011 1.6L11.0011 9V15C11.0011 15.2833 10.9052 15.5208 10.7136 15.7125C10.5219 15.9042 10.2844 16 10.0011 16H8.00106ZM9.00106 8.3L13.9511 2H4.05106L9.00106 8.3Z"
            fill="white"
          />
        </svg>
      </span>
      <div className="hidden group-hover:block absolute z-10 w-60 right-0 ml-2 bg-[#091234]">
        <ul>
          {sortList.map((list) => (
            <SortList key={list.value} data={list} />
          ))}
        </ul>
      </div>
    </div>
  );
}
