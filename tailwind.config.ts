import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Gharauni aesthetic — editorial Indian, no fintech sterility
        ivory: { 50: '#FDF6E3', 100: '#FAEDD0', 200: '#E8D9B8', 300: '#D6C5A0' },
        terracotta: { 500: '#C2410C', 600: '#7C2D12', 700: '#431407' },
        ink: { 900: '#1C1917', 800: '#292524', 700: '#44403C', 500: '#78716C', 400: '#A8A29E' },
        accent: { gold: '#FBBF24', green: '#16A34A', red: '#DC2626' }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both'
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
