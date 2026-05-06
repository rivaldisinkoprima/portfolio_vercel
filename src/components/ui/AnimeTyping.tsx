"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

interface AnimeTypingProps {
  words: string[];
  className?: string;
}

export const AnimeTyping: React.FC<AnimeTypingProps> = ({ words, className }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    let currentIndex = 0;
    
    const target = {
      textLength: 0,
    };

    let animationInstance: any;

    const typeWord = () => {
      const currentWord = words[currentIndex];
      
      animationInstance = animate(target, {
        textLength: currentWord.length,
        round: 1,
        ease: 'linear',
        duration: currentWord.length * 100, // Kecepatan mengetik
        update: () => {
          if (textRef.current) {
            textRef.current.textContent = currentWord.substring(0, target.textLength);
          }
        },
        complete: () => {
          // Jeda sebelum menghapus
          setTimeout(() => {
            deleteWord(currentWord);
          }, 2000);
        }
      });
    };

    const deleteWord = (currentWord: string) => {
      animationInstance = animate(target, {
        textLength: 0,
        round: 1,
        ease: 'linear',
        duration: currentWord.length * 50, // Kecepatan menghapus (lebih cepat)
        update: () => {
          if (textRef.current) {
            textRef.current.textContent = currentWord.substring(0, target.textLength);
          }
        },
        complete: () => {
          currentIndex = (currentIndex + 1) % words.length;
          // Jeda singkat sebelum mengetik kata selanjutnya
          setTimeout(typeWord, 500);
        }
      });
    };

    typeWord();

    return () => {
      if (animationInstance && typeof animationInstance.pause === 'function') {
        animationInstance.pause();
      }
    };
  }, [words]);

  return (
    <span className={className}>
      <span ref={textRef}></span>
      <span className="inline-block w-[3px] h-[1.2em] bg-primary animate-pulse align-middle ml-1.5 -translate-y-[10%]"></span>
    </span>
  );
};
