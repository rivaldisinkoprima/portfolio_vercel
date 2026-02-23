"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Instagram, Linkedin, Send, Award, X, Phone } from "lucide-react";
import Image from "next/image";
import { Certificate } from "@/lib/certificates";

interface ContactProps {
  serverCertificates: Certificate[];
}

const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];
const MAX_CERTIFICATES = 20;

export function Contact({ serverCertificates }: ContactProps) {
  const [certificates, setCertificates] = useState<Certificate[]>(serverCertificates);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const detected: Certificate[] = [];

    const checkImage = (id: number, ext: string): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const img = new window.Image();
        const src = `/certificate${id}.${ext}`;
        img.onload = () => {
          if (img.width > 0) resolve(true);
          else resolve(false);
        };
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    const runDetection = async () => {
      for (let i = 1; i <= MAX_CERTIFICATES; i++) {
        for (const ext of SUPPORTED_EXTENSIONS) {
          const exists = await checkImage(i, ext);
          if (exists) {
            detected.push({
              id: i,
              filename: `certificate${i}.${ext}`,
              src: `/certificate${i}.${ext}`,
              extension: ext,
            });
            break;
          }
        }
      }
      setCertificates(detected);
      setIsLoaded(true);
    };

    runDetection();
  }, []);

  const duplicatedCerts = useMemo(() => {
    if (certificates.length === 0) return [];
    return [...certificates, ...certificates, ...certificates, ...certificates, ...certificates];
  }, [certificates]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const itemWidth = 100 / 3;

  return (
    <section className="py-16">
      {duplicatedCerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold">Certificates</h2>
            <span className="text-sm text-muted-foreground">({certificates.length})</span>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex w-[500%] animate-marquee-certs"
              style={{
                animationPlayState: isLoaded ? 'running' : 'paused'
              }}
            >
              {duplicatedCerts.map((cert, index) => (
                <div
                  key={`${cert.id}-${index}`}
                  className="px-2"
                  style={{ width: `${itemWidth}%` }}
                >
                  <motion.div
                    className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox((cert.id - 1) % certificates.length)}
                  >
                    <Image
                      src={cert.src}
                      alt={`Certificate ${cert.id} - Professional Certification`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-background text-sm font-medium">View</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-card to-card/50 border-border">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com/rivaldiekaptr" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/rivaldiekaputr/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:rivaldiekaputr@gmail.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://wa.me/62895616181056" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                </a>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="mailto:rivaldiekaputr@gmail.com">
                  <Send className="w-4 h-4 mr-2" />
                  Get in Touch
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && certificates[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 text-foreground hover:text-muted-foreground p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={certificates[lightboxIndex].src}
                alt={`Certificate ${certificates[lightboxIndex].id} - Professional Certification Full View`}
                width={1200}
                height={900}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground text-sm bg-card/80 px-4 py-2 rounded-full">
                {lightboxIndex + 1} / {certificates.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
