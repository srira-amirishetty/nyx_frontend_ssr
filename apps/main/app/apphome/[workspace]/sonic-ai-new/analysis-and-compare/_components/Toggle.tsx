import React from "react";

interface ToggleProps {
  id: Number;
  value: boolean;
  onChange: (value: boolean) => void;
  option1: boolean; // First option label
  option2: boolean; // Second option label
}

const Toggle: React.FC<ToggleProps> = ({
  id,
  value,
  onChange,
  option1, // Default option 1
  option2, // Default option 2
}) => {
  const handleToggle = () => {
    onChange(value === option1 ? option2 : option1);
  };

  return (
    <div className="flex items-center mt-6">
      {/* <p className={`mr-4 ${value===option1?"font-semibold":"font-normal"}`}>{option1}</p> */}
      <label
        htmlFor={`toggle-${id}`}
        className="flex items-center cursor-pointer"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={`toggle-${id}`}
            className="sr-only"
            checked={value === option2}
            onChange={handleToggle}
          />
          {value ? <div className="block bg-[#6750A4] w-14 h-8 rounded-full"></div> :<div className="block bg-[#fff] border-[2px] border-[#79747E] w-14 h-8 rounded-full"></div> }
          {value ? (
            <>
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
            </>
          ) : (
            <>
              <div
                className={`absolute left-1 top-1 bg-[#79747E] w-6 h-6 rounded-full transition transform flex items-center justify-center ${
                  value === option2 ? "translate-x-6" : "translate-x-0"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12.6666 4.27331L11.7266 3.33331L7.99992 7.05998L4.27325 3.33331L3.33325 4.27331L7.05992 7.99998L3.33325 11.7266L4.27325 12.6666L7.99992 8.93998L11.7266 12.6666L12.6666 11.7266L8.93992 7.99998L12.6666 4.27331Z"
                    fill="#E6E0E9"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </label>
      {/* <p className={`ml-4 ${value===option2?"font-semibold":"font-normal"}`}>{option2}</p> */}
    </div>
  );
};

export default Toggle;
