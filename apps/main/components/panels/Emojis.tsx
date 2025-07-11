/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { Elements_TABS_Emojis } from "@nyx-frontend/main/utils/utils";
import { EmojisTab } from "@nyx-frontend/main/shared/inputs";
import EmojiPicker from "emoji-picker-react";
import { StoreContext } from "@nyx-frontend/main/store";
import "./emoji.css";
import axios from "axios";
import { EmojiResource } from "../entity/EmojiResource";
import { IconsArray } from "./Icon";
import { RGBColor } from "react-color";
import { Shapes } from "./Shapes";
import { Slider } from "rsuite";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "./rsuiteSlider.css";
import ColorPanel from "./ColorPanel";

export const Emojis = observer(() => {
  const [searchIcon, setSearchIcon] = useState("");
  const [EmojiTabState, setEmojiTabState] = useState(1);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [openshapeColor, setOpenshapeColor] = useState<boolean>(false);
  const [openIconColor, setOpenIconColor] = useState<boolean>(false);
  const [RangeSliderValue, setRangeSliderValue] = useState(3);
  const store = React.useContext(StoreContext);
  const selectedElement = store.selectedElement;

  const filteredIcons = IconsArray.filter((icon) =>
    icon.name.toLowerCase().includes(searchIcon.toLowerCase()),
  );

  const handleEmojiClick = async (emoji: any) => {
    const emojipng = await axios(`/api/image/${emoji.imageUrl}`);
    const url = `data:image/jpeg;base64,${emojipng.data}`;
    //store.addEmojiResource(`${url}`);
    store.addEmoji(url);
    setSelectedEmoji(emoji); // Update the state with the selected emoji
  };

  const shapeColorChange = (color: RGBColor) => {
    const { r, g, b, a } = color;
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;
    store.updateProps("fill", rgbaColor);
    const fabricObject = selectedElement?.fabricObject;

    if (selectedElement?.type === "line" && fabricObject) {
      store.updateProps("stroke", rgbaColor);
    }
  };

  const iconClick = (data: any) => {
    store.addIcon(data, `rgba(255,255,255,1)`);
  };

  const iconColorChange = (color: RGBColor) => {
    const { r, g, b, a } = color;
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;
    store.updateProps("fill", rgbaColor);
  };

  const lineStrokeChange = (value: any) => {
    setRangeSliderValue(value);
    store.updateProps("strokeWidth", value);
  };

  return (
    <div className="bg-nyx-blue-4 h-full rounded-md text-white">
      {/* {EmojiTabState === 1 && (
        <div className="flex flex-wrap">
          {store.emojis.map((image, index) => {
            return <EmojiResource key={image} image={image} index={index} />;
          })}
        </div>
      )} */}
      <div className="w-full">
        <EmojisTab
          data={Elements_TABS_Emojis}
          tabState={setEmojiTabState}
          tabStatus={EmojiTabState}
        />
      </div>
      {EmojiTabState === 0 && (
        <div className="w-full">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchIcon}
            onChange={(e) => setSearchIcon(e.target.value)}
            className="w-full m-2 p-1.5 border border-gray-300 rounded text-gray-300 placeholder:text-gray-300 placeholder:italic bg-transparent "
          />
          <div className="w-full flex flex-wrap p-3 gap-1 h-[200px] overflow-hidden overflow-y-auto overflow-x-hidden">
            {" "}
            {filteredIcons.map((icon) => (
              <button
                key={icon.id}
                className="icon-container hover:bg-[#5E32FF] h-10 w-10 flex justify-center items-center rounded-md cursor-pointer"
                dangerouslySetInnerHTML={{ __html: icon.url }}
                onClick={() => iconClick(icon.url)}
              />
            ))}
          </div>
          <hr />
          <div className="w-full flex p-3 relative">
            <button
              className="bg-[#50387B] flex flex-col justify-center cursor-pointer w-1/3 rounded-md overflow-hidden"
              onClick={() => setOpenIconColor(!openIconColor)}
            >
              <div className="mx-auto h-12 mt-3">
                <svg
                  width="28"
                  height="33"
                  viewBox="0 0 28 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.98191 2.13786L7.87565 0.277344L19.2713 11.673C19.7807 12.1824 20.0354 12.8137 20.0354 13.5667C20.0354 14.3198 19.7807 14.951 19.2713 15.4605L12.9588 21.7729C12.4494 22.2824 11.8182 22.5371 11.0651 22.5371C10.312 22.5371 9.68079 22.2824 9.17137 21.7729L2.85891 15.4605C2.34948 14.951 2.09477 14.3198 2.09477 13.5667C2.09477 12.8137 2.34948 12.1824 2.85891 11.673L9.17137 5.32731L5.98191 2.13786ZM11.0651 7.22105L4.71942 13.5667H17.4108L11.0651 7.22105ZM23.0256 22.8693C22.2946 22.8693 21.6687 22.6093 21.1478 22.0892C20.6277 21.5683 20.3677 20.9423 20.3677 20.2114C20.3677 19.7463 20.5059 19.2479 20.7823 18.7164C21.0596 18.1848 21.3644 17.6864 21.6966 17.2213C21.896 16.9555 22.1064 16.6787 22.3279 16.3907C22.5493 16.1028 22.7819 15.8259 23.0256 15.5601C23.2692 15.8259 23.5018 16.1028 23.7232 16.3907C23.9447 16.6787 24.1551 16.9555 24.3545 17.2213C24.6867 17.6864 24.9915 18.1848 25.2688 18.7164C25.5452 19.2479 25.6834 19.7463 25.6834 20.2114C25.6834 20.9423 25.4234 21.5683 24.9033 22.0892C24.3824 22.6093 23.7565 22.8693 23.0256 22.8693ZM2.31836 32.1719C1.27743 32.1719 0.433594 31.328 0.433594 30.2871C0.433594 29.2462 1.27743 28.4023 2.31836 28.4023H25.1276C26.1685 28.4023 27.0124 29.2462 27.0124 30.2871C27.0124 31.328 26.1685 32.1719 25.1276 32.1719H2.31836Z"
                    fill="#e8eaed"
                  />
                </svg>
              </div>

              <div className="text-white w-full text-center bg-nyx-blue-3 h-7 text-xs flex justify-center items-center">
                Fill
              </div>
            </button>
            <div className="absolute right-[100px] bottom-0">
              {openIconColor && (
                <ColorPanel
                  onColorChange={iconColorChange}
                  onClose={() => setOpenIconColor(!openIconColor)}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {EmojiTabState === 1 && (
        <div className="emojies-style w-full">
          {" "}
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      {EmojiTabState === 2 && (
        <div className="w-full flex flex-col">
          <Shapes />
          <hr />
          <div className="w-full flex flex-col p-3 relative">
            <button
              className="bg-[#50387B] flex flex-col justify-center cursor-pointer w-1/4 rounded-md overflow-hidden"
              onClick={() => setOpenshapeColor(!openshapeColor)}
            >
              <div className="mx-auto h-12 mt-3">
                <svg
                  width="28"
                  height="33"
                  viewBox="0 0 28 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.98191 2.13786L7.87565 0.277344L19.2713 11.673C19.7807 12.1824 20.0354 12.8137 20.0354 13.5667C20.0354 14.3198 19.7807 14.951 19.2713 15.4605L12.9588 21.7729C12.4494 22.2824 11.8182 22.5371 11.0651 22.5371C10.312 22.5371 9.68079 22.2824 9.17137 21.7729L2.85891 15.4605C2.34948 14.951 2.09477 14.3198 2.09477 13.5667C2.09477 12.8137 2.34948 12.1824 2.85891 11.673L9.17137 5.32731L5.98191 2.13786ZM11.0651 7.22105L4.71942 13.5667H17.4108L11.0651 7.22105ZM23.0256 22.8693C22.2946 22.8693 21.6687 22.6093 21.1478 22.0892C20.6277 21.5683 20.3677 20.9423 20.3677 20.2114C20.3677 19.7463 20.5059 19.2479 20.7823 18.7164C21.0596 18.1848 21.3644 17.6864 21.6966 17.2213C21.896 16.9555 22.1064 16.6787 22.3279 16.3907C22.5493 16.1028 22.7819 15.8259 23.0256 15.5601C23.2692 15.8259 23.5018 16.1028 23.7232 16.3907C23.9447 16.6787 24.1551 16.9555 24.3545 17.2213C24.6867 17.6864 24.9915 18.1848 25.2688 18.7164C25.5452 19.2479 25.6834 19.7463 25.6834 20.2114C25.6834 20.9423 25.4234 21.5683 24.9033 22.0892C24.3824 22.6093 23.7565 22.8693 23.0256 22.8693ZM2.31836 32.1719C1.27743 32.1719 0.433594 31.328 0.433594 30.2871C0.433594 29.2462 1.27743 28.4023 2.31836 28.4023H25.1276C26.1685 28.4023 27.0124 29.2462 27.0124 30.2871C27.0124 31.328 26.1685 32.1719 25.1276 32.1719H2.31836Z"
                    fill="#e8eaed"
                  />
                </svg>
              </div>

              <div className="text-white w-full text-center bg-nyx-blue-3 h-7 text-xs flex justify-center items-center">
                Fill
              </div>
            </button>

            {selectedElement?.type === "line" ? (
              <div className="mt-2">
                <p className="text-sm font-medium">Stroke Width </p>
                <div className="w-full amountOfMotionn">
                  <Slider
                    progress
                    defaultValue={3}
                    value={RangeSliderValue}
                    onChange={lineStrokeChange}
                    className="mt-4 mb-2 w-full"
                  />
                </div>
              </div>
            ) : null}

            <div className="absolute right-[100px] bottom-0">
              {openshapeColor && (
                <ColorPanel
                  onColorChange={shapeColorChange}
                  onClose={() => setOpenshapeColor(!openshapeColor)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
