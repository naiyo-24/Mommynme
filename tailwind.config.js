/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        title1: ["Poiret One", "serif"],
        title2: [ "Tangerine", "serif"],
        poppins:["Poppins", "serif"],
        passion:["Passions Conflict", "serif"]
      },


      colors:{
        customGreen: "#8d86d5",
        customPink: "#6c67a4",
      }
    },
  },
  plugins: [],
};

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
