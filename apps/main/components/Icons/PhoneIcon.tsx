import * as React from "react";
import { SVGProps } from "react";
const PhoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17.308 23.823c-1.68-.062-6.442-.72-11.428-5.705C.895 13.13.238 8.37.175 6.69.082 4.128 2.045 1.64 4.311.668a1.715 1.715 0 0 1 1.686.185c1.866 1.36 3.154 3.419 4.26 5.037a1.754 1.754 0 0 1-.298 2.317l-2.276 1.69a.56.56 0 0 0-.166.719c.516.937 1.433 2.332 2.483 3.382 1.05 1.05 2.511 2.028 3.514 2.602a.564.564 0 0 0 .75-.19l1.483-2.254a1.753 1.753 0 0 1 2.398-.388c1.642 1.137 3.557 2.402 4.96 4.198a1.714 1.714 0 0 1 .22 1.732c-.976 2.279-3.447 4.22-6.017 4.125Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="phoneIconColor"
        x1={-0.9}
        x2={29.902}
        y1={21.009}
        y2={19.701}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="1" stopColor="#B631B1" />
        <stop offset={0.618} stopColor="#7048D7" />
      </linearGradient>
    </defs>
  </svg>
);
export default PhoneIcon;
