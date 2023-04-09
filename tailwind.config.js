/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightMode:{
          background: '#e0e0e0',
          txt: '#030303',
          component: '#fcfcfc',
          btn: '#0891b2',
          componentHead: '#f0f0f0'
        },
        darkMode: {
          background: '#2e2e2e',
          txt: '#f7f7f7',
          component: '#0f0f0f',
          btn: '#033642',
          componentHead: '#b5b4b3'
        }
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
