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
    function ({ addComponents }) {
      addComponents({
        "[data-reach-accordion-button][aria-expanded=true] .accordion": {
          transform: "rotate(180deg)",
        },
      });
    },
  ],
};
