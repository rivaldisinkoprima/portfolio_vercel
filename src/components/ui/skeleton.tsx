"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-zinc-800 rounded-md",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6">
      <Skeleton className="w-16 h-6 mb-3" />
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-2/3 h-4 mb-4" />
      <Skeleton className="w-full h-px mt-auto" />
    </div>
  );
}

export function BentoSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
      <div className="md:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-lg p-6">
        <Skeleton className="w-32 h-6 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-12 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
        <Skeleton className="w-48 h-4" />
      </div>
      <div className="md:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-lg p-6">
        <Skeleton className="w-8 h-8 mx-auto mb-2" />
        <Skeleton className="w-32 h-4 mx-auto" />
        <Skeleton className="w-24 h-3 mx-auto mt-2" />
      </div>
      {[1, 2, 3].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="py-16 space-y-4">
      <Skeleton className="w-16 h-6" />
      <Skeleton className="w-3/4 h-12" />
      <Skeleton className="w-1/2 h-12" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-2/3 h-6" />
    </div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
