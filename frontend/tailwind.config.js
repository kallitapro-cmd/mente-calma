/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f1117',
        surface: '#1a1d2e',
        'text-primary': '#e8e6e0',
        'text-muted': '#9a9890',
        accent: '#7a9e7e',
        'bubble-user': '#2a3a4a',
        'bubble-ai': '#1e2d1e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
