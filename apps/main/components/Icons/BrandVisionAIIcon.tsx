import classNames from "@nyx-frontend/main/utils/classNames";

export default function BrandVisionAIIcon({
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
      <path d="M4.049 21.333c-.625 0-1.16-.203-1.604-.608-.444-.406-.667-.895-.668-1.466V4.741c0-.57.223-1.059.668-1.465.445-.405.98-.609 1.604-.61H19.95c.625 0 1.16.204 1.605.61.445.407.668.895.667 1.465v14.518c0 .57-.223 1.06-.667 1.466a2.29 2.29 0 0 1-1.605.608H4.05Zm1.136-4.148h13.63L14.554 12l-3.407 4.148-2.556-3.111-3.407 4.148Z" />
    </svg>
  );
}
