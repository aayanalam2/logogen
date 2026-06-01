"use client";

import { BUSINESS_TYPES, BusinessType, WizardState } from "@/lib/types";
import Button from "@/components/ui/Button";

interface BusinessTypeProps {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BusinessTypeStep({ state, onChange, onNext, onBack }: BusinessTypeProps) {
  const canContinue = state.businessType !== null;

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Step 2 of 4</p>
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">What industry are you in?</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {BUSINESS_TYPES.map((type) => {
          const selected = state.businessType === type.value;
          return (
            <button
              key={type.value}
              onClick={() => onChange({ businessType: type.value as BusinessType })}
              className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-150 ${
                selected
                  ? "border-2 border-brand-lavender bg-brand-lavender/5 text-zinc-900"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-800"
              }`}
            >
              {type.label}
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
