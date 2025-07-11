import * as React from "react";
import { SVGProps } from "react";

const LeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 17"
    {...props}
  >
    <path
      fill="currentColor"
      d="M1.514 7.48h16.691c.222 0 .434.108.59.3.157.19.245.45.245.72 0 .271-.088.53-.245.722a.766.766 0 0 1-.59.298H1.515a.766.766 0 0 1-.59-.298A1.145 1.145 0 0 1 .68 8.5c0-.27.088-.53.244-.72a.766.766 0 0 1 .59-.3Z"
    />
    <path
      fill="currentColor"
      d="m1.94 8.5 6.664 7.047c.151.16.236.376.236.602a.877.877 0 0 1-.236.602.783.783 0 0 1-.568.249.783.783 0 0 1-.57-.25L.237 9.103a.893.893 0 0 1 0-1.203L7.467.25a.785.785 0 0 1 .57-.25.78.78 0 0 1 .568.25.873.873 0 0 1 .236.601.877.877 0 0 1-.236.602L1.941 8.5Z"
    />
  </svg>
);
export default LeftArrow;
