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
    <div className="flex flex-col gap-10">
      <h2 className="font-display italic text-[1.75rem] leading-tight text-white">
        What&apos;s your industry?
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        {BUSINESS_TYPES.map((type) => {
          const selected = state.businessType === type.value;
          return (
            <button
              key={type.value}
              onClick={() => onChange({ businessType: type.value as BusinessType })}
              className={`text-left text-sm py-2.5 px-2 rounded transition-all duration-150 ${
                selected
                  ? "text-white shadow-[inset_2px_0_0_#9FA1FF] bg-white/[0.04]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} size="lg">Back</Button>
        <Button onClick={onNext} disabled={!canContinue} size="lg" className="flex-1">Continue</Button>
      </div>
    </div>
  );
}
