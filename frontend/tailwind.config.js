/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"e-ukraine"', 'sans-serif'],
    },
    colors: {
      axcent: '#3c767e',
      main: '#1e2426',
      second: '#afd2d7',
      first: '#f4f4f4',
    },
    extend: {},
  },
  plugins: [],
};
