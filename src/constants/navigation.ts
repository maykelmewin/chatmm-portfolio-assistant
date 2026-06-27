import {
  MessageCircle,
  Search,
  Briefcase,
  FileIcon,
  CircleQuestionMark,
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  {
    id: "new-chat",
    title: "New Chat",
    icon: MessageCircle,
  },
  {
    id: "search-chat",
    title: "Search Chat",
    icon: Search,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    icon: Briefcase,
  },
  {
    id: "resume",
    title: "Resume",
    icon: FileIcon,
  },
  {
    id: "about",
    title: "About",
    icon: CircleQuestionMark,
  },
];