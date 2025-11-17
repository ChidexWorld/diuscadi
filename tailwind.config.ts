import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#0B61FF",
      },
    },
  },
  plugins: [],
};
export default config;
