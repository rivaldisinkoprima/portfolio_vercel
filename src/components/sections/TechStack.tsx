"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const techStack = [
  { name: "Next.js", color: "text-white" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "Python", color: "text-yellow-400" },
  { name: "React", color: "text-cyan-400" },
  { name: "Node.js", color: "text-green-400" },
  { name: "PostgreSQL", color: "text-blue-300" },
  { name: "TensorFlow", color: "text-orange-400" },
  { name: "ESP32", color: "text-amber-400" },
  { name: "MQTT", color: "text-zinc-400" },
  { name: "Docker", color: "text-blue-500" },
  { name: "AWS", color: "text-yellow-300" },
  { name: "LangChain", color: "text-purple-400" },
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
                className="mx-3 py-2 px-4 text-sm border-zinc-700 bg-zinc-900/50"
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
