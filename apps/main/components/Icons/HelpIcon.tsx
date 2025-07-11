import classNames from "@nyx-frontend/main/utils/classNames";

export default function HelpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={classNames("fill-current", className)}
    >
      <path d="M12.833 21h2.334v-2.333h-2.334V21ZM14 7a4.666 4.666 0 0 0-4.667 4.667h2.334a2.333 2.333 0 1 1 4.666 0c0 2.333-3.5 2.041-3.5 5.833h2.334c0-2.625 3.5-2.917 3.5-5.833A4.667 4.667 0 0 0 14 7ZM5.833 3.5h16.334A2.333 2.333 0 0 1 24.5 5.833v16.334a2.333 2.333 0 0 1-2.333 2.333H5.833A2.333 2.333 0 0 1 3.5 22.167V5.833A2.333 2.333 0 0 1 5.833 3.5Z" />
    </svg>
  );
}
