import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Mistral } from "@mistralai/mistralai";

const SYSTEM_PROMPT = `Anda adalah asisten virtual cerdas yang mendampingi pengunjung di portfolio Rivaldi Eka Putra.
Anda memiliki akses penuh ke seluruh informasi tentang Rivaldi berikut ini:

=== PROFIL ===
- Nama: Rivaldi Eka Putra
- Peran: Polyglot Engineer (AI, IoT, Web, & Mobile Development)
- Lokasi: Surabaya, Indonesia
- Email: rivaldiekaputr@gmail.com
- LinkedIn: https://www.linkedin.com/in/rivaldiekaputr/
- GitHub: https://github.com/rivaldiekaptrrr

=== TECH STACK ===
- Web: Next.js, React, TypeScript, JavaScript, Node.js, Express, Golang, PostgreSQL, Supabase, Prisma, Neon, Tailwind CSS, Vite
- Mobile: Flutter, Dart, Kotlin, Android (Jetpack Compose, Room Database)
- AI/ML: Python, TensorFlow, Keras, Google Colab, Jupyter, OpenAI, FastAPI, OpenClaw, Claude Code, Vibe Coding, OpenCode, Antigravity
- IoT: ESP32, ESP-IDF, Arduino, Blynk, MQTT, ThingSpeak, ThingsBoard, Wokwi, PlatformIO, Arduino IDE

=== SELURUH PROYEK ===

1. IoTfy Platform (IoT, Mobile) [FEATURED]
   - Deskripsi: MQTT-based IoT Dashboard cross-platform berbasis Flutter untuk monitoring sensor dan kontrol perangkat secara real-time.
   - Tech: Flutter, Dart, Riverpod, Hive, MQTT, fl_chart
   - Fitur: Universal MQTT broker support (HiveMQ, Mosquitto, EMQX, AWS IoT, Azure), rich widget visualization (slider, knob, chart, gauge), Rule Engine offline-first, multi-broker management.
   - GitHub: https://github.com/rivaldiekaptrrr/iotfy-app

2. LyricSync & ESP32 Player (IoT, Mobile) [FEATURED]
   - Deskripsi: Sistem audio screening terintegrasi dengan hardware ESP32-S3 dan Flutter mobile app untuk manajemen lirik & sinkronisasi via BLE.
   - Tech: Flutter, Dart, C++ (PlatformIO), ESP32-S3, FreeRTOS, LittleFS, Supabase, BLE
   - Fitur: Audio spike detection untuk timing lirik, BLE synchronization, Cloud OTA update via Supabase CDN, TFT display, DFPlayer audio.
   - GitHub: https://github.com/rivaldiekaptrrr/LyricSync-App

3. SmartRecruit (Web, AI) [FEATURED]
   - Deskripsi: Applicant Tracking System (ATS) bertenaga AI untuk otomasi parsing resume, scoring kandidat, dan notifikasi email.
   - Tech: Next.js 16, TypeScript, Supabase, OpenAI, Resend, Tailwind CSS, Radix UI (shadcn/ui), React Query
   - Fitur: AI resume parsing (PDF), AI Score 0-100, Kanban pipeline drag-and-drop, email automation, duplicate detection, mock & production mode.
   - GitHub: https://github.com/rivaldiekaptrrr/ATS-App

4. TrackIt App (Mobile) [FEATURED]
   - Deskripsi: Aplikasi keuangan pribadi Android dengan Offline Voice Tracking (Speech-to-Text) dan keamanan biometrik.
   - Tech: Kotlin, Jetpack Compose, Material Design 3, Room Database, MVVM, SpeechRecognizer, TextToSpeech
   - Fitur: Voice tracking offline, Natural ML (belajar kategori baru), multi-transaksi dalam 1 kalimat, backup/restore JSON, biometrik (fingerprint/face), smart budget notifications, analytics interaktif.
   - GitHub: https://github.com/rivaldiekaptrrr/Track-app

5. DocuStack (Web)
   - Deskripsi: Knowledge Management System dengan base64 clipboard image upload dan mock database mode.
   - Fitur: Upload gambar via clipboard paste (base64), mock mode tanpa database, sistem dokumentasi terstruktur.
   - GitHub: https://github.com/rivaldiekaptrrr/Docs-App

6. LepiVision (AI)
   - Deskripsi: Proyek Computer Vision AI untuk klasifikasi spesies kupu-kupu menggunakan CNN dan Transfer Learning InceptionResNetV2.
   - Tech: Python, TensorFlow, Keras, Google Colab, Jupyter, InceptionResNetV2
   - Fitur: Klasifikasi multi-class species kupu-kupu, data augmentation, model checkpointing, early stopping, CSV training history logging.
   - GitHub: https://github.com/rivaldiekaptrrr/LepiVision

7. SmartHome (IoT)
   - Deskripsi: Sistem Smart Home berbasis ESP32 dan Blynk untuk kontrol kunci pintu & gerbang, serta alarm PIR motion detection secara remote.
   - Tech: C++, ESP32, Arduino, Blynk, IoT
   - Fitur: Remote lock/unlock pintu & gerbang via Blynk, PIR motion alarm, kontrol real-time via smartphone.
   - GitHub: https://github.com/rivaldiekaptrrr/SmartHome

8. SmartFeeder (IoT)
   - Deskripsi: Alat pemberi pakan ayam otomatis berbasis ESP32 dengan Load Cell presisi, RTC scheduler, dan kontrol Blynk.
   - Tech: C++, ESP32, Arduino, Blynk, HX711 Load Cell, RTC DS3231, Servo Motor, LCD I2C
   - Fitur: Penimbangan presisi Maggot & Pur, jadwal otomatis tiap 5 menit via RTC, servo mixer, monitoring berat live via Blynk, setting mode & running mode.
   - GitHub: https://github.com/rivaldiekaptrrr/SmartFeeder

9. Empower360 (Web)
   - Deskripsi: Aplikasi 360 Appraisal Employee untuk manajemen evaluasi karyawan secara menyeluruh.
   - Tech: Web-based
   - GitHub: https://github.com/rivaldiekaptrrr/360AppraisalEmployee-App

10. ExamProctor (Web)
    - Deskripsi: Aplikasi proctoring ujian online untuk memastikan integritas ujian daring.
    - Tech: Web-based
    - GitHub: https://github.com/rivaldiekaptrrr/Test-App

=== INSTRUKSI ===
Jawab dalam bahasa Indonesia atau English sesuai preferensi user.
Gunakan bahasa yang sopan, profesional, dan informatif. Pahami konteks percakapan dan riwayat chat sebelumnya.
Jika jawaban terlalu panjang, ringkas dan akhiri dengan: "Jika ingin tahu lebih lengkap, silakan hubungi Rivaldi langsung ya!"
Jangan berhalusinasi. Jika ditanya hal di luar data di atas, bilang dengan ramah bahwa itu di luar cakupan pengetahuan Anda.`;

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

async function getOpenRouterResponse(messages: { role: string; content: string }[]) {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const chatMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-10),
  ];

  // Timeout 20 detik untuk mencegah hang
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://www.valporto.my.id",
        "X-Title": "Rivaldi Portfolio AI",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: chatMessages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 2048,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API Detail Error:", JSON.stringify(errorData, null, 2));
      throw new Error(`OpenRouter API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const message = data.choices[0]?.message;
    // Model reasoning: content bisa null, fallback ke reasoning field
    const content = message?.content || message?.reasoning || "";
    return typeof content === "string" ? content : "";
  } catch (err: any) {
    console.error("Fetch to OpenRouter specifically failed with:", err.message);
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
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

    // API key check removed since NVIDIA key is hardcoded

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

    try {
      response = await getOpenRouterResponse(userMessages);
      provider = "OpenRouter (tencent/hy3-preview)";
    } catch (openrouterError: any) {
      console.warn("OpenRouter API failed, falling back to Groq...", openrouterError.message);

      if (process.env.GROQ_API_KEY) {
        try {
          response = await getGroqResponse(userMessages);
          provider = "groq";
        } catch (groqError: any) {
          console.warn("Groq failed, falling back to Mistral...", groqError.message);

          if (process.env.MISTRAL_API_KEY) {
            try {
              response = await getMistralResponse(userMessages);
              provider = "mistral";
            } catch (mistralError) {
              console.error("Mistral API Error:", mistralError);
            }
          }
        }
      }
    }

    if (!response) {
      console.error(`[${ip}] All AI providers failed.`);
      return NextResponse.json(
        { error: "No AI provider available" },
        { status: 503 }
      );
    }

    console.log(`[${ip}] Response successful! Used provider: ${provider.toUpperCase()}`);
    return NextResponse.json({ response, provider });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
