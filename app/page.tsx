"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wizard from "@/components/Wizard";
import Button from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-dvh bg-[#09090b] flex flex-col relative overflow-hidden">

      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-brand-lavender/[0.07] blur-[180px]" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-sky/[0.04] blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-10 h-14 border-b border-white/[0.04] flex-shrink-0">
        <button
          onClick={() => setStarted(false)}
          className="font-display italic text-white text-xl transition-opacity hover:opacity-70"
          aria-label="Back to home"
        >
          logogen
        </button>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="text-zinc-600 text-[11px] font-mono hidden sm:block">FLUX.1 · Together AI</span>
        </div>
      </header>

      <AnimatePresence mode="wait">

        {/* Landing */}
        {!started && (
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
            className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 text-center pb-[env(safe-area-inset-bottom)]"
          >
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-6 animate-fade-up [animation-delay:0ms]">
              AI logo generator
            </p>
            <h1 className="font-display italic text-[3rem] sm:text-[4.25rem] lg:text-[5.5rem] leading-[0.9] text-white mb-6 animate-fade-up [animation-delay:50ms]">
              Brand identity,<br />
              <span className="text-brand-lavender">in seconds.</span>
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-xs mb-10 animate-fade-up [animation-delay:100ms]">
              Answer four questions. Get a professional logo tailored to your brand.
            </p>
            <div className="animate-fade-up [animation-delay:150ms]">
              <Button size="lg" onClick={() => setStarted(true)} className="px-8">
                Create your logo →
              </Button>
            </div>
          </motion.main>
        )}

        {/* Wizard */}
        {started && (
          <motion.main
            key="wizard"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="relative z-10 flex-1 flex items-start sm:items-center justify-center px-5 sm:px-10 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
          >
            <div className="w-full max-w-sm">
              <Wizard />
            </div>
          </motion.main>
        )}

      </AnimatePresence>
    </div>
  );
}
