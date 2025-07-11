import { ContextButtonProps } from "./types";

function ContextButton({ label, onClick }: ContextButtonProps) {
  return (
    <button
      className="w-full text-[14px] text-left px-4 hover:bg-[#FFC01D] hover:text-black hover:shadow-none text-white font-regular py-1.5  disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ContextButton;
