"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Phone } from "lucide-react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "@/components/icons";

export default function Navbar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => {
            if (name === "Contact") {
              return (
                <DockIcon key={name} className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const isMobile = window.innerWidth < 768;
                          if (isMobile) {
                            window.dispatchEvent(new Event("toggle-chat"));
                          } else {
                            setIsPopoverOpen((prev) => !prev);
                          }
                        }}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12"
                        )}
                      >
                        <social.icon className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Glassmorphic Contact Popover for Desktop */}
                  <AnimatePresence>
                    {isPopoverOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl border border-purple-500/20 dark:border-zinc-800 shadow-2xl backdrop-blur-md bg-white/95 dark:bg-zinc-950/95 flex flex-col space-y-2 text-xs z-50 pointer-events-auto"
                      >
                        <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-1 flex items-center justify-between">
                          <span>Contact Me</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPopoverOpen(false);
                            }}
                            className="hover:text-zinc-500 dark:hover:text-zinc-300 p-0.5 rounded"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                        <a
                          href="mailto:rrsrrsrajeev@gmail.com"
                          className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200/30 dark:border-zinc-800/30"
                        >
                          <Mail className="size-3.5 text-purple-500" />
                          <span>Email</span>
                        </a>
                        <a
                          href="tel:+918541849528"
                          className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200/30 dark:border-zinc-800/30"
                        >
                          <Phone className="size-3.5 text-purple-500" />
                          <span>+91 85418 49528</span>
                        </a>
                        <a
                          href="https://wa.me/918541849528"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200/30 dark:border-zinc-800/30"
                        >
                          <Icons.whatsapp className="size-3.5 text-emerald-500" />
                          <span>WhatsApp Chat</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </DockIcon>
              );
            }
            return (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
