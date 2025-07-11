"use client";
import React from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { observer } from "mobx-react";
import { AnimationResource } from "../entity/AnimationResource";
import { getUid } from "@nyx-frontend/main/utils";

export const AnimationsPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedElement = store.selectedElement;
  const selectedElementAnimations = store.animations.filter((animation) => {
    return animation.targetId === selectedElement?.id;
  });

  return (
    <>
      {selectedElement ? (
        <div className="w-full flex flex-wrap gap-5">
          <button
            className="text-base w-full p-2 bg-[#1D1138] text-center rounded-md font-semibold hover:bg-nyx-sky active:bg-nyx-sky focus:bg-nyx-sky text-white cursor-pointer"
            onClick={() => {
              store.addAnimation({
                id: getUid(),
                type: "fadeIn",
                targetId: selectedElement?.id ?? "",
                duration: 1000,
                properties: {},
              });
            }}
          >
            Add Fade In
          </button>

          <button
            className="text-sm w-full p-2 bg-[#1D1138] text-center rounded-md font-semibold hover:bg-nyx-sky active:bg-nyx-sky focus:bg-nyx-sky text-white cursor-pointer"
            onClick={() => {
              store.addAnimation({
                id: getUid(),
                type: "fadeOut",
                targetId: selectedElement?.id ?? "",
                duration: 1000,
                properties: {},
              });
            }}
          >
            Add Fade Out
          </button>

          <button
            className="text-sm w-full p-2 bg-[#1D1138] text-center rounded-md font-semibold hover:bg-nyx-sky active:bg-nyx-sky focus:bg-nyx-sky text-white cursor-pointer"
            onClick={() => {
              store.addAnimation({
                id: getUid(),
                type: "slideIn",
                targetId: selectedElement?.id ?? "",
                duration: 1000,
                properties: {
                  direction: "left",
                  useClipPath: false,
                  textType: "none",
                },
              });
            }}
          >
            Add Slide In
          </button>

          <button
            className="text-sm w-full p-2 bg-[#1D1138] text-center rounded-md font-semibold hover:bg-nyx-sky active:bg-nyx-sky focus:bg-nyx-sky text-white cursor-pointer"
            onClick={() => {
              store.addAnimation({
                id: getUid(),
                type: "slideOut",
                targetId: selectedElement?.id ?? "",
                duration: 1000,
                properties: {
                  direction: "right",
                  useClipPath: false,
                  textType: "none",
                },
              });
            }}
          >
            Add Slide Out
          </button>

          <button
            className="text-sm w-full p-2 bg-[#1D1138] text-center rounded-md font-semibold hover:bg-nyx-sky active:bg-nyx-sky focus:bg-nyx-sky text-white cursor-pointer"
            onClick={() => {
              store.addAnimation({
                id: getUid(),
                type: "breathe",
                targetId: selectedElement?.id ?? "",
                duration: 1000,
                properties: {},
              });
            }}
          >
            Add Breathing
          </button>
        </div>
      ) : (
        <div className="w-full text-white">Please Select Image/Video First</div>
      )}

      <div className="w-full">
        {selectedElementAnimations.map((animation) => {
          return <AnimationResource key={animation.id} animation={animation} />;
        })}
      </div>
    </>
  );
});
