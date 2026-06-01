"use client";

import { COLOR_THEMES, ColorTheme, WizardState } from "@/lib/types";
import Button from "@/components/ui/Button";

interface ColorThemeStepProps {
  state: WizardState;
  onChange: (updates: Partial<WizardState>) => void;
  onGenerate: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function ColorThemeStep({
  state,
  onChange,
  onGenerate,
  onBack,
  loading,
}: ColorThemeStepProps) {
  const canGenerate = state.colorTheme !== null;

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">Step 4 of 4</p>
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">Pick a colour palette</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {COLOR_THEMES.map((theme) => {
          const isSelected = state.colorTheme?.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onChange({ colorTheme: theme as ColorTheme })}
              className={`relative rounded-lg p-3.5 text-left transition-all duration-150 ${
                isSelected
                  ? "border-2 border-brand-lavender bg-brand-lavender/5"
                  : "border border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              {/* Swatch strip */}
              <div className="flex gap-0.5 mb-3 rounded overflow-hidden">
                {theme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="h-5 flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className={`text-sm font-medium leading-none ${
                isSelected ? "text-zinc-900" : "text-zinc-700"
              }`}>{theme.name}</p>
              <p className="text-xs text-zinc-400 mt-1">{theme.description}</p>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={onBack} size="lg" className="flex-1" disabled={loading}>
          Back
        </Button>
        <Button
          onClick={onGenerate}
          disabled={!canGenerate}
          loading={loading}
          size="lg"
          className="flex-[2]"
        >
          {loading ? "Generating" : "Generate logo"}
        </Button>
      </div>
    </div>
  );
}
