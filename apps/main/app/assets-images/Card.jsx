/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { getAssetMedia } from "@nyx-frontend/main/services/asset";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
const brandVision = IMAGE_URL + "/assets/home/brandvision.png";

const Card = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: async () => {
      const res = await getAssetMedia(id,localStorage.getItem("workspace_id"));
      return res;
    },
  });

  return (
    <>
      {data?.media.length != 0 ? (
        <table className="min-w-[100%]  text-white">
          <thead className="text-[#FFCB54]">
            <tr>
              <th className="w-[55%] text-start">Name</th>
              <th className="w-[20%] text-start">Date Created</th>
              <th className="w-[20%] text-start">Size</th>
              <th className="w-[10%] text-start"></th>
            </tr>
            {data?.media?.map((item) => {
              return (
                <tr key={item.fileName} className="bg-[#3B236F] p-4 text-white">
                  <td className=" p-4 text-start flex">
                    <Image
                      className="rounded-lg w-[55px] h-[55px] "
                      src={brandVision}
                      alt="Brand Vision"
                      width={55}
                      height={55}
                    />
                    <div className="ml-4">
                      <p>{item.fileName}</p> <p>1344 x 768</p>
                    </div>
                  </td>
                  <td className="text-start">26 Jan 2024</td>
                  <td className=" text-start">{item.size}</td>
                  <td className=" text-start">
                    <select className="bg-[#3B236F] appearance-none">
                      <option>...</option>
                      <option>Rename</option>
                      <option>Download</option>
                      <option>Share</option>
                      <option>Delete</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      ) : (
        <>
          <table className="min-w-[100%]  text-white">
            <thead className="text-[#FFCB54]">
              <tr>
                <th className="w-[55%] text-start">Name</th>
                <th className="w-[20%] text-start">Date Created</th>
                <th className="w-[20%] text-start">Size</th>
                <th className="w-[10%] text-start"></th>
              </tr>
            </thead>
          </table>
          <div className="flex justify-center items-center">
            <p className="text-[#FFCB54] font-bold text-[24px] mt-16">
              There are no asset of this type, generate some now!
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
