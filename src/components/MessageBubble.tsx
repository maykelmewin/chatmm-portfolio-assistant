"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import type { Message } from "@/types/message";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] w-fit",
        message.role === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "rounded-2xl py-2.5",
          message.role === "user"
            ? "bg-muted px-4 "
            : "bg-transparent"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
      {message.role === "assistant" && (
        <div className="flex gap-0.5 mt-1 items-center -ml-1">
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 p-0"
            aria-label="Copy"
          >
            <Copy className="size-3.5 text-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 p-0"
            aria-label="Like"
          >
            <ThumbsUp className="size-3.5 text-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 p-0"
            aria-label="Dislike"
          >
            <ThumbsDown className="size-3.5 text-foreground" />
          </Button>
        </div>
      )}
    </div>
  );
}