import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070d",
        card: "#0b1220",
        accent: "#2dd4ff",
        muted: "#9ca3af"
      },
      boxShadow: {
        glow: "0 0 30px rgba(45, 212, 255, 0.15)"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

export default config;
