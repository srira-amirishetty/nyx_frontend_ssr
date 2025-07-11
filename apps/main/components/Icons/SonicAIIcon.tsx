import classNames from "@nyx-frontend/main/utils/classNames";

export default function SonicAIIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={classNames("fill-current", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.161 1.751a1.972 1.972 0 0 1 2.296 1.944v11.653a3.944 3.944 0 1 1-1.971-3.416V7.638L8.627 9.282v7.052c0 .059-.005.115-.015.171a3.45 3.45 0 1 1-1.956-2.797v-8.37a1.972 1.972 0 0 1 1.647-1.945l9.858-1.642ZM8.627 7.284l9.859-1.644V3.695L8.627 5.338v1.946Z"
      />
    </svg>
  );
}
