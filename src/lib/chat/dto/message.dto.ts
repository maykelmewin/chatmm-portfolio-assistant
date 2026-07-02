export interface MessageDTO {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatMessageDTO {
  role: 'user' | 'assistant' | 'system';
  content: string;
}