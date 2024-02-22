import {RefObject, useEffect} from "react";

export const useElementOutside = (
  ref: RefObject<HTMLDivElement | HTMLUListElement | HTMLLabelElement>,
  hideElement: () => void,
): void => {
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(e.target as HTMLDivElement)
      ) {
        hideElement();
      }
    });

    return (): void => {
      document.removeEventListener("mousedown", (e) => {
        if (
          ref &&
          ref.current &&
          !ref.current.contains(e.target as HTMLDivElement)
        ) {
          hideElement();
        }
      });
    };
  }, [ref]);
};