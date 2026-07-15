"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mail, Phone, Info } from "lucide-react";
import { Icons } from "@/components/icons";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isContactCard?: boolean;
}

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "bot",
      text: "Hi! I am Rajeev's AI Assistant. How can I help you today?",
      timestamp: new Date(),
    },
    {
      id: "init-2",
      sender: "bot",
      text: "Please note: My chat integration is currently under development. To connect with Rajeev directly, you can reach out via these channels:",
      timestamp: new Date(),
      isContactCard: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("toggle-chat", handleToggle);
    return () => {
      window.removeEventListener("toggle-chat", handleToggle);
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate server response after 1s
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: `reply-${Date.now()}`,
        sender: "bot",
        text: "Thanks for reaching out! Since the chat server is under construction, your message could not be sent to my server. Please reach out to me directly at RRSRRSrajeev@gmail.com or call/message at +918541849528.",
        timestamp: new Date(),
        isContactCard: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button - Hidden on mobile view */}
      <div className="hidden md:block fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center size-14 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-xl focus:outline-none transition-shadow z-50 border border-white/20"
          aria-label="Open chat assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="size-6" />
                {/* Pulsing indicator badge */}
                <span className="absolute -top-1.5 -right-1.5 flex size-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-3 bg-emerald-500 border border-white dark:border-black"></span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 sm:bottom-28 sm:right-8 w-[calc(100vw-3rem)] sm:w-[380px] h-[480px] sm:h-[520px] rounded-2xl border border-purple-500/20 dark:border-purple-500/10 shadow-2xl backdrop-blur-md bg-white/95 dark:bg-zinc-950/95 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-4 py-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                    RR
                  </div>
                  <span className="absolute bottom-0 right-0 flex size-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2.5 bg-emerald-400 border border-purple-600"></span>
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide">Rajeev's Assistant</h3>
                  <p className="text-[10px] text-purple-100 flex items-center">
                    <span className="inline-block size-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                    Online • AI Agent
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors focus:outline-none"
                aria-label="Close chat window"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans select-text">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <div
                    className={`flex flex-col space-y-1 max-w-[82%] ${
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white rounded-tr-none shadow-md"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-200/50 dark:border-zinc-700/50"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Contact details card helper */}
                    {msg.isContactCard && (
                      <div className="w-full mt-2 p-3 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 dark:from-purple-500/10 dark:to-blue-500/5 border border-purple-500/20 dark:border-purple-500/15 rounded-xl space-y-2.5 shadow-sm">
                        <div className="flex items-center text-xs text-purple-600 dark:text-purple-400 font-semibold gap-1.5">
                          <Info className="size-3.5" />
                          <span>Direct Channels</span>
                        </div>
                        <div className="space-y-2 text-xs font-medium">
                          <a
                            href="mailto:RRSRRSrajeev@gmail.com"
                            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1.5 bg-white/50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200/40 dark:border-zinc-800/40"
                          >
                            <Mail className="size-3.5 text-purple-500" />
                            <span>RRSRRSrajeev@gmail.com</span>
                          </a>
                          <a
                            href="tel:+918541849528"
                            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1.5 bg-white/50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200/40 dark:border-zinc-800/40"
                          >
                            <Phone className="size-3.5 text-purple-500" />
                            <span>+91 85418 49528</span>
                          </a>
                          <a
                            href="https://wa.me/918541849528"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1.5 bg-white/50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200/40 dark:border-zinc-800/40"
                          >
                            <Icons.whatsapp className="size-3.5 text-emerald-500" />
                            <span>WhatsApp Chat (+91 85418 49528)</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator bubble */}
              {isTyping && (
                <div className="flex items-center space-x-2 mr-auto max-w-[80%]">
                  <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 px-4 py-3 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 dark:focus:ring-purple-500/30 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="size-9 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
