/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft:       '0 2px 24px 0 rgba(79,70,229,0.12)',
        card:       '0 4px 32px 0 rgba(15,23,42,0.07)',
        input:      '0 0 0 3px rgba(79,70,229,0.18)',
        'input-dark': '0 0 0 3px rgba(129,140,248,0.22)',
      },
      animation: {
        'fade-up':  'fadeUp 0.45s cubic-bezier(.16,1,.3,1) both',
        'fade-in':  'fadeIn 0.35s ease both',
        'spin-slow': 'spin 1.2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}