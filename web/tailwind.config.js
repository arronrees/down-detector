/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
