import { getAllProjects } from "@/lib/projects";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SlideUp } from "@/components/AnimateOnScroll";

export const metadata = {
  title: "Projects | Polyglot Engineer Portfolio",
  description: "Explore my projects in AI, IoT, Web, and Mobile Development.",
};

export const revalidate = 3600;

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <header className="mb-12">
          <SlideUp>
            <h1 className="text-4xl font-bold mb-4">Projects</h1>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="text-muted-foreground max-w-xl">
              A collection of projects showcasing expertise in AI, IoT, Web, and Mobile Development.
              Each project demonstrates practical problem-solving and technical innovation.
            </p>
          </SlideUp>
        </header>

        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
