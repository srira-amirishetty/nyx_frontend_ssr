import * as React from "react";
import { SVGProps } from "react";
import classNames from "@nyx-frontend/main/utils/classNames";

const CampulseIcon = ({
  className = "",
  ...props
}: SVGProps<SVGSVGElement> & { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 25"
    className={classNames("fill-current", className)}
    {...props}
  >
    <path d="M18 12.54c0 .55.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1Zm-1.41 4.82a.966.966 0 0 0 .2 1.37c.53.39 1.09.81 1.62 1.21.44.33 1.06.24 1.38-.2 0-.01.01-.01.01-.02a.977.977 0 0 0-.2-1.38c-.53-.4-1.09-.82-1.61-1.21a.992.992 0 0 0-1.39.21c0 .01-.01.02-.01.02Zm3.22-12.01c0-.01-.01-.01-.01-.02a.98.98 0 0 0-1.38-.2c-.53.4-1.1.82-1.62 1.22-.44.33-.52.95-.19 1.38 0 .01.01.01.01.02.33.44.94.53 1.38.2.53-.39 1.09-.82 1.62-1.22.43-.32.51-.94.19-1.38ZM8 9.54H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v3c0 .55.45 1 1 1s1-.45 1-1v-3h1l5 3v-12l-5 3Zm7.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34Z" />
  </svg>
);

export default CampulseIcon;
