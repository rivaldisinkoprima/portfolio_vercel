"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const techStack = [
  { name: "Next.js", color: "text-foreground" },
  { name: "TypeScript", color: "text-blue-500" },
  { name: "Python", color: "text-yellow-500" },
  { name: "React", color: "text-cyan-500" },
  { name: "Flutter", color: "text-cyan-400" },
  { name: "Node.js", color: "text-green-500" },
  { name: "PostgreSQL", color: "text-blue-600" },
  { name: "TensorFlow", color: "text-orange-500" },
  { name: "ESP32", color: "text-amber-500" },
  { name: "MQTT", color: "text-muted-foreground" },
  { name: "Docker", color: "text-blue-600" },
  { name: "AWS", color: "text-yellow-500" },
  { name: "LangChain", color: "text-purple-500" },
  { name: "Riverpod", color: "text-purple-400" },
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
          <div className="flex animate-marquee">
            {[...techStack, ...techStack].map((tech, index) => (
<Badge
                key={index}
                variant="outline"
                className="mx-3 py-2 px-4 text-sm border-border bg-muted"
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
