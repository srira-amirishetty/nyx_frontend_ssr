import React from "react";
import Button from "@nyx-frontend/main/components/Button";
import { useState } from "react";

const Steper = ({generate,promptdesc, generateBtn}) => {

  



  return (
    <div className="text-center ">
      <textarea
        className="w-full h-[100px] bg-transparent border italic border-nyx-gray-2 rounded-lg p-2 text-white border-none	outline-none"
        placeholder="Write description of the desired image"
        value={promptdesc}
        
      ></textarea>
      <Button className={`${generate==0
      ?"w-[150px] border-none text-black  rounded-full my-4 bg-[#8297BD] hover:bg-[#8297BD]  cursor-not-allowed hover:shadow-none"
      
      :"w-[150px] shadow-sm rounded-full my-4 text-black shadow-nyx-yellow bg-nyx-yellow"}`} onClick={generateBtn}>
        Generate
      </Button>
    </div>
  );
};

export default Steper;



