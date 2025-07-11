import classNames from "@nyx-frontend/main/utils/classNames";

export default function SwitchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(className)}
    >
      <path
        d="M4 8.941h14.674L13.783 4M19 13.059H4.326L9.217 18"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
