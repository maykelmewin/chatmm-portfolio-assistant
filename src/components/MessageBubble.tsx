"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import type { Message } from "@/types/message";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isError = message.content.startsWith('Sorry, I encountered an error');
  const [dotCount, setDotCount] = useState(1);
  const [rating, setRating] = useState<'like' | 'dislike' | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Animate dots: 1 → 2 → 3 → 2 → 1 → repeat
  useEffect(() => {
    if (message.content) return; // Stop animation when content arrives
    
    const interval = setInterval(() => {
      setDotCount(prev => {
        if (prev === 1) return 2;
        if (prev === 2) return 3;
        if (prev === 3) return 2;
        return 1;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [message.content]);
  
  const dots = '.'.repeat(dotCount);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API not available
    }
  };

  const handleLike = () => {
    setRating(prev => prev === 'like' ? null : 'like');
  };

  const handleDislike = () => {
    setRating(prev => prev === 'dislike' ? null : 'dislike');
  };
  
  return (
    <div
      key={message.id + message.content}
      className={cn(
        "flex flex-col  w-fit",
        message.role === "user" ? "ml-auto max-w-8/10" : "mr-auto max-w-full"
      )}
    >
      <div
        className={cn(
          "rounded-2xl py-2.5",
          message.role === "user"
            && "bg-muted px-4 ",
          message.role === "assistant"
            && "prose dark:prose-invert max-w-none px-1"
        )}
      >
        {message.content ? (
          message.role === "assistant" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">
                    {children}
                  </a>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
                  }
                  return (
                    <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-sm my-2">
                      <code className={className} {...props}>{children}</code>
                    </pre>
                  );
                },
                ul: ({ children }) => <ul className="list-disc pl-5 my-1 space-y-0.5">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 my-1 space-y-0.5">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-1">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mt-2 mb-1">{children}</h2>,
                h3: ({ children }) => <h3 className="font-bold mt-2 mb-1">{children}</h3>,
                p: ({ children }) => <p className="leading-relaxed mb-1 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className={cn(
              "leading-relaxed whitespace-pre-wrap",
              isError && "text-red-600 dark:text-red-400"
            )}>{message.content}</p>
          )
        ) : message.role === "assistant" ? (
          <div className="min-h-5">
            <span className="text-muted-foreground">Thinking{dots}</span>
          </div>
        ) : null}
      </div>
      {message.role === "assistant" && (
        <div className="flex gap-0.5 mt-1 items-center -ml-1">
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 p-0 cursor-pointer"
            aria-label={copied ? "Copied" : "Copy"}
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-3.5 text-foreground transition-all scale-110" />
            ) : (
              <Copy className="size-3.5 text-foreground" />
            )}
          </Button>
          {copied && (
            <span className="text-xs text-muted-foreground animate-in fade-in slide-in-from-left-1 duration-200">
              Copied!
            </span>
          )}
          {rating !== 'dislike' && (
            <Button
              variant="ghost"
              size="icon-xs"
              className={cn("h-7 w-7 p-0 cursor-pointer", rating === 'like' && "text-primary")}
              aria-label={rating === 'like' ? "Liked" : "Like"}
              onClick={handleLike}
            >
              <ThumbsUp className="size-3.5" />
            </Button>
          )}
          {rating === 'like' && (
            <span className="text-xs text-primary">Liked</span>
          )}
          {rating !== 'like' && (
            <Button
              variant="ghost"
              size="icon-xs"
              className={cn("h-7 w-7 p-0 cursor-pointer", rating === 'dislike' && "text-destructive")}
              aria-label={rating === 'dislike' ? "Disliked" : "Dislike"}
              onClick={handleDislike}
            >
              <ThumbsDown className="size-3.5" />
            </Button>
          )}
          {rating === 'dislike' && (
            <span className="text-xs text-destructive">Disliked</span>
          )}
        </div>
      )}
    </div>
  );
}