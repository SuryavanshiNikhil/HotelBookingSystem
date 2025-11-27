/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",  // Indigo
        secondary: "#EC4899", // Pink
        accent: "#22D3EE",    // Cyan
        dark: "#0F172A",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(31, 38, 135, 0.37)",
        neo: "8px 8px 20px #00000020, -8px -8px 20px #ffffff40",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
