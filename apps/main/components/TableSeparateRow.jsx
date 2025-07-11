/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { IMAGE_URL } from "./constants";
import { useRouter } from "next/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Share = IMAGE_URL + "/assets/images/artists/share.png";

function TableSeparateRow({ header, data }) {
  const navigate = useRouter();
  return (
    <ul className="overflow-x-auto w-[80rem] md:w-auto">
      <li className="py-2 text-center bg-new border border-blue rounded">
        <div className="flex items-center space-x-4">
          {header.map((item, index) => (
            <div className="flex-1 min-w-0" key={"tr-" + index}>
              <p className="text-base font-semibold text-white">{item}</p>
            </div>
          ))}
        </div>
      </li>

      {data.map((item, index) => (
        <li
          className="py-2 my-4 text-center border border-blue rounded"
          key={item.token_name + index}
        >
          <div className="flex items-center">
            <div className="flex-1 min-w-0">
              <img
                className="h-8 w-8 rounded-full mx-auto"
                src={item.img_src}
                alt={item.img_src}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-base text-white">{item.token_name}</p>
              <p className="text-sm text-gray-400">{item.artist_name}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base text-white">{item.total_streamers}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base  text-[#31C7C8]">{item.target_return}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base  text-[#31C7C8]">{item.total_share}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base  text-[#31C7C8]">{item.streams_earned}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base  text-[#31C7C8]">
                {item.incentive_earned}
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <span onClick={() => navigate("")}>
                <LazyLoadImage className="mx-auto" src={Share}></LazyLoadImage>
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TableSeparateRow;
