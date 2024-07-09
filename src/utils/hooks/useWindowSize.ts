"use client";

import { useEffect, useState } from "react";

/**
 * The `useWindowSize` function is a custom React hook that returns the current width and height of the
 * browser window.
 * @returns The `useWindowSize` custom hook returns an object containing the current width and height
 * of the window.
 */
export const useWindowSize = () => {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState(() => getSize());

  function getSize() {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    };
  }

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  return windowSize;
};
