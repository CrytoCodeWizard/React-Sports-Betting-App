/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      'miniscule': '0.65rem',
      xs: '0.75rem',
      xsm:'0.8rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem', 
      xl: '1.25rem', 
      '2xl': '1.5rem', 
      '3xl': '1.875rem', 
      '4xl': '2.25rem', 
      '5xl': '3rem', 
      '6xl': '3.75rem', 
      '7xl': '4.5rem', 
      '8xl': '6rem', 
      '9xl': '8rem', 
    },
    extend: {
      fontFamily: {
        'mono': ['SFMono-Regular', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
});
