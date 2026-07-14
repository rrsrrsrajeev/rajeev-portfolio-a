"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function GlowGrid({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-background",
        className
      )}
      style={{
        ["--mouse-x" as any]: "-1000px",
        ["--mouse-y" as any]: "-1000px",
      }}
    >
      {/* ================= LIGHT THEME LAYERS ================= */}
      <div className="dark:hidden">
        {/* Base Grid */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(107, 114, 128) 1.2px, transparent 1.2px),
              linear-gradient(to bottom, rgb(107, 114, 128) 1.2px, transparent 1.2px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Spotlight Grid Highlights */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(147, 51, 234) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgb(147, 51, 234) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(90px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(90px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)",
            opacity: 0.35,
          }}
        />

        {/* Spotlight Backplate Glow */}
        <div
          className="absolute inset-0 blur-2xl"
          style={{
            background: `radial-gradient(
              160px circle at var(--mouse-x) var(--mouse-y),
              rgba(147, 51, 234, 0.16) 0%,
              rgba(59, 130, 246, 0.08) 50%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {/* ================= DARK THEME LAYERS ================= */}
      <div className="hidden dark:block">
        {/* Base Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(156, 163, 175) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(156, 163, 175) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Spotlight Grid Highlights */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(168, 85, 247) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(168, 85, 247) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(90px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(90px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)",
            opacity: 0.25,
          }}
        />

        {/* Spotlight Backplate Glow */}
        <div
          className="absolute inset-0 blur-2xl"
          style={{
            background: `radial-gradient(
              160px circle at var(--mouse-x) var(--mouse-y),
              rgba(168, 85, 247, 0.18) 0%,
              rgba(59, 130, 246, 0.06) 50%,
              transparent 100%
            )`,
          }}
        />
      </div>
    </div>
  );
}
