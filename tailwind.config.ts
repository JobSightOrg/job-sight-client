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
      colors: {
        customLogoColor: {
          900: "#920025",
          800: "#ab002b",
          700: "#c30032",
          600: "#dc0038",
          500: "#f4003e",
          400: "#f51a51",
          300: "#f63365",
          200: "#f74d78",
          100: "#f8668b",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
