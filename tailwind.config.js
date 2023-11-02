/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "my-serif": ["Libre Baskerville", "serif"],
    },
  },
  darkMode: "class",
  plugins: [],
};
