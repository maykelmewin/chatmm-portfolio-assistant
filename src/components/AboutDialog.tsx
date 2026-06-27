"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 gap-2">
        {/* Fixed header */}
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            About ChatMM
            <img src="/logo.svg" alt="ChatMM Logo" className="h-8 w-8" />
          </DialogTitle>
          <DialogDescription>
            A conversational portfolio experience for recruiters
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 px-6 pb-6 space-y-6 scrollbar">
          {/* Section 1: What is ChatMM? */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground/10">
                <Globe className="h-3.5 w-3.5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">What is ChatMM?</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-8 font-regular">
              An interactive ChatGPT-inspired portfolio where recruiters can explore
              my experience, projects, technical skills, and résumé through a
              conversational interface.
            </p>
          </section>

          {/* Section 2: How it's built */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground/10">
                <Code2 className="h-3.5 w-3.5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">How it's built</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-8 font-regular">
              Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4,
              shadcn/ui, Radix UI, Lucide React, next-themes, and Biome, following
              a modern component-driven architecture.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
              {[
                { icon: MessageCircle, label: "AI-style chat interface" },
                { icon: Monitor, label: "Responsive desktop/mobile layout" },
                { icon: Layout, label: "Collapsible sidebar" },
                { icon: Sun, label: "Dark/light themes" },
                { icon: User, label: "Suggested recruiter prompts" },
                { icon: FolderOpen, label: "Résumé viewer" },
                { icon: Zap, label: "Project showcase" },
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
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground/10">
                <Palette className="h-3.5 w-3.5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold">Design System</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-8 font-regular">
              Explore the design foundation of ChatMM, including colors, typography,
              spacing, radii, shadows, and reusable UI components.
            </p>
            <div className="pl-8">
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