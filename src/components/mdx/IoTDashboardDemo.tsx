"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Thermometer, Lightbulb, Activity } from "lucide-react";

export function IoTDashboardDemo() {
  const [lightsOn, setLightsOn] = useState(true);
  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(() => Math.round(22 + Math.random() * 4));
      setHumidity(() => Math.round(60 + Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mt-6 bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <h4 className="font-mono text-sm text-muted-foreground mb-4">
          Digital Twin Simulation
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/50">
            <Thermometer
              className={`w-6 h-6 mb-2 ${temperature > 26 ? "text-red-400" : "text-cyan-400"}`}
            />
            <span className="text-2xl font-mono font-bold">{temperature}°C</span>
            <span className="text-xs text-muted-foreground">Temperature</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/50">
            <Activity className="w-6 h-6 mb-2 text-amber-400" />
            <span className="text-2xl font-mono font-bold">{humidity}%</span>
            <span className="text-xs text-muted-foreground">Humidity</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/50">
            <motion.div
              animate={{
                scale: lightsOn ? 1.1 : 1,
                filter: lightsOn ? "drop-shadow(0 0 8px #f59e0b)" : "none",
              }}
            >
              <Lightbulb
                className={`w-6 h-6 mb-2 ${lightsOn ? "text-amber-400" : "text-zinc-600"}`}
              />
            </motion.div>
            <span className="text-lg font-mono font-bold">
              {lightsOn ? "ON" : "OFF"}
            </span>
            <span className="text-xs text-muted-foreground">Living Room</span>
          </div>
        </div>
        <Button
          variant={lightsOn ? "destructive" : "default"}
          className="w-full mt-4"
          onClick={() => setLightsOn(!lightsOn)}
        >
          {lightsOn ? "Turn Off Light" : "Turn On Light"}
        </Button>
      </CardContent>
    </Card>
  );
}
