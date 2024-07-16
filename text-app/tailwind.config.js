/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'lotus': "url('assets/background.jpg')",
      },
    },
  },
  plugins: [],
}

