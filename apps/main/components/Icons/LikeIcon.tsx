import * as React from "react"
import { SVGProps } from "react"
const Unlike = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 19 19"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill = "#fff"
        stroke="#fff"
        d="M8.72 14.282c-1.632-1.556-2.947-2.81-3.86-3.984-.907-1.165-1.372-2.194-1.372-3.29 0-1.786 1.324-3.14 2.965-3.14.936 0 1.848.46 2.447 1.198l.388.48.389-.48c.598-.739 1.511-1.199 2.446-1.199 1.641 0 2.965 1.355 2.965 3.142 0 1.095-.464 2.124-1.371 3.29-.913 1.174-2.228 2.43-3.86 3.989l-.567.538-.57-.544Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.734.557h18v18h-18z" />
      </clipPath>
    </defs>
  </svg>
)
export default Unlike
