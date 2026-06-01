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
    <div className="flex flex-col gap-10">
      <h2 className="font-display italic text-[1.75rem] leading-tight text-white">
        Colour palette
      </h2>

      <div className="flex flex-col divide-y divide-zinc-900">
        {COLOR_THEMES.map((theme) => {
          const isSelected = state.colorTheme?.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onChange({ colorTheme: theme as ColorTheme })}
              className={`flex items-center gap-4 py-4 text-left transition-all duration-150 ${
                isSelected ? "" : "hover:bg-white/[0.02] -mx-2 px-2 rounded"
              }`}
            >
              {/* Tall swatch strip */}
              <div className="flex gap-0.5 rounded overflow-hidden flex-shrink-0">
                {theme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-none ${
                  isSelected ? "text-white" : "text-zinc-400"
                }`}>{theme.name}</p>
                <p className={`text-xs mt-1.5 leading-snug ${
                  isSelected ? "text-zinc-500" : "text-zinc-700"
                }`}>{theme.description}</p>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                isSelected ? "bg-brand-lavender" : "bg-transparent"
              }`} />
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} size="lg" disabled={loading}>Back</Button>
        <Button
          onClick={onGenerate}
          disabled={!canGenerate}
          loading={loading}
          size="lg"
          className="flex-1"
        >
          {loading ? "Generating" : "Generate"}
        </Button>
      </div>
    </div>
  );
}
