import { Props } from "./BgColorIconType";


const BgColorIcon = (props: Props = { className: "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 45 38"
    {...props}
  >
    <title>Background Color Icon</title>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M32.603 28.913a3.087 3.087 0 0 0 3.087-3.087c0-1.137-1.029-2.68-3.087-4.63-2.058 1.95-3.087 3.493-3.087 4.63a3.087 3.087 0 0 0 3.087 3.087Z"
      clipRule="evenodd"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.764}
      d="m20.14 4.602 2.73 2.728"
    />
    <path
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={1.764}
      d="M22.327 6.79 10.32 18.795l8.732 8.732L31.06 15.52l-8.733-8.73Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.764}
      d="m13.305 15.852 13.09 4.303M7.133 33.547h30.872"
    />
  </svg>
);
export default BgColorIcon;
