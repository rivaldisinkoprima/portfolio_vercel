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
  title: "Polyglot Engineer Portfolio | AI, IoT & Web Developer",
  description: "Portfolio of a Full Stack Developer specializing in AI, IoT, and Web Development. Explore projects, skills, and achievements.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScroll />
        <Navbar />
        <main>
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
