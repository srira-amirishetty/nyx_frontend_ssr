import * as React from "react"
import { SVGProps } from "react"
const MessageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 31 25"
    {...props}
  >
    <path
      fill="#fff"
      d="M30.047 3.5c0-1.65-1.35-3-3-3h-24c-1.65 0-3 1.35-3 3v18c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3v-18Zm-3 0-12 7.5-12-7.5h24Zm0 18h-24v-15l12 7.5 12-7.5v15Z"
    />
  </svg>
)
export default MessageIcon
