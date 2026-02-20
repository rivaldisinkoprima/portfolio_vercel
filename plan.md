Berikut adalah **Master Plan Development Portfolio Modern** yang dirancang khusus untuk Engineer (AI, IoT, & Web). Rencana ini disusun agar mudah dipahami dan dieksekusi oleh AI Agent (seperti Cursor Composer, Windsurf, atau GitHub Copilot) dengan hasil yang *high-performance*, *aesthetic*, dan *future-proof*.

Karena tidak menggunakan database, kita akan menggunakan pendekatan **"Content as Code"** dengan MDX.

---

### **Judul Project: "The Polyglot Engineer Portfolio"**

### **1. Technology Stack & Architecture (Modern & Lightweight)**

Instruksikan agent untuk menggunakan *stack* terkini ini demi performa maksimal dan DX (Developer Experience) terbaik:

* **Framework:** **Next.js 15 (App Router)**. Gunakan *React Server Components (RSC)* secara default untuk performa loading secepat kilat.
* **Language:** **TypeScript**. Wajib untuk *type-safety*, mencerminkan kedisiplinan seorang engineer.
* **Styling:** **Tailwind CSS v4** (atau v3.4+).
* **UI Library:** **Shadcn/UI** (berbasis Radix UI). Ini memberikan komponen yang aksesibel dan mudah kustomisasi tanpa *bloat*.
* **Content Management (No DB):** **MDX (Markdown + JSX)**. Ini memungkinkan Anda menulis konten project seperti dokumen, tetapi bisa menyisipkan komponen React interaktif (misal: grafik real-time untuk demo IoT) di dalam artikel.
* **Animations:** **Framer Motion**. Untuk transisi halaman yang halus dan *micro-interactions*.
* **Icons:** **Lucide React**.
* **3D/Visuals (Opsional tapi disarankan):** **Spline** atau **React Three Fiber** (untuk menampilkan model 3D perangkat IoT atau node AI).

---

### **2. Design Language & UX (The "Engineering" Vibe)**

* **Theme:** *Cyberpunk Minimalist* atau *Swiss Style Dark Mode*. Latar belakang gelap (Zinc-950), teks putih/abu-abu terang, dengan aksen warna neon halus (Cyan untuk AI, Amber untuk IoT, Indigo untuk Web).
* **Typography:** Kombinasi **Sans-Serif** (Inter/Geist) untuk body text dan **Monospace** (JetBrains Mono/Fira Code) untuk judul dan *code snippet*.
* **Layout:** Menggunakan **Bento Grid Layout** (kotak-kotak asimetris yang responsif) untuk menampilkan *summary* skill dan project di halaman depan.

---

### **3. Struktur Direktori & Data (Blueprint untuk Agent)**

Berikan struktur ini kepada agent agar ia tahu di mana menyimpan data tanpa database:

```text
/src
  /app
    /projects
      /[slug]
        page.tsx (Detail Project)
    page.tsx (Home/Bento Grid)
    layout.tsx
  /components
    /ui (Shadcn components)
    /sections (Hero, Stack, Contact)
    /mdx (Custom MDX components: CodeBlock, IoTVisualizer, AIDemo)
  /content
    /projects
      project-1-smart-home-iot.mdx
      project-2-llm-chatbot.mdx
      project-3-saas-dashboard.mdx
  /lib
    projects.ts (Logic untuk membaca/filter file MDX)

```

---

### **4. Fitur Spesifik per Domain (Highlight Kemampuan Anda)**

Minta agent untuk membuat komponen khusus di dalam MDX untuk mendemonstrasikan keahlian Anda:

#### **A. AI / Machine Learning Showcase**

* **Fitur:** "Interactive Playground".
* **Implementasi:** Jangan hanya screenshot. Buat input box sederhana di mana pengunjung bisa mengetik sesuatu, dan jika Anda punya API key (misal OpenAI/HuggingFace) yang aman, tampilkan respon langsung. Atau, tampilkan **Chart interaktif** yang memvisualisasikan *loss function* atau data training.

#### **B. IoT (Internet of Things) Showcase**

* **Fitur:** "Digital Twin Simulation".
* **Implementasi:** Buat komponen yang mensimulasikan dashboard IoT. Misalnya, ada tombol "Hidupkan Lampu" di web yang mengubah warna UI (status on/off) dengan animasi *glowing*, atau grafik simulasi suhu realtime yang bergerak menggunakan data *dummy* (array looping) untuk menunjukkan kemampuan Anda menangani *streaming data*.

#### **C. Web Development Showcase**

* **Fitur:** "Live Lighthouse Score".
* **Implementasi:** Tampilkan badge skor performa, aksesibilitas, dan SEO dari project web Anda. Gunakan *tilt effect* pada kartu project untuk kesan interaktif.

---

### **5. Instruksi Langkah-demi-Langkah untuk Agent**

Berikut adalah *prompt* atau instruksi logis yang bisa Anda berikan ke agent (copas bagian ini):

#### **Step 1: Setup & Environment**

> "Inisialisasi project Next.js 15 dengan TypeScript, Tailwind CSS, dan ESLint. Setup 'Shadcn UI' dan tambahkan komponen: button, card, badge, separator. Install 'framer-motion' dan 'next-mdx-remote' atau '@next/mdx' untuk manajemen konten."

#### **Step 2: Core Components (The Bento Grid)**

> "Buat komponen `BentoGrid` yang responsif. Di halaman Home, saya ingin grid ini menampilkan:
> 1. Kartu Intro (Nama & Title).
> 2. Kartu Tech Stack (Icon marquee berjalan otomatis).
> 3. Kartu Map (Lokasi saya, bisa gaya visual abstrak).
> 4. 3 Kartu Project Terbaru (1 AI, 1 IoT, 1 Web)."
> 
> 

#### **Step 3: Project System (MDX Logic)**

> "Buat sistem di `/lib/projects.ts` yang membaca file `.mdx` dari folder `/content/projects`. Gunakan 'gray-matter' untuk parsing metadata (judul, deskripsi, tags: ['AI', 'IoT'], tanggal).
> Pastikan ada fungsi untuk memfilter project berdasarkan kategori (AI / IoT / Web)."

#### **Step 4: Project Detail Page (Dynamic)**

> "Buat halaman `[slug]/page.tsx`. Halaman ini harus merender konten MDX.
> Buat custom MDX components agar saya bisa menulis kode seperti `<TechStack icons={['react', 'python']} />` atau `<IoTDashboardDemo />` langsung di dalam file markdown.
> Tambahkan 'Table of Contents' otomatis di sebelah kanan artikel."

#### **Step 5: Visual & Polish**

> "Terapkan font 'Geist Sans' dan 'JetBrains Mono'.
> Tambahkan animasi: Saat scroll, elemen harus muncul pelan (Fade In Up).
> Pada cursor hover di kartu project, berikan efek *glow* halus pada border."

---

### **6. Deployment Plan (Zero Cost)**

* **Platform:** **Vercel** (Paling optimal untuk Next.js).
* **CI/CD:** Hubungkan ke GitHub Repository. Setiap kali Anda `git push` file `.mdx` baru, portofolio otomatis ter-update dalam hitungan detik.
* **Analytics:** Gunakan **Vercel Analytics** (gratis untuk hobby) untuk melihat siapa yang mengunjungi portofolio Anda.

---

### **Apa yang harus Anda siapkan sekarang?**

1. **Aset Foto/Video:** Siapkan rekaman layar (GIF/WebM) dari project AI/IoT Anda. Video pendek jauh lebih meyakinkan daripada gambar statis.
2. **Bio Singkat:** Tulisan "About Me" yang *punchy*.
3. **Daftar Project:** Pilih 3-6 project terbaik (jangan terlalu banyak, kurasi kualitas).

Apakah Anda ingin saya buatkan **contoh file `project-ai.mdx**` atau **Prompt spesifik** untuk langsung di-copy paste ke Agent coding Anda sekarang?
