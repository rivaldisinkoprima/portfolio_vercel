import { BentoSkeleton, HeroSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <HeroSkeleton />
        <section className="py-16">
          <BentoSkeleton />
        </section>
        <section className="py-16">
          <div className="space-y-4">
            <Skeleton className="w-32 h-8" />
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="w-20 h-10" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-800 rounded-md ${className}`} />;
}
