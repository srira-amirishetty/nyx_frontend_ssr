import { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import classNames from "@nyx-frontend/main/utils/classNames";

function BgColorButton({
  onChange = () => {},
}: {
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#fff");
  const ref = useRef<HTMLDivElement>(null);

  const onComplete = () => {
    onChange(color);
    setOpen(false);
  };

  const closeColorBox = () => {
    setOpen(false);
  };

  const openColorBox = () => {
    setOpen(true);
  };

  const onChangeComplete = (color: { hex: string }) => {
    setColor(color.hex);
  };

  return (
    <div className="inline-block relative z-1" ref={ref}>
      <button
        data-tooltip-id="editor-tooltip"
        data-tooltip-content="Change Background Color"
        onClick={openColorBox}
        className="flex flex-col"
      >
        <div className="text-xs text-[#FFFFFF] w-[70px] h-[30px] bg-[#6653B4] rounded-t-xl flex items-center justify-center">
          Add New
        </div>

        <div className="w-[70px] h-[40px] bg-[#6653B4] rounded-b-xl flex justify-center items-center p-3">
          <div className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-1">
            <svg
              viewBox="0 0 17 17"
              className="w-4 h-4 fill-current text-nyx-yellow"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
            </svg>
          </div>
        </div>
      </button>
      <div
        className={classNames(
          "absolute z-20 text-gray-950 top-16 rounded-md p-2 bg-white",
          open ? "" : "hidden",
        )}
      >
        {/* <div className="w-full flex flex-row-reverse">
          <button className="w-max h-max rounded-xl p-1 bg-[#1f123b] text-white text-sm" onClick={closeColorBox}>Cancel</button>
        </div> */}
        <SketchPicker
          className="!border-0 !shadow-none"
          color={color}
          onChange={onChangeComplete}
        />
        <div className="grid grid-cols-2 gap-4 text-xs my-2 px-2">
          <button
            onClick={closeColorBox}
            className="border border-gray-300 rounded-sm py-1 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onComplete}
            className="border border-gray-300 rounded-sm py-1 hover:bg-gray-100"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default BgColorButton;
