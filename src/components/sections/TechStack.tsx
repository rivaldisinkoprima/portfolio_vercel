"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const techStack = [
  { name: "React", color: "text-cyan-500" },
  { name: "Next.js", color: "text-foreground" },
  { name: "TypeScript", color: "text-blue-500" },
  { name: "JavaScript", color: "text-yellow-500" },
  { name: "Python", color: "text-yellow-500" },
  { name: "Node.js", color: "text-green-500" },
  { name: "Express", color: "text-muted-foreground" },
  { name: "Golang", color: "text-cyan-600" },
  { name: "PostgreSQL", color: "text-blue-600" },
  { name: "Supabase", color: "text-green-500" },
  { name: "Prisma", color: "text-teal-500" },
  { name: "Neon", color: "text-green-400" },
  { name: "TailwindCSS", color: "text-cyan-400" },
  { name: "Vite", color: "text-purple-500" },
  { name: "Flutter", color: "text-cyan-400" },
  { name: "Dart", color: "text-blue-400" },
  { name: "Kotlin", color: "text-purple-500" },
  { name: "Android", color: "text-green-500" },
  { name: "C++", color: "text-blue-500" },
  { name: "ESP32", color: "text-amber-500" },
  { name: "Arduino", color: "text-teal-500" },
  { name: "IoT", color: "text-indigo-500" },
  { name: "MQTT", color: "text-muted-foreground" },
  { name: "Blynk", color: "text-green-500" },
  { name: "TensorFlow", color: "text-orange-500" },
  { name: "Keras", color: "text-red-500" },
  { name: "Jupyter", color: "text-orange-400" },
  { name: "Colab", color: "text-yellow-600" },
  { name: "OpenAI", color: "text-emerald-500" },
  { name: "FastAPI", color: "text-teal-500" },
];

export function TechStack() {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-muted-foreground font-mono mb-6">
          Tech Stack
        </p>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...techStack, ...techStack].map((tech, index) => (
<Badge
                key={index}
                variant="outline"
                className="mx-3 py-2 px-4 text-sm border-border bg-muted shrink-0"
              >
                <span className={tech.color}>{tech.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
