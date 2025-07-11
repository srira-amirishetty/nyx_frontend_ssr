import { Props } from "./UnderlineIconType";

const UnderlineIcon = ({ active = false, className = "" }: Props) => (
  <svg
    viewBox="0 0 73 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>Underline</title>
    <rect
      y="0.25"
      width="73"
      height="37"
      rx="4"
      fill={active ? "#0FF0FF" : "#1D1138"}
    />
    <path
      d="M32.896 19.674C32.896 20.7087 33.1787 21.5193 33.744 22.106C34.32 22.682 35.1093 22.97 36.112 22.97C37.104 22.97 37.8827 22.682 38.448 22.106C39.0133 21.5193 39.296 20.7087 39.296 19.674V13.05H40.832V19.674C40.832 21.1353 40.4107 22.282 39.568 23.114C38.736 23.946 37.584 24.362 36.112 24.362C34.6293 24.362 33.4667 23.946 32.624 23.114C31.7813 22.282 31.36 21.1353 31.36 19.674V13.05H32.896V19.674Z"
      fill={active ? "black" : "white"}
    />
    <path
      d="M30 25.85H42.192V26.65H30V25.85Z"
      fill={active ? "black" : "white"}
    />
  </svg>
);
export default UnderlineIcon;
