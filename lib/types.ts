export type BusinessType =
  | "tech"
  | "food"
  | "fashion"
  | "health"
  | "finance"
  | "creative"
  | "retail"
  | "education"
  | "realestate"
  | "entertainment";

export type Audience =
  | "general"
  | "youngadults"
  | "professionals"
  | "families"
  | "luxury"
  | "kids";

export interface ColorTheme {
  id: string;
  name: string;
  colors: string[];
  description: string;
}

export interface WizardState {
  businessName: string;
  tagline: string;
  businessType: BusinessType | null;
  audience: Audience | null;
  colorTheme: ColorTheme | null;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "dreamy",
    name: "Dreamy Pastels",
    colors: ["#9FA1FF", "#B5BAFF", "#AEE2FF", "#D9F9DF"],
    description: "Soft lavender & sky blue",
  },
  {
    id: "ocean",
    name: "Ocean Depths",
    colors: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"],
    description: "Cool blues & aqua",
  },
  {
    id: "sunset",
    name: "Warm Sunset",
    colors: ["#FF6B6B", "#FF8E53", "#FEC89A", "#FFD6BA"],
    description: "Warm corals & peach",
  },
  {
    id: "earthy",
    name: "Earthy Roots",
    colors: ["#6B4226", "#A0522D", "#C8A97E", "#E8D5B7"],
    description: "Rich browns & sand",
  },
  {
    id: "bold",
    name: "Dark & Bold",
    colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560"],
    description: "Deep navy & crimson",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    colors: ["#111111", "#444444", "#888888", "#EEEEEE"],
    description: "Clean black & white",
  },
];

export const BUSINESS_TYPES: { value: BusinessType; label: string; emoji: string; styleHint: string }[] = [
  { value: "tech", label: "Technology", emoji: "💻", styleHint: "modern, minimalist, geometric, futuristic" },
  { value: "food", label: "Food & Drink", emoji: "🍽️", styleHint: "warm, inviting, appetizing, friendly" },
  { value: "fashion", label: "Fashion", emoji: "👗", styleHint: "elegant, sleek, sophisticated, high-end" },
  { value: "health", label: "Health & Wellness", emoji: "🌿", styleHint: "clean, calming, natural, trustworthy" },
  { value: "finance", label: "Finance", emoji: "💰", styleHint: "professional, bold, trustworthy, stable" },
  { value: "creative", label: "Creative Agency", emoji: "🎨", styleHint: "vibrant, artistic, expressive, dynamic" },
  { value: "retail", label: "Retail", emoji: "🛍️", styleHint: "approachable, bold, modern, energetic" },
  { value: "education", label: "Education", emoji: "📚", styleHint: "friendly, clear, inspiring, professional" },
  { value: "realestate", label: "Real Estate", emoji: "🏠", styleHint: "premium, solid, reliable, aspirational" },
  { value: "entertainment", label: "Entertainment", emoji: "🎬", styleHint: "exciting, bold, dramatic, eye-catching" },
];

export const AUDIENCES: { value: Audience; label: string; emoji: string; toneHint: string }[] = [
  { value: "general", label: "General Consumer", emoji: "👥", toneHint: "universally appealing and approachable" },
  { value: "youngadults", label: "Young Adults (18–30)", emoji: "✨", toneHint: "trendy, fresh, modern and bold" },
  { value: "professionals", label: "Professionals / B2B", emoji: "💼", toneHint: "polished, authoritative and sophisticated" },
  { value: "families", label: "Families", emoji: "👨‍👩‍👧", toneHint: "warm, trustworthy, safe and friendly" },
  { value: "luxury", label: "Luxury / Premium", emoji: "💎", toneHint: "exclusive, refined, high-end and prestigious" },
  { value: "kids", label: "Kids & Youth", emoji: "🌈", toneHint: "playful, colorful, fun and imaginative" },
];
