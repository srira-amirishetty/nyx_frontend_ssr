import classNames from "@nyx-frontend/main/utils/classNames";

export const IntegrationsIcon = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      className={classNames("stroke-current", className)} // "stroke-current" applies currentColor
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m11.143 9.691.207-.207a5.068 5.068 0 0 1 7.166 7.166l-2.866 2.866a5.065 5.065 0 0 1-7.166 0 5.067 5.067 0 0 1 0-7.166l.464-.464"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m19.052 10.114.464-.464a5.067 5.067 0 1 0-7.166-7.166L9.484 5.35a5.067 5.067 0 1 0 7.166 7.166l.207-.207M3.5 3 5 5M1 7l3 1m-2 4.5L4 11"
      />
    </svg>
  );
};

export const HoverIntegrationIcon = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      className={classNames("fill-none", className)}
    >
      <path
        stroke="#F1BB2E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m11.143 9.691.207-.207a5.068 5.068 0 0 1 7.166 7.166l-2.866 2.866a5.065 5.065 0 0 1-7.166 0 5.067 5.067 0 0 1 0-7.166l.464-.464"
      />
      <path
        stroke="#F1BB2E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m19.052 10.114.464-.464a5.067 5.067 0 1 0-7.166-7.166L9.484 5.35a5.067 5.067 0 1 0 7.166 7.166l.207-.207M3.5 3 5 5M1 7l3 1m-2 4.5L4 11"
      />
    </svg>
  );
};
