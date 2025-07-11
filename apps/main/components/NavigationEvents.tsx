"use client";
import { useEffect } from "react";
import NProgress from "nprogress";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export default function ProgressBar() {
  const height = "5px";
  const color = "#B631B1";

  const styles = (
    <style>
      {`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: linear-gradient(89deg, #B631B1 3.04%, #7048D7 76.47%);
          position: fixed;
          z-index: 99999;
          top: 0;
          left: 0;
          width: 100%;
          height: ${typeof height === `string` ? height : `${height}px`};
        }
        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1.0;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }
    `}
    </style>
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      // const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      // const currentUrl = location.href;

      // if (targetUrl !== currentUrl) {
      //   NProgress.start();
      // }

      const anchor = event.currentTarget as HTMLAnchorElement;

      // Check if the link opens in a new tab
      if (anchor.target === "_blank" || event.ctrlKey || event.metaKey) {
        return; // Do nothing if it's a new tab
      }

      const targetUrl = anchor.href;
      const currentUrl = location.href;

      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick),
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return styles;
}
