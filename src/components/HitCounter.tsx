"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function HitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    const incrementCounter = async () => {
      if (hasIncremented) return;

      try {
        setHasIncremented(true);
        sessionStorage.setItem("hit-counted", "true");

        const response = await fetch("/api/hit-counter", {
          method: "POST",
        });
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Failed to increment counter:", error);
      }
    };

    if (!sessionStorage.getItem("hit-counted")) {
      incrementCounter();
    } else {
      fetch("/api/hit-counter")
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch(console.error);
    }
  }, [hasIncremented]);

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
