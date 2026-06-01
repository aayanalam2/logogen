import type { WizardState } from "./types";
import { BUSINESS_TYPES, AUDIENCES } from "./types";

export function buildPrompt(state: WizardState): string {
  const bizType = BUSINESS_TYPES.find((b) => b.value === state.businessType);
  const audience = AUDIENCES.find((a) => a.value === state.audience);
  const theme = state.colorTheme;

  const name = state.businessName.trim();
  const tagline = state.tagline.trim();
  const styleHint = bizType?.styleHint ?? "clean, modern";
  const toneHint = audience?.toneHint ?? "universally appealing";
  const colorList = theme
    ? theme.colors.slice(0, 3).join(", ")
    : "#9FA1FF, #AEE2FF, #D9F9DF";

  const taglinePart = tagline
    ? ` with tagline "${tagline}"`
    : "";

  return (
    `Professional logo design for "${name}"${taglinePart}, ` +
    `a ${bizType?.label ?? "business"} company. ` +
    `Style: ${styleHint}. ` +
    `Tone: ${toneHint}. ` +
    `Color palette: ${colorList}. ` +
    `Flat vector logo, white background, ` +
    `high contrast, bold clean shapes, ` +
    `no gradients in the icon, simple geometric symbol above the company name, ` +
    `sans-serif typography, scalable, professional. ` +
    `No watermarks, no shadows, no photographic elements. ` +
    `Square composition 1:1.`
  );
}
