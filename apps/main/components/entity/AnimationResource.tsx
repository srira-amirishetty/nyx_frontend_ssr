"use client";
import React from "react";
import { StoreContext } from "@nyx-frontend/main/store";
// import { formatTimeToMinSec } from "@nyx-frontend/main/utils";
import { observer } from "mobx-react";
import { MdDelete } from "react-icons/md";
import {
  Animation,
  FadeInAnimation,
  FadeOutAnimation,
  SlideDirection,
  SlideInAnimation,
  SlideOutAnimation,
  SlideTextType,
} from "@nyx-frontend/main/types";
import Select from "react-select";
import { StylesConfig } from "react-select";

const colourStyles: StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "2px solid #8297BD",
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  // @ts-ignore
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    marginTop: "-50px",
    height: "120px",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

const directionOption = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
];

const typeOption = [
  { value: "none", label: "None" },
  { value: "character", label: "Character" },
];

const ANIMATION_TYPE_TO_LABEL: Record<string, string> = {
  fadeIn: "Fade In",
  fadeOut: "Fade Out",
  slideIn: "Slide In",
  slideOut: "Slide Out",
  breath: "Breath",
};
export type AnimationResourceProps = {
  animation: Animation;
};
export const AnimationResource = observer((props: AnimationResourceProps) => {
  const store = React.useContext(StoreContext);
  return (
    <div className="rounded-lg overflow-hidden items-center bg-[#1D1138] my-[15px] flex flex-col relative min-h-[100px] p-2">
      <div className="flex flex-row justify-between w-full">
        <div className="text-white py-1 text-base text-left w-full font-bold">
          {ANIMATION_TYPE_TO_LABEL[props.animation.type]}
        </div>
        <button
          className="hover:bg-[#5E32FF] rounded z-10 text-white font-bold py-1 text-lg"
          onClick={() => store.removeAnimation(props.animation.id)}
        >
          <MdDelete size="25" />
        </button>
      </div>
      {props.animation.type === "fadeIn" ||
      props.animation.type === "fadeOut" ? (
        <FadeAnimation
          animation={props.animation as FadeInAnimation | FadeOutAnimation}
        />
      ) : null}
      {props.animation.type === "slideIn" ||
      props.animation.type === "slideOut" ? (
        <SlideAnimation
          animation={props.animation as SlideInAnimation | SlideOutAnimation}
        />
      ) : null}
      {props.animation.type === "breathe" ? (
        <div className="text-white font-bold">Breath</div>
      ) : null}
    </div>
  );
});

export const FadeAnimation = observer(
  (props: { animation: FadeInAnimation | FadeOutAnimation }) => {
    const store = React.useContext(StoreContext);
    return (
      <div className="flex flex-col w-full items-start">
        {/* duration */}
        <div className="flex flex-row items-center justify-center gap-2 my-1">
          <div className="text-white text-base">Duration(sec) :</div>
          <input
            className="rounded-md border-2 border-[#8297BD] bg-transparent px-2 text-white w-16 h-[39px]"
            type="number"
            value={props.animation.duration / 1000}
            onChange={(e) => {
              const duration = Number(e.target.value) * 1000;
              const isValidDuration = duration > 0;
              let newDuration = isValidDuration ? duration : 0;
              if (newDuration < 10) {
                newDuration = 10;
              }
              store.updateAnimation(props.animation.id, {
                ...props.animation,
                duration: newDuration,
              });
            }}
          />
        </div>
      </div>
    );
  },
);

// Animation has direction 'left', 'right', 'top', 'bottom' in properties
// These properties can be selected by select element
export const SlideAnimation = observer(
  (props: { animation: SlideInAnimation | SlideOutAnimation }) => {
    const store = React.useContext(StoreContext);
    return (
      <div className="flex flex-col w-full items-start">
        <div className="w-1/2 flex flex-row items-center gap-2 my-1">
          <div className="text-white text-base">Duration(sec) :</div>
          <input
            className="rounded-md border-2 border-[#8297BD] bg-transparent px-2 text-white w-16 h-[39px]"
            type="number"
            value={props.animation.duration / 1000}
            onChange={(e) => {
              const duration = Number(e.target.value) * 1000;
              const isValidDuration = duration > 0;
              let newDuration = isValidDuration ? duration : 0;
              if (newDuration < 10) {
                newDuration = 10;
              }
              store.updateAnimation(props.animation.id, {
                ...props.animation,
                duration: newDuration,
              });
            }}
          />
        </div>
        <div className="w-1/2 flex flex-row items-center gap-2 my-1">
          <div className="text-white text-base">Direction :</div>
          <Select
            className="text-sm md:text-base"
            options={directionOption}
            styles={colourStyles}
            //value={props.animation.properties.direction}
            onChange={(selectedOption: any) => {
              store.updateAnimation(props.animation.id, {
                ...props.animation,
                properties: {
                  ...props.animation.properties,
                  direction: selectedOption.value as SlideDirection, // Cast it to SlideDirection if needed
                },
              });
            }}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>

        <div className="w-1/2 flex flex-row items-center my-1">
          <div className="text-white text-base">Use Mask :</div>
          <input
            className="bg-slate-100 text-black rounded-lg px-2 py-1 ml-2 w-16 text-xs"
            type="checkbox"
            checked={props.animation.properties.useClipPath}
            onChange={(e) => {
              store.updateAnimation(props.animation.id, {
                ...props.animation,
                properties: {
                  ...props.animation.properties,
                  useClipPath: e.target.checked,
                },
              });
            }}
          />
        </div>
        <div className="w-1/2 flex flex-row items-center gap-2 my-1">
          <div className="text-white text-base">Type :</div>
          <Select
            className="text-sm md:text-base"
            options={typeOption}
            styles={colourStyles}
            menuPlacement="top"
            //value={props.animation.properties.textType}
            onChange={(e: any) => {
              store.updateAnimation(props.animation.id, {
                ...props.animation,
                properties: {
                  ...props.animation.properties,
                  textType: e.value as SlideTextType,
                },
              });
            }}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      </div>
    );
  },
);

export const BreatheAnimation = observer(() => {
  return <div className="flex flex-col w-full items-start"></div>;
});
