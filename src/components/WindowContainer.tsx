"use client";

import { useRef, useState, useLayoutEffect, useCallback, forwardRef, useImperativeHandle, type ReactNode, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Button } from "@/components/ui/button"
import { useBreakpoints } from "@/lib/hooks/useBreakpoints";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils";
import { 
  Minus, 
  XIcon, 
  Maximize2,
  SquareMinus,
} from "lucide-react";
import { ChatMMHeader } from "./ChatMMHeader";

gsap.registerPlugin(Draggable);

export interface WindowContainerHandle {
  restore: () => void;
  open: () => void;
  close: () => void;
  reset: () => void;
}

interface WindowContainerProps {
  children: ReactNode;
  title?: string;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  propSize?: { width: number; height: number };
  boundsParent?: string;
  minWidth?: number;
  minHeight?: number;
  onStateChange?: (state: WindowState) => void;
}

type WindowState = "normal" | "maximized" | "minimized" | "closed";

const MIN_WIDTH = 300;
const MIN_HEIGHT = 500;

const BIG_SCREEN_DEFAULTS = {
  position: { x: 40, y: 40 },
  size: { width: 800, height: 600 },
} as const;

const SMALL_SCREEN_DEFAULTS = {
  position: { x: 16, y: 16 },
} as const;

const WindowContainer = forwardRef<WindowContainerHandle, WindowContainerProps>(function WindowContainer({
  children,
  title = "Window",
  defaultPosition = BIG_SCREEN_DEFAULTS.position,
  defaultSize = BIG_SCREEN_DEFAULTS.size,
  boundsParent,
  minWidth = MIN_WIDTH,
  minHeight = MIN_HEIGHT,
  onStateChange,
}, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [currentSize, setCurrentSize] = useState(defaultSize);
  const [isMounted, setIsMounted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const prevWindowStateRef = useRef<WindowState>("normal");
  const onStateChangeRef = useRef(onStateChange);
  onStateChangeRef.current = onStateChange;

  // Refs to mirror position/size for use in callbacks/effects without re-render triggers
  const previousPositionRef = useRef(defaultPosition);
  const currentSizeRef = useRef(currentSize);
  currentSizeRef.current = currentSize;

  // Resize state refs
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0 });
  const liveSize = useRef({ width: 0, height: 0, x: 0 });
  const activeHandle = useRef<string | null>(null);

  // Auto-maximize on medium and below breakpoints
  const { isBelowXl } = useBreakpoints();
  const isTouch = useIsTouchDevice();

  // Compute responsive defaults based on viewport
  const getResponsiveDefaults = useCallback((small: boolean) => {
    if (small && typeof window !== "undefined") {
      return {
        position: SMALL_SCREEN_DEFAULTS.position,
        size: { width: Math.round(window.innerWidth * 0.8), height: Math.round(window.innerHeight * 0.8) },
      };
    }
    return {
      position: defaultPosition,
      size: defaultSize,
    };
  }, [defaultPosition, defaultSize]);

  // Expose restore, open, close, and reset methods to parent
  useImperativeHandle(ref, () => ({
    restore: () => {
      if (windowState === "minimized") {
        setWindowState("normal");
      }
    },
    open: () => {
      setWindowState("normal");
      setIsMinimized(false);
      const { position, size } = getResponsiveDefaults(isBelowXl);
      previousPositionRef.current = position;
      setCurrentSize(size);
    },
    close: () => {
      setWindowState("closed");
    },
    reset: () => {
      const { position, size } = getResponsiveDefaults(isBelowXl);
      previousPositionRef.current = position;
      setCurrentSize(size);
      const el = containerRef.current;
      if (el) {
        gsap.to(el, {
          x: position.x,
          y: position.y,
          width: size.width,
          height: size.height,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
  }), [windowState, defaultPosition, defaultSize, getResponsiveDefaults, isBelowXl]);

  // Set mounted flag (client-side only)
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  // Mount animation + create Draggable once
  useLayoutEffect(() => {
    if (!isMounted) return;
    const el = containerRef.current;
    const titleBar = titleBarRef.current;
    if (!el || !titleBar) return;

    // Apply responsive defaults for small screens
    const { position, size } = getResponsiveDefaults(isBelowXl);
    previousPositionRef.current = position;
    currentSizeRef.current = size;
    if (isBelowXl) {
      setCurrentSize(size);
    }

    // Set initial position and fade in
    gsap.set(el, { x: position.x, y: position.y, opacity: 0, scale: 0.8 });
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });

    // Create Draggable once — no inertia, completely free, but bounded to parent if specified
    const draggable = Draggable.create(el, {
      type: "x,y",
      trigger: titleBar,
      bounds: boundsParent,
      onDragEnd: function () {
        previousPositionRef.current = { x: this.x, y: this.y };
      },
    })[0];

    draggableRef.current = draggable;

    return () => {
      draggable.kill();
      draggableRef.current = null;
    };
  }, [isMounted, defaultPosition, isBelowXl, getResponsiveDefaults]);

  // Handle resize mousedown/touchstart
  const handleResizeStart = useCallback(
    (handle: string, e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const el = containerRef.current;
      if (!el) return;

      activeHandle.current = handle;

      const rect = el.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      resizeStart.current = {
        x: clientX,
        y: clientY,
        width: rect.width,
        height: rect.height,
        left: rect.left,
      };
      liveSize.current = { width: rect.width, height: rect.height, x: previousPositionRef.current.x };

      const parentEl = el.parentElement;

      const getClientCoords = (ev: MouseEvent | TouchEvent) => {
        if ("touches" in ev) {
          return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
        }
        return { x: ev.clientX, y: ev.clientY };
      };

      const handleResizeMove = (ev: MouseEvent | TouchEvent) => {
        const el2 = containerRef.current;
        if (!el2) return;

        // Get parent bounds for max size clamping
        const parentRect = parentEl?.getBoundingClientRect();
        const maxWidth = parentRect ? parentRect.width : Infinity;
        const maxHeight = parentRect ? parentRect.height : Infinity;

        const { x: clientX, y: clientY } = getClientCoords(ev);
        const dx = clientX - resizeStart.current.x;
        const dy = clientY - resizeStart.current.y;
        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = previousPositionRef.current.x;

        if (handle === "right") {
          newWidth = resizeStart.current.width + dx;
          newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        } else if (handle === "left") {
          newWidth = resizeStart.current.width - dx;
          newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
          // Adjust x position so the right edge stays put, clamped to parent
          const oldRight = previousPositionRef.current.x + resizeStart.current.width;
          newX = Math.max(0, oldRight - newWidth);
        } else if (handle === "bottom") {
          newHeight = resizeStart.current.height + dy;
          newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
        }

        // Track live values for mouseup
        liveSize.current = { width: newWidth, height: newHeight, x: handle === "left" ? newX : previousPositionRef.current.x };

        gsap.set(el2, {
          width: newWidth,
          height: newHeight,
          x: handle === "left" ? newX : previousPositionRef.current.x,
        });
      };

      const handleResizeEnd = () => {
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", handleResizeEnd);
        document.removeEventListener("touchmove", handleResizeMove);
        document.removeEventListener("touchend", handleResizeEnd);
        activeHandle.current = null;

        // Save final size and position from live values
        const finalWidth = liveSize.current.width;
        const finalHeight = liveSize.current.height;
        const finalX = liveSize.current.x;

        setCurrentSize({ width: finalWidth, height: finalHeight });
        previousPositionRef.current = { ...previousPositionRef.current, x: finalX };
      };

      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      document.addEventListener("touchmove", handleResizeMove, { passive: false });
      document.addEventListener("touchend", handleResizeEnd);
    },
    [minWidth, minHeight],
  );

  // React to windowState changes — all GSAP animations + toggle draggable
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prev = prevWindowStateRef.current;
    prevWindowStateRef.current = windowState;

    // Toggle draggable based on state
    if (draggableRef.current) {
      draggableRef.current.enabled(windowState === "normal");
    }

    if (windowState === "maximized") {
      gsap.to(el, {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%",
        duration: 0.3,
        ease: "power2.out",
      });
      return;
    }

    if (windowState === "minimized") {
      // Use visualViewport for true 100dvh/100dvw equivalent
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const parentRect = el.parentElement?.getBoundingClientRect();
      const offsetX = parentRect?.left || 0;
      const offsetY = parentRect?.top || 0;
      gsap.to(el, {
        x: -offsetX,
        y: vh - offsetY,
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "easeInOut",
        onComplete: () => {
          setIsMinimized(true);
        },
      });
      return;
    }

    if (windowState === "closed") {
      gsap.to(el, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
      });
      return;
    }

    // Restoring to normal
    if (windowState === "normal") {

      // Restoring from closed — fade back in
      if (prev === "closed") {
        gsap.set(el, { width: currentSizeRef.current.width, height: currentSizeRef.current.height, left: 0, top: 0 });
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.5, x: previousPositionRef.current.x, y: previousPositionRef.current.y },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
        );
        return;
      }

      // Restoring from minimized — animate from screen edge back to saved position
      if (prev === "minimized") {
        setIsMinimized(false);
        const vh = window.visualViewport?.height ?? window.innerHeight;
        const parentRect = el.parentElement?.getBoundingClientRect();
        const offsetX = parentRect?.left || 0;
        const offsetY = parentRect?.top || 0;
        gsap.set(el, { width: currentSizeRef.current.width, height: currentSizeRef.current.height, left: 0, top: 0 });
        gsap.fromTo(
          el,
          { x: -offsetX, y: vh - offsetY, opacity: 0, scale: 0 },
          {
            x: previousPositionRef.current.x,
            y: previousPositionRef.current.y,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
        );
        return;
      }

      // Restoring from maximized
      if (prev === "maximized") {
        gsap.to(el, {
          x: previousPositionRef.current.x,
          y: previousPositionRef.current.y,
          width: currentSizeRef.current.width,
          height: currentSizeRef.current.height,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [windowState]);

  // Notify parent of state changes
  useLayoutEffect(() => {
    onStateChangeRef.current?.(windowState);
  }, [windowState]);

  useEffect(() => {
    if (isBelowXl) {
      setWindowState(prev => prev === "normal" ? "maximized" : prev);
    } else {
      setWindowState(prev => prev === "maximized" ? "normal" : prev);
    }
  }, [isBelowXl]);

  // Handle minimize
  const handleMinimize = () => {
    if (windowState === "minimized") {
      setWindowState("normal");
    } else {
      setWindowState("minimized");
    }
  };

  // Handle restore down / maximize toggle
  const handleRestoreDown = () => {
    if (windowState === "maximized") {
      setWindowState("normal");
    } else {
      setWindowState("maximized");
    }
  };

  // Handle close
  const handleClose = () => {
    setWindowState("closed");
    setIsCloseDialogOpen(false);
    // TODO: Clear all data on close
  };

  const allowResize = windowState === "normal" && !isMinimized;


  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute bg-background dark:shadow-none shadow-lg flex flex-col",
        windowState !== "maximized" && "rounded-lg border"
      )}
      style={{
        width: currentSize.width,
        height: currentSize.height,
        left: 0,
        top: 0,
        zIndex: 50,
        overflow: "hidden",
        display: isMinimized ? "none" : windowState === "closed" ? "none" : "flex",
      }}
    >
      {/* Title Bar */}
      <div
        ref={titleBarRef}
        className={cn(
          "flex items-center select-none shrink-0",
          windowState !== "maximized" ? "cursor-grab active:cursor-grabbing bg-muted/50 pl-4 pr-1 sm:px-4 py-1 sm:py-2 border-b" : "px-1 sm:px-8 py-1 sm:py-4"
        )}
      >
        {windowState === "maximized" ?          
          <div className="hidden md:block">
            <ChatMMHeader variant="desktop" />
          </div> :
          <span className="text-sm font-semibold text-muted-foreground">
            {title}
          </span>
        }

        {/* Window Controls */}
        <div className={cn("flex items-center ml-auto", windowState === "maximized" && "gap-1")}>
          {/* Minimize */}
          <Button variant="ghost"
            aria-label="Minimize"
            onClick={handleMinimize}
          >
            <Minus className="size-4 text-foreground/70 rounded-sm" />
          </Button>

          {/* Restore Down / Maximize */}
          <Button variant="ghost"
            aria-label={windowState === "maximized" ? "Restore Down" : "Maximize"}
            onClick={handleRestoreDown}
          >
            {windowState === "maximized" ? <SquareMinus className="size-4 text-primary rounded-sm" /> : <Maximize2 className="size-4 text-foreground/70 rounded-sm" /> }
          </Button>

          {/* Close */}
          <AlertDialog open={isCloseDialogOpen} onOpenChange={setIsCloseDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost"
                aria-label="Close"
              >
                <XIcon className="size-4 text-foreground/70 rounded-sm" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              title="Close chat?"
              description="This will reset the conversation and clear recent chats."
              actionText="Close"
              cancelText="Cancel"
              onAction={handleClose}
            />
          </AlertDialog>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Resize Handles — only active in normal state */}
      {allowResize && (
        <>
          {/* Bottom Handle */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center",
              isTouch ? "h-8 cursor-s-resize" : "h-2 cursor-s-resize hover:bg-primary/20 transition-colors"
            )}
            onMouseDown={(e) => handleResizeStart("bottom", e)}
            onTouchStart={(e) => handleResizeStart("bottom", e)}
          >
            {isTouch && <div className="w-16 h-1 bg-primary/20 rounded-full mb-1.5" />}
          </div>

          {/* Right Handle */}
          <div
            className={cn(
              "absolute top-0 right-0 bottom-0 z-10 flex items-center justify-end",
              isTouch ? "w-8 cursor-e-resize" : "w-2 cursor-e-resize hover:bg-primary/20 transition-colors"
            )}
            onMouseDown={(e) => handleResizeStart("right", e)}
            onTouchStart={(e) => handleResizeStart("right", e)}
          >
            {isTouch && <div className="h-16 w-1 bg-primary/20 rounded-full mr-1.5" />}
          </div>

          {/* Left Handle */}
          <div
            className={cn(
              "absolute top-0 left-0 bottom-0 z-10 flex items-center justify-start",
              isTouch ? "w-8 cursor-w-resize" : "w-2 cursor-w-resize hover:bg-primary/20 transition-colors"
            )}
            onMouseDown={(e) => handleResizeStart("left", e)}
            onTouchStart={(e) => handleResizeStart("left", e)}
          >
            {isTouch && <div className="h-16 w-1 bg-primary/20 rounded-full ml-1.5" />}
          </div>

          {/* Bottom-Right Corner */}
          <div
            className={cn(
              "absolute bottom-0 right-0 z-20 flex items-center justify-center",
              isTouch ? "w-10 h-10 cursor-se-resize" : "w-4 h-4 cursor-se-resize"
            )}
            onMouseDown={(e) => handleResizeStart("right", e)}
            onTouchStart={(e) => handleResizeStart("right", e)}
          >
            {isTouch && (
              <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-primary/20 rounded-br-sm" />
            )}
          </div>

          {/* Bottom-Left Corner */}
          <div
            className={cn(
              "absolute bottom-0 left-0 z-20 flex items-center justify-center",
              isTouch ? "w-10 h-10 cursor-sw-resize" : "w-4 h-4 cursor-sw-resize"
            )}
            onMouseDown={(e) => handleResizeStart("left", e)}
            onTouchStart={(e) => handleResizeStart("left", e)}
          >
            {isTouch && (
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-primary/20 rounded-bl-sm" />
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default WindowContainer;