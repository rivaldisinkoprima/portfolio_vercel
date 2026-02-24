import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { SlideUp } from "@/components/AnimateOnScroll";

const categoryColors = {
  AI: "ai",
  IoT: "iot",
  Web: "web",
} as const;

export const metadata = {
  title: "Projects | Polyglot Engineer Portfolio",
  description: "Explore my projects in AI, IoT, and Web Development.",
};

export const revalidate = 3600;

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <SlideUp>
            <h1 className="text-4xl font-bold mb-4">Projects</h1>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="text-muted-foreground max-w-xl">
              A collection of projects showcasing expertise in AI, IoT, and Web Development.
              Each project demonstrates practical problem-solving and technical innovation.
            </p>
          </SlideUp>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <SlideUp key={project.slug} delay={0.1 + index * 0.1}>
              <Link href={`/projects/${project.slug}`}>
                <Card className="h-full bg-card border-border group hover:border-primary/50 transition-all cursor-pointer hover:glow-cyan">
                  <CardContent className="p-6 h-full flex flex-col">
                    <Badge variant={categoryColors[project.category]} className="w-fit mb-3">
                      {project.category}
                    </Badge>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground text-sm flex-grow">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{project.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        <span>View</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>
    </main>
  );
}
