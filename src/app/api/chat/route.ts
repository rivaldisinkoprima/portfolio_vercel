import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Mistral } from "@mistralai/mistralai";

// Batas durasi eksekusi fungsi di Vercel (detik); staggered race selesai jauh sebelum ini
export const maxDuration = 30;

// Race promise dengan timeout agar provider yang menggantung tidak menahan selamanya
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

const STAGGER_MS = 3000;
const PROVIDER_TIMEOUT_MS = 10000;

// Staggered race antar-provider: provider pertama mulai duluan; bila belum
// menjawab dalam STAGGER_MS, provider berikutnya ikut mulai. Jawaban sukses
// pertama yang dipakai. Menghindari penjumlahan waktu tunggu berurutan yang
// bisa menembus batas durasi fungsi.
async function firstSuccessfulResponse(
  messages: { role: string; content: string }[],
): Promise<{ text: string; provider: string }> {
  const attempts: { name: string; run: () => Promise<string> }[] = [
    { name: "freellm", run: () => getFreeLLMResponse(messages) },
    { name: "groq", run: () => getGroqResponse(messages) },
    { name: "openrouter", run: () => getOpenRouterResponse(messages) },
    { name: "mistral", run: () => getMistralResponse(messages) },
  ];

  return new Promise((resolve, reject) => {
    let settled = 0;
    let finished = false;
    const failures: string[] = [];

    const fail = (name: string, err: unknown) => {
      failures.push(`${name}: ${err instanceof Error ? err.message : String(err)}`);
      settled += 1;
      if (!finished && settled === attempts.length) {
        finished = true;
        reject(new Error(failures.join(" | ")));
      }
    };

    attempts.forEach((attempt, i) => {
      const start = () => {
        if (finished) return;
        withTimeout(attempt.run(), PROVIDER_TIMEOUT_MS, attempt.name)
          .then((text) => {
            if (finished) return;
            if (text) {
              finished = true;
              resolve({ text, provider: attempt.name });
            } else {
              fail(attempt.name, new Error("empty response"));
            }
          })
          .catch((err) => {
            if (!finished) fail(attempt.name, err);
          });
      };
      if (i === 0) start();
      else setTimeout(start, STAGGER_MS * i);
    });
  });
}

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

2. LyricSync (IoT, Mobile) [FEATURED]
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

11. Dongle ECG Transfer (IoT) [FEATURED]
    - Deskripsi: Dongle data medis berbasis ESP32-S3 + SDCard Module yang berfungsi sebagai USB Flash Drive virtual; file hasil pemeriksaan dari alat medis otomatis ditransfer ke server via WiFi.
    - Tech: ESP32-S3, ESP-IDF, C++, USB Mass Storage (MSC), SDCard, FTP, OTA via cloud storage
    - Fitur: Alat medis mengenali perangkat sebagai flash drive USB tanpa driver, file hasil pemeriksaan tersimpan otomatis ke storage, upload otomatis ke FTP server via WiFi, OTA firmware update, alur data: Medical Device → ESP32-S3 (USB MSC) → Storage/SDCard → FTP → Server → Dashboard Monitoring.

12. Medical IoT Gateway (IoT) [FEATURED]
    - Deskripsi: IoT Gateway berbasis ESP32 yang menjadi jembatan komunikasi antara perangkat medis dan platform monitoring melalui MQTT secara real-time.
    - Tech: ESP32, ESP-IDF, C++, RTOS, MQTT, BLE, TCP/IP, USB
    - Fitur: Reverse engineering protokol komunikasi alat medis, komunikasi BLE/TCP/IP/USB simultan, data pipeline real-time, firmware RTOS yang andal, 15+ perangkat medis terintegrasi dalam satu platform, alur data: Medical Device → IoT Gateway → Publish MQTT → Dashboard Monitoring.

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

// Deteksi frasa berulang (spam) TANPA regex backreference — pola lama
// /(.+){1,50}\1{3,}/ mengalami catastrophic backtracking pada pesan natural
// (pesan 35 karakter bisa membekukan event loop >20 detik hingga fungsi
// dibunuh Vercel dan user menerima 504). Implementasi ini linear dan aman:
// cari substring 8-20 karakter yang muncul 3x+ secara tidak tumpang tindih.
function hasRepeatedPhrase(input: string): boolean {
  const s = input.toLowerCase();
  if (s.length < 24) return false;

  for (let len = 8; len <= 20; len++) {
    if (len * 3 > s.length) break;
    const seen = new Set<string>();
    for (let i = 0; i + len <= s.length; i++) {
      const sub = s.slice(i, i + len);
      if (seen.has(sub)) continue;
      seen.add(sub);
      let count = 0;
      let pos = 0;
      while (true) {
        const found = s.indexOf(sub, pos);
        if (found === -1) break;
        count += 1;
        if (count >= 3) return true;
        pos = found + len;
      }
    }
  }
  return false;
}

function isSuspiciousInput(input: string): boolean {
  if (!input || input.trim().length === 0) return true;
  if (input.length > MAX_INPUT_LENGTH) return true;

  const repeatedCharPattern = /(.)\1{15,}/;
  if (repeatedCharPattern.test(input)) return true;

  if (/http[s]?:\/\/[^s]{100,}/.test(input)) return true;
  if (hasRepeatedPhrase(input)) return true;

  return false;
}

async function getFreeLLMResponse(messages: { role: string; content: string }[]) {
  const baseUrl = process.env.FREELLM_BASE_URL || "https://freellm.valtech.my.id/v1";
  const apiKey = process.env.FREELLM_API_KEY;

  if (!apiKey) {
    throw new Error("FREELLM_API_KEY is not configured");
  }

  const chatMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-10),
  ];

  // Timeout 20 detik untuk mencegah hang
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "auto",
        messages: chatMessages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 2048,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("FreeLLM API Detail Error:", JSON.stringify(errorData, null, 2));
      throw new Error(`FreeLLM API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const message = data.choices[0]?.message;
    const content = message?.content || message?.reasoning || "";
    return typeof content === "string" ? content : "";
  } catch (err: any) {
    console.error("Fetch to FreeLLM specifically failed with:", err.message);
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
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
  const timeoutId = setTimeout(() => controller.abort(), 8000);

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
    timeout: 8000,
    maxRetries: 0,
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
      const winner = await firstSuccessfulResponse(userMessages);
      response = winner.text;
      provider = winner.provider;
    } catch (allError: any) {
      console.error("All providers failed:", allError.message);
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
