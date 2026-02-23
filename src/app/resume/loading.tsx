import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Skeleton className="w-28 h-10 mb-8" />
        
        <div className="mb-12 space-y-4">
          <Skeleton className="w-40 h-10" />
          <Skeleton className="w-64 h-6" />
          <Skeleton className="w-48 h-10" />
        </div>

        <div className="space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="w-20 h-6" />
              </div>
              <Skeleton className="w-full aspect-[8.5/11]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
