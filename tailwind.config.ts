import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#071013",
        panel: "#0d1b1f",
        cyanline: "#37f3ff",
        acid: "#a3ff4a",
        amberglow: "#ffcf5a",
        danger: "#ff4d6d"
      },
      boxShadow: {
        glow: "0 0 40px rgba(55, 243, 255, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
