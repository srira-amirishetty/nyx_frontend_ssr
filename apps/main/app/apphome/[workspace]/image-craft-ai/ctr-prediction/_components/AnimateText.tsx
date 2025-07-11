"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SECOND = 1000;


const texts = [
  {
    name: "Integrating target group and brand information in the generation inputs",
    time: SECOND * 3,
  },
  {
    name: "Understanding and parsing your prompt for accurate generation of image",
    time: SECOND * 3,
  },
  {
    name: "Refining your inputs and prompts for a better image output",
    time: SECOND * 3,
  },
  { name: "generating images one for each target groups", time: Infinity },
];

function AnimateText({
  list = texts,
}: {
  list?: Array<{ name: string; time: number }>;
}) {
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [animationText, setAnimationText] = useState("...");

  useEffect(() => {
    setTimeout(() => {
      setActiveTextIndex(
        activeTextIndex < list.length - 1
          ? activeTextIndex + 1
          : list.length - 1,
      );
    }, list[activeTextIndex].time);
  }, [activeTextIndex, list.length, list]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationText((text) => {
        if (text === "...") return "";
        else return text + ".";
      });
    }, 500); // Change the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.p className="text-white">{list[activeTextIndex].name}{animationText}</motion.p>
    </AnimatePresence>
  );
}

export default AnimateText;
