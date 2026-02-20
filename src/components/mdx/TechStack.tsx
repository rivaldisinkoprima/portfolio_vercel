"use client";

import { Badge } from "@/components/ui/badge";

interface TechStackProps {
  icons: string[];
}

const iconMap: Record<string, string> = {
  react: "⚛️",
  nextjs: "▲",
  typescript: "TS",
  python: "🐍",
  nodejs: "⬡",
  mqtt: "📡",
  esp32: "🔌",
  openai: "🤖",
  fastapi: "⚡",
  postgresql: "🐘",
  prisma: "🔷",
};

export function TechStack({ icons }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {icons.map((icon) => (
        <Badge key={icon} variant="outline" className="font-mono">
          <span className="mr-1">{iconMap[icon.toLowerCase()] || "●"}</span>
          {icon}
        </Badge>
      ))}
    </div>
  );
}
