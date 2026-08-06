/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#090909',
        card: '#151515',
        cardHover: '#1e1e1e',
        accent: '#FF7A00',
        accentGlow: 'rgba(255, 122, 0, 0.35)',
        secondary: '#9A9A9A',
        borderCustom: 'rgba(255, 255, 255, 0.08)',
        borderHighlight: 'rgba(255, 122, 0, 0.3)',
      },
      fontFamily: {
        heading: ['Syne', 'Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Geist', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
