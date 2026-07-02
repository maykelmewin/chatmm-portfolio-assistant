"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatInputHandle {
  reset: () => void;
}

interface ChatInputProps {
  onSend?: (message: string) => void;
}

const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(function ChatInput({ onSend }, ref) {
  const [value, setValue] = useState("");
  const [isTwoRows, setIsTwoRows] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (value.trim() && onSend) {
      onSend(value.trim());
      setValue("");
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Auto-resize: set height to scrollHeight so it grows with content
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Detect if text spans 2+ rows (line height is 48px from leading-[48px])
    const lineHeight = 48;
    setIsTwoRows(textarea.scrollHeight > lineHeight);
  }, [value]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setValue("");
      setIsTwoRows(false);
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
      }
    },
  }), []);

  return (
    <div className={cn("max-w-3xl mx-auto border bg-white/8 focus-within:ring-1 focus-within:ring-foreground transition-all overflow-hidden flex items-end px-2 gap-4 transition-all duration-150",
      isTwoRows ? "rounded-3xl" : "rounded-[2.5rem]"
    )}>
      <textarea
        ref={textareaRef}
        id="chat-input"
        className={cn(
          "flex-1 bg-transparent border-none focus:ring-0 resize-none min-h-[48px] outline-none leading-[48px] scrollbar pl-4 overflow-y-auto max-h-50",
          isTwoRows ? "leading-relaxed py-5" : "leading-[48px]"
        )}
        placeholder="Ask anything about me. "
        rows={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button 
        className="rounded-full size-8 my-2 cursor-pointer bg-foreground" 
        onClick={handleSend}
        disabled={!value.trim()}
      >
        <ArrowUp className="size-5" />
      </Button>
    </div>
  );
});

export default ChatInput;