import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "mellow-bg": {
          "0%": {
            "background-size": "175% 175%",
            "background-position": "0% 0%",
          },
          "50%": {
            "background-size": "175% 175%",
            "background-position": "100% 100%",
          },
          "100%": {
            "background-size": "175% 175%",
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        "mellow-bg": "mellow-bg 5s ease infinite",
      },
    },
  },
  plugins: [],
};
export default config;
