"use client";

import React from "react";
import {
  Search,
  Briefcase,
  FileIcon,
  Settings,
  HelpCircle,
  Plus,
  CircleQuestionMark,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { suggestedPrompts } from "@/data/suggested-prompts"
import { navItems } from "@/data/navigation"
import type { NavItem } from "@/types/navigation"
import type { Prompt } from "@/types/prompts";
import { AboutDialog } from "@/components/AboutDialog";
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

type WindowState = "normal" | "maximized" | "minimized" | "closed";

interface SidebarContentProps {
  isCollapsed: boolean;
  windowState: WindowState;
  onOpenChat: () => void;
  onStart: () => void;
  onNewChat: () => void;
  onSearchChat: () => void;
  onPromptClick: (prompt: string) => void;
}


export function SidebarContent({ isCollapsed, windowState, onOpenChat, onStart, onNewChat, onSearchChat, onPromptClick }: SidebarContentProps) {
  const [mounted, setMounted] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [newChatDialogOpen, setNewChatDialogOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavItemClick = (id: NavItem["id"]) => {
    switch (id) {
      case "about":
        setAboutOpen(true);
        break;
      case "new-chat":
        if (windowState === "closed") {
          onStart();
        } else if (windowState === "minimized") {
          onOpenChat();
        } else {
          // normal or maximized — show confirmation
          setNewChatDialogOpen(true);
        }
        break;
      case "search-chat":
        onSearchChat();
        break;
      case "portfolio":
        window.open("https://portfolio-maykel.netlify.app/", "_blank", "noopener,noreferrer");
        break;
      case "linkedin":
        window.open("https://linkedin.com/in/michael-merin", "_blank", "noopener,noreferrer");
        break;
      case "resume":
        window.open("https://docs.google.com/document/d/1JokgUdT7mXBkoQhW9cQEj_jaL3-ddtUAouuG4Di5hpg/export?format=pdf", "_blank", "noopener,noreferrer");
        break;
      case "contact":
        window.location.href = "mailto:michael.merin14@gmail.com";
        break;
      default:
        break;
    }
  };

  return (
    <>
    <div className="flex flex-col h-full bg-background">
      {/* Header / Workspace Switcher */}
      <div className={cn("p-4 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0">
              <Logo size={24} className="text-foreground" />
            </div>
        </div>
        {!isCollapsed && mounted && (
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
                <Sun className="size-4 text-muted-foreground" />
            ) : (
                <Moon className="size-4 text-muted-foreground" />
            )}
          </Button>
        )}
      </div>
      <div className="space-y-1 px-2">           
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            onClick={() => handleNavItemClick(item.id)}
          />
        ))}
      </div>
      {!isCollapsed && (windowState !== "closed") && (
        <div className="flex-1 min-h-20 overflow-y-auto scrollbar mt-4">
          <div className={cn("px-3 py-2 space-y-4", isCollapsed && "px-2")}>
            <div className="">
              <div className="flex items-center justify-between px-2 mb-2">
                <p className="text-sm font-semibold">
                  Suggested Prompts
                </p>
              </div>
              {suggestedPrompts.map((item) => (
                <PromptItem key={item.id} item={item} onPromptClick={onPromptClick} />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <div className="mt-auto p-4 space-y-2">
        <div className={cn(
          "flex items-center gap-2",
          isCollapsed ? "justify-center" : "py-1"
        )}>
          <Avatar className={cn(
            "ring-2 ring-background",
            isCollapsed ? "size-9" : "size-11"
          )}>
            <AvatarImage src="https://github.com/maykelmewin.png" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-base font-medium truncate ">Michael Merin</span>
              <span className="text-xs text-muted-foreground truncate">Front-end Developer</span>
            </div>
          )}
        </div>
        {/* Open Chat — visible when window is normal/maximized/minimized, enabled only when minimized */}
        {windowState !== "closed" && (
          !isCollapsed ? (
            <Button variant="outline" className="w-full h-9 rounded-full cursor-pointer" disabled={windowState !== "minimized"} onClick={onOpenChat}>
             <ExternalLink className="size-4" /> 
             Open Chat
            </Button>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full h-9 rounded-full cursor-pointer" disabled={windowState !== "minimized"} onClick={onOpenChat}>
                  <ExternalLink className="size-4" /> 
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Open Chat</TooltipContent>
            </Tooltip>
          )
        )}
        {/* Start — only visible when window is closed */}
        {windowState === "closed" && (
          !isCollapsed ? (
            <Button variant="outlinePrimary" className="w-full h-9 rounded-full cursor-pointer" onClick={onStart}>
             <Sparkles className="size-4" /> 
             Start
            </Button>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="outlinePrimary" className="w-full h-9 rounded-full cursor-pointer" onClick={onStart}>
                  <Sparkles className="size-4" /> 
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Start</TooltipContent>
            </Tooltip>
          )
        )}
      </div>
    </div>
    <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    <AlertDialog open={newChatDialogOpen} onOpenChange={setNewChatDialogOpen}>
      <AlertDialogContent
        title="Start new chat?"
        description="This will reset the conversation and clear recent chats."
        actionText="New Chat"
        cancelText="Cancel"
        onAction={() => {
          setNewChatDialogOpen(false);
          onNewChat();
        }}
      />
    </AlertDialog>
    </>
  );
}

function SidebarItem({
  item,
  isCollapsed,
  className,
  onClick,
} : {
  item: NavItem;
  isCollapsed: boolean;
  className?: string;
  onClick: () => void;
}) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer",
        "hover:bg-accent hover:text-accent-foreground group relative",
        isCollapsed ? "justify-center px-2" : "justify-start",
        className
      )}
      onClick={onClick}
    >
      <item.icon className={cn(
        "h-5 w-5 shrink-0 transition-colors",
        "text-foreground"
      )} />
      {!isCollapsed && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <span className="text-sm truncate">{item.title}</span>
        </div>
      )}
    </div>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{item.title}</TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

function PromptItem({
item,
onPromptClick
} : {
item: Prompt;
onPromptClick: (prompt: string) => void;
}) {
  return (
    <Button variant="ghost" className="w-full justify-start cursor-pointer" key={item.id} onClick={() => onPromptClick(item.prompt)}>
      <p className="text-sm truncate">{item.title}</p>
    </Button>
  )
}
