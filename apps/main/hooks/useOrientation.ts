"use client";
import { useState, useEffect } from "react";

export interface OrientationState {
  angle: number;
  type: string;
}

export function useOrientation(): OrientationState {
  const [orientation, setOrientation] = useState<OrientationState>({
    angle: 0,
    type: "landscape-primary",
  });

  const handleChange = () => {
    const { angle, type } = window.screen.orientation as ScreenOrientation;
    setOrientation({
      angle,
      type: type.includes("portrait") ? "portrait" : "landscape",
    });
  };

  const handleOrientationChange = () => {
    setOrientation({
      type:
        window.orientation === 90 || window.orientation === -90
          ? "landscape"
          : "portrait",
      angle: window.orientation as number,
    });
  };

  useEffect(() => {
    if (window.screen?.orientation) {
      handleChange();
      window.screen.orientation.addEventListener("change", handleChange);
    } else {
      handleOrientationChange();
      window.addEventListener("orientationchange", handleOrientationChange);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", handleChange);
      } else {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange,
        );
      }
    };
  }, []);

  return orientation;
}
