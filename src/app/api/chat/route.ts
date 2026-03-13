import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Mistral } from "@mistralai/mistralai";

const SYSTEM_PROMPT = `Anda adalah asisten virtual yang membantu pengunjung portfolio Rivaldi. 
Anda memiliki akses ke informasi berikut tentang Rivaldi:

- Nama: Rivaldi Eka Putra
- Tech Stack: Next.js, React, TypeScript, Flutter, Riverpod, Node.js, Python, AI/LLM, IoT, MQTT, ESP32
- Projects: 
  1. IoTfy Platform - MQTT-based IoT Dashboard (Flutter Mobile App)
  2. Smart Home IoT - Sistem rumah pintar dengan IoT
  3. LLM Chatbot - Chatbot dengan AI/LLM

Jawab dalam bahasa Indonesia atau English sesuai preferensi user. 
Sopan, helpful, dan informatif.
Pahami konteks percakapan dan riwayat chat sebelumnya.
Jika jawaban terlalu panjang, ringkas dan akhiri dengan: "Maaf, jika ingin tahu lebih lengkap, bisa hubungi langsung ya!"
Jangan pernah mengatakan Anda tidak tahu jika ada yang tidak Anda ketahui.
Jika ditanya tentang hal yang tidak ada di data, bilang dengan sopan bahwa itu di luar pengetahuan Anda.`;

const MAX_INPUT_LENGTH = 500;
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000;
const DUPLICATE_WINDOW = 30 * 1000;

const rateLimitMap = new Map<string, number[]>();
const duplicateMap = new Map<string, { message: string; timestamp: number }>();

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_WINDOW);

  if (recentTimestamps.length >= RATE_LIMIT) {
    return true;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  setTimeout(() => {
    const current = rateLimitMap.get(ip) || [];
    const cleaned = current.filter((t) => Date.now() - t < RATE_WINDOW);
    if (cleaned.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, cleaned);
    }
  }, RATE_WINDOW);

  return false;
}

function isDuplicate(ip: string, message: string): boolean {
  const key = duplicateMap.get(ip);

  if (key && key.message === message && Date.now() - key.timestamp < DUPLICATE_WINDOW) {
    return true;
  }

  duplicateMap.set(ip, { message, timestamp: Date.now() });

  setTimeout(() => {
    const current = duplicateMap.get(ip);
    if (current && Date.now() - current.timestamp > DUPLICATE_WINDOW) {
      duplicateMap.delete(ip);
    }
  }, DUPLICATE_WINDOW);

  return false;
}

function isSuspiciousInput(input: string): boolean {
  if (!input || input.trim().length === 0) return true;
  if (input.length > MAX_INPUT_LENGTH) return true;

  const repeatedCharPattern = /(.)\1{15,}/;
  if (repeatedCharPattern.test(input)) return true;

  const spamPatterns = [
    /http[s]?:\/\/[^s]{100,}/,
    /(.+){1,50}\1{3,}/i,
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(input)) return true;
  }

  return false;
}

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
    max_tokens: 512,
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
    maxTokens: 512,
  });

  const content = completion.choices[0]?.message?.content as any;
  if (typeof content === "string") {
    return content;
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);

    if (isRateLimited(ip)) {
      console.warn(`[${ip}] Rate limited`);
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }

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

    const lastMessage = userMessages[userMessages.length - 1];
    if (lastMessage?.content) {
      if (isSuspiciousInput(lastMessage.content)) {
        console.warn(`[${ip}] Suspicious input blocked`);
        return NextResponse.json(
          { error: "Maaf, pesan Anda tidak valid atau terlalu panjang. Maksimal 500 karakter." },
          { status: 400 }
        );
      }

      if (isDuplicate(ip, lastMessage.content)) {
        console.warn(`[${ip}] Duplicate message blocked`);
        return NextResponse.json(
          { error: "Pesan yang sama sudah dikirim baru saja. Silakan tunggu sebentar." },
          { status: 429 }
        );
      }
    }

    console.log(`[${ip}] Message accepted: ${lastMessage?.content?.substring(0, 30)}...`);

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
