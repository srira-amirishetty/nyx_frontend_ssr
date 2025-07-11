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
  }
 
  const closeColorBox = () =>{
    setOpen(false);
  }

  const openColorBox = () => {
    setOpen(true);
  };

  const onChangeComplete = (color: { hex: string }) => {
    setColor(color.hex);
  };

  return (
    <div className="inline-block relative z-10" ref={ref}>
      <button
        data-tooltip-id="editor-tooltip"
        data-tooltip-content="Change Background Color"
        onClick={openColorBox}
        className="w-[70px] h-[70px] bg-[#6F559A] rounded-xl flex flex-col justify-center items-center p-1"
      >
        <p className="text-xs text-[#FFFFFF]">Add New</p>
        <div className="w-[35px] h-[35px] mt-1 rounded-full bg-[#FFFFFF] text-black text-2xl flex justify-center items-center">
          +
        </div>
      </button>
      <div
        className={classNames(
          "absolute z-20 text-gray-950 top-16 rounded-md p-2 bg-white",
          open ? "" : "hidden"
        )}
      >
        {/* <div className="w-full flex flex-row-reverse">
          <button className="w-max h-max rounded-xl p-1 bg-[#1f123b] text-white text-sm" onClick={closeColorBox}>Cancel</button>
        </div> */}
        <SketchPicker className="!border-0 !shadow-none" color={color} onChange={onChangeComplete} />
        <div className="grid grid-cols-2 gap-4 text-xs my-2 px-2">
          <button onClick={closeColorBox} className="border border-gray-300 rounded-sm py-1 hover:bg-gray-100">Canel</button>
          <button onClick={onComplete} className="border border-gray-300 rounded-sm py-1 hover:bg-gray-100">OK</button>
        </div>
      </div>
    </div>
  );
}

export default BgColorButton;
