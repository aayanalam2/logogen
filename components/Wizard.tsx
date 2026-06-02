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
    <div className="w-full">
      {/* Step counter */}
      {!isResultStep && (
        <div className="flex justify-end mb-6 sm:mb-10">
          <span className="font-mono text-[11px] text-zinc-700 tabular-nums">
            {String(step + 1).padStart(2, "0")} / 04
          </span>
        </div>
      )}

      {/* Progress hairline */}
      {!isResultStep && (
        <div className="flex gap-1 mb-8 sm:mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-px flex-1 transition-colors duration-500 ${
                i <= step ? "bg-brand-lavender" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
      )}

      {/* Animated step content */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
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

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-400 flex items-center justify-between gap-4"
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-zinc-600 hover:text-zinc-400 transition-colors flex-shrink-0"
              aria-label="Dismiss error"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
