import clsx from "clsx";
import { useState } from "react";

export default function Switch({
  onText = "",
  offText = "",
  onChange = () => {},
  className = "",
  defaultValue = false
}: {
  onText?: string;
  offText?: string;
  onChange?: (value: boolean) => void;
  className?: string;
  defaultValue?: boolean;
}) {
  const [state, setState] = useState<boolean>(defaultValue);

  const onChangeHandler = () => {
    const value = !state;
    setState(value);
    onChange(value);
  };

  return (
    <div className={clsx("flex items-center font-light", className)}>
      <dt className="text-xs text-white mr-2">{offText}</dt>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={state}
          className="sr-only peer"
          onChange={onChangeHandler}
        />
        <div className="w-10 h-5 bg-[#15254d] border-[#8297BD] border-4 peer-focus:outline-none peer-checked:border-[#FFCB54] rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] peer-checked:after:left-[12px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all "></div>
      </label>
      <dt className="text-xs text-white ml-2">{onText}</dt>
    </div>
  );
}
