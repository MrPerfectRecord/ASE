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
        primary: {
          50: "#e8f0f4",
          100: "#d6e6eb",
          200: "#a8c8d4",
          300: "#7aabbd",
          400: "#4d8da6",
          500: "#33647e",
          600: "#2b5569",
          700: "#234654",
          800: "#1b3740",
          900: "#13282b",
        },
        accent: {
          50: "#fdf0ea",
          100: "#f9d9c8",
          200: "#f0b897",
          300: "#d48660",
          400: "#c36e3f",
          500: "#b25b30",
          600: "#9a4e29",
          700: "#824122",
          800: "#6a341b",
          900: "#522714",
        },
        steel: {
          50: "#f3f3f3",
          100: "#efedeb",
          200: "#e1dfdb",
          300: "#d2cfc9",
          400: "#9f9f9f",
          500: "#777",
          600: "#555",
          700: "#444",
          800: "#2f2f2f",
          900: "#1a1a1a",
        },
        cream: "#edeae8",
        sand: "#f3f3f3",
        "section-a": "#fbfaf7",
        "section-c": "#f2f4f5",
      },
      fontFamily: {
        sans: ['"Exo 2"', "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in-delay": "fadeIn 0.6s ease-out 0.2s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
