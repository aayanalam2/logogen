"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WizardState } from "@/lib/types";

import BusinessInfo from "@/components/steps/BusinessInfo";
import BusinessTypeStep from "@/components/steps/BusinessType";
import AudienceStep from "@/components/steps/Audience";
import ColorThemeStep from "@/components/steps/ColorTheme";
import LogoResult from "@/components/LogoResult";

const INITIAL_STATE: WizardState = {
  businessName: "",
  tagline: "",
  businessType: null,
  audience: null,
  colorTheme: null,
};

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (updates: Partial<WizardState>) =>
    setState((prev) => ({ ...prev, ...updates }));

  const goNext = () => {
    setDir(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setResult(data.image);
      setDir(1);
      setStep(4);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setDir(-1);
    setStep(3);
    setResult(null);
    setError(null);
  };

  const handleReset = () => {
    setDir(-1);
    setStep(0);
    setState(INITIAL_STATE);
    setResult(null);
    setError(null);
  };

  const isResultStep = step === 4;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Wordmark */}
      <div className="px-1">
        <span className="text-white/90 font-semibold text-lg tracking-tight select-none">
          logogen
        </span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.08)]">
        {/* Progress line */}
        {!isResultStep && (
          <div className="flex gap-0.5 px-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 transition-colors duration-300 ${
                  i <= step ? "bg-brand-lavender" : "bg-zinc-100"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="p-8"
          >
            {step === 0 && (
              <BusinessInfo state={state} onChange={update} onNext={goNext} />
            )}
            {step === 1 && (
              <BusinessTypeStep state={state} onChange={update} onNext={goNext} onBack={goBack} />
            )}
            {step === 2 && (
              <AudienceStep state={state} onChange={update} onNext={goNext} onBack={goBack} />
            )}
            {step === 3 && (
              <ColorThemeStep
                state={state}
                onChange={update}
                onGenerate={handleGenerate}
                onBack={goBack}
                loading={loading}
              />
            )}
            {step === 4 && result && (
              <LogoResult
                image={result}
                businessName={state.businessName}
                onRegenerate={handleRegenerate}
                onReset={handleReset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white/90 rounded-xl px-5 py-3.5 text-sm text-zinc-700 flex items-center justify-between gap-4 shadow-sm"
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-zinc-400 hover:text-zinc-600 transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
