"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Loader2 } from "lucide-react";

const sampleResponses = [
  "Based on the error message, it seems like there's a connection timeout. Try increasing the request timeout in your configuration.",
  "The issue might be related to the environment variables. Make sure all required variables are set in your .env file.",
  "This is a common TypeScript error. You can fix it by adding proper type annotations to your function parameters.",
];

export function AIDemo() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResponse(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResponse(sampleResponses[Math.floor(Math.random() * sampleResponses.length)]);
    setIsLoading(false);
  };

  return (
    <Card className="mt-6 bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <h4 className="font-mono text-sm text-muted-foreground mb-4 flex items-center gap-2">
          <Bot className="w-4 h-4" />
          Interactive Playground
        </h4>
        <Textarea
          placeholder="Ask a technical question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px] bg-zinc-800 border-zinc-700 font-mono text-sm"
        />
        <Button
          className="w-full mt-3"
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Ask AI
            </>
          )}
        </Button>
        {response && (
          <div className="mt-4 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
            <p className="text-sm text-cyan-400 font-mono">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
