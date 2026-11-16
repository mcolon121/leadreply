import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(request: NextRequest) {
  // Parse body
  let body: { lead?: string; businessType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { lead, businessType } = body;

  // Server-side validation
  if (!lead || typeof lead !== "string" || lead.trim().length === 0) {
    return NextResponse.json(
      { error: "A lead message is required." },
      { status: 400 }
    );
  }

  if (lead.trim().length > 5000) {
    return NextResponse.json(
      { error: "Lead message is too long. Please keep it under 5,000 characters." },
      { status: 400 }
    );
  }

  const resolvedBusinessType =
    businessType && typeof businessType === "string" && businessType.trim()
      ? businessType.trim()
      : "General small business";

  const prompt = `You are a helpful sales assistant for a small business.
Write a friendly, natural reply to this lead message.
Business type: ${resolvedBusinessType}
Goals:
- Sound human, not robotic
- Be brief and professional
- Acknowledge what the lead asked
- Move the conversation toward a next step
- End with a simple question or call to action

Lead message:
${lead.trim()}

Return only the reply text.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-5-5",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const replyBlock = message.content.find((b) => b.type === "text");
    if (!replyBlock || replyBlock.type !== "text") {
      throw new Error("Unexpected response from AI.");
    }

    return NextResponse.json({ reply: replyBlock.text.trim() });
  } catch (err: unknown) {
    console.error("Claude API error:", err);

    // Surface a helpful message for common errors
    if (err instanceof Anthropic.APIError) {
      if (err.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your CLAUDE_API_KEY environment variable." },
          { status: 500 }
        );
      }
      if (err.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment and try again." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Failed to generate a reply. Please check your API key and try again.",
      },
      { status: 500 }
    );
  }
}
