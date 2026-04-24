/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
      },
      backgroundImage: {
        'bottom-glow': 'radial-gradient(circle at bottom, rgba(255,255,255,0.08) 0%, transparent 70%)',
        'dot-pattern': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'rgba(255,255,255,0.05)\'/%3E%3C/svg%3E")',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
};
