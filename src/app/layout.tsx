import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.valporto.my.id"),
  alternates: {
    canonical: "https://www.valporto.my.id",
    languages: {
      en: "https://www.valporto.my.id",
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
    "IoT",
    "web developer",
    "software engineer",
    "polyglot engineer",
  ],
  authors: [{ name: "Rivaldi Eka Putra" }],
  creator: "Rivaldi Eka Putra",
  publisher: "Rivaldi Eka Putra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.valporto.my.id",
    siteName: "Rivaldi Eka Putra Portfolio",
    title: "Rivaldi Eka Putra | Polyglot Engineer - AI, IoT & Web Developer",
    description: "Portfolio Rivaldi Eka Putra - Full Stack Developer spesialis AI, IoT, dan Web Development.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 1200,
        alt: "Rivaldi Eka Putra - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivaldi Eka Putra | Portfolio",
    description: "Full Stack Developer - AI, IoT & Web Development",
    images: ["/profile.jpg"],
    creator: "@rivaldi",
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rivaldi Eka Putra",
              url: "https://www.valporto.my.id",
              jobTitle: "Full Stack Developer",
              description: "Full Stack Developer specializing in AI, IoT, and Web Development",
              sameAs: [
                "https://github.com",
                "https://www.linkedin.com/in/rivaldiekaputr/",
                "mailto:hello@example.com"
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance"
              },
              knowsAbout: ["AI", "IoT", "Web Development", "Full Stack Development"]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScroll />
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
