import * as React from "react";
import { SVGProps } from "react";
const AddButtonVTON = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      stroke="#FFCB54"
      d="M23.59 12.45c0 6.35-5.15 11.5-11.5 11.5S.59 18.8.59 12.45 5.74.951 12.09.951s11.5 5.149 11.5 11.5Z"
    />
    <path
      fill="#FFCB54"
      d="M16.846 12.78a.531.531 0 0 1-.53.531H12.95v3.365a.531.531 0 0 1-1.063 0V13.31H8.523a.53.53 0 1 1 0-1.062h3.365V8.885a.531.531 0 0 1 1.063 0v3.364h3.364a.532.532 0 0 1 .531.531Z"
    />
  </svg>
);
export default AddButtonVTON;
