/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";

const nameToImageUrl = {
  Images: IMAGE_URL + "/assets/images/home/AssetsImages.svg",
  Videos: IMAGE_URL + "/assets/images/home/AssetsVideo.svg",
  Lyrics: IMAGE_URL + "/assets/images/home/AssetsLyric.svg",
  Music: IMAGE_URL + "/assets/images/home/AssetsMusic.svg",
};

const Card = ({ assetfolders }) => {
  const [workspace, setworkspace] = useState();

  useEffect(() => {
    const workspacename = localStorage.getItem("workspace_name");
    setworkspace(workspacename);
  }, []);

  return (
    <>
      {assetfolders &&
        assetfolders.map((item) => (
          <>
            <Link
              href={`/apphome/${workspace}/assets-files?id=${item.folder_id}&&type=${item.name}`}
            >
              <div
                key={item.folder_id}
                className="bg-[#332270] rounded-md flex flex-col items-center 
                    p-5 text-[#FFFFFF] hover:text-[#FFC01D] cursor-pointer hover:font-semibold font-medium transform transition 
                    duration-500 hover:scale-90"
              >
                <div
                  className="w-[239px] h-[224px] rounded-[10px] flex items-center justify-center"
                  style={{
                    background: "rgba(163, 136, 197, 0.5)",
                  }}
                >
                  <Image
                    className="w-[120px] h-[120px]"
                    src={nameToImageUrl[item.name]}
                    alt={item.name}
                    width={235}
                    height={220}
                  />
                </div>
                <div className="w-full text-xl text-center p-5">
                  {item.name}
                </div>
              </div>
            </Link>
          </>
        ))}
    </>
  );
};

export default Card;
