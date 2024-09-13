module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700, #FFA500)',
        'silver-gradient': 'linear-gradient(135deg, #C0C0C0, #B0B0B0)',
        'black-gradient': 'linear-gradient(135deg, #000000, #2F2F2F)',
      },
      colors: {
        'pale-spring-bud': '#ECEBBD',
        'deep-koamaru': '#333366',
        'illusion': '#F6A4C9',
        'light-french-beige': '#C8AD7F',
        'lapis-lazuli': '#26619C',
        'english-rose': '#AB4B73',
        'viridian': '#40826D',
        'desert-sand': '#EDC9AF',
        'saffron-mango': '#F4C430',
        'celadon-green': '#2F847C',
        'purple-taupe': '#50404D',
        'caput-mortuum': '#592720',
        'cadet-blue': '#5F9EA0',
        'alice-blue': '#F0F8FF',
        'periwinkle': '#CCCCFF',
        'raspberry-glace': '#915F6D',
        'green-sheen': '#6EAEA1',
        'rosewood': '#65000B',
        'twilight-lavender': '#8A496B',
        'charcoal': '#36454F',
        'morning-blue': '#8DA399',
        'onyx': '#353839',
        'battleship-grey': '#848482',
        'raw-umber': '#826644',
        'brilliant-azure': '#3399FF',
        'charcoal': '36454F',
        'morning_blue': '8DA399',
        'matte-black': '#28282B',
        'night': '#0C090A',
        'licorice': "#1B1212",
        'onyx-black': '#0F0F0F',
        'ebony-black': '#282C35',
        'jet-black': '#343434',
        'pastel-lavender': '#EBD2FC',
        'pastel-mimi-pink': '#FFDBFA',
        'pastel-jordy-blue': '#9FAFFF',
        'pastel-non-photo-blue': '#A1ECFF',
        'pastel-peach-cream': '#FFEAC9',
        'midnight-blue': '#1B1F3B', // Dark, deep blue for contrasts
        'golden-sun': '#FFD700', // Highlight color for buttons or accents
        'soft-white': '#F4F4F9', // Text on dark backgrounds
        'fiery-red': '#FF4500', // For selected states or interactive elements
        'charcoal': '#264653', // Dark text color or muted section backgrounds
        'light-coral': '#FF7F50', // Alternate accent for less aggressive highlights
        'midnight-green': '#004953',
        'fandango': '#B53389',
        'golden-rod': '#DAA520',
        'caribbean-green': '#00CC99',
        'outer-space': '#414A4C',
        'persian-blue': '#1C39BB',
        'celestial-blue': '#4997D0',
        'acid-green': '#B0BF1A',
        'electric-purple': '#BF00FF',
        'dark-sienna': '#3C1414',
        "ivory": '#FFFFF0',        // Ivory
        "champagne": '#F7E7CE',    // Champagne
        "alabaster": '#F2F0E6',    // Alabaster
        "pearl": '#FAF0DC',        // Pearl White
        "linen": '#FAF0E6',        // Linen
        "azure": '#F0FFFF',        // Azure
        "honeydew": '#F0FFF0',     // Honeydew
        "mintcream": '#F5FFFA',    // Mint Cream
        "seashell": '#FFF5EE',     // Seashell
        "lavenderblush": '#FFF0F5',// Lavender Blush
        "beige": '#F5F5DC',
        'electric-blue': '#1e90ff',
        'neon-pink': '#ff1493',
        'dark-gray-900': '#121212',
        'dark-gray-800': '#1c1c1c',
        'light-gray-100': '#e0e0e0',
        'vivid-red': '#FF6B6B',
        'vivid-hover': '#FF4F4F',
        'charcoal':'#252836',
        'muted-gray':'#A0A0A0',
        'light-coral':'#FF8787',
        'gold':'#FFD700',
        'gold-hover':'#FEDD49',
        'deepblue':'#1E3A8A',
      },
      animation: {
        'fade-in': 'fade-in 2s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
