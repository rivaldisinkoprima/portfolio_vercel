import { ProjectsGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <Skeleton className="w-32 h-10 mb-4" />
          <Skeleton className="w-full h-6 max-w-xl" />
          <Skeleton className="w-2/3 h-6 max-w-xl mt-2" />
        </header>
        <ProjectsGridSkeleton />
      </div>
    </main>
  );
}
