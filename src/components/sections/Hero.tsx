"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-background z-0">
        <Spotlight
          className="-top-40 left-0 md:-left-20 md:-top-20 h-screen w-[80vw]"
          fill="white"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
        <div className="absolute h-full w-full bg-background bg-grid-pattern flex items-center justify-center top-0 left-0">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 md:pt-40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xs md:text-sm font-bold text-blue-100 uppercase tracking-widest mb-4">
                Dynamic Web Portfolio
              </h2>

              <TextGenerateEffect
                words="Building Intelligent Systems for the Future"
                className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
              />

              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="text-cyan-400 font-semibold">
                  Rivaldi Eka Putra
                </span>
                . A Polyglot Engineer crafting solutions at the intersection of{" "}
                <span className="text-purple-400">AI</span>,{" "}
                <span className="text-amber-400">IoT</span>, and{" "}
                <span className="text-indigo-400">Web</span>.
              </p>

              <div className="flex flex-col md:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
                <Link
                  href="/projects"
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                    See My Work <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Contact Me
                </Link>
              </div>

              <div className="flex gap-6 mt-8 justify-center md:justify-start">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Mail, href: "mailto:hello@example.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
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
            className="flex-1 relative max-w-md w-full"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="relative w-full h-full rounded-full border-2 border-zinc-800 p-2 overflow-hidden bg-zinc-900/50 backdrop-blur-sm">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/profile.jpg"
                    alt="Rivaldi Eka Putra"
                    fill
                    className="object-cover"
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
                className="absolute -top-4 -right-4 bg-zinc-900 border border-zinc-700 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-zinc-300">
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
                className="absolute -bottom-4 -left-4 bg-zinc-900 border border-zinc-700 p-3 rounded-xl shadow-xl z-20"
              >
                <span className="text-xs font-mono text-cyan-400">
                  Full Stack
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
