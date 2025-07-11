import classNames from "@nyx-frontend/main/utils/classNames";

export default function VideoVistaAIIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      fill="none"
      className={classNames("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
    >
      <path d="M20.25 7.875c0-1.24-1.01-2.25-2.25-2.25H4.5c-1.24 0-2.25 1.01-2.25 2.25v11.25c0 1.24 1.01 2.25 2.25 2.25H18c1.24 0 2.25-1.01 2.25-2.25v-3.75l4.5 3.75V7.875l-4.5 3.75v-3.75Z" />
    </svg>
  );
}
