import classNames from "@nyx-frontend/main/utils/classNames";

export default function NewHomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={classNames("fill-current", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#newHomeIcon)">
        <path
          d="M11.667 22.166v-5.833h4.666v5.834a1.17 1.17 0 0 0 1.167 1.166H21a1.17 1.17 0 0 0 1.167-1.166V14h1.983c.537 0 .793-.665.385-1.015L14.782 4.2a1.176 1.176 0 0 0-1.564 0l-9.753 8.785A.581.581 0 0 0 3.85 14h1.983v8.166A1.17 1.17 0 0 0 7 23.334h3.5a1.17 1.17 0 0 0 1.167-1.166Z"
        />
      </g>
      <defs>
        <clipPath id="newHomeIcon">
          <path fill="#fff" d="M0 0h28v28H0z"/>
        </clipPath>
      </defs>
    </svg>
  );
}
