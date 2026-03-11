"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { LottieRobot } from "@/components/LottieRobot";

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
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
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

      const data = await response.json();

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

  const userMessageCount = messages.filter((m) => m.id !== "welcome" && m.role === "user").length;
  const isAtLimit = userMessageCount >= MAX_SESSION_MESSAGES;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-1 sm:right-6 z-50",
          "h-14 w-14 sm:h-[140px] sm:w-[140px]",
          "hover:scale-110 transition-transform duration-200 cursor-pointer",
          isOpen && "hidden",
        )}
        style={{ backgroundColor: "transparent" }}
      >
        <LottieRobot className="hidden sm:block" width={140} height={140} />
        <LottieRobot className="block sm:hidden" width={56} height={56} />
      </button>

      <div
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
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
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
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div className="flex gap-2">
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
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
