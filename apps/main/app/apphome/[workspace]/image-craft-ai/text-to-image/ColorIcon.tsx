import classNames from "@nyx-frontend/main/utils/classNames";

function ColorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-current text-white w-6", className)}
    >
      <g clipPath="url(#aColoRxr)">
        <path d="M4.631 1.05 5.7 0l6.431 6.431c.288.288.431.644.431 1.069 0 .425-.143.781-.43 1.069L8.568 12.13a1.451 1.451 0 0 1-1.069.431c-.425 0-.781-.143-1.069-.43L2.87 8.568A1.451 1.451 0 0 1 2.437 7.5c0-.425.144-.781.432-1.069L6.43 2.85l-1.8-1.8ZM7.5 3.919 3.919 7.5h7.162L7.5 3.919Zm6.75 8.831c-.412 0-.766-.147-1.06-.44a1.445 1.445 0 0 1-.44-1.06c0-.262.078-.544.234-.844.157-.3.329-.581.516-.844.113-.15.231-.306.356-.468.125-.163.257-.319.394-.469.137.15.269.306.394.469.125.162.243.319.356.469.188.262.36.543.516.843.156.3.234.582.234.844 0 .412-.147.766-.44 1.06-.294.293-.648.44-1.06.44ZM1.5 18v-3h15v3h-15Z" />
      </g>
      <defs>
        <clipPath id="aColoRxr">
          <path d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ColorIcon;
