import { useRef, useState } from "react";
import ColorIcon from "./ColorIcon";
import { SketchPicker } from "react-color";
import classNames from "@nyx-frontend/main/utils/classNames";
import useClickAway from "@nyx-frontend/main/hooks/useClickAway";

function BgColorButton({ onChange = () => { } }: { onChange?: (value: string) => void }) {
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#fff");
  const ref = useRef<HTMLDivElement | any>(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  const openColorBox = () => {
    setOpen(true);
  }

  const onChangeComplete = (color: { hex: string; }) => {
    setColor(color.hex);
    onChange(color.hex);
  }

  return (
    <div className="inline-block relative z-10" ref={ref}>
      <button
        data-tooltip-id="editor-tooltip"
        data-tooltip-content="Change Background Color"
        className="flex h-full items-center justify-center px-0.5"
        onClick={openColorBox}
      >
        <ColorIcon className="" />
        <span className="sr-only">Change Background Color</span>
      </button>
      <div className={classNames("absolute z-20 text-gray-950 top-8", open ? "" : "hidden")}>
        <SketchPicker color={color} onChange={onChangeComplete} />
      </div>
    </div>
  );
}

export default BgColorButton;
