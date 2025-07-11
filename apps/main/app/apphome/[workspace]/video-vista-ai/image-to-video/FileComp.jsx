/* eslint-disable @next/next/no-img-element */
import React from "react";

function FileComp({ type }) {
  return (
    <div className=" hover:border hover:border-[#335EE4] p-1 hover:rounded border border-transparent">
      <div>
        {type === 1 ? (
          <div className=" bg-nyx-yellow w-[141px] h-[101px] rounded mb-1"></div>
        ) : (
          <div className="w-[141px] h-[101px]">
            <img
              src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fHww"
              alt="pic"
              className="rounded mb-1"
            ></img>
          </div>
        )}
      </div>
      <div className=" font-bold leading-[20px] text-[14px] text-white m-0">
        FileName.mp3
      </div>

      <p className=" font-normal leading-[15px] text-[14px] text-white">
        56.3 mb
      </p>
    </div>
  );
}

export default FileComp;
