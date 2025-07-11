import * as React from "react"
import { SVGProps } from "react"
const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 17"
    
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M12.07 11.679c-.506 0-.96.2-1.306.513L6.01 9.425c.034-.153.06-.306.06-.466 0-.16-.026-.314-.06-.467l4.7-2.74a1.997 1.997 0 0 0 3.36-1.46c0-1.107-.893-2-2-2-1.106 0-2 .893-2 2 0 .16.027.313.06.467l-4.7 2.74a1.997 1.997 0 0 0-3.36 1.46 1.997 1.997 0 0 0 3.36 1.46l4.747 2.773a1.9 1.9 0 0 0-.053.433c0 1.074.873 1.947 1.946 1.947a1.949 1.949 0 0 0 1.947-1.947 1.949 1.949 0 0 0-1.947-1.946Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.07.959h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
)
export default ShareIcon
