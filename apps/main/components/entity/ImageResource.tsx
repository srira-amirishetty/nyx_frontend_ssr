/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { observer } from "mobx-react";

type ImageResourceProps = {
  image: string;
  index: number;
};
export const ImageResource = observer(
  ({ image, index }: ImageResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLImageElement>(null);
    const [resolution, setResolution] = React.useState({ w: 0, h: 0 });
    const [imageClick, setImageClick] = useState<boolean>(false);
    const [imageClickIndex, setImageClickIndex] = useState(null);

    const imageSelected = (index: any) => {
      store.addImage(index);
      setImageClick(true);
      setImageClickIndex(index);
    };

    return (
      <button
        className={`rounded-lg flex flex-col bg-[#1D1138] w-[125px] h-[115px] relative ${imageClick && imageClickIndex === index ? "border-2 border-nyx-sky" : ""}`}
        onClick={() => imageSelected(index)}
      >
        <div className="bg-transparent text-white py-1 absolute text-sm top-2 right-2">
          {resolution.w}x{resolution.h}
        </div>

        <img
          onLoad={() => {
            setResolution({
              w: ref.current?.naturalWidth ?? 0,
              h: ref.current?.naturalHeight ?? 0,
            });
          }}
          ref={ref}
          className="w-[125px] rounded-lg h-[80px] object-scale-down"
          src={image}
          height={80}
          width={200}
          id={`image-${index}`}
          alt="image"
        ></img>
        <p className="text-white text-center w-full pt-2">Image {index + 1}</p>
      </button>
    );
  },
);
