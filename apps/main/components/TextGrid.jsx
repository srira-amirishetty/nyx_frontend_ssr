import React from "react";

function TextGrid({ data }) {
  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className="bg-[#1C3665] px-2 py-5">
          <p className="text-sm text-white font-light text-center">{item}</p>
        </div>
      ))}
    </>
  );
}

export default TextGrid;
