"use client";

import { useState, useEffect } from "react";

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouch(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isTouch;
}