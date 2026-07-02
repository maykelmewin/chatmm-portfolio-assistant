"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { APP_VERSION } from "@/constants/app";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Code2,
  Sparkles,
  Palette,
  ExternalLink,
  Globe,
  Monitor,
  Sun,
  Moon,
  Layout,
  User,
  FolderOpen,
  Zap,
  Search,
} from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 sm:gap-2 gap-0">
        {/* Fixed header */}
        <DialogHeader className="px-6 pt-4 sm:pt-6 pb-4 shrink-0 gap-0 sm:gap-2">
          <DialogTitle className="flex items-center justify-center sm:justify-start gap-2 text-xl">
            About ChatMM
            <Logo size={32} />
          </DialogTitle>
          <DialogDescription className="sr-only">
            A conversational portfolio experience for recruiters
          </DialogDescription>
          <div className="text-[0.6875rem] font-medium text-muted-foreground/70 py-0.5 px-2 border w-fit rounded-sm mx-auto sm:mx-0">
            v{APP_VERSION}
          </div>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 px-6 pb-6 space-y-6 scrollbar">
          {/* Section 1: What is ChatMM? */}
          <section className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground/10">
                <Globe className="h-3.5 w-3.5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">What is ChatMM?</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed sm:pl-8 font-regular">
              An interactive ChatGPT-inspired portfolio where recruiters can explore
              my experience, projects, technical skills, and resume through a
              conversational interface.
            </p>
          </section>

          {/* Section 2: How it's built */}
          <section className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground/10">
                <Code2 className="h-3.5 w-3.5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">How it's built</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed sm:pl-8 font-regular">
              Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, with
              AI-assisted code generation — but the design is entirely my own.
            </p>
          </section>

          {/* Section 3: Features */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground/10">
                <Sparkles className="h-3.5 w-3.5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">Features</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:pl-8">
              {[
                { icon: MessageCircle, label: "ChatGPT-style AI assistant" },
                { icon: Monitor, label: "Floating draggable window" },
                { icon: Sun, label: "Dark & light themes" },
                { icon: Layout, label: "Fully responsive across devices" },
                { icon: User, label: "Smart suggested prompts" },
                { icon: Zap, label: "Interactive tool responses" },
                { icon: Search, label: "Searchable chat history" },
                { icon: Sparkles, label: "Smooth micro-interactions" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-accent/50 border border-border/50"
                >
                  <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Design System */}
          <section className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground/10">
                <Palette className="h-3.5 w-3.5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">Design System</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed sm:pl-8 font-regular">
              Explore the design foundation of ChatMM — typography, logo history, and
              color tokens — along with a Figma Quick Draft UI for reference.
            </p>
            <div className="sm:pl-8">
              <Button className="w-full sm:w-auto gap-2" asChild>
                <Link href="/design-system">
                  <ExternalLink className="h-4 w-4" />
                  Open Design System
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}




