import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12 space-y-4">
          <Skeleton className="w-40 h-10" />
          <Skeleton className="w-64 h-6" />
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
          ))}
          <Skeleton className="w-full h-10 mt-8" />
        </div>
      </div>
    </main>
  );
}
