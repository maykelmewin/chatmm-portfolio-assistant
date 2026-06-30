"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, ChevronDown } from "lucide-react";
import { AboutDialog } from "@/components/AboutDialog";

interface ChatMMHeaderProps {
  variant?: "mobile" | "desktop";
}

export function ChatMMHeader({ variant = "desktop" }: ChatMMHeaderProps) {
  const [aboutOpen, setAboutOpen] = React.useState(false);

  const isMobile = variant === "mobile";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="none"
            className={cn(
              "flex items-center gap-1 px-2 h-auto font-semibold cursor-pointer group",
              isMobile ? "text-base" : "text-xl"
            )}
          >
            <span>ChatMM</span>
            <ChevronDown className="h-4 w-4 text-foreground/30 group-hover:text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => setAboutOpen(true)}>
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-thin">
              ChatMM version 3.4 <HelpCircle className="mr-2 h-3 w-3" />
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
}
