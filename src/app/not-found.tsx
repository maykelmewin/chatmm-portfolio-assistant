"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CircleQuestionMark  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { AboutDialog } from "@/components/AboutDialog";

export default function NotFound() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
    
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mb-[10dvh]">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-md w-full">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Logo size={64}/>
          </div>

          {/* 404 Text */}
          <div className="text-center space-y-2">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-foreground/80">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="flex justify-center gap-2">              
            <Button variant="outline" asChild size="lg" className="gap-2 cursor-pointer">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>            
            <Button variant="ghost" size="lg" className="gap-2 cursor-pointer" onClick={() => setAboutOpen(true)}>
                <CircleQuestionMark className="h-4 w-4" />
                About ChatMM
            </Button>
          </div>
        </div>
      </main>
      
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </div>
  );
}
