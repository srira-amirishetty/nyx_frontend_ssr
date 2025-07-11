import React from "react";
import type { TTextInfoProps } from "./lyrics.types";
import { PromtsSubText } from "./lyrics.constants";
import classNames from "@nyx-frontend/main/utils/classNames";

const TextInfo: React.FC<TTextInfoProps> = ({
  counts,
  className = "",
}) => {
  if (!counts || counts <= 0) return null;

  if (counts > 56) {
    return (
      <p className={classNames("text-green-400", className)}>
        {/* Strong Prompt */}
      </p>
    );
  }

  if (counts > 25) {
    return (
      <p className={classNames("text-orange-400", className)}>
        {/* Medium Prompt: {PromtsSubText} */}
      </p>
    );
  }

  return (
    <p className={classNames("text-nyx-red", className)}>
    {PromtsSubText}
    </p>
  );
};

export default TextInfo;
