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
    <div className="flex flex-col gap-7 sm:gap-10">
      <h2 className="font-display italic text-[1.75rem] leading-tight text-white">
        Who is this for?
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {AUDIENCES.map((aud) => {
          const selected = state.audience === aud.value;
          return (
            <button
              key={aud.value}
              onClick={() => onChange({ audience: aud.value as Audience })}
              className={`text-left text-sm py-3 px-2 rounded transition-all duration-150 ${
                selected
                  ? "text-white shadow-[inset_2px_0_0_#9FA1FF] bg-white/[0.04]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {aud.label}
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
