"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function GlassCard({ children, className = "", onClick, selected }: GlassCardProps) {
  const selectedStyles = selected
    ? "ring-2 ring-white/70 bg-white/35 border-white/60 shadow-[0_8px_40px_rgba(159,161,255,0.35)]"
    : "glass glass-hover";

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 transition-all duration-200 ${selectedStyles} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
