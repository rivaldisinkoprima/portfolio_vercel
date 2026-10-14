"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, FolderSearch } from "lucide-react";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProjectMeta } from "@/lib/projects";

const categoryColors = {
  AI: "ai",
  IoT: "iot",
  Web: "web",
  Mobile: "mobile",
} as const;

const FILTERS = ["All", "AI", "IoT", "Web", "Mobile"] as const;
type Filter = (typeof FILTERS)[number];

function matchesCategory(project: ProjectMeta, filter: Filter): boolean {
  if (filter === "All") return true;
  const cats = Array.isArray(project.category) ? project.category : [project.category];
  return cats.includes(filter);
}

export function ProjectsGrid({ projects }: { projects: ProjectMeta[] }) {
  const [active, setActive] = useState<Filter>("All");
  const filtered = projects.filter((p) => matchesCategory(p, active));

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter projects by category">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              active === f
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-6" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <Card className="h-full bg-card border-border group hover:border-primary/50 transition-all cursor-pointer hover:glow-cyan overflow-hidden">
                    {project.image && (
                      <div className="aspect-video overflow-hidden bg-muted/10">
                        <img
                          src={project.image}
                          alt={project.title}
                          className={`w-full h-full transition-transform duration-700 ease-out ${
                            (Array.isArray(project.category) ? project.category.includes("Web") : project.category === "Web")
                              ? 'object-contain scale-125 group-hover:scale-100'
                              : 'object-cover group-hover:scale-105'
                          }`}
                        />
                      </div>
                    )}
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(Array.isArray(project.category) ? project.category : [project.category]).map(cat => (
                          <Badge key={cat} variant={categoryColors[cat as keyof typeof categoryColors] || "outline"} className="w-fit">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground text-sm flex-grow">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(project.date)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          <span>View</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FolderSearch className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
