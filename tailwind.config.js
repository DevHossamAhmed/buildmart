/** @type {import('tailwindcss').Config} */
module.exports = {
  
  theme: {
    extend: {
      fontFamily: {
        'playwrite': ['Playwrite DE SAS', 'cursive', 'sans-serif'],
      },
      textShadow: {
        sm: '1px 1px 2px var(--tw-shadow-color)', 
        DEFAULT: '2px 2px 4px var(--tw-shadow-color)', 
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}