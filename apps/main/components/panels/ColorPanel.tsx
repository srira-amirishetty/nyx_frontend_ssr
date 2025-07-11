"use client";

import classNames from "@nyx-frontend/main/utils/classNames";
import { useState } from "react";
import { SketchPicker, RGBColor } from "react-color";

interface ColorPanelProps {
  onClose: () => void;
  onColorChange: (color: RGBColor) => void;
}

export default function ColorPanel({ onClose, onColorChange }: ColorPanelProps) {
  const [iconColor, setIconColor] = useState<RGBColor>({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  });

  const onChange = (color: { rgb: RGBColor }) => {
    setIconColor(color.rgb);
    onColorChange(color.rgb);
  }

  return (
    <div
      className={classNames(
        "text-gray-950 top-16 rounded-md p-2 bg-white",
      )}
    >
      <SketchPicker
        className="!border-0 !shadow-none"
        key={"bg-sketch-picker"}
        color={iconColor}
        onChangeComplete={onChange}
      />
      <div className="w-full text-xs my-2 px-2">
        <button
          onClick={onClose}
          className="w-full border border-black rounded-sm py-1 hover:bg-gray-100"
        >
          Ok
        </button>
      </div>
    </div>
  )
}