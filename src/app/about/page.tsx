import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, MapPin, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About | Polyglot Engineer Portfolio",
  description: "Learn more about me",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
              <Image
                src="/profile.jpg"
                alt="Rivaldi Eka Putra - Polyglot Engineer"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">Rivaldi Eka Putra</h1>
            <p className="text-xl text-cyan-400 font-mono mb-4">Polyglot Engineer</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@example.com</span>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mb-6">
              I&apos;m a Full Stack Developer with expertise at the intersection of{" "}
              <span className="text-cyan-400">AI</span>,{" "}
              <span className="text-amber-400">IoT</span>, and{" "}
              <span className="text-indigo-400">Web Development</span>. 
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
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-black ml-auto">
                <Link href="/resume">
                  <Download className="w-4 h-4 mr-2" />
                  View Resume
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-zinc-900/80 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">AI / Machine Learning</h3>
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

            <Card className="bg-zinc-900/80 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">IoT / Embedded</h3>
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

            <Card className="bg-zinc-900/80 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">Web Development</h3>
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
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <Card className="bg-zinc-900/80 border-zinc-800">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                  <p className="text-cyan-400 text-sm">Tech Company • 2023 - Present</p>
                  <p className="text-zinc-400 mt-2">
                    Building AI-powered web applications and IoT solutions for enterprise clients.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Software Engineer</h3>
                  <p className="text-cyan-400 text-sm">Startup • 2021 - 2023</p>
                  <p className="text-zinc-400 mt-2">
                    Developed scalable web applications and learned the fundamentals of machine learning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Organizational Experience</h2>
          <Card className="bg-zinc-900/80 border-zinc-800">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Head of Technology</h3>
                  <p className="text-amber-400 text-sm">Google Developer Student Clubs • 2023 - Present</p>
                  <p className="text-zinc-400 mt-2">
                    Leading technical initiatives and organizing workshops for students to learn modern web technologies.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">IoT Researcher</h3>
                  <p className="text-amber-400 text-sm">Research Institute • 2022 - Present</p>
                  <p className="text-zinc-400 mt-2">
                    Conducting research on IoT systems and publishing papers on smart home automation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Volunteer</h3>
                  <p className="text-amber-400 text-sm">Tech Community Events • 2021 - Present</p>
                  <p className="text-zinc-400 mt-2">
                    Organizing and volunteering at technology conferences and hackathons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
