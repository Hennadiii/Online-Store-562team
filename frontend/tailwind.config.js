/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: ['e-Ukraine'],
      second: ['e-Ukraine Header'],
    },
    variants: {
      fill: ['hover', 'focus'], // this line does the trick
    },
    colors: {
      axcent: '#3c767e',
      white: '#f4f4f4',
      main: '#1e2426',
      second: '#afd2d7',
      first: '#f4f4f4',
      red: '#ff0000',
    },
    extend: {
      backgroundImage: {
        home: "url('bg-main.png')",
      },
    },
  },
  plugins: [],
};
