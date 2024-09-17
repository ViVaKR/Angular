/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{html,ts}"
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        ibm: ['IBM Plex Sans', 'sans-serif'],
        cute: ['Cute Font', 'sans-serif'],
        noto: ['Noto Sans KR', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'lotus': "url('assets/background.jpg')",
        'sutra-logo': "url('public/sutra-logo.webp')",
        'sutra-logo-white': "url('public/sutra-logo-white.webp')",
        'sutra-logo-black': "url('public/sutra-logo-black.webp')",
      },
    },
  },
  plugins: [],
}
