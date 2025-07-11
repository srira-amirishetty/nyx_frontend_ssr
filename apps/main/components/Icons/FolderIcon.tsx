import * as React from "react"
import { SVGProps } from "react"
const FolderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 16"
    {...props}
  >
    <path
      fill="#fff"
      d="M2.957 16c-.55 0-1.02-.196-1.412-.588A1.926 1.926 0 0 1 .957 14V2c0-.55.196-1.02.588-1.413A1.926 1.926 0 0 1 2.957 0h6l2 2h8c.55 0 1.02.196 1.412.587.392.392.588.863.588 1.413v10c0 .55-.196 1.02-.588 1.412a1.926 1.926 0 0 1-1.412.588h-16Zm0-2h16V4h-8.825l-2-2H2.957v12Z"
    />
  </svg>
)
export default FolderIcon
