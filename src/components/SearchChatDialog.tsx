"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, SearchAlert, User, Bot, Clock, MessageSquareOff } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Message } from "@/types/message";

interface SearchChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: Message[];
  onSelectMessage: (messageId: string) => void;
}

export function SearchChatDialog({
  open,
  onOpenChange,
  messages,
  onSelectMessage,
}: SearchChatDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay to let the dialog animation complete
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(query.toLowerCase())
  );

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) {
      return time;
    }

    const dateStr = date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
    return `${dateStr} ${time}`;
  };

  const truncateContent = (content: string, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength).trimEnd() + "…";
  };

  const handleSelect = (messageId: string) => {
    onSelectMessage(messageId);
    onOpenChange(false);
  };

  // Empty state: no messages at all
  const isEmptyState = messages.length === 0;

  // Empty state: no search results
  const isNoResults = !isEmptyState && query.length > 0 && filteredMessages.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[70vh] flex flex-col p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Chat
          </DialogTitle>
          <DialogDescription>
            Search through your conversation history
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-3 pt-3 pb-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversation…"
              className="pl-9 h-9"
            />
          </div>
        </div>

        {/* Results / Empty States */}
        <div className="overflow-y-auto flex-1 scrollbar">
          
          {isEmptyState && (
            <div className="flex flex-col items-center justify-center pt-4 pb-8 px-4 text-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <MessageSquareOff className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium text-foreground mb-1">
                  No messages yet
                </p>
                <p className="text-xs text-muted-foreground ">
                  Start a conversation and your messages will appear here.
                </p>
              </div>
            </div>
          )}

          {isNoResults && (
            <div className="flex flex-col items-center justify-center pt-4 pb-8 px-4 text-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <SearchAlert className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium text-foreground mb-1">
                  No results found
                </p>
                <p className="text-xs text-muted-foreground ">
                  No messages match "{query}". Try a different search term.
                </p>
              </div>
            </div>
          )}

          {!isEmptyState && !isNoResults && (
            <div className="px-3 pb-2">
              {filteredMessages.length === 0 && query.length === 0 ? (
                // Show all messages when no query
                messages.map((msg) => (
                  <SearchResultItem
                    key={msg.id}
                    message={msg}
                    query={query}
                    formatTimestamp={formatTimestamp}
                    truncateContent={truncateContent}
                    onSelect={handleSelect}
                  />
                ))
              ) : (
                // Show filtered results
                filteredMessages.map((msg) => (
                  <SearchResultItem
                    key={msg.id}
                    message={msg}
                    query={query}
                    formatTimestamp={formatTimestamp}
                    truncateContent={truncateContent}
                    onSelect={handleSelect}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SearchResultItemProps {
  message: Message;
  query: string;
  formatTimestamp: (timestamp: number) => string;
  truncateContent: (content: string, maxLength?: number) => string;
  onSelect: (messageId: string) => void;
}

function SearchResultItem({
  message,
  query,
  formatTimestamp,
  truncateContent,
  onSelect,
}: SearchResultItemProps) {
  const isUser = message.role === "user";

  return (
    <button
      type="button"
      onClick={() => onSelect(message.id)}
      className={cn(
        "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
        "hover:bg-accent cursor-pointer group"
      )}
    >
      {/* Role Icon */}
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5",
          isUser
            ? "bg-primary/10 text-primary"
            : "bg-muted-foreground/10 text-muted-foreground"
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : (
          <Bot className="h-3.5 w-3.5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-medium text-foreground">
            {isUser ? "You" : "Assistant"}
          </span>
          <span className="flex items-center gap-1 text-[0.625rem] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {truncateContent(message.content)}
        </p>
      </div>
    </button>
  );
}