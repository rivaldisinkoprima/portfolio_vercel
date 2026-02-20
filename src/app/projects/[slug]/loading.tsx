import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Skeleton className="w-32 h-10 mb-8" />
        
        <div className="space-y-4 mb-8">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-3/4 h-10" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-2/3 h-6" />
        </div>

        <div className="flex gap-4 mb-8">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="w-full h-4" />
          ))}
        </div>
      </div>
    </main>
  );
}
