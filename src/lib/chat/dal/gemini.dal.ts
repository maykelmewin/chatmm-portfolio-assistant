import { GoogleGenAI } from "@google/genai";

export interface GeminiChatOptions {
  model?: string;
  systemPrompt: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  apiKey: string;
}

export async function* streamGeminiChat(options: GeminiChatOptions) {
  const {
    model = 'gemini-2.5-flash',
    systemPrompt,
    messages,
    apiKey,
  } = options;

  const ai = new GoogleGenAI({ apiKey });

  // Convert OpenAI message format to Gemini format
  const contents = messages
    .filter(msg => msg.role !== 'system')
    .map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

  try {
    const response = await ai.models.generateContentStream({
      model,
      contents,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gemini API error: ${error.message}`);
    }
    throw new Error('Unknown Gemini API error');
  }
}