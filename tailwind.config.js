/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F172A',
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#DBEAFE',
          'blue-subtle': '#EFF6FF',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'premium-hover': '0 10px 30px -4px rgba(37, 99, 235, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
        'card-glow': '0 0 0 1px rgba(37, 99, 235, 0.1), 0 8px 24px -4px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
