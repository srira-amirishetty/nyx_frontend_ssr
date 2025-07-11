"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  useRive,
  useStateMachineInput,
  Fit,
  Alignment,
  Layout,
} from "rive-react";

const RiveContext = createContext();

export const RiveProvider = ({ children }) => {
  const { RiveComponent, rive } = useRive({
    src: "https://res.cloudinary.com/dllmldnlg/raw/upload/v1735562187/ryze_character_test_new_aopjun.riv", // Replace with your actual Rive file path
    autoplay: true, // Set to true if you want the animation to start automatically
    stateMachines: "Ryze Run",
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    onLoad: () => {
      console.log("Rive has loaded successfully!");
      setIsLoaded(true);
    },
  });

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <RiveContext.Provider value={{ RiveComponent, rive, isLoaded }}>
      {children}
    </RiveContext.Provider>
  );
};

export const useRiveContext = () => useContext(RiveContext);
