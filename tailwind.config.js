/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        $searchPlaceholder: '#8d8d8d', //
        $text1: '#404040', // текст
        $text2: '#a6bdd7', // при наведении на текст
        $header1: '#333333', // header1
      },
    },
  },
  plugins: [],
};
