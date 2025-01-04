import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Montserrat"],
        second: ["TT Norms Pro Serif Trl"],
      },
      variants: {
        fill: ["hover", "focus"], // this line does the trick
      },
      colors: {
        white: "#fff",
        black: "#0c1a1a",
        accent: "#3c767e",
        grey: "#c3c3c3",
        lightGrey: "#f3f3f3",
        red: "#ff1f00",
      },
      backgroundImage: {
        home: "url('/main.png')",
        404: "url('/404.png')",
      },
      padding: {
        "80px": "80px",
      },
      fontSize: {
        h1: "140px",
        h2: "64px",
        h3: "32px",
        h4: "28px",
        h5: "24px",
        h6: "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;
