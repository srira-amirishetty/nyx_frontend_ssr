// TableRow.js

import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const TableRow = () => {
  return (
    <tr
      className="w-full mt-2 rounded-md py-2 px-4"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
      }}
    >
      <td className="px-6 py-4">
        <div className="w-[40px] h-[20px] bg-[#3B226F] rounded-lg"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-[250px] h-[20px] bg-[#3B226F] rounded-lg"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-[100px] h-[20px] bg-[#3B226F] rounded-lg"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-[100px] h-[20px] bg-[#3B226F] rounded-lg"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-[50px] h-[20px] bg-[#3B226F] rounded-lg"></div>
      </td>
      <td className="px-6 py-4"></td>
    </tr>
  );
};

export const CardSkele = () => {
  return (
    <div className=" w-[258px] h-[320px] rounded-lg">
      <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
        <div>
          <Skeleton
            animation="wave"
            baseColor="rgba(255, 255, 255, 0.09)"
            className="w-[300px] h-[300px] rounded-lg"
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};
