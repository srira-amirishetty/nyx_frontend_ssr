import { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import classNames from "@nyx-frontend/main/utils/classNames";
import useClickAway from "@nyx-frontend/main/hooks/useClickAway";

function TextColorButton({
  onChange = () => {},
}: {
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#fff");
  const ref = useRef<HTMLDivElement | any>(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  const openColorBox = () => {
    setOpen(true);
  };

  const onChangeComplete = (color: { hex: string }) => {
    setColor(color.hex);
    onChange(color.hex);
  };

  return (
    <div className="inline-block relative z-10" ref={ref}>
      <button
        data-tooltip-id="editor-tooltip"
        data-tooltip-content="Change Text Color"
        className="flex h-full items-center justify-center px-0.5"
        onClick={openColorBox}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current text-white w-6"
        >
          <path d="M5 18h14v3H5zm7.5-14h-1c-.401 0-.764.24-.921.609L5.745 16h2.173l1.273-3h5.604l1.268 3h2.171L13.421 4.61A1 1 0 0 0 12.5 4zm-2.46 7 1.959-4.616L13.95 11h-3.91z" />
        </svg>
        <span className="sr-only">Change Text Color</span>
      </button>
      <div
        className={classNames(
          "absolute z-20 text-gray-950 top-8",
          open ? "" : "hidden"
        )}
      >
        <SketchPicker color={color} onChange={onChangeComplete} />
      </div>
    </div>
  );
}

export default TextColorButton;
