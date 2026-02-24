"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
}

export function AnimateOnScroll({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.5,
}: AnimateOnScrollProps) {
  const ref = useRef(null);

  const directionVariants = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={directionVariants[direction]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <AnimateOnScroll direction="none" delay={delay} duration={0.6} className={className}>
      {children}
    </AnimateOnScroll>
  );
}

export function SlideUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <AnimateOnScroll direction="up" delay={delay} duration={0.5} className={className}>
      {children}
    </AnimateOnScroll>
  );
}

export function SlideDown({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <AnimateOnScroll direction="down" delay={delay} duration={0.5} className={className}>
      {children}
    </AnimateOnScroll>
  );
}

export function SlideLeft({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <AnimateOnScroll direction="left" delay={delay} duration={0.5} className={className}>
      {children}
    </AnimateOnScroll>
  );
}

export function SlideRight({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <AnimateOnScroll direction="right" delay={delay} duration={0.5} className={className}>
      {children}
    </AnimateOnScroll>
  );
}
