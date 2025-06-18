/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0077BE", // NBA blue
        secondary: "#D00000", // NBA red
        nbaBlue: "#17408B",
        nbaRed: "#C9082A",
        darkGray: "#2D2D2D",
        lightGray: "#F1F1F1",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
        elevated: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};