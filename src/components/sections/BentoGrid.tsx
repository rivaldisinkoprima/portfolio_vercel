"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";
import { ProjectMeta } from "@/lib/projects";

interface BentoGridProps {
  projects: ProjectMeta[];
}

const categoryColors = {
  AI: "ai",
  IoT: "iot",
  Web: "web",
} as const;

const categoryGlow = {
  AI: "glow-cyan",
  IoT: "glow-amber",
  Web: "glow-indigo",
};

export function BentoGrid({ projects }: BentoGridProps) {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]"
      >
        {/* Tech Stack Card */}
        <Card className="md:col-span-2 bg-zinc-900/80 border-zinc-800 group hover:border-zinc-700 transition-all">
          <CardContent className="p-6 h-full flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-4">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="ai">AI / ML</Badge>
              <Badge variant="iot">IoT</Badge>
              <Badge variant="web">Web Dev</Badge>
            </div>
            <p className="text-sm text-zinc-400 mt-4">
              Building intelligent systems with modern technologies
            </p>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="md:col-span-2 bg-zinc-900/80 border-zinc-800 group hover:border-zinc-700 transition-all overflow-hidden">
          <CardContent className="p-0 h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="font-mono text-sm text-zinc-400">Jakarta, Indonesia</p>
                <p className="text-xs text-zinc-500">UTC+7 • Available for hire</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Cards */}
        {projects.slice(0, 3).map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <Card
              className={`h-full bg-zinc-900/80 border-zinc-800 group hover:border-zinc-700 transition-all cursor-pointer hover:${categoryGlow[project.category]}`}
            >
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div>
                  <Badge variant={categoryColors[project.category]} className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-zinc-500 mt-4">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>View Project</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
