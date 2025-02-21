/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'header-color': '#B7B7B7',
        'text-color' : '#6A6565',
      },
      screens: {
        'phone': '375px',
    },
  },
  plugins: [],
}}