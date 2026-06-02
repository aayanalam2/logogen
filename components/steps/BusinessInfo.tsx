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
    <div className="flex flex-col gap-7 sm:gap-10">
      <h2 className="font-display italic text-[1.75rem] leading-tight text-white">
        What&apos;s the name?
      </h2>

      <div className="flex flex-col gap-5 sm:gap-7">
        <div className="flex flex-col gap-2.5">
          <label
            className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
            htmlFor="biz-name"
          >
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
            className="bg-transparent border-b border-zinc-800 focus:border-brand-lavender pb-2.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-zinc-700"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
            htmlFor="tagline"
          >
            Tagline{" "}
            <span className="normal-case tracking-normal text-zinc-700">(optional)</span>
          </label>
          <input
            id="tagline"
            type="text"
            value={state.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && canContinue && onNext()}
            placeholder="Built for tomorrow"
            maxLength={80}
            className="bg-transparent border-b border-zinc-800 focus:border-brand-lavender pb-2.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-zinc-700"
          />
        </div>
      </div>

      <Button onClick={onNext} disabled={!canContinue} size="lg" className="w-full">
        Continue
      </Button>
    </div>
  );
}
