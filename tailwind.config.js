/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
      ,
      colors: {
        school: {
          primary: '#0ea5a4',     // teal
          muted: '#94a3b8',       // slate-muted
          playful1: '#f59e0b',    // amber
          playful2: '#fb7185',    // rose
          accent: '#7c3aed'       // violet
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

