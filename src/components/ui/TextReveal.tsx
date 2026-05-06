"use client";

import React, { useEffect, useRef } from "react";
import { animate, createScope, splitText, stagger } from "animejs";

interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className }) => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);

  useEffect(() => {
    if (!root.current) return;

    // Membuat scope khusus untuk elemen ini agar clean-up mudah
    scope.current = createScope({ root: root.current }).add(() => {
      
      // Memecah teks menjadi kata-kata (words)
      const split = splitText('.reveal-text');

      // Animasi sinematik (muncul perlahan dari bawah ke atas)
      animate(split.words, {
        opacity: [0, 1],
        translateY: [20, 0],
        rotateX: [90, 0], // Efek sedikit berputar 3D
        duration: 1200,
        delay: stagger(150), // Jeda antar kata
        ease: 'outExpo'
      });
    });

    return () => {
      if (scope.current) {
        scope.current.revert(); // Membersihkan memori dan DOM saat komponen unmount
      }
    };
  }, [text]);

  return (
    <div ref={root} className={className}>
      <span className="reveal-text inline-block" style={{ perspective: '1000px' }}>
        {text}
      </span>
    </div>
  );
};
