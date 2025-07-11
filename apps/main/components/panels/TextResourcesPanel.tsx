"use client";
import React, { useState } from "react";
import { observer } from "mobx-react";
import Select from "react-select";
import { StylesConfig } from "react-select";
import useFont from "@nyx-frontend/main/hooks/useFont";
import { motion } from "framer-motion";
import ItalicIcon from "./_components/ItalicIcon";
import BoldIcon from "./_components/BoldIcon";
import UnderlineIcon from "./_components/UnderlineIcon";
import { StoreContext } from "@nyx-frontend/main/store";
import TextColorIcon from "./_components/TextColorIcon";
import BgColorIcon from "./_components/BgColorIcon";
import TextBackground from "./_components/TextBackground";
import { SketchPicker } from "react-color";
import classNames from "@nyx-frontend/main/utils/classNames";

const colourStyles: StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #fff",
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
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
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

const FONT_BASE = 20;

export const TextResourcesPanel = observer(() => {
  const fonts = useFont();
  const store = React.useContext(StoreContext);
  const selectedElement = store.selectedElement;
  const [fontSize, setFontSize] = useState(FONT_BASE);
  const [open, setOpen] = useState<boolean>(false);
  const [openTextBg, setOpenTextBg] = useState<boolean>(false);
  const [opentextColor, setOpentextColor] = useState<boolean>(false);

  const [canvaColor, setCanvaColor] = useState<string>("#fff");
  const [textColor, setTextColor] = useState<string>("#fff");
  const [textBgColor, setTextBgColor] = useState<string>("#fff");

  const canvaColorChange = (color: { hex: string }) => {
    setCanvaColor(color.hex);
    store.setBackgroundColor(color.hex);
  };

  const textBgColorChange = (color: { hex: string }) => {
    setTextBgColor(color.hex);
    store.updateProps("backgroundColor", color.hex);
  };

  const textColorChange = (color: { hex: string }) => {
    setTextColor(color.hex);
    store.updateProps("fill", color.hex);
  };

  const onFontIncreaseHandler = () => {
    const newFontSize = fontSize + 1;
    store.updateProps("fontSize", newFontSize);
    setFontSize(newFontSize);
  };

  const onFontDecreaseHandler = () => {
    const newFontSize = fontSize - 1;
    store.updateProps("fontSize", newFontSize);
    setFontSize(newFontSize);
  };

  const onSelectFont = (e: any) => {
    store.updateProps("fontFamily", e.value);
  };

  const leftAlignClick = () => {
    store.updateProps("textAlign", "left");
  };
  const centerAlignClick = () => {
    store.updateProps("textAlign", "center");
  };
  const rightAlignClick = () => {
    store.updateProps("textAlign", "right");
  };
  const justifyAlignClick = () => {
    store.updateProps("textAlign", "justify");
  };
  const boldClick = () => {
    // @ts-ignore
    const currentFontWeight = selectedElement?.fabricObject?.get("fontWeight");
    const newFontWeight = currentFontWeight === "bold" ? "normal" : "bold";
    store.updateProps("fontWeight", newFontWeight);
  };
  const italicClick = () => {
    // @ts-ignore
    const currentFontStyle = selectedElement?.fabricObject?.get("fontStyle");
    const newFontStyle = currentFontStyle === "italic" ? "normal" : "italic";
    store.updateProps("fontStyle", newFontStyle);
  };
  const underlineClick = () => {
    // @ts-ignore
    const fabricObject = selectedElement?.fabricObject;
    // @ts-ignore
    const underline = fabricObject.get("underline");
    store.updateProps("underline", !underline);
  };
  const capitalCaseClick = () => {
    // @ts-ignore
    const text = selectedElement?.fabricObject?.get("text").toUpperCase();
    store.updateProps("text", text);
  };
  const lowerCaseClick = () => {
    // @ts-ignore
    const text = selectedElement?.fabricObject?.get("text").toLowerCase();
    store.updateProps("text", text);
  };

  const toCamelCase = (str: any) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: any, index: any) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };
  const camelCaseClick = () => {
    // @ts-ignore
    const camelCaseText = toCamelCase(
      // @ts-ignore
      selectedElement?.fabricObject?.get("text"),
    );
    store.updateProps("text", camelCaseText);
  };

  return (
    <div className="relative w-full bg-transparent h-full">
      <button
        className="text-nyx-yellow bg-black w-full text-bold p-2 text-center rounded-lg"
        onClick={() => {
          store.addText({
            text: "Text",
            fontSize: FONT_BASE,
            fontWeight: 600,
            textAlign: "left",
            fill: "#fff",
            backgroundColor: "transparent",
            fontFamily: "Times New Roman",
            underline: false,
            fontStyle: "normal",
          });
          setFontSize(20);
        }}
      >
        Add a text box
      </button>
      <div className="flex flex-row gap-2 mt-10">
        <div className="w-2/3">
          <Select
            placeholder="Select font style"
            className="text-sm md:text-base"
            options={fonts.map((font) => ({ label: font, value: font }))}
            styles={colourStyles}
            components={{
              IndicatorSeparator: () => null,
            }}
            onChange={onSelectFont}
          />
        </div>

        <div className="flex w-1/3">
          <button
            onClick={onFontDecreaseHandler}
            className="border text-[16px] rounded-tl-md rounded-bl-md border-[#8297BD] w-[3rem] flex justify-center text-white pt-1.5 cursor-pointer"
          >
            -
          </button>
          <div className="border text-[16px] border-[#8297BD] w-[4rem] flex justify-center text-white pt-1.5">
            {fontSize}
          </div>
          <button
            onClick={onFontIncreaseHandler}
            className="border rounded-tr-md rounded-br-md text-[16px] w-[3rem] border-[#8297BD] flex justify-center text-white pt-1.5 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <div className="text-white w-full">Alignment :</div>
        <div className="w-full grid grid-cols-4 gap-2">
          <button
            className="bg-[#1D1138] rounded-md cursor-pointer hover:bg-nyx-sky flex justify-center items-center"
            onClick={leftAlignClick}
          >
            <svg
              width="73"
              height="38"
              viewBox="0 0 73 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="73" height="37" rx="4" fill="" />
              <rect
                x="25.3359"
                y="12.7969"
                width="22.3281"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="25.3359"
                y="17.7656"
                width="12.7031"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="25.3359"
                y="22.7344"
                width="16.125"
                height="1.96875"
                fill="#D9D9D9"
              />
            </svg>
          </button>
          <button
            className="bg-[#1D1138] rounded-md cursor-pointer hover:bg-nyx-sky flex justify-center items-center"
            onClick={centerAlignClick}
          >
            <svg
              width="73"
              height="38"
              viewBox="0 0 73 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="73" height="37" rx="4" fill="" />
              <rect
                x="25.3359"
                y="12.7969"
                width="22.3281"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="30.1484"
                y="17.7656"
                width="12.7031"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="28.4375"
                y="22.7344"
                width="16.125"
                height="1.96875"
                fill="#D9D9D9"
              />
            </svg>
          </button>
          <button
            className="bg-[#1D1138] rounded-md cursor-pointer hover:bg-nyx-sky flex justify-center items-center"
            onClick={rightAlignClick}
          >
            <svg
              width="73"
              height="38"
              viewBox="0 0 73 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="73" height="37" rx="4" fill="" />
              <rect
                x="25.3359"
                y="12.7969"
                width="22.3281"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="34.9609"
                y="17.7656"
                width="12.7031"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="31.5391"
                y="22.7344"
                width="16.125"
                height="1.96875"
                fill="#D9D9D9"
              />
            </svg>
          </button>
          <button
            className="bg-[#1D1138] rounded-md cursor-pointer hover:bg-nyx-sky flex justify-center items-center"
            onClick={justifyAlignClick}
          >
            <svg
              width="73"
              height="38"
              viewBox="0 0 73 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="73" height="37" rx="4" fill="" />
              <rect
                x="25.3359"
                y="12.7969"
                width="22.3281"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="25.3359"
                y="17.7656"
                width="22.3281"
                height="1.96875"
                fill="#D9D9D9"
              />
              <rect
                x="25.3359"
                y="22.7344"
                width="22.3281"
                height="1.96875"
                fill="#D9D9D9"
              />
            </svg>
          </button>
        </div>

        <div className="text-white w-full">Decoration :</div>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="bg-[#1D1138] rounded-md cursor-pointer hover:bg-nyx-sky flex justify-center items-center h-10"
            onClick={boldClick}
          >
            <BoldIcon />
          </button>
          <button
            className="bg-[#1D1138] rounded-md cursor-pointer hover:bg-nyx-sky flex justify-center items-center h-10"
            onClick={italicClick}
          >
            <ItalicIcon />
          </button>
          <button
            className="bg-[#1D1138] rounded-md cursor-pointer hover:bg-nyx-sky flex justify-center items-center h-10"
            onClick={underlineClick}
          >
            <UnderlineIcon />
          </button>
          {/* <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={boldClick}
            className="rounded-md bg-[#1D1138] hover:bg-nyx-sky"
          >
            <BoldIcon className="w-full" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={italicClick}
            className="rounded-md bg-[#1D1138] hover:bg-nyx-sky"
          >
            <ItalicIcon className="w-full" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={underlineClick}
            className="rounded-md bg-[#1D1138] hover:bg-nyx-sky"
          >
            <UnderlineIcon className="w-full" />
          </motion.button> */}
        </div>

        <div className="w-full text-white">Case :</div>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="cursor-pointer w-full bg-[#1D1138] rounded-md hover:bg-nyx-sky flex justify-center items-center"
            onClick={capitalCaseClick}
          >
            <svg
              width="77"
              height="38"
              viewBox="0 0 77 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="77" height="37" rx="4" fill="" />
              <path
                d="M36.42 24.25L35.236 21.53H29.332L28.164 24.25H26.548L31.524 13.05H33.124L38.084 24.25H36.42ZM29.94 20.138H34.644L32.276 14.698L29.94 20.138ZM47.1878 18.778H48.5478V22.89C47.9824 23.338 47.3211 23.6953 46.5638 23.962C45.8064 24.2287 45.0544 24.362 44.3078 24.362C43.2304 24.362 42.2438 24.1113 41.3478 23.61C40.4518 23.098 39.7424 22.4047 39.2198 21.53C38.7078 20.6447 38.4518 19.6793 38.4518 18.634C38.4518 17.5887 38.7131 16.634 39.2358 15.77C39.7584 14.8953 40.4731 14.2073 41.3798 13.706C42.2864 13.2047 43.2891 12.954 44.3878 12.954C45.1664 12.954 45.9238 13.0927 46.6597 13.37C47.4064 13.6473 48.0518 14.026 48.5958 14.506L47.7158 15.626C47.2678 15.21 46.7504 14.89 46.1638 14.666C45.5878 14.4313 44.9958 14.314 44.3878 14.314C43.5878 14.314 42.8518 14.506 42.1798 14.89C41.5078 15.274 40.9744 15.7967 40.5798 16.458C40.1958 17.1193 40.0038 17.8447 40.0038 18.634C40.0038 19.4233 40.2011 20.154 40.5958 20.826C40.9904 21.4873 41.5238 22.0153 42.1958 22.41C42.8678 22.794 43.6038 22.986 44.4038 22.986C44.8731 22.986 45.3478 22.9113 45.8278 22.762C46.3184 22.602 46.7718 22.3833 47.1878 22.106V18.778Z"
                fill="white"
              />
            </svg>
          </button>

          <button
            className="cursor-pointer w-full bg-[#1D1138] rounded-md hover:bg-nyx-sky flex justify-center items-center"
            onClick={lowerCaseClick}
          >
            <svg
              width="75"
              height="38"
              viewBox="0 0 77 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="77" height="37" rx="4" fill="" />
              <path
                d="M31.124 24.25V23.066C30.4947 23.898 29.508 24.314 28.164 24.314C27.5773 24.314 27.06 24.202 26.612 23.978C26.1747 23.754 25.8333 23.4447 25.588 23.05C25.3533 22.6553 25.236 22.2127 25.236 21.722C25.236 20.9647 25.5133 20.3673 26.068 19.93C26.6333 19.482 27.4173 19.2527 28.42 19.242H31.108V18.842C31.108 18.2447 30.9213 17.786 30.548 17.466C30.1853 17.1353 29.652 16.97 28.948 16.97C28.0947 16.97 27.2253 17.274 26.34 17.882L25.716 16.858C26.324 16.4633 26.884 16.1807 27.396 16.01C27.9187 15.8287 28.5373 15.738 29.252 15.738C30.308 15.738 31.124 15.9993 31.7 16.522C32.276 17.034 32.5693 17.754 32.58 18.682L32.596 24.25H31.124ZM28.468 23.082C29.1613 23.082 29.748 22.9167 30.228 22.586C30.7187 22.2447 31.012 21.7967 31.108 21.242V20.394H28.628C27.956 20.394 27.4547 20.4953 27.124 20.698C26.804 20.9007 26.644 21.2207 26.644 21.658C26.644 22.0953 26.8093 22.442 27.14 22.698C27.4707 22.954 27.9133 23.082 28.468 23.082ZM42.7409 15.786V23.386C42.7409 24.1967 42.5595 24.906 42.1969 25.514C41.8449 26.122 41.3435 26.586 40.6929 26.906C40.0422 27.2367 39.2849 27.402 38.4209 27.402C37.1729 27.402 36.0102 27.0073 34.9329 26.218L35.5889 25.13C36.0049 25.4713 36.4369 25.722 36.8849 25.882C37.3329 26.0527 37.8235 26.138 38.3569 26.138C39.2315 26.138 39.9302 25.8927 40.4529 25.402C40.9755 24.9113 41.2369 24.2553 41.2369 23.434V22.25C40.9382 22.762 40.5329 23.162 40.0209 23.45C39.5089 23.7273 38.9222 23.866 38.2609 23.866C37.5035 23.866 36.8315 23.6953 36.2449 23.354C35.6689 23.002 35.2209 22.5167 34.9009 21.898C34.5809 21.2793 34.4209 20.57 34.4209 19.77C34.4209 18.9807 34.5809 18.282 34.9009 17.674C35.2209 17.066 35.6689 16.5913 36.2449 16.25C36.8315 15.9087 37.5035 15.738 38.2609 15.738C38.9329 15.738 39.5195 15.8767 40.0209 16.154C40.5329 16.4313 40.9382 16.826 41.2369 17.338V15.786H42.7409ZM38.5489 22.666C39.0715 22.666 39.5355 22.5433 39.9409 22.298C40.3462 22.0527 40.6609 21.7167 40.8849 21.29C41.1195 20.8527 41.2369 20.362 41.2369 19.818C41.2369 19.2633 41.1195 18.7727 40.8849 18.346C40.6609 17.9087 40.3462 17.5673 39.9409 17.322C39.5355 17.0767 39.0715 16.954 38.5489 16.954C38.0262 16.954 37.5569 17.0767 37.1409 17.322C36.7355 17.5673 36.4155 17.9087 36.1809 18.346C35.9462 18.7727 35.8289 19.2633 35.8289 19.818C35.8395 20.65 36.0955 21.3327 36.5969 21.866C37.0982 22.3993 37.7489 22.666 38.5489 22.666Z"
                fill="white"
              />
            </svg>
          </button>

          <button
            className="cursor-pointer w-full bg-[#1D1138] rounded-md hover:bg-nyx-sky flex justify-center items-center"
            onClick={camelCaseClick}
          >
            <svg
              width="73"
              height="38"
              viewBox="0 0 73 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.25" width="73" height="37" rx="4" fill="" />
              <path
                d="M35.42 24.25L34.236 21.53H28.332L27.164 24.25H25.548L30.524 13.05H32.124L37.084 24.25H35.42ZM28.94 20.138H33.644L31.276 14.698L28.94 20.138ZM45.6159 15.786V23.386C45.6159 24.1967 45.4345 24.906 45.0719 25.514C44.7199 26.122 44.2185 26.586 43.5679 26.906C42.9172 27.2367 42.1599 27.402 41.2959 27.402C40.0479 27.402 38.8852 27.0073 37.8079 26.218L38.4639 25.13C38.8799 25.4713 39.3119 25.722 39.7599 25.882C40.2079 26.0527 40.6985 26.138 41.2319 26.138C42.1065 26.138 42.8052 25.8927 43.3279 25.402C43.8505 24.9113 44.1119 24.2553 44.1119 23.434V22.25C43.8132 22.762 43.4079 23.162 42.8959 23.45C42.3839 23.7273 41.7972 23.866 41.1359 23.866C40.3785 23.866 39.7065 23.6953 39.1199 23.354C38.5439 23.002 38.0959 22.5167 37.7759 21.898C37.4559 21.2793 37.2959 20.57 37.2959 19.77C37.2959 18.9807 37.4559 18.282 37.7759 17.674C38.0959 17.066 38.5439 16.5913 39.1199 16.25C39.7065 15.9087 40.3785 15.738 41.1359 15.738C41.8079 15.738 42.3945 15.8767 42.8959 16.154C43.4079 16.4313 43.8132 16.826 44.1119 17.338V15.786H45.6159ZM41.4239 22.666C41.9465 22.666 42.4105 22.5433 42.8159 22.298C43.2212 22.0527 43.5359 21.7167 43.7599 21.29C43.9945 20.8527 44.1119 20.362 44.1119 19.818C44.1119 19.2633 43.9945 18.7727 43.7599 18.346C43.5359 17.9087 43.2212 17.5673 42.8159 17.322C42.4105 17.0767 41.9465 16.954 41.4239 16.954C40.9012 16.954 40.4319 17.0767 40.0159 17.322C39.6105 17.5673 39.2905 17.9087 39.0559 18.346C38.8212 18.7727 38.7039 19.2633 38.7039 19.818C38.7145 20.65 38.9705 21.3327 39.4719 21.866C39.9732 22.3993 40.6239 22.666 41.4239 22.666Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full flex mt-10 gap-5">
        <button
          className="bg-[#50387B] flex flex-col justify-center cursor-pointer w-full rounded-md overflow-hidden"
          onClick={() => setOpentextColor(!opentextColor)}
        >
          <div className="mx-auto h-12 mt-3">
            <TextColorIcon className="w-14" />
          </div>

          <div className="text-white w-full text-center bg-nyx-blue-3 h-7 text-xs flex justify-center items-center">
            Text Color
          </div>
        </button>
        <div className="absolute bottom-[60px] right-[200px] z-10">
          {opentextColor && (
            <div
              className={classNames(
                "text-gray-950 top-16 rounded-md p-2 bg-white",
                opentextColor ? "" : "hidden",
              )}
            >
              <SketchPicker
                className="!border-0 !shadow-none"
                key={"bg-sketch-picker"}
                color={textColor}
                onChangeComplete={textColorChange}
              />
              <div className="w-full text-xs my-2 px-2">
                <button
                  onClick={() => setOpentextColor(!opentextColor)}
                  className="w-full border border-black rounded-sm py-1 hover:bg-gray-100"
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="bg-[#50387B] flex flex-col justify-center items-center cursor-pointer w-full rounded-md overflow-hidden"
          onClick={() => setOpenTextBg(!openTextBg)}
        >
          <div className="h-12 mt-3 pl-5">
            <TextBackground className="w-14" />
          </div>

          <div className="text-white w-full text-center bg-nyx-blue-3 h-7 text-xs flex justify-center items-center">
            Text Background
          </div>
        </button>
        <div className="absolute bottom-[60px] right-[70px] z-10">
          {openTextBg && (
            <div
              className={classNames(
                "text-gray-950 top-16 rounded-md p-2 bg-white",
                openTextBg ? "" : "hidden",
              )}
            >
              <SketchPicker
                className="!border-0 !shadow-none"
                key={"bg-sketch-picker"}
                color={textBgColor}
                onChangeComplete={textBgColorChange}
              />
              <div className="w-full text-xs my-2 px-2">
                <button
                  onClick={() => setOpenTextBg(!openTextBg)}
                  className="w-full border border-black rounded-sm py-1 hover:bg-gray-100"
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="bg-[#50387B] flex flex-col justify-center cursor-pointer w-full rounded-md overflow-hidden"
          onClick={() => setOpen(!open)}
        >
          <div className="mx-auto h-12 mt-3">
            <BgColorIcon className="w-11 text-white" />
          </div>

          <div className="text-white w-full text-center bg-nyx-blue-3 h-7 text-xs flex justify-center items-center">
            Canva Color
          </div>
        </button>
        <div className="absolute bottom-[60px] right-[20px] z-10">
          {open && (
            <div
              className={classNames(
                "text-gray-950 top-16 rounded-md p-2 bg-white",
                open ? "" : "hidden",
              )}
            >
              <SketchPicker
                className="!border-0 !shadow-none"
                key={"bg-sketch-picker"}
                color={canvaColor}
                onChangeComplete={canvaColorChange}
              />
              <div className="w-full text-xs my-2 px-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full border border-black rounded-sm py-1 hover:bg-gray-100"
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
