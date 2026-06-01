import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lavender: "#9FA1FF",
          "lavender-light": "#B5BAFF",
          sky: "#AEE2FF",
          mint: "#D9F9DF",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "radial-gradient(ellipse at 30% 20%, #9FA1FF 0%, #AEE2FF 55%, #D9F9DF 100%)",
        "brand-gradient-subtle":
          "linear-gradient(135deg, #9FA1FF22 0%, #AEE2FF22 50%, #D9F9DF22 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-up": "fade-up 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
