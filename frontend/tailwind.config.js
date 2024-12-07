/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: ['Montserrat'],
      second: ['TT Norms Pro Serif Trl'],
    },
    variants: {
      fill: ['hover', 'focus'], // this line does the trick
    },
    colors: {
      white: '#fff',
      black: '#0c1a1a',
      accent: '#3c767e',
      grey: '#c3c3c3',
      lightGrey: '#f3f3f3',
      red: '#ff1f00',
    },
    extend: {
      backgroundImage: {
        home: "url('./main.png')",
      },
      padding: {
        '80px': '80px',
      },
      fontSize: {
        h1: '140px',
        h2: '64px',
        h3: '32px',
        h4: '28px',
        h5: '24px',
        h6: '16px',
      },
    },
  },
  plugins: [],
};
