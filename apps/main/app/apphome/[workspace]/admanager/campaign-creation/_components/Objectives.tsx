"use client";
import React from "react";
import { Fragment, useState } from "react";
import DropDown from "./DropDown";
import { useSearchParams } from "next/navigation";

type ObjectiveSvgMaName = {
  [key: string]: React.ReactNode;
};

type objectives = {
  setGoalId: any;
  goalId: any;
  objective: any;
  setObjective: any;
  campaignDetails: any;
};

interface Option {
  value: string;
  label: string;
}
const subTopicSvg: ObjectiveSvgMaName = {
  android: (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.373 6.998c-.344 0-.63.312-.63.696v2.801c0 .385.286.705.63.705.344 0 .63-.312.63-.705v-2.8c0-.385-.286-.697-.63-.697Zm-7.54 0c-.344 0-.63.312-.63.696v2.801c0 .385.286.705.63.705.345 0 .63-.312.63-.705v-2.8c0-.385-.285-.697-.63-.697Zm.945 3.85c0 .28.103.544.279.744.176.2.418.304.667.304v1.4c0 .385.285.705.63.705.344 0 .63-.312.63-.704v-1.401h1.253v1.4c0 .385.286.705.63.705.344 0 .63-.312.63-.704v-1.401c.25 0 .491-.112.667-.304.176-.2.278-.464.278-.744v-3.85H4.778v3.85Zm5.635-4.554a3.317 3.317 0 0 0-.403-1.305c-.22-.4-.513-.736-.864-.984L9.46 3.3a.364.364 0 0 0 .014-.264.345.345 0 0 0-.061-.119.312.312 0 0 0-.22-.117.284.284 0 0 0-.122.02.343.343 0 0 0-.183.176l-.315.704-.08-.04a2.526 2.526 0 0 0-1.781 0l-.08.04-.316-.704a.341.341 0 0 0-.183-.177.284.284 0 0 0-.242.016.365.365 0 0 0-.147.464l.316.705a3.065 3.065 0 0 0-.865.984c-.22.4-.359.84-.403 1.305v.352h5.635v-.352h-.015Zm-3.751-.696a.306.306 0 0 1-.22-.104.369.369 0 0 1-.095-.249c0-.096.029-.184.095-.248a.306.306 0 0 1 .22-.104c.08 0 .16.04.22.104a.368.368 0 0 1 0 .497.305.305 0 0 1-.22.104Zm1.883 0a.305.305 0 0 1-.22-.104.369.369 0 0 1-.095-.249c0-.096.029-.184.095-.248a.306.306 0 0 1 .22-.104c.08 0 .16.04.22.104a.368.368 0 0 1 0 .497.306.306 0 0 1-.22.104Z"
        fill="currentColor"
      />
    </svg>
  ),

  ios: (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.37 13.52c-.653.633-1.367.533-2.053.233-.727-.306-1.394-.32-2.16 0-.96.414-1.467.294-2.04-.233-3.254-3.353-2.774-8.46.92-8.647.9.047 1.526.494 2.053.534.787-.16 1.54-.62 2.38-.56 1.007.08 1.767.48 2.267 1.2-2.08 1.246-1.587 3.986.32 4.753-.38 1-.874 1.993-1.694 2.727l.007-.007ZM8.023 4.833C7.923 3.347 9.13 2.12 10.517 2c.193 1.72-1.56 3-2.494 2.833Z"
        fill="currentColor"
      />
    </svg>
  ),
  website: (
    <svg
      width="16"
      height="17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.323 9.566c.042-.352.074-.704.074-1.067 0-.362-.032-.714-.074-1.066h1.802c.086.341.14.698.14 1.066 0 .368-.054.726-.14 1.067M9.38 12.531c.32-.592.565-1.232.736-1.898h1.573a4.283 4.283 0 0 1-2.31 1.898Zm-.134-2.965H6.75a7.076 7.076 0 0 1-.085-1.067c0-.362.032-.72.085-1.066h2.496c.048.346.086.704.086 1.066 0 .363-.038.715-.086 1.067Zm-1.248 3.179c-.442-.64-.8-1.35-1.018-2.112h2.037a7.234 7.234 0 0 1-1.019 2.112ZM5.864 6.366H4.307A4.224 4.224 0 0 1 6.61 4.467a9.192 9.192 0 0 0-.747 1.899Zm-1.557 4.267h1.557c.187.666.427 1.306.747 1.898a4.266 4.266 0 0 1-2.304-1.898Zm-.438-1.067a4.395 4.395 0 0 1-.138-1.067c0-.368.053-.725.138-1.066h1.803a8.81 8.81 0 0 0-.075 1.066c0 .363.032.715.075 1.067m2.325-5.317c.443.64.8 1.354 1.02 2.117H6.978a7.263 7.263 0 0 1 1.018-2.117Zm3.691 2.117h-1.573a8.372 8.372 0 0 0-.736-1.899 4.26 4.26 0 0 1 2.31 1.899Zm-3.69-3.2c-2.95 0-5.334 2.4-5.334 5.333a5.333 5.333 0 1 0 5.333-5.333Z"
        fill="currentColor"
      />
    </svg>
  ),

  "website and app": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4h7.2v7.2H4V4Zm1.6 1.6v4h4v-4h-4Zm10.8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-3.6 2a3.6 3.6 0 1 1 7.2 0 3.6 3.6 0 0 1-7.2 0ZM4 12.8h7.2V20H4v-7.2Zm1.6 1.6v4h4v-4h-4Zm7.2-1.6H20V20h-7.2v-7.2Zm1.6 1.6v4h4v-4h-4Z"
        fill="currentColor"
      />
    </svg>
  ),

  "website and shop": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 13.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Zm1 2.5v-2h2v2h-2ZM7 4a.5.5 0 0 0-.384.18l-2.5 3A.5.5 0 0 0 4 7.5V9c0 .888.386 1.687 1 2.236V19.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-8.264c.614-.55 1-1.348 1-2.236V7.482c0-.09 0-.162-.116-.302l-2.5-3A.5.5 0 0 0 17 4H7Zm0 7a2 2 0 0 1-2-2V8h4v1a2 2 0 0 1-2 2Zm5 0a2 2 0 0 1-2-2V8h4v1a2 2 0 0 1-2 2Zm5 0a2 2 0 0 1-2-2V8h4v1a2 2 0 0 1-2 2ZM7 19H6v-7.17a3 3 0 0 0 3.5-1.17 3 3 0 0 0 5-.001 3 3 0 0 0 3.5 1.17V19h-6v-5.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5V19ZM9.14 7H5.568l1.666-2h2.572L9.14 7Zm4.666 0h-3.612l.666-2h2.28l.666 2Zm1.054 0-.666-2h2.572l1.667 2H14.86ZM8 19v-5h3v5H8Z"
        fill="currentColor"
      />
    </svg>
  ),
};

const dropDownSvg: ObjectiveSvgMaName = {
  android: (
    <svg
      width="24"
      height="25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.052 10.995c-.517 0-.946.468-.946 1.045v4.201c0 .576.43 1.057.946 1.057s.945-.469.945-1.057V12.04c0-.577-.429-1.045-.945-1.045Zm-11.31 0c-.516 0-.945.468-.945 1.045v4.201c0 .576.429 1.057.945 1.057.517 0 .945-.469.945-1.057V12.04c0-.577-.428-1.045-.945-1.045ZM7.16 16.77c0 .42.154.817.418 1.117.263.3.626.456 1 .456v2.1c0 .577.428 1.057.945 1.057.517 0 .945-.468.945-1.056v-2.101h1.88v2.1c0 .577.428 1.057.945 1.057.516 0 .945-.468.945-1.056v-2.101c.374 0 .736-.168 1-.456.264-.3.418-.696.418-1.117v-5.774H7.16v5.774Zm8.452-6.83a4.978 4.978 0 0 0-.605-1.957 4.36 4.36 0 0 0-1.297-1.477l.473-1.056a.546.546 0 0 0 .022-.396.517.517 0 0 0-.092-.177.468.468 0 0 0-.329-.176.426.426 0 0 0-.184.029.514.514 0 0 0-.274.264l-.473 1.056-.12-.06a3.79 3.79 0 0 0-2.671 0l-.121.06-.473-1.056a.511.511 0 0 0-.275-.264.426.426 0 0 0-.362.024.547.547 0 0 0-.22.696l.472 1.056a4.597 4.597 0 0 0-1.297 1.477c-.33.6-.538 1.26-.604 1.957v.528h8.452v-.528h-.022ZM9.985 8.894a.458.458 0 0 1-.33-.156.553.553 0 0 1-.143-.372c0-.144.044-.276.143-.372a.458.458 0 0 1 .33-.156c.12 0 .241.06.33.156a.552.552 0 0 1 0 .744.458.458 0 0 1-.33.156Zm2.824 0a.458.458 0 0 1-.33-.156.553.553 0 0 1-.142-.372c0-.144.044-.276.143-.372a.458.458 0 0 1 .33-.156c.12 0 .241.06.329.156a.552.552 0 0 1 0 .744.458.458 0 0 1-.33.156Z"
        fill="currentColor"
      />
    </svg>
  ),

  ios: (
    <svg
      width="24"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.051 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35-4.88-5.03-4.16-12.69 1.38-12.97 1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01Zm-5.02-13.03c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"
        fill="currentColor"
      />
    </svg>
  ),

  website: (
    <svg
      width="24"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.488 13.6c.064-.528.112-1.056.112-1.6s-.048-1.072-.112-1.6h2.704c.128.512.208 1.048.208 1.6s-.08 1.088-.208 1.6m-4.12 4.448a12.52 12.52 0 0 0 1.104-2.848h2.36a6.424 6.424 0 0 1-3.464 2.848Zm-.2-4.448h-3.744A10.615 10.615 0 0 1 10 12c0-.544.048-1.08.128-1.6h3.744c.072.52.128 1.056.128 1.6s-.056 1.072-.128 1.6ZM12 18.368a10.85 10.85 0 0 1-1.528-3.168h3.056A10.85 10.85 0 0 1 12 18.368ZM8.8 8.8H6.464A6.336 6.336 0 0 1 9.92 5.952C9.44 6.84 9.08 7.8 8.8 8.8Zm-2.336 6.4H8.8c.28 1 .64 1.96 1.12 2.848A6.4 6.4 0 0 1 6.464 15.2Zm-.656-1.6A6.594 6.594 0 0 1 5.6 12c0-.552.08-1.088.208-1.6h2.704A13.212 13.212 0 0 0 8.4 12c0 .544.048 1.072.112 1.6M12 5.624c.664.96 1.2 2.032 1.528 3.176h-3.056A10.895 10.895 0 0 1 12 5.624ZM17.536 8.8h-2.36c-.25-.99-.621-1.947-1.104-2.848A6.39 6.39 0 0 1 17.536 8.8ZM12 4c-4.424 0-8 3.6-8 8a8 8 0 1 0 8-8Z"
        fill="currentColors"
      />
    </svg>
  ),

  "website and app": (
    <svg
      width="24"
      height="25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4h7.2v7.2H4V4Zm1.6 1.6v4h4v-4h-4Zm10.8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-3.6 2a3.6 3.6 0 1 1 7.2 0 3.6 3.6 0 0 1-7.2 0ZM4 12.8h7.2V20H4v-7.2Zm1.6 1.6v4h4v-4h-4Zm7.2-1.6H20V20h-7.2v-7.2Zm1.6 1.6v4h4v-4h-4Z"
        fill="currentColor"
      />
    </svg>
  ),

  "website and shop": (
    <svg
      width="24"
      height="25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 13.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Zm1 2.5v-2h2v2h-2ZM7 4a.5.5 0 0 0-.384.18l-2.5 3A.5.5 0 0 0 4 7.5V9c0 .888.386 1.687 1 2.236V19.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-8.264c.614-.55 1-1.348 1-2.236V7.482c0-.09 0-.162-.116-.302l-2.5-3A.5.5 0 0 0 17 4H7Zm0 7a2 2 0 0 1-2-2V8h4v1a2 2 0 0 1-2 2Zm5 0a2 2 0 0 1-2-2V8h4v1a2 2 0 0 1-2 2Zm5 0a2 2 0 0 1-2-2V8h4v1a2 2 0 0 1-2 2ZM7 19H6v-7.17a3 3 0 0 0 3.5-1.17 3 3 0 0 0 5-.001 3 3 0 0 0 3.5 1.17V19h-6v-5.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5V19ZM9.14 7H5.568l1.666-2h2.572L9.14 7Zm4.666 0h-3.612l.666-2h2.28l.666 2Zm1.054 0-.666-2h2.572l1.667 2H14.86ZM8 19v-5h3v5H8Z"
        fill="currentColor"
      />
    </svg>
  ),
};

const objectiveSvg: ObjectiveSvgMaName = {
  "Brand Awareness": (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.375 13v-2h4v2h-4Zm1.2 7-3.2-2.4 1.2-1.6 3.2 2.4-1.2 1.6Zm-2-12-1.2-1.6 3.2-2.4 1.2 1.6-3.2 2.4Zm-12.2 7V9h4l5-5v16l-5-5h-4Zm7-6.15L8.225 11h-2.85v2h2.85l2.15 2.15v-6.3Z"
        fill="currentColor"
      />
    </svg>
  ),
  Traffic: (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.375 12v-2h3v2h-3Zm3.4 5.55-1.4-1.45 2.1-2.1 1.45 1.4-2.15 2.15Zm.7-9.55-2.1-2.1 1.4-1.45 2.15 2.15L6.475 8Zm11.9 12-4.75-4.75-1.25 3.75-3-10 10 3-3.7 1.3 4.7 4.7-2 2Zm-8-14V3h2v3h-2Zm5.9 2-1.45-1.4 2.15-2.15 1.4 1.4-2.1 2.15Z"
        fill="currentColor"
      />
    </svg>
  ),
  Engagement: (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="M9.375 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5ZM4.715 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25h-9.32Zm4.66-5c1.93 0 3.5-1.57 3.5-3.5S11.305 5 9.375 5s-3.5 1.57-3.5 3.5 1.57 3.5 3.5 3.5Zm0-5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5Zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44ZM15.375 12c1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="currentColor"
            transform="translate(.375)"
            d="M0 0h24v24H0z"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  "Video views": (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="M15.375 8v8h-10V8h10Zm1-2h-12c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="currentColor"
            transform="translate(.375)"
            d="M0 0h24v24H0z"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  "Lead generation": (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="M7.376 6h10l-5.01 6.3L7.376 6Zm-2.75-.39c2.02 2.59 5.75 7.39 5.75 7.39v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39a.998.998 0 0 0-.79-1.61H5.416c-.83 0-1.3.95-.79 1.61Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="currentColor"
            transform="translate(.375)"
            d="M0 0h24v24H0z"
          />
        </clipPath>
      </defs>
    </svg>
  ),

  "Website conversion": (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="M12.375 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm4.59-12.42-6.59 6.59-2.59-2.58L6.375 13l4 4 8-8-1.41-1.42Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="currentColor"
            transform="translate(.375)"
            d="M0 0h24v24H0z"
          />
        </clipPath>
      </defs>
    </svg>
  ),

  "Store traffic": (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="m18.735 9 .6 3H5.415l.6-3h12.72Zm1.64-5h-16v2h16V4Zm0 3h-16l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5Zm-14 11v-4h6v4h-6Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="currentColor"
            transform="translate(.375)"
            d="M0 0h24v24H0z"
          />
        </clipPath>
      </defs>
    </svg>
  ),

  Shopping: (
    <svg
      width="25"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.95 21.4c-.4.4-.875.6-1.425.6s-1.025-.2-1.425-.6l-7.15-7.15a1.92 1.92 0 0 1-.575-1.412c0-.559.192-1.03.575-1.413l8.8-8.825c.183-.183.4-.33.65-.438A1.99 1.99 0 0 1 13.2 2h7.15c.55 0 1.02.196 1.412.587.392.392.588.863.588 1.413v7.15c0 .283-.054.55-.163.8-.108.25-.254.467-.437.65l-8.8 8.8ZM17.85 8c.417 0 .77-.146 1.063-.438.291-.291.437-.645.437-1.062 0-.417-.146-.77-.438-1.063A1.447 1.447 0 0 0 17.85 5c-.417 0-.77.146-1.063.438A1.446 1.446 0 0 0 16.35 6.5c0 .417.146.77.438 1.063.291.291.645.437 1.062.437Zm-6.325 12 8.825-8.85V4H13.2l-8.825 8.85 7.15 7.15Z"
        fill="currentColor"
      />
    </svg>
  ),

  "App Install": (
    <svg
      width="24"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12 16-5-5 1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 4 18v-3h2v3h12v-3h2v3c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0 1 18 20H6Z"
        fill="currentColor"
      />
    </svg>
  ),

  "App Engagement": (
    <svg
      width="24"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.475 22a2.941 2.941 0 0 1-2.35-1.15L3.1 14.475a.692.692 0 0 1-.175-.537.791.791 0 0 1 .225-.513 2.01 2.01 0 0 1 1.2-.625c.466-.067.9.025 1.3.275L7.5 14.2V6c0-.283.096-.52.288-.712A.972.972 0 0 1 8.5 5c.282 0 .524.095.725.288.2.193.3.43.3.712v5H17c.833 0 1.541.292 2.125.875.583.583.875 1.292.875 2.125v4c0 1.1-.392 2.042-1.175 2.825C18.04 21.608 17.1 22 16 22h-5.525Zm1.5-13a.965.965 0 0 1-.712-.288.972.972 0 0 1-.288-.712c0-.033.041-.2.125-.5.133-.233.233-.47.3-.712.066-.241.1-.504.1-.788 0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 8.5 3c-.834 0-1.542.292-2.125.875A2.893 2.893 0 0 0 5.5 6c0 .283.033.546.1.788.066.242.166.48.3.712.05.083.083.167.1.25.016.083.025.167.025.25a.993.993 0 0 1-.275.713.923.923 0 0 1-.7.287.94.94 0 0 1-.512-.15 1.048 1.048 0 0 1-.363-.375 4.892 4.892 0 0 1-.5-1.175A4.799 4.799 0 0 1 3.5 6c0-1.383.487-2.562 1.463-3.537C5.938 1.488 7.117 1.001 8.5 1c1.382 0 2.562.487 3.538 1.463C13.014 3.439 13.5 4.618 13.5 6a4.801 4.801 0 0 1-.675 2.475c-.084.15-.2.275-.35.375-.15.1-.317.15-.5.15Z"
        fill="currentColor"
      />
    </svg>
  ),
};

const smallObjectiveSvg: ObjectiveSvgMaName = {
  "Brand Awareness": (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33333 6.08203V4.91536H10.6667V6.08203H8.33333ZM9.03333 10.1654L7.16667 8.76536L7.86667 7.83203L9.73333 9.23203L9.03333 10.1654ZM7.86667 3.16536L7.16667 2.23203L9.03333 0.832031L9.73333 1.76536L7.86667 3.16536ZM0.75 7.2487V3.7487H3.08333L6 0.832031V10.1654L3.08333 7.2487H0.75ZM4.83333 3.6612L3.57917 4.91536H1.91667V6.08203H3.57917L4.83333 7.3362V3.6612Z"
        fill="currentColor"
      />
    </svg>
  ),
  Traffic: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.166016 5.5V4.33333H1.91602V5.5H0.166016ZM2.14935 8.7375L1.33268 7.89167L2.55768 6.66667L3.40352 7.48333L2.14935 8.7375ZM2.55768 3.16667L1.33268 1.94167L2.14935 1.09583L3.40352 2.35L2.55768 3.16667ZM9.49935 10.1667L6.72852 7.39583L5.99935 9.58333L4.24935 3.75L10.0827 5.5L7.92435 6.25833L10.666 9L9.49935 10.1667ZM4.83268 2V0.25H5.99935V2H4.83268ZM8.27435 3.16667L7.42852 2.35L8.68268 1.09583L9.49935 1.9125L8.27435 3.16667Z"
        fill="currentColor"
      />
    </svg>
  ),
  Engagement: (
    <svg
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.24935 5.52214C2.88435 5.52214 0.166016 6.20464 0.166016 7.5638V8.58463H8.33268V7.5638C8.33268 6.20464 5.61435 5.52214 4.24935 5.52214ZM1.53102 7.41797C2.02102 7.07964 3.20518 6.6888 4.24935 6.6888C5.29352 6.6888 6.47768 7.07964 6.96768 7.41797H1.53102ZM4.24935 4.5013C5.37518 4.5013 6.29102 3.58547 6.29102 2.45964C6.29102 1.3338 5.37518 0.417969 4.24935 0.417969C3.12352 0.417969 2.20768 1.3338 2.20768 2.45964C2.20768 3.58547 3.12352 4.5013 4.24935 4.5013ZM4.24935 1.58464C4.73352 1.58464 5.12435 1.97547 5.12435 2.45964C5.12435 2.9438 4.73352 3.33464 4.24935 3.33464C3.76518 3.33464 3.37435 2.9438 3.37435 2.45964C3.37435 1.97547 3.76518 1.58464 4.24935 1.58464ZM8.35602 5.55714C9.03268 6.04714 9.49935 6.70047 9.49935 7.5638V8.58463H11.8327V7.5638C11.8327 6.38547 9.79102 5.71464 8.35602 5.55714ZM7.74935 4.5013C8.87518 4.5013 9.79102 3.58547 9.79102 2.45964C9.79102 1.3338 8.87518 0.417969 7.74935 0.417969C7.43435 0.417969 7.14268 0.493802 6.87435 0.622135C7.24185 1.1413 7.45768 1.77714 7.45768 2.45964C7.45768 3.14214 7.24185 3.77797 6.87435 4.29714C7.14268 4.42547 7.43435 4.5013 7.74935 4.5013Z"
        fill="currentColor"
      />
    </svg>
  ),
  "Video views": (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 1.66667V6.33333H1.91667V1.66667H7.75ZM8.33333 0.5H1.33333C1.0125 0.5 0.75 0.7625 0.75 1.08333V6.91667C0.75 7.2375 1.0125 7.5 1.33333 7.5H8.33333C8.65417 7.5 8.91667 7.2375 8.91667 6.91667V4.875L11.25 7.20833V0.791667L8.91667 3.125V1.08333C8.91667 0.7625 8.65417 0.5 8.33333 0.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  "Lead generation": (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.08307 3.9987H9.91641L6.9939 7.6737L4.08307 3.9987ZM2.4789 3.7712C3.65724 5.28203 5.83307 8.08203 5.83307 8.08203V11.582C5.83307 11.9029 6.09557 12.1654 6.4164 12.1654H7.58307C7.9039 12.1654 8.1664 11.9029 8.1664 11.582V8.08203C8.1664 8.08203 10.3364 5.28203 11.5147 3.7712C11.8122 3.3862 11.5381 2.83203 11.0539 2.83203H2.93974C2.45557 2.83203 2.1814 3.3862 2.4789 3.7712Z"
        fill="currentColor"
      />
    </svg>
  ),

  "Website conversion": (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.08307 3.9987H9.91641L6.9939 7.6737L4.08307 3.9987ZM2.4789 3.7712C3.65724 5.28203 5.83307 8.08203 5.83307 8.08203V11.582C5.83307 11.9029 6.09557 12.1654 6.4164 12.1654H7.58307C7.9039 12.1654 8.1664 11.9029 8.1664 11.582V8.08203C8.1664 8.08203 10.3364 5.28203 11.5147 3.7712C11.8122 3.3862 11.5381 2.83203 11.0539 2.83203H2.93974C2.45557 2.83203 2.1814 3.3862 2.4789 3.7712Z"
        fill="currentColor"
      />
    </svg>
  ),

  "Store traffic": (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.08307 3.9987H9.91641L6.9939 7.6737L4.08307 3.9987ZM2.4789 3.7712C3.65724 5.28203 5.83307 8.08203 5.83307 8.08203V11.582C5.83307 11.9029 6.09557 12.1654 6.4164 12.1654H7.58307C7.9039 12.1654 8.1664 11.9029 8.1664 11.582V8.08203C8.1664 8.08203 10.3364 5.28203 11.5147 3.7712C11.8122 3.3862 11.5381 2.83203 11.0539 2.83203H2.93974C2.45557 2.83203 2.1814 3.3862 2.4789 3.7712Z"
        fill="currentColor"
      />
    </svg>
  ),

  Shopping: (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33477 11.9846C6.10143 12.218 5.82435 12.3346 5.50352 12.3346C5.18268 12.3346 4.9056 12.218 4.67227 11.9846L0.501432 7.8138C0.277821 7.59019 0.166016 7.31554 0.166016 6.98984C0.166016 6.66415 0.277821 6.3895 0.501432 6.16589L5.63477 1.01797C5.74171 0.911024 5.8681 0.825955 6.01393 0.76276C6.15977 0.699566 6.31532 0.667969 6.4806 0.667969H10.6514C10.9723 0.667969 11.2469 0.782205 11.4754 1.01068C11.7039 1.23915 11.8181 1.5138 11.8181 1.83464V6.00547C11.8181 6.17075 11.7865 6.3263 11.7233 6.47214C11.6601 6.61797 11.575 6.74436 11.4681 6.8513L6.33477 11.9846ZM9.1931 4.16797C9.43615 4.16797 9.64275 4.0829 9.81289 3.91276C9.98303 3.74262 10.0681 3.53602 10.0681 3.29297C10.0681 3.04991 9.98303 2.84332 9.81289 2.67318C9.64275 2.50304 9.43615 2.41797 9.1931 2.41797C8.95004 2.41797 8.74345 2.50304 8.57331 2.67318C8.40317 2.84332 8.3181 3.04991 8.3181 3.29297C8.3181 3.53602 8.40317 3.74262 8.57331 3.91276C8.74345 4.0829 8.95004 4.16797 9.1931 4.16797ZM5.50352 11.168L10.6514 6.00547V1.83464H6.4806L1.33268 6.99714L5.50352 11.168Z"
        fill="currentColor"
      />
    </svg>
  ),

  "App Install": (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00065 7.33203L2.08398 4.41536L2.90065 3.56953L4.41732 5.0862V0.332031H5.58398V5.0862L7.10065 3.56953L7.91732 4.41536L5.00065 7.33203ZM1.50065 9.66536C1.17982 9.66536 0.905262 9.55123 0.676984 9.32295C0.448706 9.09467 0.334373 8.81992 0.333984 8.4987V6.7487H1.50065V8.4987H8.50065V6.7487H9.66732V8.4987C9.66732 8.81953 9.55318 9.09428 9.3249 9.32295C9.09662 9.55161 8.82187 9.66575 8.50065 9.66536H1.50065Z"
        fill="currentColor"
      />
    </svg>
  ),

  "App Engagement": (
    <svg
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.11087 12.832C4.83864 12.832 4.58353 12.7737 4.34553 12.657C4.10753 12.5404 3.9057 12.3751 3.74003 12.1612L0.808782 8.44245C0.731004 8.35495 0.696976 8.25053 0.706698 8.1292C0.716421 8.00786 0.760171 7.90811 0.837949 7.82995C1.03239 7.62578 1.26573 7.50425 1.53795 7.46536C1.81017 7.42648 2.06295 7.47995 2.29628 7.62578L3.37545 8.28203V3.4987C3.37545 3.33342 3.43145 3.19498 3.54345 3.08336C3.65545 2.97175 3.79389 2.91575 3.95878 2.91536C4.12367 2.91498 4.26464 2.97098 4.3817 3.08336C4.49875 3.19575 4.55709 3.3342 4.5567 3.4987V6.41536H8.91712C9.40323 6.41536 9.81642 6.5855 10.1567 6.92578C10.497 7.26606 10.6671 7.67925 10.6671 8.16536V10.4987C10.6671 11.1404 10.4386 11.6897 9.9817 12.1466C9.52475 12.6036 8.97545 12.832 8.33378 12.832H5.11087ZM5.98587 5.2487C5.82059 5.2487 5.68214 5.1927 5.57053 5.0807C5.45892 4.9687 5.40292 4.83025 5.40253 4.66536C5.40253 4.64592 5.42684 4.5487 5.47545 4.3737C5.55323 4.23759 5.61156 4.09914 5.65045 3.95836C5.68934 3.81759 5.70878 3.66436 5.70878 3.4987C5.70878 3.01259 5.53864 2.59939 5.19837 2.25911C4.85809 1.91884 4.44489 1.7487 3.95878 1.7487C3.47267 1.7487 3.05948 1.91884 2.7192 2.25911C2.37892 2.59939 2.20878 3.01259 2.20878 3.4987C2.20878 3.66398 2.22823 3.8172 2.26712 3.95836C2.306 4.09953 2.36434 4.23798 2.44212 4.3737C2.47128 4.42231 2.49073 4.47092 2.50045 4.51953C2.51017 4.56814 2.51503 4.61675 2.51503 4.66536C2.51503 4.83064 2.46156 4.96928 2.35462 5.08128C2.24767 5.19328 2.11156 5.24909 1.94628 5.2487C1.83934 5.2487 1.73978 5.21953 1.64762 5.1612C1.55545 5.10286 1.48487 5.02995 1.43587 4.94245C1.30948 4.72856 1.21225 4.50009 1.1442 4.25703C1.07614 4.01398 1.04212 3.7612 1.04212 3.4987C1.04212 2.69175 1.32659 2.004 1.89553 1.43545C2.46448 0.866893 3.15223 0.582421 3.95878 0.582032C4.76534 0.581643 5.45328 0.866115 6.02261 1.43545C6.59195 2.00478 6.87623 2.69253 6.87545 3.4987C6.87545 3.7612 6.84142 4.01398 6.77337 4.25703C6.70531 4.50009 6.60809 4.72856 6.4817 4.94245C6.43309 5.02995 6.36503 5.10286 6.27753 5.1612C6.19003 5.21953 6.09281 5.2487 5.98587 5.2487Z"
        fill="currentColor"
      />
    </svg>
  ),
};

const Objectives = ({
  setGoalId,
  goalId,
  setObjective,
  objective,
  campaignDetails,
  setName,
  name,
  url,
  setUrl,
  allGoals,
  goalData,
  setGoalData,
  setSubTopic,
  optionValue,
  setOptionValue,
  setChannelsArray,
  setChannelIdArray,
}: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const search = useSearchParams();
  const handleClick = (name: any, id: any, data: any) => {
    if (!search.has("campaignId") && data.status == "ACTIVE") {
      setChannelsArray([]);
      setChannelIdArray([]);
      setObjective(name);
      setGoalId(id);
      setGoalData(data);
      setOptionValue({});
      setSelected(null);
      setSubTopic(null);
      setOpenDropdown(null);
    }
  };

  const handleDropdownClick = (name: string, data: any) => {
    if (!search.has("campaignId") && data.status == "ACTIVE") {
      setOpenDropdown(openDropdown === name ? null : name);
    } // Toggle open/close for the clicked dropdown
  };

  const handleDropdownSelect = (
    selectedOption: Option,
    name: any,
    id: any,
    data: any,
  ) => {
    setChannelsArray([]);
    setChannelIdArray([]);
    setOptionValue({ objective: name, option: selectedOption.value });
    setSelected(selectedOption);
    setObjective(name);
    setGoalId(id);
    setSubTopic(selectedOption.value);
    setGoalData(data);
  };

  console.log(window.innerWidth);

  return (
    <>
      <div className="">
        <div className="text-white font-semibold text-[14px] xl:text-[16px] border-b-[0.5px] border-opacity-60 border-[#FFFFFF99] py-2">
          Specify campaign objectives
          <span className=" text-nyx-red">*</span>
        </div>

        <div className="flex  flex-row flex-wrap gap-6 mt-[10px] mb-5">
          {/* <div>
            
            <div className="grid grid-cols-3 gap-4">
              {allGoals?.map((e: any, index: any) => (
                <Fragment key={index}>
                  <div
                    className={`h-[40px] w-[204px]  flex flex-row gap-2  items-center rounded cursor-pointer ${
                      objective == e.goalName ? "bg-[#5E32FF]" : "bg-[#3B236F]"
                    }`}
                    onClick={() => handleClick(e.goalName, e.id,e)}
                  >
                    <div className={`ml-3 ${objective == e.goalName?"text-nyx-yellow":"text-white"}`}>{objectiveSvg[e.goalName]}</div>
                    <div
                      className={` text-[14px] font-normal select-none ${
                        objective == e.goalName
                          ? " text-nyx-yellow"
                          : "text-white"
                      } `}
                    >
                      {e.goalName}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div> */}
          {allGoals?.some((goal: any) => goal?.type === "Consideration") && (
            <div>
              <div className="text-white mb-2 font-semibold lg:text-[12px] xl:text-[14px]">
                Consideration
              </div>
              <div className="flex flex-col gap-4 flex-wrap">
                {allGoals
                  ?.filter((goal: any) => goal.type === "Consideration")
                  ?.map((e: any, index: any) => (
                    <Fragment key={index}>
                      <div className="relative group">
                        <div
                          className={`lg:h-[31px] xl:h-[40px] lg:w-[161px] xl:w-[234px]  flex flex-row gap-2   items-center rounded  ${
                            e.status == "ACTIVE"
                              ? objective == e.goalName
                                ? "bg-[#5E32FF] border-[0.5px] border-[#5E32FF]"
                                : "bg-[#332270] hover:border-[0.5px] hover:border-white border-[0.5px] border-transparent"
                              : "bg-nyx-gray-1"
                          } ${search.has("campaignId") ? "cursor-not-allowed opacity-50" : "cursor-pointer"}  `}
                          onClick={() => handleClick(e.goalName, e.id, e)}
                        >
                          <div
                            className={`lg:ml-[10px] xl:ml-3  ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"}`}
                          >
                            {window.innerWidth < 1280
                              ? smallObjectiveSvg[e.goalName]
                              : objectiveSvg[e.goalName]}
                          </div>
                          <div
                            className={` lg:text-[12px] xl:text-[14px] font-normal select-none ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"} `}
                          >
                            {e.goalName}
                          </div>
                        </div>
                        {e.status !== "ACTIVE" && (
                          <div className="absolute top-[-30px] left-4 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          )}

          {allGoals?.some((goal: any) => goal?.type === "Conversion") && (
            <div>
              <div className="text-white mb-2 font-semibold lg:text-[12px] xl:text-[14px]">
                Conversion
              </div>
              <div className="flex flex-col gap-4 flex-wrap">
                {allGoals
                  ?.filter((goal: any) => goal.type === "Conversion")
                  ?.map((e: any, index: any) => (
                    <Fragment key={index}>
                      {
                        // e.goalName === "Shopping" ? (

                        //   <div className="relative group">
                        //     <div
                        //       className={` ${objective == e.goalName?"h-fit":" h-[40px]"} w-[204px] p-2  justify-center relative flex flex-col gap-1  rounded  ${
                        //         e.status == "ACTIVE"
                        //           ? objective == e.goalName
                        //             ? "bg-[#5E32FF]"
                        //             : "bg-[#3B236F]"
                        //           : "bg-nyx-gray-1"
                        //       } ${search.has("campaignId") ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        //       onClick={() => handleDropdownClick(e.goalName, e)}
                        //     >
                        //       <div className="flex flex-row gap-2  items-center">
                        //         <div
                        //           className={`ml-3 ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"}`}
                        //         >
                        //           {objectiveSvg[e?.goalName]}
                        //         </div>
                        //         <div
                        //           className={` text-[14px] font-normal select-none ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"} `}
                        //         >
                        //           {e?.goalName}
                        //         </div>

                        //         <div className="  text-left z-10">
                        //           <div className="cursor-pointer p-2">
                        //             <svg width="13" height="14" fill={` ${e.status == "ACTIVE" ? "#fff" : " #1f1d4d"}`} xmlns="http://www.w3.org/2000/svg">
                        //               <g clipPath="url(#a)">
                        //                 <path
                        //                   d="M12.017 4.078a.905.905 0 0 0-.62-.242.905.905 0 0 0-.62.242L6.434 8.17 2.093 4.08a.907.907 0 0 0-.617-.233.905.905 0 0 0-.612.242.803.803 0 0 0-.257.578.802.802 0 0 0 .246.58l4.962 4.676a.905.905 0 0 0 .62.242.905.905 0 0 0 .62-.242l4.962-4.675a.803.803 0 0 0 .256-.584c0-.22-.092-.43-.256-.585Z"
                        //                   fill={` ${e.status == "ACTIVE" ? "#fff" : " #1f1d4d"}`}
                        //                 />
                        //               </g>
                        //               <defs>
                        //                 <clipPath id="a">
                        //                   <path fill={` ${e.status == "ACTIVE" ? "#fff" : " #1f1d4d"}`} d="M0 0h12.875v14H0z" />
                        //                 </clipPath>
                        //               </defs>
                        //             </svg>
                        //           </div>
                        //           {openDropdown === e.goalName && (
                        //             <div className="absolute right-0 mt-3 w-full border border-[#8297BD] rounded bg-[#20133D] shadow-lg">
                        //               <div className="mt-3 ml-4 mb-3 flex gap-2 flex-row items-center">
                        //               <div className=" text-white text-sm"> Conversion Location</div>
                        //                 <div>
                        //                 <svg width="13" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><path d="M.858 10.422a.905.905 0 0 0 .62.242.905.905 0 0 0 .62-.242L6.44 6.33l4.342 4.09c.165.151.387.235.617.233a.905.905 0 0 0 .612-.242.803.803 0 0 0 .257-.578.802.802 0 0 0-.246-.58L7.06 4.577a.905.905 0 0 0-.62-.242.905.905 0 0 0-.62.242L.858 9.253a.803.803 0 0 0-.256.584c0 .22.092.43.256.585Z" fill="#fff"/></g><defs><clipPath id="a"><path fill="#fff" transform="rotate(-180 6.438 7.25)" d="M0 0h12.875v14H0z"/></clipPath></defs></svg>
                        //                 </div>
                        //               </div>
                        //               {e?.subTopics?.topics?.map((option: any, index: any) => (
                        //                 <div
                        //                   key={index}
                        //                   className={`cursor-pointer text-center flex flex-row gap-1 items-center text-sm font-normal p-2  ${optionValue?.option == option?.value && objective == e?.goalName ? "text-nyx-yellow bg-nyx-new-blue font-semibold hover:bg-nyx-new-blue" : "text-white hover:bg-[#192f73] hover:text-nyx-yellow"}`}
                        //                   onClick={() => handleDropdownSelect(option, e?.goalName, e?.id, e)}
                        //                 >
                        //                   <div className="ml-6">
                        //                     {dropDownSvg[option?.label?.toLowerCase()]}
                        //                   </div>
                        //                   <div> {option?.label}</div>
                        //                 </div>
                        //               ))}
                        //             </div>
                        //           )}
                        //         </div>
                        //       </div>

                        //       {e?.goalName == optionValue?.objective && (
                        //         <>
                        //           <div className={` flex flex-row gap-1 ml-4 text-white text-xs bg-[#3B226F] w-fit p-[6px] rounded-lg`}>
                        //             <div>{subTopicSvg[optionValue?.option.toLowerCase()]}</div>
                        //             <div>{optionValue?.option?.charAt(0).toUpperCase() + optionValue?.option?.slice(1).toLowerCase()}</div>
                        //           </div>
                        //         </>
                        //       )}
                        //     </div>
                        //   </div>
                        // ) :

                        // Other Conversion goals
                        <div className="relative group">
                          <div
                            className={`lg:h-[31px] xl:h-[40px] lg:w-[161px] xl:w-[234px] flex flex-row gap-2 items-center rounded ${
                              e.status == "ACTIVE"
                                ? objective == e.goalName
                                  ? "bg-[#5E32FF] border-[0.5px] border-[#5E32FF]"
                                  : "bg-[#332270] hover:border-[0.5px] hover:border-white border-[0.5px] border-transparent"
                                : "bg-nyx-gray-1"
                            } ${search.has("campaignId") ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                            onClick={() => handleClick(e.goalName, e.id, e)}
                          >
                            <div
                              className={`lg:ml-[10px] xl:ml-3 ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"}`}
                            >
                              {window.innerWidth < 1280
                                ? smallObjectiveSvg[e.goalName]
                                : objectiveSvg[e.goalName]}
                            </div>
                            <div
                              className={`lg:text-[12px] xl:text-[14px] font-normal select-none ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"}`}
                            >
                              {e.goalName}
                            </div>
                          </div>
                          {e.status !== "ACTIVE" && (
                            <div className="absolute top-[-30px] left-4 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Coming Soon
                            </div>
                          )}
                        </div>
                      }
                    </Fragment>
                  ))}
              </div>
            </div>
          )}

          {allGoals?.some((goal: any) => goal?.type === "Awareness") && (
            <div>
              <div className="text-white mb-2 font-semibold lg:text-[12px] xl:text-[14px]">
                Awareness
              </div>
              <div className="flex flex-col gap-4 flex-wrap">
                {allGoals
                  ?.filter((goal: any) => goal.type === "Awareness")
                  ?.map((e: any, index: any) => (
                    <Fragment key={index}>
                      <div className="relative group">
                        <div
                          className={`lg:h-[31px] xl:h-[40px] lg:w-[161px] xl:w-[234px]  flex flex-row gap-2  items-center rounded  ${
                            e.status == "ACTIVE"
                              ? objective == e.goalName
                                ? "bg-[#5E32FF] border-[0.5px] border-[#5E32FF]"
                                : "bg-[#332270] hover:border-[0.5px] hover:border-white border-[0.5px] border-transparent"
                              : "bg-nyx-gray-1"
                          } ${search.has("campaignId") ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                          onClick={() => handleClick(e.goalName, e.id, e)}
                        >
                          <div
                            className={`lg:ml-[10px] xl:ml-3  ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"}`}
                          >
                            {window.innerWidth < 1280
                              ? smallObjectiveSvg[e.goalName]
                              : objectiveSvg[e.goalName]}
                          </div>
                          <div
                            className={` lg:text-[12px] xl:text-[14px] font-normal select-none ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"} `}
                          >
                            {e.goalName}
                          </div>
                        </div>
                        {e.status !== "ACTIVE" && (
                          <div className="absolute top-[-30px] left-4 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          )}

          {allGoals?.some((goal: any) => goal?.type === "App Promotions") && (
            <div>
              <div className="text-white mb-2 font-semibold lg:text-[12px] xl:text-[14px]">
                App Promotions
              </div>
              <div className="flex flex-col gap-4 flex-wrap">
                {allGoals
                  ?.filter((goal: any) => goal.type === "App Promotions")
                  ?.map((e: any, index: any) => (
                    <Fragment key={index}>
                      <div className="relative group">
                        <div
                          className={`${
                            e?.goalName == objective
                              ? "h-fit"
                              : " lg:h-[31px] xl:h-[40px]"
                          } lg:w-[162px]  xl:w-[234px]   xl:p-2 justify-center  relative flex flex-col gap-1  rounded  ${
                            e.status == "ACTIVE"
                              ? objective == e.goalName
                                ? "bg-[#5E32FF] border-[0.5px] border-[#5E32FF]"
                                : "bg-[#332270] hover:border-[0.5px] hover:border-white border-[0.5px] border-transparent"
                              : "bg-nyx-gray-1"
                          } ${search.has("campaignId") ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                          onClick={() => handleDropdownClick(e.goalName, e)}
                          // onClick={() => handleClick(e.goalName, e.id, e)}
                        >
                          <div className="flex flex-row gap-2  items-center">
                            <div
                              className={`lg:ml-[10px] xl:ml-3 ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"}`}
                            >
                              {window.innerWidth < 1280
                                ? smallObjectiveSvg[e.goalName]
                                : objectiveSvg[e.goalName]}
                            </div>
                            <div
                              className={` lg:text-[12px] xl:text-[14px] font-normal select-none ${e.status == "ACTIVE" ? (objective == e.goalName ? "text-nyx-yellow" : "text-white") : "text-nyx-gray-2"} `}
                            >
                              {e?.goalName}
                            </div>
                            {/* custom dropdown that contains value from the API data */}

                            <div className="self-end ">
                              <div className="cursor-pointer xl:p-2 -z-10">
                                <svg
                                  width="13"
                                  height="14"
                                  fill={` ${e.status == "ACTIVE" ? "#fff" : " #1f1d4d"}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#a)">
                                    <path
                                      d="M12.017 4.078a.905.905 0 0 0-.62-.242.905.905 0 0 0-.62.242L6.434 8.17 2.093 4.08a.907.907 0 0 0-.617-.233.905.905 0 0 0-.612.242.803.803 0 0 0-.257.578.802.802 0 0 0 .246.58l4.962 4.676a.905.905 0 0 0 .62.242.905.905 0 0 0 .62-.242l4.962-4.675a.803.803 0 0 0 .256-.584c0-.22-.092-.43-.256-.585Z"
                                      fill={` ${e.status == "ACTIVE" ? "#fff" : " #1f1d4d"}`}
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="a">
                                      <path
                                        fill={` ${e.status == "ACTIVE" ? "#fff" : " #1f1d4d"}`}
                                        d="M0 0h12.875v14H0z"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              {openDropdown === e.goalName && (
                                <div className="absolute right-0 mt-3 w-full border border-[#8297BD] rounded bg-[#2A1465] shadow-lg z-10">
                                  {e?.subTopics?.topics?.map(
                                    (option: any, index: any) => (
                                      <div
                                        key={index}
                                        className={`cursor-pointer text-center flex flex-row gap-1 items-center  p-2  ${optionValue?.option == option?.value && objective == e?.goalName ? "text-nyx-yellow bg-[#5E32FF] font-semibold hover:bg-[#5E32FF]" : "text-white hover:bg-[#5E32FF] hover:text-white"}`}
                                        onClick={() =>
                                          handleDropdownSelect(
                                            option,
                                            e?.goalName,
                                            e?.id,
                                            e,
                                          )
                                        }
                                      >
                                        <div className="ml-6">
                                          {
                                            dropDownSvg[
                                              option?.label?.toLowerCase()
                                            ]
                                          }
                                        </div>
                                        <div> {option?.label}</div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {e?.goalName == optionValue?.objective && (
                            <>
                              <div
                                className={` flex flex-row gap-1 ml-4 text-white text-xs bg-[#3B226F] w-fit p-[6px] rounded-lg`}
                              >
                                <div>
                                  {
                                    subTopicSvg[
                                      optionValue?.option.toLowerCase()
                                    ]
                                  }
                                </div>

                                <div>
                                  {optionValue?.option
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    optionValue?.option?.slice(1).toLowerCase()}
                                </div>
                              </div>
                            </>
                          )}

                          {/* <DropDown options={dropdownOptions} onSelect={handleDropdownSelect} /> */}
                        </div>
                        {e.status !== "ACTIVE" && (
                          <div className="absolute top-[-30px] left-4 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Objectives;
