/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html, ts}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('public/home-background.webp')",
        'background-a': "url('public/background-a.webp')",

      },
    },
  },
  plugins: [],
}

