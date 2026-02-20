import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  category: "AI" | "IoT" | "Web";
  tags: string[];
  date: string;
  image?: string;
  featured?: boolean;
}

export interface Project extends ProjectMeta {
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

function ensureDirectory() {
  if (!fs.existsSync(projectsDirectory)) {
    return false;
  }
  return true;
}

export function getProjectSlugs(): string[] {
  if (!ensureDirectory()) {
    return [];
  }
  return fs.readdirSync(projectsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getProjectBySlug(slug: string): Project | null {
  if (!ensureDirectory()) {
    return null;
  }
  
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    description: data.description,
    category: data.category,
    tags: data.tags || [],
    date: data.date,
    image: data.image,
    featured: data.featured,
    content,
  };
}

export function getAllProjects(): ProjectMeta[] {
  if (!ensureDirectory()) {
    return [];
  }
  
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => {
      const project = getProjectBySlug(slug);
      if (!project) return null;
      const { content: _content, ...meta } = project;
      void _content;
      return meta;
    })
    .filter((project): project is ProjectMeta => project !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return projects;
}

export function getProjectsByCategory(category: "AI" | "IoT" | "Web"): ProjectMeta[] {
  const projects = getAllProjects();
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects(): ProjectMeta[] {
  const projects = getAllProjects();
  return projects.filter((project) => project.featured);
}
