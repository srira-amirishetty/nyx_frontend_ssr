/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { StoreContext } from "@nyx-frontend/main/store";
// import { formatTimeToMinSec } from "@nyx-frontend/main/utils";
import { observer } from "mobx-react";
import { VideoEditorElement, ImageEditorElement, EffecType } from "@nyx-frontend/main/types";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const EFFECT_TYPE_TO_LABEL: Record<string, string> = {
  blackAndWhite: "Black and White",
  none: "None",
  saturate: "Saturate",
  sepia: "Sepia",
  invert: "Invert",
};
export type EffectResourceProps = {
  editorElement: VideoEditorElement | ImageEditorElement;
};
export const EffectResource = observer((props: EffectResourceProps) => {
  const store = React.useContext(StoreContext);
  return (
    <>
      <div className="w-full flex flex-wrap gap-5">
        <div className="w-[100px] h-[100px] rounded-md">
          <button
            className={`border-2 border-transparent hover:border-nyx-sky active:border-nyx-sky focus:border-nyx-sky flex flex-col gap-1 transition-colors text-sm cursor-pointer text-center rounded-md hover:shadow-gray-800 shadow-none hover:shadow-md w-full`}
            onClick={() => {
              const type = "blackAndWhite";
              store.updateEffect(props.editorElement.id, {
                type: type as EffecType,
              });
            }}
          >
            <img
              src={`${IMAGE_URL}/canvas/blackNwhite.png`}
              alt="imges"
              className="w-[100%] h-[67px] rounded-md"
            />
          </button>
          <div className="text-center font-normal text-xs text-white my-1">
            Black & White
          </div>
        </div>
        <div className="w-[100px] h-[100px] rounded-md">
          <button
            className={`border-2 border-transparent hover:border-nyx-sky active:border-nyx-sky focus:border-nyx-sky flex flex-col gap-1 transition-colors text-sm cursor-pointer text-center rounded-md hover:shadow-gray-800 shadow-none hover:shadow-md w-full`}
            onClick={() => {
              const type = "saturate";
              store.updateEffect(props.editorElement.id, {
                type: type as EffecType,
              });
            }}
          >
            <img
              src={`${IMAGE_URL}/canvas/saturate.png`}
              alt="imges"
              className="w-[100%] h-[67px] rounded-md"
            />
          </button>
          <div className="text-center font-normal text-xs text-white my-1">
            Saturate
          </div>
        </div>
        <div className="w-[100px] h-[100px] rounded-md">
          <button
            className={`border-2 border-transparent hover:border-nyx-sky active:border-nyx-sky focus:border-nyx-sky flex flex-col gap-1 transition-colors text-sm cursor-pointer text-center rounded-md hover:shadow-gray-800 shadow-none hover:shadow-md w-full`}
            onClick={() => {
              const type = "sepia";
              store.updateEffect(props.editorElement.id, {
                type: type as EffecType,
              });
            }}
          >
            <img
              src={`${IMAGE_URL}/canvas/sepia.png`}
              alt="imges"
              className="w-[100%] h-[67px] rounded-md"
            />
          </button>
          <div className="text-center font-normal text-xs text-white my-1">
            Sepia
          </div>
        </div>
        <div className="w-[100px] h-[100px] rounded-md">
          <button
            className={`border-2 border-transparent hover:border-nyx-sky active:border-nyx-sky focus:border-nyx-sky flex flex-col gap-1 transition-colors text-sm cursor-pointer text-center rounded-md hover:shadow-gray-800 shadow-none hover:shadow-md w-full`}
            onClick={() => {
              const type = "invert";
              store.updateEffect(props.editorElement.id, {
                type: type as EffecType,
              });
            }}
          >
            <img
              src={`${IMAGE_URL}/canvas/invert.png`}
              alt="imges"
              className="w-[100%] h-[67px] rounded-md"
            />
          </button>
          <div className="text-center font-normal text-xs text-white my-1">
            Invert
          </div>
        </div>
        <div className="w-[100px] h-[100px] rounded-md">
          <button
            className={`border-2 border-transparent hover:border-nyx-sky active:border-nyx-sky focus:border-nyx-sky flex flex-col gap-1 transition-colors text-sm cursor-pointer text-center rounded-md hover:shadow-gray-800 shadow-none hover:shadow-md w-full`}
            onClick={() => {
              const type = "none";
              store.updateEffect(props.editorElement.id, {
                type: type as EffecType,
              });
            }}
          >
            <img
              src={`${IMAGE_URL}/canvas/saturate.png`}
              alt="imges"
              className="w-[100%] h-[67px] rounded-md"
            />
          </button>
          <div className="text-center font-normal text-xs text-white my-1">
            None
          </div>
        </div>
      </div>
    </>
  );
});
