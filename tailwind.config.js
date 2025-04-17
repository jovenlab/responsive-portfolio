// const { Outfit, Ovo } = require('next/font/google');
const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        lightHover:"fcf4ff",
        darkHover:"#2a004a",
        darkTheme:"#11001f",
      },
      // fontFamily:{
      //   Outfit:["Outfit", "sans-serif"],
      //   Ovo:["Ovo", "serif"]
      // },
      fontFamily: {
        outfit: ['var(--font-outfit)', ...fontFamily.sans],
        ovo: ['var(--font-ovo)', ...fontFamily.serif],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode:'selector',
  plugins: [],
}
