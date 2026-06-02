import type { WizardState } from "./types";
import { BUSINESS_TYPES, AUDIENCES } from "./types";

// Human-readable color descriptions per theme for accurate model interpretation
const THEME_COLOR_DESCRIPTIONS: Record<string, { primary: string; accent: string; full: string }> = {
  dreamy:      { primary: "soft periwinkle blue",      accent: "pale lavender",        full: "soft periwinkle blue and pale lavender with a mint green highlight" },
  ocean:       { primary: "deep ocean blue",           accent: "bright aqua",          full: "deep ocean blue and bright aqua with light cyan" },
  sunset:      { primary: "warm coral red",            accent: "burnt orange",         full: "warm coral red and burnt orange with peachy tones" },
  earthy:      { primary: "rich chocolate brown",      accent: "warm sienna",          full: "rich chocolate brown and warm sienna with sandy beige" },
  bold:        { primary: "deep midnight navy",        accent: "vivid crimson red",    full: "deep midnight navy and vivid crimson red on a near-black background" },
  monochrome:  { primary: "pure black",                accent: "charcoal grey",        full: "pure black and charcoal grey on white — strictly no other colors" },
};

export function buildPrompt(state: WizardState): string {
  const bizType = BUSINESS_TYPES.find((b) => b.value === state.businessType);
  const audience = AUDIENCES.find((a) => a.value === state.audience);
  const theme = state.colorTheme;

  const name = state.businessName.trim();
  const tagline = state.tagline.trim();
  const styleHint = bizType?.styleHint ?? "clean, modern";
  const toneHint = audience?.toneHint ?? "universally appealing";

  const colorDesc = theme?.id
    ? THEME_COLOR_DESCRIPTIONS[theme.id] ?? { primary: "blue", accent: "light blue", full: "blue and light blue" }
    : { primary: "periwinkle blue", accent: "lavender", full: "periwinkle blue and lavender" };

  const taglinePart = tagline ? `, tagline "${tagline}"` : "";

  return (
    `A flat vector logo using ONLY ${colorDesc.full} colors. ` +
    `The logo is for a company called "${name}"${taglinePart} ` +
    `in the ${bizType?.label ?? "business"} industry. ` +
    `Style: ${styleHint}, aimed at ${toneHint}. ` +
    `Design: a bold simple geometric icon symbol above the company name in clean sans-serif lettering. ` +
    `The icon and text must be rendered in ${colorDesc.primary} and ${colorDesc.accent} only. ` +
    `Pure white background, flat design, no gradients, no shadows, high contrast, minimal shapes, scalable. ` +
    `No photographic elements, no decorative borders, no watermarks. Square 1:1 composition.`
  );
}
