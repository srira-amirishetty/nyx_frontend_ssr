import * as React from "react"
import { SVGProps } from "react"
const LockSVGIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 17"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#D3D3D3"
        d="M8.158 11.437c.733 0 1.333-.6 1.333-1.333S8.89 8.77 8.158 8.77c-.734 0-1.334.6-1.334 1.333s.6 1.333 1.334 1.333Zm4-6h-.667V4.104a3.335 3.335 0 0 0-6.667 0v1.333h-.666c-.734 0-1.334.6-1.334 1.334v6.666c0 .734.6 1.334 1.334 1.334h8c.733 0 1.333-.6 1.333-1.334V6.771c0-.734-.6-1.334-1.333-1.334ZM6.09 4.104c0-1.14.927-2.067 2.067-2.067 1.14 0 2.066.927 2.066 2.067v1.333H6.091V4.104Zm6.067 9.333h-8V6.771h8v6.666Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.158.104h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
)
export default LockSVGIcon
