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
      <div
        className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md border border-border/50 inline-block align-top m-2 ${isMobile ? 'w-[140px] sm:w-[220px]' : 'w-[calc(100%-1rem)] max-w-3xl mx-auto block'
          }`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <ZoomIn className="w-4 h-4" /> View
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
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

            <motion.div
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
