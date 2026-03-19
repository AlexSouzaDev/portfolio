/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{tsx,ts,html}",
    "./components/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heming: ['"Heming Variable"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
