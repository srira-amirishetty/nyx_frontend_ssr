"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "rsuite";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "../index.css";

export const TgSlider = ({
  platformSliderValue,
  totalTargetGroups,
  platformName,
  minBudget
}) => {

  console.log("minBudget",minBudget);
  console.log("platformName",platformName);

  const totalGroups = totalTargetGroups.length;

  // Initial equally distributed values
  const [sliderValues, setSliderValues] = useState([]);

  useEffect(() => {
    if (platformSliderValue && totalGroups > 0) {
      const equalShare = Math.floor(platformSliderValue / totalGroups);
      const values = Array(totalGroups).fill(equalShare);
      // Distribute remaining value (due to rounding)
      let remainder = platformSliderValue - equalShare * totalGroups;
      for (let i = 0; i < remainder; i++) {
        values[i]++;
      }
      setSliderValues(values);
    }
  }, [platformSliderValue, totalGroups]);



  const handleSliderChange = (index, newValue) => {

    if(newValue < minBudget) return;

    const oldValue = sliderValues[index];
    const diff = newValue - oldValue;

    if (diff === 0) return;

    let newValues = [...sliderValues];
    newValues[index] = newValue;

    let remainingDiff = -diff;
    let indicesToAdjust = newValues
      .map((val, i) => i)
      .filter((i) => i !== index);

    for (let i of indicesToAdjust) {
      if (remainingDiff === 0) break;

      const current = newValues[i];
      const maxChange =
        remainingDiff > 0 ? platformSliderValue - newValue : current;

      const adjust = Math.min(Math.abs(remainingDiff), maxChange);
      const direction = remainingDiff > 0 ? 1 : -1;

      newValues[i] = current + adjust * direction;
      remainingDiff += adjust * -direction;
    }

    // If we still have remaining diff, we can't apply the change
    const newTotal = newValues.reduce((a, b) => a + b, 0);
    if (newTotal === platformSliderValue) {
      setSliderValues(newValues);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 my-3">
      {totalTargetGroups?.map((tg, index) => (
        <div className="w-full flex flex-col gap-1">
          <div className="text-sm text-[#FFFFFF] font-normal">{tg?.name}</div>

          <div className="w-full">
            <Slider
              className="sliderStyle"
              tooltip
              progress
              min={0}
              max={platformSliderValue}
              value={sliderValues[index] || minBudget}
              onChange={(value) => handleSliderChange(index, value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

