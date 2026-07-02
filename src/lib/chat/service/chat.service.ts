import { getSystemPrompt } from '../systemPrompt';
import { streamGeminiChat } from '../dal/gemini.dal';
import type { ChatRequestDTO, ChatResponseDTO } from '../dto/chat.dto';

export class ChatService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async *streamChat(request: ChatRequestDTO): AsyncGenerator<string, void, unknown> {
    const systemPrompt = getSystemPrompt();

    for await (const chunk of streamGeminiChat({
      systemPrompt,
      messages: request.messages,
      apiKey: this.apiKey,
    })) {
      yield chunk;
    }
  }

  async getFullResponse(request: ChatRequestDTO): Promise<ChatResponseDTO> {
    let fullContent = '';

    try {
      for await (const chunk of this.streamChat(request)) {
        fullContent += chunk;
      }

      return {
        content: fullContent,
        done: true,
      };
    } catch (error) {
      console.error('Chat service error:', error);
      throw new Error('Failed to get chat response');
    }
  }
}

// Factory function to create service instance
export function createChatService(apiKey: string): ChatService {
  return new ChatService(apiKey);
}