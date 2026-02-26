/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "#0F5C2E",     // Verde do fundo
      secondary: "#E10600",   // Vermelho do logo
      light: "#FFFFFF"
    }
  }
},
  plugins: [],
} 