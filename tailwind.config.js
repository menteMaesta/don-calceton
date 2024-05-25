/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        "[data-reach-accordion-button][aria-expanded=true] .accordion": {
          transform: "rotate(180deg)",
        },
        "[data-reach-tab][data-selected]": {
          backgroundColor: theme("colors.white"),
          borderWidth: "1px",
        },
      });
    },
  ],
};
