import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HitCounter } from "@/components/HitCounter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.valporto.my.id"),
  alternates: {
    canonical: "https://www.valporto.my.id",
    languages: {
      en: "https://www.valporto.my.id",
      id: "https://www.valporto.my.id",
    },
  },
  title: {
    default: "Rivaldi Eka Putra | Polyglot Engineer - AI, IoT & Web Developer",
    template: "%s | Rivaldi Eka Putra",
  },
  description: "Portfolio Rivaldi Eka Putra - Full Stack Developer spesialis AI, IoT, dan Web Development. Lihat proyek, skills, dan kontak profesional.",
  keywords: [
    "Rivaldi Eka Putra",
    "portfolio",
    "full stack developer",
    "AI developer",
    "IoT developer",
    "web developer",
    "software engineer",
    "polyglot engineer",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Rivaldi Eka Putra" }],
  creator: "Rivaldi Eka Putra",
  publisher: "Rivaldi Eka Putra",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
    url: "https://www.valporto.my.id",
    siteName: "Rivaldi Eka Putra Portfolio",
    title: "Rivaldi Eka Putra | Polyglot Engineer - AI, IoT & Web Developer",
    description: "Portfolio Rivaldi Eka Putra - Full Stack Developer spesialis AI, IoT, dan Web Development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rivaldi Eka Putra - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivaldi Eka Putra | Polyglot Engineer",
    description: "Full Stack Developer - AI, IoT & Web Development | Jakarta, Indonesia",
    images: ["/og-image.png"],
    creator: "@rivaldiekaptr",
    site: "@rivaldiekaptr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google7937478b8e105b70",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem('theme');
                var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22d3ee" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rivaldi Eka Putra",
              url: "https://www.valporto.my.id",
              image: "https://www.valporto.my.id/profile.jpg",
              jobTitle: "Full Stack Developer",
              description: "Full Stack Developer specializing in AI, IoT, and Web Development based in Jakarta, Indonesia",
              email: "rivaldiekaputr@gmail.com",
              telephone: "+62895616181056",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jakarta",
                addressCountry: "ID"
              },
              sameAs: [
                "https://instagram.com/rivaldiekaptr",
                "https://www.linkedin.com/in/rivaldiekaputr/",
                "https://wa.me/62895616181056"
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance"
              },
              knowsAbout: ["AI", "Machine Learning", "IoT", "Web Development", "Full Stack Development", "Next.js", "Python", "ESP32"]
            })
          }}
        />
      </head>
<body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <footer className="py-8 text-center">
            <HitCounter />
          </footer>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
