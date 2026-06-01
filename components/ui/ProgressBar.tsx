"use client";

const STEP_LABELS = ["Business", "Industry", "Audience", "Colors"];

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-white text-indigo-700 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                    : isActive
                    ? "bg-white/30 border-2 border-white text-white"
                    : "bg-white/10 border border-white/30 text-white/40"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-all duration-300 ${
                  isActive ? "text-white" : isCompleted ? "text-white/70" : "text-white/30"
                }`}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div className="w-8 h-0.5 mb-4 rounded-full overflow-hidden bg-white/20">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
