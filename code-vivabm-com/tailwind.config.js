/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    container: {
      center: true
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        ibm: ['IBM Plex Sans', 'sans-serif'],
        cute: ['Cute Font', 'sans-serif'],
        noto: ['Noto Sans KR', 'sans-serif'],
        firacode: ['Fira Code', 'monospace']
      },

      backgroundImage: {
        'robot': "url('public/robot.webp')",
        'robot-man': "url('public/robot-man.webp')",
      },
      flexBasis: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '1/4': '25%',
        '1/5': '20%',
        '1/6': '16.666667%',
        '1/7': '14.285714%',
        '1/8': '12.5%',
        '1/9': '11.111111%',
        '1/10': '10%',
        '1/11': '9.090909%',
        '1/12': '8.333333%',
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      }
    }
  },
  plugins: [],
}

