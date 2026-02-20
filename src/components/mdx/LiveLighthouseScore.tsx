"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ScoreProps {
  label: string;
  score: number;
  color: string;
}

function ScoreBadge({ label, score, color }: ScoreProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} ${score * 3.6}deg, #27272a 0deg)`,
        }}
      >
        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
          <span className="text-lg font-bold font-mono">{score}</span>
        </div>
      </motion.div>
      <span className="text-xs text-muted-foreground mt-2">{label}</span>
    </div>
  );
}

export function LiveLighthouseScore() {
  return (
    <Card className="mt-6 bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <h4 className="font-mono text-sm text-muted-foreground mb-4">
          Live Lighthouse Score
        </h4>
        <div className="flex justify-between">
          <ScoreBadge label="Performance" score={98} color="#22d3ee" />
          <ScoreBadge label="Accessibility" score={100} color="#f59e0b" />
          <ScoreBadge label="Best Practices" score={100} color="#6366f1" />
          <ScoreBadge label="SEO" score={100} color="#10b981" />
        </div>
      </CardContent>
    </Card>
  );
}
