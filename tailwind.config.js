/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wallbit: {
          blue: '#00A3FF',
          dark: '#000000',
          card: '#111827',
          'card-hover': '#1F2937'
        }
      }
    },
  },
  plugins: [],
};