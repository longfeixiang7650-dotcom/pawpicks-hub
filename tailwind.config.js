/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: '#140A0E',
          100: '#2A1420',
          200: '#4A2030',
          300: '#6A2A40',
          400: '#8E3550',
          500: '#BE185D',
        },
        muted: {
          DEFAULT: '#BE185D',
          light: '#EC4899',
        },
        surface: '#FDF2F8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
