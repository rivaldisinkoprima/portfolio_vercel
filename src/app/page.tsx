import { getAllProjects } from "@/lib/projects";
import { getCertificates } from "@/lib/certificates";
import { Hero, TechStack, BentoGrid, Contact } from "@/components/sections";

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
