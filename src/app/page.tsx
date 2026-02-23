import { getAllProjects } from "@/lib/projects";
import { getCertificates } from "@/lib/certificates";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections";

const BentoGrid = dynamic(() => import("@/components/sections/BentoGrid").then(mod => ({ default: mod.BentoGrid })), {
  loading: () => <div className="h-96 animate-pulse bg-muted rounded-xl" />,
});

const TechStack = dynamic(() => import("@/components/sections/TechStack").then(mod => ({ default: mod.TechStack })), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-xl" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-xl" />,
});

export const revalidate = 3600;

export default function Home() {
  const projects = getAllProjects();
  const certificates = getCertificates();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Hero />
        <TechStack />
        <BentoGrid projects={projects} />
        <Contact serverCertificates={certificates} />
      </div>
    </main>
  );
}
