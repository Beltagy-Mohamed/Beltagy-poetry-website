/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./assets/js/**/*.js"
  ],
  darkMode: 'class', // persistent theme using LocalStorage
  theme: {
    extend: {
      spacing: {
        // Strict 8px spacing system is mostly handled by default tailwind '2', '4', '8' but we can enforce it logically.
      },
      colors: {
        dark: {
          bg: '#0f172a', // Slate-900
        },
        light: {
          bg: '#f8fafc',
        },
        accent: {
          poetry: '#fbbf24', // Amber-400 for poetry/gold
          tech: '#38bdf8', // Sky-400 for tech
          navy: '#0a192f', // Deep Navy for light mode
          meroon: '#800000', // Rich Maroon for light mode
          'royal-gold': '#C5A059', // Calm Antique Gold
        }
      },
      fontFamily: {
        // Arabic literary feel
        aref: ['"Aref Ruqaa Ink"', 'serif'], // Arabic display font
        amiri: ['Amiri', 'serif'],
        reem: ['Reem Kufi', 'sans-serif'],
        // Arabic UI/Tech
        ibm: ['IBM Plex Sans Arabic', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        // English Tech
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'parchment': "url('/images/parchment-texture.png')",
      }
    },
  },
  plugins: [],
}
