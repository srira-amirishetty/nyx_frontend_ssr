import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M23.67 4.791v11.043a3.5 3.5 0 0 1-3.295 3.494l-.206.006H3.836a3.5 3.5 0 0 1-3.494-3.295l-.006-.206V4.792l11.02 7.346.134.077a1.167 1.167 0 0 0 1.025 0l.135-.077 11.02-7.346Z"
    />
    <path
      fill="url(#b)"
      d="M20.166.666c1.26 0 2.365.665 2.98 1.665L12 9.763.852 2.33A3.499 3.499 0 0 1 3.598.674l.234-.008h16.334Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={-0.738}
        x2={30.029}
        y1={17.576}
        y2={15.477}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="1" stopColor="#B631B1" />
        <stop offset={0.618} stopColor="#7048D7" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={-0.174}
        x2={29.043}
        y1={8.663}
        y2={5.619}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B631B1" />
        <stop offset={0.618} stopColor="#7048D7" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgComponent;
