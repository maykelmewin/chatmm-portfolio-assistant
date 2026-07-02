export interface ChatRequestDTO {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
}

export interface ChatResponseDTO {
  content: string;
  done: boolean;
}