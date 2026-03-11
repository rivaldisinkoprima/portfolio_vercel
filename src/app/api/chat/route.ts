import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Mistral } from "@mistralai/mistralai";

const SYSTEM_PROMPT = `Anda adalah asisten virtual yang membantu pengunjung portfolio Rivaldi. 
Anda memiliki akses ke informasi berikut tentang Rivaldi:

- Nama: Rivaldi
- Tech Stack: Next.js, React, TypeScript, Tailwind CSS, IoT, AI/LLM
- Projects: 
  1. Smart Home IoT - Sistem rumah pintar dengan IoT
  2. SaaS Dashboard - Dashboard untuk SaaS
  3. LLM Chatbot - Chatbot dengan AI/LLM

Jawab dalam bahasa Indonesia atau English sesuai preferensi user. 
Sopan, helpful, dan informatif.
Jangan pernah mengatakan Anda tidak tahu jika ada yang tidak Anda ketahui.
Jika ditanya tentang hal yang tidak ada di data, bilang dengan sopan bahwa itu di luar pengetahuan Anda.`;

async function getGroqResponse(messages: { role: string; content: string }[]) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const chatMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-10),
  ];

  const completion = await groq.chat.completions.create({
    messages: chatMessages as any,
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 1024,
    stream: false,
  });

  return completion.choices[0]?.message?.content || "";
}

async function getMistralResponse(messages: { role: string; content: string }[]) {
  const mistral = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY,
  });

  const chatMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-10),
  ];

  const completion = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: chatMessages as any,
    temperature: 0.7,
    maxTokens: 1024,
  });

  const content = completion.choices[0]?.message?.content as any;
  if (typeof content === "string") {
    return content;
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY && !process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error: No API key configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    const userMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    }));

    let response = "";
    let provider = "";

    if (process.env.GROQ_API_KEY) {
      try {
        response = await getGroqResponse(userMessages);
        provider = "groq";
      } catch (error: any) {
        const errorMessage = error.message?.toLowerCase() || "";
        const isRateLimit = 
          errorMessage.includes("rate") || 
          errorMessage.includes("429") ||
          errorMessage.includes("quota") ||
          errorMessage.includes("limit");

        if (!isRateLimit) {
          throw error;
        }

        console.warn("Groq rate limited, falling back to Mistral...");
      }
    }

    if (!response && process.env.MISTRAL_API_KEY) {
      try {
        response = await getMistralResponse(userMessages);
        provider = "mistral";
      } catch (mistralError) {
        console.error("Mistral API Error:", mistralError);
        return NextResponse.json(
          { error: "Failed to get response from AI providers" },
          { status: 500 }
        );
      }
    }

    if (!response) {
      return NextResponse.json(
        { error: "No AI provider available" },
        { status: 503 }
      );
    }

    return NextResponse.json({ response, provider });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
