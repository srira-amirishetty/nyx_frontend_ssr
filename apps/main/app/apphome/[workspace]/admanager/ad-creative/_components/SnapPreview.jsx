/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
const SnapPreview = ({
  headlines,
  descriptions,
  captions,
  previewImage,
  previewVideo
}) => {
  return (
    <>
      <div className="w-full bg-white">
        <p className="w-full text-center font-semibold">Snap</p>
        <div className="w-full flex">
          <div className="w-full">
            <p className="w-full font-semibold">Headline</p>
            {headlines.map((headline, index) => (
              <p key={index} className="text-green-600">
                {headline}
              </p>
            ))}
          </div>
          <div className="w-full">
            <p className="w-full font-semibold">Description</p>
            {descriptions.map((description, index) => (
              <p key={index} className="text-red-600">
                {description}
              </p>
            ))}
          </div>
          <div className="w-full">
            <p className="w-full font-semibold">Caption</p>
            {captions.map((caption, index) => (
              <p key={index} className="text-blue-600">
                {caption}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full p-10">
          <p className="w-full font-semibold">Image</p>
          {previewImage.preview === "image" ? (
            <img
              src={previewImage.data}
              alt="PreviewImage"
              className="w-full h-[300px] object-contain"
            />
          ) : previewVideo.preview === "video" ? (
            <video
              src={previewVideo.data}
              alt="PreviewVideo"
              className="w-full h-[300px] object-contain"
              controls={false}
              loop={false}
              autoPlay={true}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SnapPreview;
