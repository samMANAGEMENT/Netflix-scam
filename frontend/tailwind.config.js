/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye también archivos TypeScript si los usas
  ],
  theme: {
    extend: {},
  },
  colors: {
    'custom-white': 'rgba(255, 255, 255, 0.7)',
  },
  plugins: [],
}
