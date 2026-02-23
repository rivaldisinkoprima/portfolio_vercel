import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Skeleton className="w-28 h-10 mb-8" />
        
        <div className="grid md:grid-cols-[200px_1fr] gap-8">
          <Skeleton className="w-40 h-40 rounded-full" />
          
          <div className="space-y-4">
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-1/2 h-6" />
            <div className="flex gap-4">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-40 h-5" />
            </div>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
            <div className="flex gap-2">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-12 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-4">
          <Skeleton className="w-40 h-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-3">
                <Skeleton className="w-32 h-6" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="w-16 h-6" />
                  <Skeleton className="w-20 h-6" />
                  <Skeleton className="w-18 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-4">
          <Skeleton className="w-32 h-8" />
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-48 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      </div>
    </main>
  );
}
