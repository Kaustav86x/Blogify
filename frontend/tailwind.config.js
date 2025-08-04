/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      },
      keyframes: {
    fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
  animation: {
    fadeIn: 'fadeIn 0.5s ease-out forwards',
  },
    }
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust based on your project structure
    "./public/index.html"
  ],
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
