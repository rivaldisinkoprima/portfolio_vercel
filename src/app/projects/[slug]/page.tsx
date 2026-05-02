import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, Github, ExternalLink } from "lucide-react";
import { ProjectImage } from "@/components/ui/ProjectImage";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { SlideUp, FadeIn } from "@/components/AnimateOnScroll";
import { TechStack } from "@/components/mdx/TechStack";
import { Metadata } from "next";

const categoryColors = {
  AI: "ai",
  IoT: "iot",
  Web: "web",
  Mobile: "mobile",
} as const;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Polyglot Engineer Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Rivaldi Eka Putra`,
      description: project.description,
      url: `https://www.valporto.my.id/projects/${slug}`,
      type: "article",
      publishedTime: project.date,
      authors: ["Rivaldi Eka Putra"],
      tags: project.tags,
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Rivaldi Eka Putra`,
      description: project.description,
      images: ["/og-image.svg"],
    },
  };
}

const markdownComponents: Components = {
  img: ({ src, alt }) => {
    const isMobile = alt?.includes("| mobile");
    const cleanAlt = alt?.replace("| mobile", "").trim();
    return <ProjectImage src={(src as string) || ""} alt={cleanAlt || ""} isMobile={isMobile} />;
  }
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <SlideUp>
          <Link href="/projects">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </SlideUp>

        <article>
          <SlideUp delay={0.1}>
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(project.category) ? project.category : [project.category]).map(cat => (
                  <Badge key={cat} variant={categoryColors[cat as keyof typeof categoryColors] || "outline"}>
                    {cat}
                  </Badge>
                ))}
              </div>
               <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
              
              <div className="mb-8">
                <TechStack icons={project.tags.map(t => t.toLowerCase())} />
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                </div>
                
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="w-4 h-4" />
                      Source Code
                    </Button>
                  </Link>
                )}
              </div>
            </header>
          </SlideUp>

          <FadeIn delay={0.2}>
            <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-code:text-primary prose-a:text-primary prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto">
              <ReactMarkdown components={markdownComponents}>{project.content}</ReactMarkdown>
            </div>
          </FadeIn>
        </article>
      </div>
    </main>
  );
}
