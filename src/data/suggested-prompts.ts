import type { Prompt } from "@/types/prompts";

export const suggestedPrompts: Prompt[] = [
  {
    id: "about",
    title: "Tell me about yourself",
    prompt: "Tell me about yourself and your background as a frontend engineer.",
  },
  {
    id: "tech-stack",
    title: "What is your tech stack?",
    prompt: "What technologies and tools do you specialize in?",
  },
  {
    id: "strongest-skills",
    title: "What are your strongest skills?",
    prompt: "What are your strongest technical and professional skills?",
  },
  {
    id: "resume",
    title: "Can I see your résumé?",
    prompt: "Can I see your résumé or CV?",
  },
  {
    id: "contact",
    title: "How can I contact you?",
    prompt: "What's the best way to get in touch with you?",
  },
];