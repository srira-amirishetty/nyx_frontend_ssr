import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill="#311B3D"
      d="M19.655 26.877c-1.524 1.477-3.188 1.244-4.79.544-1.696-.715-3.251-.747-5.04 0-2.24.964-3.421.684-4.76-.544-7.59-7.824-6.47-19.738 2.147-20.173 2.1.108 3.562 1.15 4.79 1.244 1.836-.373 3.594-1.447 5.553-1.307 2.35.187 4.122 1.12 5.289 2.8-4.853 2.909-3.702 9.301.746 11.09-.886 2.333-2.037 4.65-3.95 6.361l.015-.015ZM11.847 6.61C11.614 3.142 14.43.28 17.664 0c.451 4.013-3.64 7-5.817 6.61Z"
    />
  </svg>
);
export default SvgComponent;
