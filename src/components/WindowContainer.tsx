"use client";

import { useRef, useState, useLayoutEffect, useCallback, forwardRef, useImperativeHandle, type ReactNode, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Button } from "@/components/ui/button"
import { useBreakpoints } from "@/lib/hooks/useBreakpoints";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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

const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

const WindowContainer = forwardRef<WindowContainerHandle, WindowContainerProps>(function WindowContainer({
  children,
  title = "Window",
  defaultPosition = { x: 40, y: 40 },
  defaultSize = { width: 800, height: 600 },
  boundsParent,
  minWidth = MIN_WIDTH,
  minHeight = MIN_HEIGHT,
  onStateChange,
}, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [previousPosition, setPreviousPosition] = useState(defaultPosition);
  const [currentSize, setCurrentSize] = useState(defaultSize);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const prevWindowStateRef = useRef<WindowState>("normal");

  // Resize state refs
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0 });
  const liveSize = useRef({ width: 0, height: 0, x: 0 });
  const activeHandle = useRef<string | null>(null);

  // Expose restore, open, close, and reset methods to parent
  useImperativeHandle(ref, () => ({
    restore: () => {
      if (windowState === "minimized") {
        setWindowState("normal");
      }
    },
    open: () => {
      setWindowState("normal");
      setIsVisible(true);
      setIsMinimized(false);
      setPreviousPosition(defaultPosition);
      setCurrentSize(defaultSize);
    },
    close: () => {
      setWindowState("closed");
    },
    reset: () => {
      setPreviousPosition(defaultPosition);
      setCurrentSize(defaultSize);
      const el = containerRef.current;
      if (el) {
        gsap.to(el, {
          x: defaultPosition.x,
          y: defaultPosition.y,
          width: defaultSize.width,
          height: defaultSize.height,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
  }), [windowState, defaultPosition, defaultSize]);

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

    // Set initial position and fade in
    gsap.set(el, { x: defaultPosition.x, y: defaultPosition.y, opacity: 0, scale: 0.8 });
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });

    // Create Draggable once — no inertia, completely free, but bounded to parent if specified
    const draggable = Draggable.create(el, {
      type: "x,y",
      trigger: titleBar,
      bounds: boundsParent,
      onDragEnd: function () {
        setPreviousPosition({ x: this.x, y: this.y });
      },
    })[0];

    draggableRef.current = draggable;

    return () => {
      draggable.kill();
      draggableRef.current = null;
    };
  }, [isMounted, defaultPosition]);

  // Handle resize mousedown
  const handleResizeStart = useCallback(
    (handle: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const el = containerRef.current;
      if (!el) return;

      activeHandle.current = handle;
      setIsResizing(true);

      const rect = el.getBoundingClientRect();
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
        left: rect.left,
      };
      liveSize.current = { width: rect.width, height: rect.height, x: previousPosition.x };

      const parentEl = el.parentElement;

      const handleMouseMove = (ev: MouseEvent) => {
        const el2 = containerRef.current;
        if (!el2) return;

        // Get parent bounds for max size clamping
        const parentRect = parentEl?.getBoundingClientRect();
        const maxWidth = parentRect ? parentRect.width : Infinity;
        const maxHeight = parentRect ? parentRect.height : Infinity;

        const dx = ev.clientX - resizeStart.current.x;
        const dy = ev.clientY - resizeStart.current.y;
        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = previousPosition.x;

        if (handle === "right") {
          newWidth = resizeStart.current.width + dx;
          newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        } else if (handle === "left") {
          newWidth = resizeStart.current.width - dx;
          newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
          // Adjust x position so the right edge stays put, clamped to parent
          const oldRight = previousPosition.x + resizeStart.current.width;
          newX = Math.max(0, oldRight - newWidth);
        } else if (handle === "bottom") {
          newHeight = resizeStart.current.height + dy;
          newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
        }

        // Track live values for mouseup
        liveSize.current = { width: newWidth, height: newHeight, x: handle === "left" ? newX : previousPosition.x };

        gsap.set(el2, {
          width: newWidth,
          height: newHeight,
          x: handle === "left" ? newX : previousPosition.x,
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setIsResizing(false);
        activeHandle.current = null;

        // Save final size and position from live values
        const finalWidth = liveSize.current.width;
        const finalHeight = liveSize.current.height;
        const finalX = liveSize.current.x;

        setCurrentSize({ width: finalWidth, height: finalHeight });
        setPreviousPosition((prev) => ({ ...prev, x: finalX }));
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [previousPosition, minWidth, minHeight],
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
          setIsVisible(false);
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
        onComplete: () => setIsVisible(false),
      });
      return;
    }

    // Restoring to normal
    if (windowState === "normal") {
      setIsVisible(true);

      // Restoring from closed — fade back in
      if (prev === "closed") {
        gsap.set(el, { width: currentSize.width, height: currentSize.height, left: 0, top: 0 });
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.5, x: previousPosition.x, y: previousPosition.y },
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
        gsap.set(el, { width: currentSize.width, height: currentSize.height, left: 0, top: 0 });
        gsap.fromTo(
          el,
          { x: -offsetX, y: vh - offsetY, opacity: 0, scale: 0 },
          {
            x: previousPosition.x,
            y: previousPosition.y,
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
          x: previousPosition.x,
          y: previousPosition.y,
          width: currentSize.width,
          height: currentSize.height,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [windowState, currentSize, previousPosition]);

  // Notify parent of state changes
  useLayoutEffect(() => {
    onStateChange?.(windowState);
  }, [windowState, onStateChange]);

  // Auto-maximize on medium and below breakpoints
  const { isBelowXl } = useBreakpoints();
  
  useEffect(() => {
    if (isBelowXl && windowState === "normal") {
      setWindowState("maximized");
    } else if (!isBelowXl && windowState === "maximized") {
      setWindowState("normal");
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
            className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize hover:bg-primary/20 transition-colors z-10"
            onMouseDown={(e) => handleResizeStart("bottom", e)}
          />

          {/* Right Handle */}
          <div
            className="absolute top-0 right-0 bottom-0 w-2 cursor-e-resize hover:bg-primary/20 transition-colors z-10"
            onMouseDown={(e) => handleResizeStart("right", e)}
          />

          {/* Left Handle */}
          <div
            className="absolute top-0 left-0 bottom-0 w-2 cursor-w-resize hover:bg-primary/20 transition-colors z-10"
            onMouseDown={(e) => handleResizeStart("left", e)}
          />

          {/* Bottom-Right Corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
            onMouseDown={(e) => handleResizeStart("right", e)}
          />

          {/* Bottom-Left Corner */}
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-20"
            onMouseDown={(e) => handleResizeStart("left", e)}
          />
        </>
      )}
    </div>
  );
});

export default WindowContainer;
