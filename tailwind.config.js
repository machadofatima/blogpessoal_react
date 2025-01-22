/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'new-kansas': ['New Kansas', 'sans-serif'], // Removido as aspas extras
        'geist': ['Geist', 'sans-serif'], // Removido as aspas extras
        'gelasio': ['Gelasio','sans-serif'],
        'instrument-sans': ['Instrument Sans','sans-serif'],
        'instrument-serif': ['Instrument Serif','sans-serif'],
      },
    },
  },
  plugins: [],
};
