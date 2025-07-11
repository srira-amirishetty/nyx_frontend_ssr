import classNames from "@nyx-frontend/main/utils/classNames";

export default function ChangeWorkspaceIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-current", className)}
    >
      <path
        d="M4 8.94118H18.6743L13.7829 4M19 13.0588H4.32569L9.21713 18"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
