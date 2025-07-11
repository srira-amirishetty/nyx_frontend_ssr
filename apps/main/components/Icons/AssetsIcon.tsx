import classNames from "@nyx-frontend/main/utils/classNames";

export default function AssetsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={classNames("fill-current", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.125 6.51A3.385 3.385 0 0 1 6.51 3.125h11.98a3.385 3.385 0 0 1 3.385 3.385v11.98a3.385 3.385 0 0 1-3.385 3.385H6.51a3.385 3.385 0 0 1-3.385-3.385V6.51Zm3.906.521a.781.781 0 0 0 0 1.563H17.97a.781.781 0 1 0 0-1.563H7.03Z" />
    </svg>
  );
}
