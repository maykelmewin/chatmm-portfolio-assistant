"use client";

import { useState, useEffect } from "react";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | undefined;

export interface BreakpointState {
  breakpoint: Breakpoint;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  isAboveSm: boolean;
  isAboveMd: boolean;
  isAboveLg: boolean;
  isAboveXl: boolean;
  isBelowMd: boolean;
  isBelowLg: boolean;
  isBelowXl: boolean;
  isBelow2xl: boolean;
}

export function useBreakpoints(): BreakpointState {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(undefined);

  const getBreakpoint = (width: number): Breakpoint => {
    if (width >= 1536) return "2xl";
    if (width >= 1280) return "xl";
    if (width >= 1024) return "lg";
    if (width >= 768) return "md";
    if (width >= 640) return "sm";
    return undefined;
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    };

    const updateBreakpoint = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);
      setBreakpoint((currentBreakpoint) => {
        if (currentBreakpoint !== newBreakpoint) {
          return newBreakpoint;
        }
        return currentBreakpoint;
      });
    };

    const mediaQueries = {
      sm: window.matchMedia(`(min-width: ${breakpoints.sm}px)`),
      md: window.matchMedia(`(min-width: ${breakpoints.md}px)`),
      lg: window.matchMedia(`(min-width: ${breakpoints.lg}px)`),
      xl: window.matchMedia(`(min-width: ${breakpoints.xl}px)`),
      "2xl": window.matchMedia(`(min-width: ${breakpoints["2xl"]}px)`),
    };

    Object.values(mediaQueries).forEach((mq) => {
      mq.addEventListener("change", updateBreakpoint);
    });

    updateBreakpoint();

    return () => {
      Object.values(mediaQueries).forEach((mq) => {
        mq.removeEventListener("change", updateBreakpoint);
      });
    };
  }, []);

  const breakpointState: BreakpointState = {
    breakpoint,
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2xl: breakpoint === "2xl",
    isAboveSm: breakpoint !== undefined,
    isAboveMd: breakpoint === "md" || breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
    isAboveLg: breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
    isAboveXl: breakpoint === "xl" || breakpoint === "2xl",
    isBelowMd: breakpoint === undefined,
    isBelowLg: breakpoint === undefined || breakpoint === "sm",
    isBelowXl: breakpoint === undefined || breakpoint === "sm" || breakpoint === "md",
    isBelow2xl: breakpoint === undefined || breakpoint === "sm" || breakpoint === "md" || breakpoint === "lg" || breakpoint === "xl",
  };

  return breakpointState;
}

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
