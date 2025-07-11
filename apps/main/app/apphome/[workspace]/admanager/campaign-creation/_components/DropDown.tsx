// Dropdown.tsx
import React, { useState,useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

const DropDown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
    
  const handleSelect = (option: Option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div  className="relative inline-block text-left z-10">
      <div
        className="cursor-pointer p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="13" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><path d="M12.017 4.078a.905.905 0 0 0-.62-.242.905.905 0 0 0-.62.242L6.434 8.17 2.093 4.08a.907.907 0 0 0-.617-.233.905.905 0 0 0-.612.242.803.803 0 0 0-.257.578.802.802 0 0 0 .246.58l4.962 4.676a.905.905 0 0 0 .62.242.905.905 0 0 0 .62-.242l4.962-4.675a.803.803 0 0 0 .256-.584c0-.22-.092-.43-.256-.585Z" fill="#fff"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h12.875v14H0z"/></clipPath></defs></svg>
      </div>
      {isOpen && (
        <div className="absolute right-0  mt-2 w-[204px] border rounded bg-[#3B236F] shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 hover:bg-[#20133D]  ${selected==option?"text-nyx-yellow bg-[#20133D]":"text-white"}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
