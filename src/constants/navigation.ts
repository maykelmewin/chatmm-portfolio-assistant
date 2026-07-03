import {
  MessageCircle,
  Search,
  Code2,
  FileDown,
  CircleQuestionMark,
  Link,
  Mail,
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  {
    id: "new-chat",
    title: "New Chat",
    icon: MessageCircle,
    group: "primary",
  },
  {
    id: "search-chat",
    title: "Search Chat",
    icon: Search,
    group: "primary",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    icon: Code2,
    group: "profile",
  },
  {
    id: "resume",
    title: "Resume",
    icon: FileDown,
    group: "profile",
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    group: "info",
  },
  {
    id: "about",
    title: "About",
    icon: CircleQuestionMark,
    group: "info",
  },
];
