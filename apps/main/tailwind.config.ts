import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./modals/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../libs/agent/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'at1919': '1919px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0px 0px 8px 0px #BA8B1D",
        buttonShadow: "-1px 0px 16px 0px #7048D7",
      },

      colors: {
        "nyx-blue": "#00D8D8",
        "nyx-yellow": "#FFCB54",
        "nyx-new-blue": "#5E32FF",
        "nyx-sky": "#5e32ff",
        "nyx-light-blue": "#E8E9ED",
        "nyx-white-1": "#D9D9D9",
        "nyx-blue-1": "rgba(0, 0, 0, 0.50)",
        "nyx-blue-2": "#3B236F",
        "nyx-blue-3": "#21184B",
        "nyx-blue-4": "#332270",
        "nyx-blue-5": "1D1138",
        "nyx-red": "#e26971",
        "nyx-purple": "#63058F",
        "nyx-gray-1": "#8297BD",
        "nyx-gray-2": "#1F1D4D",
      },
    },
  },
  plugins: [],
};
export default config;
