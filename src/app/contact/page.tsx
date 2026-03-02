import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, MapPin, Mail, Instagram, Linkedin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SlideUp, SlideLeft, FadeIn } from "@/components/AnimateOnScroll";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Rivaldi Eka Putra - Polyglot Engineer",
  description: "Hubungi Rivaldi Eka Putra - Full Stack Developer spesialis AI, IoT, dan Web Development. Kirim pesan, email, atau hubungi via WhatsApp.",
  openGraph: {
    title: "Contact | Rivaldi Eka Putra",
    description: "Hubungi Rivaldi Eka Putra untuk kolaborasi atau project.",
    url: "https://www.valporto.my.id/contact",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Contact Rivaldi Eka Putra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Rivaldi Eka Putra",
    description: "Hubungi Rivaldi Eka Putra untuk kolaborasi atau project.",
    images: ["/og-image.svg"],
  },
};

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <header className="mb-12">
          <SlideUp>
            <Link href="/">
              <Badge variant="outline" className="mb-4 hover:bg-primary/10 cursor-pointer">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Back to Home
              </Badge>
            </Link>
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="text-muted-foreground">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </SlideUp>
        </header>

        <SlideUp delay={0.2}>
          <ContactForm />
        </SlideUp>

        <div className="space-y-6 mt-12">
          <SlideUp delay={0.3}>
            <h2 className="text-xl font-semibold">Other Ways to Reach Me</h2>
          </SlideUp>
          <div className="grid gap-4">
            <FadeIn delay={0.4}>
              <a
                href="mailto:rivaldiekaputr@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border hover:bg-muted hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">rivaldiekaputr@gmail.com</p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={0.5}>
              <a
                href="https://instagram.com/rivaldiekaptr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border hover:bg-muted hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="font-semibold">Instagram</p>
                  <p className="text-sm text-muted-foreground">@rivaldiekaptr</p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={0.6}>
              <a
                href="https://www.linkedin.com/in/rivaldiekaputr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border hover:bg-muted hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">linkedin.com/in/rivaldiekaputr</p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={0.7}>
              <a
                href="https://wa.me/62895616181056"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border hover:bg-muted hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+62 895 616 181056</p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
