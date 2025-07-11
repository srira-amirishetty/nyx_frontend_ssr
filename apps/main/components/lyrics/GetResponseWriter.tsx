import React, { useEffect, useState, useRef } from "react";
import type { TGetResponseWriterProps } from "./lyrics.types";
import classNames from "@nyx-frontend/main/utils/classNames";

const GetResponseWriter: React.FC<TGetResponseWriterProps> = ({
  text,
  className,
  speed = 40,
}) => {
  const [effectedText, setEffectedText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const nextText = text?.[effectedText.length];
      if (nextText) {
        setEffectedText(effectedText + nextText);
        if (containerRef.current && bottomRef.current) {
          containerRef.current.scrollTo({top: bottomRef.current.offsetTop, behavior: 'smooth'});
        }
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [speed, text, effectedText]);

  if (!text?.length) return text;

  return (
    <div className={classNames("overflow-y-auto h-full", className)} ref={containerRef}>
      <div
        dangerouslySetInnerHTML={{
          __html: (
            effectedText +
            (effectedText.length <= text.length - 1
              ? `<span className="typed-cursor">|</span>`
              : "")
          ).replace(/\n/g, "<br>"),
        }}
      ></div>
      <div ref={bottomRef}></div>
    </div>
  );
};

export default GetResponseWriter;
