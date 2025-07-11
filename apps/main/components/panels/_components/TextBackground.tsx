import * as React from "react";
import { SVGProps } from "react";
const TextBackground = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 45 45"
    {...props}
  >
    <title>Text Back ground</title>
    <path
      fill="#fff"
      stroke="#fff"
      d="M24.375 3.75H5.625c-1.036 0-1.875.84-1.875 1.875v18.75c0 1.035.84 1.875 1.875 1.875h18.75c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      d="M10 11.875V10h10v1.875m-6.25 9.375h2.5m-1.25-10v10"
    />
  </svg>
);
export default TextBackground;
