"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ResponsiveSidebar } from "@/components/ResponsiveSidebar";
import ChatInput, { type ChatInputHandle } from "@/components/ChatInput";
import MessageBubble from "@/components/MessageBubble";
import {
  Briefcase,
  FileIcon,
  CircleQuestionMark,
} from "lucide-react";
import { GitHub } from "@/components/icons/GitHub";
import { Instagram } from "@/components/icons/Instagram";
import { LinkedIn } from "@/components/icons/LinkedIn";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import WindowContainer, { type WindowContainerHandle } from "@/components/WindowContainer";
import { headingText } from "@/data/home";
import type { WindowState } from "@/types/window";
import { useChat } from "@/lib/chat/hooks/useChat";
import { AboutDialog } from "@/components/AboutDialog";
import { SearchChatDialog } from "@/components/SearchChatDialog";

export default function HomePage() {
  const windowRef = useRef<WindowContainerHandle>(null);
  const chatInputRef = useRef<ChatInputHandle>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const { messages, isLoading, handleSendMessage, clearMessages } = useChat();
  
  const [randomHeading, setRandomHeading] = useState(() => Math.floor(Math.random() * headingText.length));
  const isInitial = messages.length === 0;

  const handleOpenChat = () => {
    windowRef.current?.restore();
  };

  const handleSearchChat = () => {
    setSearchOpen(true);
  };

  const scrollToMessage = (messageId: string) => {
    const element = document.getElementById(`message-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      // Highlight effect
      element.classList.add("ring-2", "ring-primary", "rounded-lg");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-primary", "rounded-lg");
      }, 2000);
    }
  };

  const handleStart = () => {
    randomizeHeading();
    windowRef.current?.open();
  };

  const handleNewChat = () => {
    windowRef.current?.close();
    // Wait for close animation, then reopen fresh
    setTimeout(() => {
      handleStart();
    }, 300);
  };
  
  const randomizeHeading = () => {
    setRandomHeading(Math.floor(Math.random() * headingText.length));
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
      clearMessages();
    }
  }, [windowState, clearMessages]);

  return (
    <ResponsiveSidebar windowState={windowState} onOpenChat={handleOpenChat} onStart={handleStart} onNewChat={handleNewChat} onSearchChat={handleSearchChat} onPromptClick={handleSendMessage}>
      <div className="main-content-container relative min-h-[calc(100vh-54px)] md:min-h-[calc(100vh)] overflow-hidden">
        <WindowContainer ref={windowRef} title="AI Portfolio Assistant" defaultPosition={{ x: 60, y: 60 }} propSize={{ width: 820, height: 640 }} boundsParent=".main-content-container" onStateChange={setWindowState}>
          <div className="flex flex-col justify-center h-full bg-background py-4">
            {!isInitial &&
              <div className={cn("flex-1 overflow-y-auto scrollbar px-4 sm:px-8", windowState !== "maximized" && "mr-2")}>
                <div className="py-6 space-y-5 max-w-3xl mx-auto w-full">
                    {messages.map((message) => (
                      <div key={message.id} id={`message-${message.id}`}>
                        <MessageBubble message={message} />
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>    
              </div>
            }
            <footer 
              className={cn("pt-4 px-4 sm:px-8", !isInitial ? "" : (windowState === "maximized") ? "pb-[10dvh] sm:pb-[20dvh]" : "pb-20")}
            >
              {isInitial &&
                <h1 className="text-2xl sm:text-3xl text-center mb-8">
                  {headingText[randomHeading]}
                </h1>
              }
              <ChatInput ref={chatInputRef} onSend={handleSendMessage} />
              <h6 className="text-[0.625rem] text-center text-muted-foreground mt-2">
                Powered by <strong>Gemini AI</strong>. Grounded in my 
                <span className="text-primary">{" "}portfolio</span>
                <span className="sm:inline-block hidden">
                  , 
                  <span className="text-primary">{" "}projects</span>, and 
                  <span className="text-primary">{" "}experience</span>
                </span>
                .
              </h6>
              {isInitial && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center items-center mt-10">
                  <Button variant="outline" className="w-[160px] sm:w-auto rounded-full cursor-pointer text-foreground/70 px-4" asChild>
                    <Link href="https://portfolio-maykel.netlify.app/" target="_blank" rel="noopener noreferrer">
                      <Briefcase/>Explore Work
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-[160px] sm:w-auto rounded-full cursor-pointer text-foreground/70 px-4" asChild>
                    <Link href="https://docs.google.com/document/d/1JokgUdT7mXBkoQhW9cQEj_jaL3-ddtUAouuG4Di5hpg/edit?tab=t.0" target="_blank" rel="noopener noreferrer">
                      <FileIcon/>Credentials
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-[160px] sm:w-auto   rounded-full cursor-pointer text-foreground/70 px-4" onClick={() => setAboutOpen(true)}>
                    <CircleQuestionMark />About this App
                  </Button>
                </div>
              )}
            </footer> 
            {isInitial && (           
              <div className="absolute bottom-4 left-0 w-full flex justify-end px-4">
                  <Button variant="ghost" size="sm" className="cursor-pointer" onClick={() => window.open("https://linkedin.com/in/michael-merin", "_blank", "noopener,noreferrer")}>
                    <LinkedIn className="size-4 fill-foreground/20" />
                  </Button>
                  <Button variant="ghost" size="sm" className="cursor-pointer" onClick={() => window.open("https://github.com/maykelmewin", "_blank", "noopener,noreferrer")}>
                    <GitHub className="size-4 fill-foreground/20" />
                  </Button>
                  <Button variant="ghost" size="sm" className="cursor-pointer" onClick={() => window.open("https://instagram.com/mklmerin", "_blank", "noopener,noreferrer")}>
                    <Instagram className="size-4 fill-foreground/20" />
                  </Button>
              </div>
            )}
          </div>
        </WindowContainer>
      </div>
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <SearchChatDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        messages={messages}
        onSelectMessage={scrollToMessage}
      />
    </ResponsiveSidebar>
  );
}
