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
        glass: {
          100: "rgba(255, 255, 255, 0.1)",
          200: "rgba(255, 255, 255, 0.2)",
          300: "rgba(255, 255, 255, 0.3)",
          400: "rgba(255, 255, 255, 0.4)",
          500: "rgba(255, 255, 255, 0.5)",
        },
        modern: {
          primary: "#8868df",
          secondary: "#6095e8",
          accent: "#ff7eb6", 
          neutral: "#f5f5f7",
          light: "#ffffff",
          dark: "#2d2d38"
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-sm': '0 2px 8px 0 rgba(31, 38, 135, 0.1)',
        'glass-lg': '0 10px 40px 0 rgba(31, 38, 135, 0.2)',
        'glass-inner': 'inset 0 0 0.5px 1px rgba(255, 255, 255, 0.1)',
      },
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
