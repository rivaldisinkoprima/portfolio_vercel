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

export function BentoGrid({ projects }: BentoGridProps) {
  return (
    <section className="py-16 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[200px]"
      >
        {/* Tech Stack Card */}
        <Card className="md:col-span-2 bg-card/60 backdrop-blur-md border border-border/50 group hover:border-primary/30 hover:bg-card/80 transition-all duration-500 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <CardContent className="p-6 h-full flex flex-col justify-center min-h-[160px]">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="ai" className="shadow-sm">AI / ML</Badge>
              <Badge variant="iot" className="shadow-sm">IoT</Badge>
              <Badge variant="web" className="shadow-sm">Web Dev</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-4 max-w-sm">
              Building intelligent systems with modern technologies
            </p>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="md:col-span-2 bg-card/60 backdrop-blur-md border border-border/50 group hover:border-primary/30 transition-all duration-500 overflow-hidden relative min-h-[160px]">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-10" />
          <CardContent className="p-0 h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 group-hover:opacity-100 transition-opacity duration-500 opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center transform group-hover:scale-105 transition-transform duration-500">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2 drop-shadow-lg" />
                <p className="font-mono text-sm text-foreground">Jakarta, Indonesia</p>
                <p className="text-xs text-muted-foreground mt-1">UTC+7 • Available for hire</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Cards */}
        {projects.slice(0, 3).map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="block h-full">
            <Card
              className="h-full bg-card/60 backdrop-blur-md border border-border/50 group hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden relative min-h-[200px] hover:glow-cyan"
            >
              <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
                <div>
                  <Badge variant={categoryColors[project.category]} className="mb-4">
                    {project.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6 group-hover:text-foreground transition-colors">
                  <span>View Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
