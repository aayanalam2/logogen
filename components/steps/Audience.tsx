"use client";

import { AUDIENCES, Audience, WizardState } from "@/lib/types";
import Button from "@/components/ui/Button";

interface AudienceProps {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AudienceStep({ state, onChange, onNext, onBack }: AudienceProps) {
  const canContinue = state.audience !== null;

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Step 3 of 4</p>
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">Who is this brand for?</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {AUDIENCES.map((aud) => {
          const selected = state.audience === aud.value;
          return (
            <button
              key={aud.value}
              onClick={() => onChange({ audience: aud.value as Audience })}
              className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-150 ${
                selected
                  ? "border-2 border-brand-lavender bg-brand-lavender/5 text-zinc-900"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-800"
              }`}
            >
              {aud.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={onBack} size="lg" className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} disabled={!canContinue} size="lg" className="flex-[2]">
          Continue
        </Button>
      </div>
    </div>
  );
}
