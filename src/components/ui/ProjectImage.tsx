"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface ProjectImageProps {
  src: string;
  alt: string;
  isMobile?: boolean;
}

export function ProjectImage({ src, alt, isMobile }: ProjectImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span
        className={`group cursor-pointer rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm inline-block align-top p-3 sm:p-4 hover:border-primary/30 transition-all duration-300 ${isMobile ? 'w-[140px] sm:w-[220px] m-2' : 'w-full mx-auto block my-8'
          }`}
        onClick={() => setIsOpen(true)}
      >
        <span className="relative overflow-hidden rounded-lg w-full h-full block">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover !m-0 block transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="flex items-center gap-2 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <ZoomIn className="w-4 h-4" /> View
            </span>
          </span>
        </span>
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 text-foreground/80 hover:text-foreground bg-card/50 hover:bg-card p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.span
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] w-full flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
              />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}
