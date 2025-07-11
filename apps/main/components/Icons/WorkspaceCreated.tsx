import * as React from "react"
import { SVGProps } from "react"
const WorkspaceCreated = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={82}
    height={82}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#FFC01D"
        d="M41.06.002C18.567.002.27 18.3.27 40.792c0 22.493 18.297 40.791 40.79 40.791s40.79-18.298 40.79-40.79h-9.177c0 17.43-14.182 31.612-31.613 31.612-17.431 0-31.613-14.181-31.613-31.612C9.447 23.36 23.63 9.18 41.06 9.18V.002Zm25.154 8.78-25.51 31.854-11.922-9.77-6.805 8.281 16.116 13.217a5.348 5.348 0 0 0 7.583-.792l28.907-36.09-8.369-6.7Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.27 0h81.581v81.581H.27z" />
      </clipPath>
    </defs>
  </svg>
)
export default WorkspaceCreated
