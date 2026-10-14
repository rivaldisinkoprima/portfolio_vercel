"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Mascot } from "@/components/Mascot";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MAX_SESSION_MESSAGES = 20;
const STORAGE_KEY = "portfolio-chat-messages";
const SESSION_ID_KEY = "portfolio-chat-session";

const DEFAULT_WELCOME = "Halo! Saya asisten portfolio Rivaldi. Ada yang bisa saya bantu?";

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [errorCount, setErrorCount] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);

  // Reaksi maskot header yang dipicu peristiwa chat (lihat pemetaan di pemakaian).
  const [mascotTrigger, setMascotTrigger] = useState<{
    reaction: "blink" | "heart" | "sparkle" | "surprised" | "wink" | "bashful" | "sleepy" | "dizzy" | "delighted";
    stamp: number;
  } | null>(null);
  const reactHeaderMascot = (
    reaction: "blink" | "heart" | "sparkle" | "surprised" | "wink" | "bashful" | "sleepy" | "dizzy" | "delighted",
  ) => {
    setMascotTrigger({ reaction, stamp: Date.now() });
  };

  // Maskot floating ikut bereaksi (pejam senang) setiap pengguna mengklik
  // di mana pun di halaman. Klik pada maskot itu sendiri dikecualikan
  // (sudah ditangani boop internalnya) dan listener nonaktif saat panel
  // chat terbuka (maskot floating tersembunyi).
  const [floatingTrigger, setFloatingTrigger] = useState<{
    reaction: "blink";
    stamp: number;
  } | null>(null);
  useEffect(() => {
    if (isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (triggerRef.current?.contains(e.target as Node)) return;
      setFloatingTrigger({ reaction: "blink", stamp: Date.now() });
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  // Panel dibuka -> maskot header menyambut dengan kilau emas.
  const wasOpenForMascotRef = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpenForMascotRef.current) {
      reactHeaderMascot("sparkle");
    }
    wasOpenForMascotRef.current = isOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedSession = localStorage.getItem(SESSION_ID_KEY);
    const currentSession = storedSession || Date.now().toString();
    
    if (!storedSession) {
      localStorage.setItem(SESSION_ID_KEY, currentSession);
    }
    setSessionId(currentSession);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([{
            id: "welcome",
            role: "assistant",
            content: DEFAULT_WELCOME,
          }]);
        }
      } catch {
        setMessages([{
          id: "welcome",
          role: "assistant",
          content: DEFAULT_WELCOME,
        }]);
      }
    } else {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: DEFAULT_WELCOME,
      }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Manajemen fokus dialog (aksesibilitas): fokus masuk ke textarea saat
  // dibuka, Tab/Shift+Tab terjebak di dalam dialog, Escape menutup dialog,
  // dan fokus dikembalikan ke tombol pemicu saat dialog ditutup.
  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        triggerRef.current?.querySelector("button")?.focus();
      }
      return;
    }
    wasOpenRef.current = true;

    const dialog = dialogRef.current;
    const focusTimer = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    dialog?.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      dialog?.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const clearChat = () => {
    const newSessionId = Date.now().toString();
    localStorage.setItem(SESSION_ID_KEY, newSessionId);
    setSessionId(newSessionId);
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: DEFAULT_WELCOME,
    }]);
    setErrorCount(0);
    setIsCooldown(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{
      id: "welcome",
      role: "assistant",
      content: DEFAULT_WELCOME,
    }]));
    reactHeaderMascot("bashful");
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isCooldown) return;

    const userMessages = messages.filter((m) => m.id !== "welcome");
    if (userMessages.length >= MAX_SESSION_MESSAGES) {
      const warningMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Percakapan kita sudah mencapai batas maksimal. Klik tombol sampah (🗑️) untuk memulai percakapan baru ya!",
      };
      setMessages((prev) => [...prev, warningMessage]);
      reactHeaderMascot("sleepy");
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    reactHeaderMascot("wink");
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    const callChatApi = async () => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages
            .filter((m) => m.id !== "welcome")
            .concat(userMessage)
            .map((m) => ({ role: m.role, content: m.content })),
          sessionId,
        }),
      });
      return { response: res, data: await res.json() };
    };

    try {
      let chatResult: { response: Response; data: any };
      try {
        chatResult = await callChatApi();
      } catch {
        // Ulangi sekali untuk kegagalan jaringan sesaat.
        await new Promise((r) => setTimeout(r, 800));
        chatResult = await callChatApi();
      }
      const { response, data } = chatResult;

      setIsTyping(false);

      if (!response.ok) {
        const newErrorCount = errorCount + 1;
        setErrorCount(newErrorCount);

        if (newErrorCount >= 3) {
          setIsCooldown(true);
          const cooldownMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Maaf, saya sedang perlu istirahat sejenak karena ada kesalahan terlalu banyak. Silakan coba lagi dalam 1 menit ya!",
          };
          setMessages((prev) => [...prev, cooldownMessage]);
          reactHeaderMascot("sleepy");

          setTimeout(() => {
            setIsCooldown(false);
            setErrorCount(0);
          }, 60000);
        } else {
          let errorMsg = "Maaf, terjadi kesalahan. Silakan coba lagi.";
          
          if (data.error) {
            if (data.error.includes("rate") || data.error.includes("429")) {
              errorMsg = "Wah, kamu terlalu banyak bicara! Saya perlu istirahat sebentar. Coba lagi dalam 1 menit ya!";
            } else if (data.error.includes("panjang")) {
              errorMsg = "Maaf, pesanmu terlalu panjang! Boleh lebih singkat? Maksimal 500 karakter.";
            } else if (data.error.includes("duplikat")) {
              errorMsg = "Pesan yang sama sudah ada! Coba yang lain donk 😊";
            }
          }

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: errorMsg,
          };
          setMessages((prev) => [...prev, assistantMessage]);
          reactHeaderMascot("surprised");
        }
        setIsLoading(false);
        return;
      }

      setErrorCount(0);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      reactHeaderMascot("delighted");
    } catch (err) {
      void err;
      setIsTyping(false);
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Maaf, terjadi kesalahan koneksi. Silakan coba lagi ya!",
      };
      setMessages((prev) => [...prev, errorMessage]);
      reactHeaderMascot("dizzy");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Klik maskot: biarkan animasi "boop" bermain dulu (~450ms), baru buka chat.
  const handleMascotClick = () => {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setIsOpen(true), 450);
  };

  useEffect(() => {
    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    };
  }, []);

  const userMessageCount = messages.filter((m) => m.id !== "welcome" && m.role === "user").length;
  const isAtLimit = userMessageCount >= MAX_SESSION_MESSAGES;

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleMascotClick}
        title="Chat dengan asisten AI"
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-1 sm:right-6 z-50",
          "hover:scale-105 transition-transform duration-200",
          isOpen && "hidden",
        )}
      >
        <div className="hidden sm:block">
          <Mascot
            directions="/mascots/rivaldi-directions.webp"
            reactions="/mascots/rivaldi-reactions.webp"
            size={140}
            label="Rivaldi"
            clickReaction="blink"
            trigger={floatingTrigger}
          />
        </div>
        <div className="block sm:hidden">
          <Mascot
            directions="/mascots/rivaldi-directions.webp"
            reactions="/mascots/rivaldi-reactions.webp"
            size={64}
            label="Rivaldi"
            clickReaction="blink"
            trigger={floatingTrigger}
          />
        </div>
      </div>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Asisten AI"
        data-lenis-prevent
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50",
          "w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-3rem)]",
          "bg-background border rounded-2xl shadow-2xl flex flex-col",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen
            ? "h-[calc(100vh-6rem)] sm:h-[500px] opacity-100 translate-y-0"
            : "h-0 opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="-my-1">
              <Mascot
                directions="/mascots/rivaldi-directions.webp"
                reactions="/mascots/rivaldi-reactions.webp"
                size={48}
                label="Rivaldi"
                trigger={mascotTrigger}
                followCursor={false}
              />
            </div>
            <span className="font-semibold text-sm">AI Assistant</span>
            {isAtLimit && (
              <span className="text-xs text-orange-500">(Batas tercapai)</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearChat}
              title="Hapus chat"
              aria-label="Hapus percakapan"
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Tutup chat">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4"
          data-lenis-prevent
          role="log"
          aria-live="polite"
          aria-label="Riwayat percakapan"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.role === "user" && "flex-row-reverse",
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                {message.role === "user" ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 max-w-[80%] text-sm prose prose-sm dark:prose-invert",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm",
                )}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2" aria-hidden="true">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="bg-muted text-foreground rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span
                      className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Mengetik...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Ketik pesan untuk asisten AI"
              placeholder={
                isCooldown 
                  ? "Sedang cooldown..." 
                  : isAtLimit 
                    ? "Chat sudah penuh, klik 🗑️ untuk baru" 
                    : "Ketik pesan..."
              }
              className="min-h-[44px] max-h-32 resize-none"
              disabled={isLoading || isCooldown || isAtLimit}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim() || isCooldown || isAtLimit}
              size="icon"
              aria-label="Kirim pesan"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {userMessageCount}/{MAX_SESSION_MESSAGES} pesan
          </div>
        </div>
      </div>
    </>
  );
}
