import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bank: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc7fb",
          400: "#36aaf5",
          500: "#0c8ee7",
          600: "#0170c6",
          700: "#0259a1",
          800: "#064b84",
          900: "#0b3f6e",
          950: "#072849",
        },
        navy: {
          800: "#132338",
          900: "#0d1829",
          950: "#070e18",
        },
        emerald: {
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        }
      },
    },
  },
  plugins: [],
};
export default config;
