/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        textColorChange: {
          "0%, 100%": { color: "#00996b" },
          "50%": { color: "#ffeb3b" },
        },
      },
      animation: {
        textColorChange: "textColorChange 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
