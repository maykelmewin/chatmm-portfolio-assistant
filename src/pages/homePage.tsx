"use client";

import { useRef, useState, useEffect } from "react";
import { ResponsiveSidebar } from "@/components/ResponsiveSidebar";
import ChatInput, { type ChatInputHandle } from "@/components/ChatInput";
import MessageBubble from "@/components/MessageBubble";
import {
  Briefcase,
  FileIcon,
  CircleQuestionMark
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import WindowContainer, { type WindowContainerHandle } from "@/components/WindowContainer";
import { headingText } from "@/data/home";
import type { WindowState } from "@/types/window";
import type { Message } from "@/types/message";

export default function HomePage() {
  const windowRef = useRef<WindowContainerHandle>(null);
  const chatInputRef = useRef<ChatInputHandle>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [messages, setMessages] = useState<Message[]>([]);
  
  const handleOpenChat = () => {
    windowRef.current?.restore();
  };

  const handleStart = () => {
    randomizeHeading();
    windowRef.current?.open();
  };
  
  const [randomHeading, setRandomHeading] = useState(() => Math.floor(Math.random() * headingText.length));
  const isInitial = messages.length === 0;

  const randomizeHeading = () => {
    setRandomHeading(Math.floor(Math.random() * headingText.length));
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Thanks for your message! This is a simulated response. In a real app, this would come from an AI API.",
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (windowState === "closed") {
      randomizeHeading();
      windowRef.current?.reset();
      chatInputRef.current?.reset();
      setMessages([]);
    }
  }, [windowState]);
  return (
    <ResponsiveSidebar windowState={windowState} onOpenChat={handleOpenChat} onStart={handleStart}>
      <div className="main-content-container relative min-h-[calc(100vh)] overflow-hidden">
        <WindowContainer ref={windowRef} title="AI Portfolio Assistant" defaultPosition={{ x: 60, y: 60 }} defaultSize={{ width: 820, height: 640 }} boundsParent=".main-content-container" onStateChange={setWindowState}>
          <div className="flex flex-col justify-center h-full bg-background py-4 px-8">
            {!isInitial &&
              <div className="flex-1 overflow-y-auto scrollbar py-6 space-y-6 max-w-4xl mx-auto w-full">    
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            }
            <footer 
              className={cn("pt-4", !isInitial ? "" : (windowState === "maximized") ? "pb-[20dvh]" : "pb-20")}
            >
              {isInitial &&
                <h1 className="text-3xl text-center mb-8">
                  {headingText[randomHeading]}
                </h1>
              }
              <ChatInput ref={chatInputRef} onSend={handleSendMessage} />
              <h6 className="text-[0.625rem] text-center text-muted-foreground mt-2">
                Powered by <strong>OpenAI</strong>. Grounded in my <span className="text-primary">portfolio</span>, <span className="text-primary">projects</span>, and <span className="text-primary">experience</span>.
              </h6>
              {isInitial && (
                <div className="flex gap-4 justify-center items-center mt-10">
                  <Button variant="outline" className="rounded-full cursor-pointer text-foreground/70 px-4"><Briefcase/>Explore Work</Button>
                  <Button variant="outline" className="rounded-full cursor-pointer text-foreground/70 px-4"><FileIcon/>Credentials</Button>
                  <Button variant="outline" className="rounded-full cursor-pointer text-foreground/70 px-4"><CircleQuestionMark/>About This App</Button>
                </div>
              )}
            </footer>
          </div>
        </WindowContainer>
      </div>
    </ResponsiveSidebar>
  );
}