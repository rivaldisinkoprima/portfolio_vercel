"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import robotAnimation from "@/../public/lottie/robot.json";

interface LottieRobotProps {
  width?: number;
  height?: number;
  className?: string;
}

export function LottieRobot({ width = 48, height = 48, className }: LottieRobotProps) {
  return (
    <Lottie
      animationData={robotAnimation}
      loop={true}
      autoplay={true}
      renderer="svg"
      style={{ width, height, background: "transparent" }}
      className={`!bg-transparent ${className || ""}`}
    />
  );
}
