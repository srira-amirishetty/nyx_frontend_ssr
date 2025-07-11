import * as React from "react"
import { SVGProps } from "react"
const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 18"
    {...props}
  >
    <path
      fill="#fff"
      d="M3 18c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 1 16V3H0V1h5V0h6v1h5v2h-1v13c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0 1 13 18H3ZM13 3H3v13h10V3ZM5 14h2V5H5v9Zm4 0h2V5H9v9Z"
    />
  </svg>
)
export default DeleteIcon
