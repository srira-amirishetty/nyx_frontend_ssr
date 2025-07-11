import * as React from "react";
import { SVGProps } from "react";
const EmailSVGIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#311B3D"
      d="M23.67 4.791v11.043a3.5 3.5 0 0 1-3.295 3.494l-.206.006H3.836a3.5 3.5 0 0 1-3.494-3.295l-.006-.206V4.792l11.02 7.346.134.077a1.167 1.167 0 0 0 1.025 0l.135-.077 11.02-7.346Z"
    />
    <path
      fill="#311B3D"
      d="M20.166.666c1.26 0 2.365.665 2.98 1.665L12 9.763.852 2.33A3.499 3.499 0 0 1 3.598.674l.234-.008h16.334Z"
    />
  </svg>
);
export default EmailSVGIcon;
