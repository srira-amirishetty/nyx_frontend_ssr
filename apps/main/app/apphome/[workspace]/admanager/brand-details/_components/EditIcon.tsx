import * as React from "react";
import { SVGProps } from "react";
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 11"
    {...props}
  >
    <path
      fill="#fff"
      d="M1.222 9.778h.871l5.974-5.974-.871-.87-5.974 5.973v.87ZM0 11V8.403L8.067.35c.122-.112.257-.198.405-.26a1.264 1.264 0 0 1 .94 0c.152.062.284.153.396.276l.84.855a.999.999 0 0 1 .268.397 1.324 1.324 0 0 1 0 .925 1.145 1.145 0 0 1-.267.405L2.597 11H0Zm7.624-7.624-.428-.443.87.871-.442-.428Z"
    />
  </svg>
);
export default EditIcon;
