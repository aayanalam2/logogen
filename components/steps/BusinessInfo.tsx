"use client";

import { WizardState } from "@/lib/types";
import Button from "@/components/ui/Button";

interface BusinessInfoProps {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onNext: () => void;
}

export default function BusinessInfo({ state, onChange, onNext }: BusinessInfoProps) {
  const canContinue = state.businessName.trim().length > 0;

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Step 1 of 4</p>
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">What&apos;s your business called?</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-500" htmlFor="biz-name">
            Business name
          </label>
          <input
            id="biz-name"
            type="text"
            value={state.businessName}
            onChange={(e) => onChange({ businessName: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && canContinue && onNext()}
            placeholder="Acme, Luminary, Pulse…"
            maxLength={60}
            className="border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-300 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/20 transition-all"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-500" htmlFor="tagline">
            Tagline <span className="text-zinc-300 font-normal">(optional)</span>
          </label>
          <input
            id="tagline"
            type="text"
            value={state.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && canContinue && onNext()}
            placeholder="Built for tomorrow"
            maxLength={80}
            className="border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-300 outline-none focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/20 transition-all"
          />
        </div>
      </div>

      <Button onClick={onNext} disabled={!canContinue} size="lg" className="w-full">
        Continue
      </Button>
    </div>
  );
}
