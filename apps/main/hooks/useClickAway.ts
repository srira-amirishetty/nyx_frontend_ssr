import { useEffect, RefObject } from "react";

const EVENT = "mousedown";

const useClickAway = <T extends HTMLElement>(ref: RefObject<T>, callback: (event: MouseEvent) => void): void => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };
    document.addEventListener(EVENT, listener);
    return () => {
      document.removeEventListener(EVENT, listener);
    };
  }, [ref, callback]);
};

export default useClickAway;
