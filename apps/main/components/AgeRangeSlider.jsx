import React, { useState } from "react";
import { RangeSlider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "rsuite/RangeSlider/styles/index.css";
import "./AgeRangeSlider.css";

const AgeRangeSlider = ({ ageRange, setAgeRange }) => {
  return (
    <div className="w-full duration">
      <RangeSlider
        progress
        value={ageRange}
        min={18}
        max={100}
        onChange={(value) => setAgeRange(value)}
      />
      <div className="flex justify-between items-center mt-1">
        <p className="text-[#8297BD] text-sm font-medium">{ageRange[0]}</p>
        <p className="text-[#8297BD] text-sm font-medium">{ageRange[1]}</p>
      </div>
    </div>
  );
};

export default AgeRangeSlider;
