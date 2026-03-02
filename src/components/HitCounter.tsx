"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function HitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const incrementCounter = async () => {
      if (sessionStorage.getItem("hit-counted")) {
        const res = await fetch("/api/hit-counter");
        const data = await res.json();
        setCount(data.count);
        return;
      }

      try {
        sessionStorage.setItem("hit-counted", "true");
        const response = await fetch("/api/hit-counter", { method: "POST" });
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch counter:", error);
      }
    };

    incrementCounter();
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="w-4 h-4" />
      <span>{count.toLocaleString()} visitors</span>
    </div>
  );
}
