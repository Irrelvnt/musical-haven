/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#16171d",
        text: "#e1e1e2",
        textlight: "#a3a4a6",
        card: "#1f2029",
        primary: "#fbcdfb",
        secondary: "#fa8efb",
        tertiary: "#a036d6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
