import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  title: string;
  icon: LucideIcon;
  group?: "primary" | "profile" | "info";
};
