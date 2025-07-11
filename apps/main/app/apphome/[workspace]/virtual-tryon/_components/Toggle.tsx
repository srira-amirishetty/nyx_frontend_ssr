import React from "react";

interface ToggleProps {
  id:Number;
  value: string;
  onChange: (value: string) => void;
  option1: string; // First option label
  option2: string; // Second option label
}

const Toggle: React.FC<ToggleProps> = ({
  id,
  value,
  onChange,
  option1 , // Default option 1
  option2 , // Default option 2
}) => {
  const handleToggle = () => {
    onChange(value === option1 ? option2 : option1);
  };

  return (
    <div className="flex items-center mt-6">
      <p className={`mr-4 ${value===option1?"font-semibold":"font-normal"}`}>{option1}</p>
      <label htmlFor={`toggle-${id}`} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id={`toggle-${id}`}
            className="sr-only"
            checked={value === option2}
            onChange={handleToggle}
          />
          <div className="block bg-[#6750A4] w-14 h-8 rounded-full"></div>
          <div
            className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform flex items-center justify-center ${
              value === option2 ? "translate-x-6" : "translate-x-0"
            }`}
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5001 10.78L3.7201 7.99999L2.77344 8.93999L6.5001 12.6667L14.5001 4.66665L13.5601 3.72665L6.5001 10.78Z"
                fill="#21005D"
              />
            </svg>
          </div>
        </div>
      </label>
      <p className={`ml-4 ${value===option2?"font-semibold":"font-normal"}`}>{option2}</p>
    </div>
  );
};

export default Toggle;
