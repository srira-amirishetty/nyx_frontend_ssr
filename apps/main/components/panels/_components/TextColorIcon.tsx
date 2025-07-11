import { Props } from "./TextColorIconType";


const TextColorIcon = (props: Props = { className: "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 51 38"
    {...props}
  >
    <title>Text Color</title>
    <path
      fill="#fff"
      d="M14.54 26.73h22.064v3.678H14.539V26.73Zm15.714-2.451h4.197L28.023 7.117H23.12L16.692 24.28h4.198l1.307-4.29h6.75l1.307 4.29Zm-2.393-7.355H23.29l2.29-7.018 2.282 7.018Z"
    />
  </svg>
);
export default TextColorIcon;
