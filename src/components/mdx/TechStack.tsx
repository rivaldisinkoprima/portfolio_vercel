"use client";

import { Badge } from "@/components/ui/badge";

interface TechStackProps {
  icons: string[];
}

export function TechStack({ icons }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {icons.map((icon) => (
        <Badge key={icon} variant="outline" className="font-mono">
          {icon}
        </Badge>
      ))}
    </div>
  );
}
