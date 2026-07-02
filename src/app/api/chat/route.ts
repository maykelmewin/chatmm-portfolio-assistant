// app/api/chat/route.ts
import { createChatService } from "@/lib/chat/service/chat.service";
import type { ChatRequestDTO } from "@/lib/chat/dto/chat.dto";

export async function POST(req: Request) {
  try {
    const body: ChatRequestDTO = await req.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const chatService = createChatService(apiKey);

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of chatService.streamChat(body)) {
            const data = `data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }

          // Send [DONE] signal
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
