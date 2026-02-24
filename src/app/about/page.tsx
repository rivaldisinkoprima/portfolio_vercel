import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, MapPin, Mail, Instagram, Linkedin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SlideUp, FadeIn, SlideLeft } from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "About | Rivaldi Eka Putra - Polyglot Engineer",
  description: "Tentang Rivaldi Eka Putra - Full Stack Developer spesialis AI, IoT, dan Web Development. Pelajari lebih lanjut tentang latar belakang, skills, dan pengalaman saya.",
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
                  <span>Jakarta, Indonesia</span>
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
                I&apos;m a Future Developer with expertise at the intersection of{" "}
                <span className="text-primary">AI</span>,{" "}
                <span className="text-amber-500">IoT</span>, and{" "}
                <span className="text-indigo-500">Web Development</span>.
                I specialize in building intelligent systems that solve real-world problems.
                With a strong foundation in both hardware and software, I bring a unique
                perspective to every project I work on.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="ai">AI / ML</Badge>
                <Badge variant="iot">IoT</Badge>
                <Badge variant="web">Web Development</Badge>
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
          <div className="grid md:grid-cols-3 gap-6">
            <SlideUp delay={0.3}>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-primary">AI / Machine Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">TensorFlow</Badge>
                    <Badge variant="outline">PyTorch</Badge>
                    <Badge variant="outline">LangChain</Badge>
                    <Badge variant="outline">OpenAI</Badge>
                    <Badge variant="outline">Hugging Face</Badge>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideUp delay={0.4}>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-amber-500">IoT / Embedded</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">ESP32</Badge>
                    <Badge variant="outline">Arduino</Badge>
                    <Badge variant="outline">MQTT</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Raspberry Pi</Badge>
                    <Badge variant="outline">InfluxDB</Badge>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideUp delay={0.5}>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-500">Web Development</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">Prisma</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
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
                    <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                    <p className="text-primary text-sm">Tech Company • 2023 - Present</p>
                    <p className="text-muted-foreground mt-2">
                      Building AI-powered web applications and IoT solutions for enterprise clients.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Software Engineer</h3>
                    <p className="text-primary text-sm">Startup • 2021 - 2023</p>
                    <p className="text-muted-foreground mt-2">
                      Developed scalable web applications and learned the fundamentals of machine learning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </section>

        <section className="mt-16">
          <SlideUp delay={0.8}>
            <h2 className="text-2xl font-bold mb-6">Organizational experience</h2>
          </SlideUp>
          <SlideUp delay={0.9}>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Head of Technology</h3>
                    <p className="text-amber-500 text-sm">Google Developer Student Clubs • 2023 - Present</p>
                    <p className="text-muted-foreground mt-2">
                      Leading technical initiatives and organizing workshops for students to learn modern web technologies.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">IoT Researcher</h3>
                    <p className="text-amber-500 text-sm">Research Institute • 2022 - Present</p>
                    <p className="text-muted-foreground mt-2">
                      Conducting research on IoT systems and publishing papers on smart home automation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Volunteer</h3>
                    <p className="text-amber-500 text-sm">Tech Community Events • 2021 - Present</p>
                    <p className="text-muted-foreground mt-2">
                      Organizing and volunteering at technology conferences and hackathons.
                    </p>
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
