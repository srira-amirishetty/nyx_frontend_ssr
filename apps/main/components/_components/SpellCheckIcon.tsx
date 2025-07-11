import { Props } from "./SpellCheckIconType";

const SpellCheckIcon = (props: Props = { className: "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 44 37"
    {...props}
  >
    <title>Spell check</title>
    <path
      fill="#fff"
      d="M21.86 22.992h3.151L17.306 3.391h-2.804L6.797 22.992h3.151l1.689-4.523h8.504l1.719 4.523Zm-9.077-7.539 3.121-8.323 3.121 8.323h-6.242Zm22.858.89L23.443 28.54l-5.534-5.549-2.126 2.126 7.675 7.675 14.31-14.324-2.127-2.126Z"
    />
  </svg>
);
export default SpellCheckIcon;
