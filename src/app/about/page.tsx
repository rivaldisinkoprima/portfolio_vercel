import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, MapPin, Mail, Instagram, Linkedin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SlideUp, SlideLeft } from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "About | Rivaldi Eka Putra - Polyglot Engineer",
  description: "Tentang Rivaldi Eka Putra - Polyglot Engineer spesialis AI, IoT, Web, dan Mobile Development. Pelajari lebih lanjut tentang latar belakang, skills, dan pengalaman saya.",
  openGraph: {
    title: "About | Rivaldi Eka Putra",
    description: "Tentang Rivaldi Eka Putra - Polyglot Engineer spesialis AI, IoT, Web, dan Mobile Development.",
    url: "https://www.valporto.my.id/about",
    type: "profile",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "About Rivaldi Eka Putra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Rivaldi Eka Putra",
    description: "Tentang Rivaldi Eka Putra - Polyglot Engineer spesialis AI, IoT, Web, dan Mobile Development.",
    images: ["/og-image.svg"],
  },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <SlideUp>
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </SlideUp>

        <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
          <SlideLeft>
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20">
                <Image
                  src="/profile.jpg"
                  alt="Rivaldi Eka Putra - Polyglot Engineer"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SlideLeft>

          <SlideUp delay={0.1}>
            <div>
              <h1 className="text-4xl font-bold mb-2">Rivaldi Eka Putra</h1>
              <p className="text-xl text-primary font-mono mb-4">Polyglot Engineer</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Surabaya, Indonesia</span>
                </div>
                <a href="mailto:rivaldiekaputr@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>rivaldiekaputr@gmail.com</span>
                </a>
                <a href="https://wa.me/62895616181056" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+62 895 616 181056</span>
                </a>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">
                I am a <strong>Cum Laude Computer Engineering graduate</strong> from Universitas Dinamika, stepping into the industry as a <strong>Future Developer</strong>. I am an adaptive and communicative professional who is always eager to learn new technologies and embrace modern challenges. With strong teamwork skills and a focus on delivering results, I am driven to build scalable, innovative solutions that solve real-world problems. Committed to continuous growth, I aim to make a positive impact by leveraging cutting-edge technology to create efficient systems for the future.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="ai">AI / ML</Badge>
                <Badge variant="iot">IoT</Badge>
                <Badge variant="web">Web Development</Badge>
                <Badge variant="mobile">Mobile Development</Badge>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com/rivaldiekaptr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rivaldiekaputr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/62895616181056"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground ml-auto">
                  <Link href="/resume">
                    <Download className="w-4 h-4 mr-2" />
                    View Resume
                  </Link>
                </Button>
              </div>
            </div>
          </SlideUp>
        </div>

        <section className="mt-16">
          <SlideUp delay={0.2}>
            <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
          </SlideUp>
          <div className="grid md:grid-cols-2 gap-6">
            <SlideUp delay={0.3}>
              <Card className="bg-card border-border h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-primary">AI / Machine Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">TensorFlow</Badge>
                    <Badge variant="outline">Keras</Badge>
                    <Badge variant="outline">Google Colab</Badge>
                    <Badge variant="outline">OpenAI</Badge>
                    <Badge variant="outline">Jupyter</Badge>
                    <Badge variant="outline">OpenClaw</Badge>
                    <Badge variant="outline">Claude Code</Badge>
                    <Badge variant="outline">Vibe Coding</Badge>
                    <Badge variant="outline">OpenCode</Badge>
                    <Badge variant="outline">Antigravity</Badge>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideUp delay={0.4}>
              <Card className="bg-card border-border h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-amber-500">IoT / Embedded</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">ESP32</Badge>
                    <Badge variant="outline">ESP-IDF</Badge>
                    <Badge variant="outline">Blynk</Badge>
                    <Badge variant="outline">MQTT</Badge>
                    <Badge variant="outline">Arduino Platform</Badge>
                    <Badge variant="outline">ThingSpeak</Badge>
                    <Badge variant="outline">ThingsBoard</Badge>
                    <Badge variant="outline">Wokwi</Badge>
                    <Badge variant="outline">Arduino IDE</Badge>
                    <Badge variant="outline">PlatformIO</Badge>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideUp delay={0.5}>
              <Card className="bg-card border-border h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-500">Web Development</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">React / Vite</Badge>
                    <Badge variant="outline">Express</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideUp delay={0.6}>
              <Card className="bg-card border-border h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-emerald-500">Mobile Development</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">Dart</Badge>
                    <Badge variant="outline">Kotlin</Badge>
                    <Badge variant="outline">Android</Badge>
                    <Badge variant="outline">Jetpack Compose</Badge>
                    <Badge variant="outline">Room Database</Badge>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          </div>
        </section>

        <section className="mt-16">
          <SlideUp delay={0.6}>
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
          </SlideUp>
          <SlideUp delay={0.7}>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">R&amp;D Engineer</h3>
                    <p className="text-primary text-sm">PT Sinko Prima Alloy • 2024 – Present</p>
                    <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-outside ml-4 text-sm">
                      <li>Conducted reverse engineering on 10+ medical devices (Bluetooth, Wi-Fi, LAN, USB) for data integration into the IoT Gateway.</li>
                      <li>Developed IoT Gateway firmware to process various medical protocols in real-time.</li>
                      <li>Collaborated cross-functionally to provide technical support and troubleshooting, ensuring seamless system integration.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Internet of Things (IoT) Engineer Camp</h3>
                    <p className="text-primary text-sm">Indobot Academy • 2023</p>
                    <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-outside ml-4 text-sm">
                      <li>Participated in intensive soft skill and technical IoT training guided by professional mentors.</li>
                      <li>Deepened IoT knowledge and applied skills through structured development assignments.</li>
                      <li>Designed and evaluated Smart IoT Devices, concluding with a final project titled "Smart DGS (Door Gate Security)".</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </section>

        <section className="mt-16">
          <SlideUp delay={0.8}>
            <h2 className="text-2xl font-bold mb-6">Organizational Experience</h2>
          </SlideUp>
          <SlideUp delay={0.9}>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">President</h3>
                    <p className="text-amber-500 text-sm">HIMA Teknik Komputer • 2022 – 2023</p>
                    <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-outside ml-4">
                      <li>Planned and executed 8 annual programs, overseeing their implementation from the beginning to the end of the tenure.</li>
                      <li>Organized the &quot;Newcomer&quot; (New Computer Generation) program, an orientation event for 30 new Computer Engineering students.</li>
                      <li>Hosted &quot;STS&quot; (Sharing Tuntas Studi), inviting alumni to share career experiences with 90 Computer Engineering students.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Advocacy Commission</h3>
                    <p className="text-amber-500 text-sm">DPM-U • 2021 - 2022</p>
                    <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-outside ml-4">
                      <li>Voiced student aspirations by reviewing 15 issues and advocating for student-oriented solutions.</li>
                      <li>Analyzed and reviewed 3 university policies impacting student welfare.</li>
                      <li>Led &quot;Safari Hima&quot;, conducting aspiration discussions with 7 Student Associations.</li>
                      <li>Organized &quot;Quarterly Meeting 1&quot; as a performance monitoring mechanism for 18 Student Activity Units.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Vice President</h3>
                    <p className="text-amber-500 text-sm">Paskibra Dinamika • 2020 – 2021</p>
                    <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-outside ml-4">
                      <li>Assisted the President in coordinating 7 programs within the Paskibra Student Activity Unit.</li>
                      <li>Organized a National Anti-Corruption Webinar featuring a speaker from the KPK, attended by over 200 participants.</li>
                      <li>Hosted a National Defense Webinar featuring a speaker from the East Java Paskibra Alumni Association, attended by over 200 participants.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </section>
      </div>
    </main>
  );
}
