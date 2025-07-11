import * as React from "react";
import { SVGProps } from "react";
const DownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);
export default DownArrow;
