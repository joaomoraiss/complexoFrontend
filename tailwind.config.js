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
        'text-color': '#6A6565',
      },
      screens: {
        'phone': '375px',
      },
      keyframes: {
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bgZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        slideInLeftText: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRightText: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 1s ease-out',
        slideInRight: 'slideInRight 1s ease-out',
        fadeInUp: 'fadeInUp 1s ease-out',
        bgZoom: 'bgZoom 4s ease-out forwards',
        slideInLeftText: 'slideInLeftText 1s ease-out forwards',
        slideInLeftFast: 'slideInLeftText 0.5s ease-out forwards',
        slideInRightText: 'slideInRightText 1s ease-out forwards',
        slideInRightFast: 'slideInRightText 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
