"use client";

import React, { useState, useEffect } from "react";
import { Menu, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./SidebarContent";
import { ChatMMHeader } from "./ChatMMHeader";

type WindowState = "normal" | "maximized" | "minimized" | "closed";

interface ResponsiveSidebarProps {
  children: React.ReactNode;
  windowState: WindowState;
  onOpenChat: () => void;
  onStart: () => void;
}

export function ResponsiveSidebar({ children, windowState, onOpenChat, onStart }: ResponsiveSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle window resize to determine if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "relative hidden md:flex flex-col transition-all duration-300 ease-in-out border-r z-20",
          isCollapsed ? "w-[70px]" : "w-[260px]"
        )}
      >
        <SidebarContent isCollapsed={isCollapsed} windowState={windowState} onOpenChat={onOpenChat} onStart={onStart} />
        
        {/* Collapse Toggle Button */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute -right-3 top-12 h-6 w-6 rounded-full border shadow-md transition-transform duration-300 cursor-pointer z-100",
            isCollapsed && "rotate-180"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-19">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] sm:w-[320px]">
                <SidebarContent isCollapsed={false} windowState={windowState} onOpenChat={onOpenChat} onStart={onStart} />
              </SheetContent>
            </Sheet>
            <ChatMMHeader variant="mobile" />
          </div>
          <Avatar className="ring-2 ring-background size-8">
            <AvatarImage src="https://github.com/maykelmewin.png" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </header>

        {/* Page Content */}
        <div className="relative flex-1 overflow-y-auto p-0 md:p-0">
          {children}
          <div className="md:flex hidden absolute top-0 left-0 z-99  justify-center items-center h-16 px-6">
            <ChatMMHeader variant="desktop" />
          </div>
        </div>
      </main>
    </div>
  );
}
