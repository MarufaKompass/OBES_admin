/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7B1E19", 
        mainHeading:"#1E293B",
        whiteHeading:"#fff",
        subHeading:"#2563EB",
        paragraph:"#475569",
        background:"#f7f4f4",
        Accent:"#7B1E19"

      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
 fontSize: {
        h1: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }], // 40px
        h2: ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],   // 32px
        h3: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }], // 28px
        h4: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],   // 24px
        h5: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }], // 20px
        h6: ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],   // 16px
        paragraphFont: ["1rem", { lineHeight: "1.75rem", fontWeight: "400" }], // 16px
        small: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }], // 14px
      },
      
    },
  },
  plugins: [],
});
