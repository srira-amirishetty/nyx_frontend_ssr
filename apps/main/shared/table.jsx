"use client"
import { useEffect } from "react";
function Table(props) {
  return (
    <div className="bg-inputbg h-full p-5" style={{ width: `${props.width}%` }}>
      <div className="flex gap-5">
        {props.header.map((header) => (
          <p className="text-white text-sm w-[20%]">{header}</p>
        ))}
      </div>
      <div className="flex gap-5">
        {props.data.map((data) => (
          <table>
            <tr>
              <th className="text-white w-[20%]">{data.name}</th>
              <th className="text-white w-[20%]">{data.Listing_Amount}</th>
            </tr>
          </table>
        ))}
      </div>
    </div>
  );
}

export default Table;
