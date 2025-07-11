import { Props } from "./ItalicIconType";

function ItalicIcon({ active = false, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 73 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Italic</title>
      <rect
        y="0.25"
        width="73"
        height="37"
        rx="4"
        // fill={active ? "#0FF0FF" : "#1D1138"}
      />
      <path
        d="M38.068 14.394L36.372 22.906H38.532L38.276 24.25H32.324L32.58 22.906H34.772L36.484 14.394H34.308L34.564 13.05H40.516L40.26 14.394H38.068Z"
        fill={active ? "black" : "white"}
      />
    </svg>
  );
}

export default ItalicIcon;
