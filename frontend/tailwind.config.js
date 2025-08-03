/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      }
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
