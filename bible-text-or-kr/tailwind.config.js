/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html, ts}'
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
        'home-background': "url('public/home-background.webp')",
        'background-a': "url('public/background-a.webp')",
        "background-b": "url('public/background-summer.webp')",

      },
    },
  },
  plugins: [],
}

