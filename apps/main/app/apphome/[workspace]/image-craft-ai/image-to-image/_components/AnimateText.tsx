"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SECOND = 1000;
const MINUTE = SECOND * 60;

const texts = [
  { name: "generating image based on your script", time: MINUTE * 1 },
  { name: "Creating animations on the image", time: MINUTE * 1.5 },
  { name: "Merging audio and animations in the video.", time: MINUTE * 1 },
  { name: "Generating final video.", time: Infinity },
];

function AnimateText({
  list = texts,
}: {
  list?: Array<{ name: string; time: number }>;
}) {
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [animationText, setAnimationText] = useState("");

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
      <div className=" relative">
        <motion.p
          className="text-white  min-w-[400px]  absolute left-[5%] transform  mt-[-50px]"
          style={{ transform: "translate(-40%)" }}
        >
          {list[activeTextIndex].name}
          {animationText}
        </motion.p>
      </div>
    </AnimatePresence>
  );
}

export default AnimateText;
