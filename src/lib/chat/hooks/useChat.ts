"use client";

import { useState, useCallback, useRef } from "react";
import type { Message } from "@/types/message";
import type { ChatRequestDTO } from "@/lib/chat/dto/chat.dto";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<Message[]>([]);

  // Keep ref in sync with state
  messagesRef.current = messages;

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    // Update both state and ref immediately
    const updatedMessages = [...messagesRef.current, userMessage];
    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);

    // Create assistant message with empty content for streaming
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    
    const messagesWithAssistant = [...updatedMessages, assistantMessage];
    messagesRef.current = messagesWithAssistant;
    setMessages(messagesWithAssistant);
    setIsLoading(true);
    try {
      const request: ChatRequestDTO = {
        messages: messagesWithAssistant.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let accumulatedContent = '';
      let chunkCount = 0;
      const startTime = Date.now();

      console.log('🔄 Streaming started...');

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              const duration = Date.now() - startTime;
              console.log(`✅ Streaming complete! Total chunks: ${chunkCount}, Total chars: ${accumulatedContent.length}, Duration: ${duration}ms`);
              break;
            }

            try {
              const parsed = JSON.parse(data);
              
              // Handle error responses
              if (parsed.error) {
                console.error('API error:', parsed.error);
                throw new Error(parsed.error);
              }
              
              const content = parsed.choices?.[0]?.delta?.content || '';
              
              if (content) {
                chunkCount++;
                accumulatedContent += content;
                console.log(`📦 Chunk #${chunkCount}: +${content.length} chars | Total: ${accumulatedContent.length} chars | Content: "${content}"`);
                
                setMessages(prev => {
                  const updated = prev.map(msg => 
                    msg.id === assistantMessageId 
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  );
                  return updated;
                });
              }
            } catch (e) {
              // If it's an API error (not a parse error), re-throw it
              if (e instanceof Error && e.message.includes('Gemini API error')) {
                throw e;
              }
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('Chat error:', errorMessage);
      
      const isRateLimit = errorMessage.includes('429') || /rate\s*limit/i.test(errorMessage);
      const displayMessage = isRateLimit
        ? 'Sorry, I\'m on the free tier of the Gemini API and hit a rate limit. Please try again in a moment.'
        : 'Sorry, I encountered an error';
      
      setMessages(prev => {
        const updated = prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: displayMessage }
            : msg
        );
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    handleSendMessage,
    clearMessages,
  };
}