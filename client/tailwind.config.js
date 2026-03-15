/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.05)',
        'glass-border': 'rgba(255,255,255,0.1)',
        accent: '#6366f1',
        'accent-hover': '#4f46e5',
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { opacity: '0.9', boxShadow: '0 0 40px rgba(99,102,241,0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
