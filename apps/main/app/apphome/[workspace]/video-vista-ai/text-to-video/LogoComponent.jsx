/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const LogoComponent = ({ logo, logos, onDelete }) => (
  <div className="w-full mt-3 hover:cursor-pointer relative group">
    <div
      className={`flex text-[10px] items-center justify-between w-[150px] h-[45px] rounded-t-lg text-[#FFF] px-3 py-2 ${
        logos === logo.file1
          ? "bg-[#5e32ff] text-white border border-[#5e32ff]"
          : "bg-[#1D1138]"
      }`}
    >
      <span className="flex-1 text-left leading-tight overflow-hidden">
        {logo.name?.slice(0, 28) + "..."}
      </span>
      <button
        onClick={() => onDelete(logo)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2"
      >
        ×
      </button>
    </div>
    <div className="bg-[#6F559A] w-[150px] rounded-b-lg flex flex-col justify-center items-center">
      <input
        type="file"
        id="uploadLogo"
        className="hidden"
        accept="image/*"
        multiple
      />
      <img
        src={logo.url}
        alt={logo.name}
        className="w-full h-[85px] rounded-b-lg object-cover"
      />
    </div>
  </div>
);

export default LogoComponent;
