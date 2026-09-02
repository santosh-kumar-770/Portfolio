/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#05070c',
          900: '#080c14',
          850: '#0d1322',
          800: '#121a2f',
          700: '#1b263f',
          600: '#2a3a5e',
        },
        brand: {
          cyan: '#06b6d4',
          teal: '#14b8a6',
          emerald: '#10b981',
          accent: '#2dd4bf',
          muted: '#0d9488',
          violet: '#818cf8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        '2xl': '24px',
        '3xl': '36px',
        '4xl': '48px',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 10s ease-in-out infinite',
        'ambient-glow': 'ambientGlow 14s ease-in-out infinite alternate',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.01)' },
        },
        ambientGlow: {
          '0%': { opacity: '0.25', transform: 'scale(0.95)' },
          '50%': { opacity: '0.45', transform: 'scale(1.05)' },
          '100%': { opacity: '0.3', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
