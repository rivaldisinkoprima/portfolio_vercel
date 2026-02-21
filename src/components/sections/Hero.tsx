"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center relative overflow-hidden w-full py-12 md:py-0">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-background z-0 overflow-hidden">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight className="top-28 left-40 md:left-80" fill="blue" />
        <div className="absolute h-full w-full bg-background bg-grid-pattern flex items-center justify-center top-0 left-0">
          <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xs md:text-sm font-bold text-cyan-400/80 uppercase tracking-widest mb-4">
                Dynamic Web Portfolio
              </h2>

              <TextGenerateEffect
                words="Building Intelligent Systems for the Future"
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
              />

              <p className="text-zinc-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="text-cyan-400 font-semibold">
                  Rivaldi Eka Putra
                </span>
                . A Polyglot Engineer crafting solutions at the intersection of{" "}
                <span className="text-purple-400 font-medium">AI</span>,{" "}
                <span className="text-amber-400 font-medium">IoT</span>, and{" "}
                <span className="text-indigo-400 font-medium">Web</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
                <Link
                  href="/projects"
                  className="relative inline-flex h-12 w-full sm:w-auto overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 group"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#818cf8_50%,#22d3ee_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2 transition-all group-hover:bg-slate-950/80">
                    See My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center rounded-full border border-zinc-700 bg-transparent text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  Contact Me
                </Link>
              </div>

              <div className="flex gap-6 mt-10 justify-center md:justify-start items-center">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/rivaldiekaputr/" },
                  { icon: Mail, href: "mailto:hello@example.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative max-w-[280px] sm:max-w-md w-full shrink-0"
          >
            <div className="relative w-full aspect-square mx-auto">
              <div className="relative w-full h-full rounded-full border-[1px] border-zinc-800/80 p-2 overflow-hidden bg-zinc-900/30 backdrop-blur-md shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
                  <Image
                    src="/profile.jpg"
                    alt="Rivaldi Eka Putra"
                    fill
                    className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2 md:-top-6 md:-right-6 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-2.5 sm:p-3 rounded-2xl shadow-xl flex items-center gap-2 z-20"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono text-zinc-300 whitespace-nowrap">
                  Open to Work
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-2 -left-2 md:-bottom-6 md:-left-6 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-2.5 sm:p-3 rounded-2xl shadow-xl z-20"
              >
                <span className="text-[10px] sm:text-xs font-mono text-cyan-400 whitespace-nowrap">
                  Full Stack Engineer
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
