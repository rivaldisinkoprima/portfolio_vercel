import { getAllProjects } from "@/lib/projects";
import { getCertificates } from "@/lib/certificates";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections";
import { SlideUp, FadeIn } from "@/components/AnimateOnScroll";

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
        <SlideUp>
          <Hero />
        </SlideUp>

        <SlideUp delay={0.1}>
          <TechStack />
        </SlideUp>

        <SlideUp delay={0.2}>
          <BentoGrid projects={projects} />
        </SlideUp>

        <FadeIn delay={0.3}>
          <Contact serverCertificates={certificates} />
        </FadeIn>
      </div>
    </main>
  );
}
