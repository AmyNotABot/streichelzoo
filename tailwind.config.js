module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      "blue-zomp": "#4DA394",
      "brown-caput-mortuum": "#59322B",
      "beige-buttercream": "#FFFCC7",
      "orange-cognac": "#EF9A48",
      "red-rusty-red":"#D54751",
      "off-black": "#303030",
      "off-white": "#f0f0f0"
    },
  },
  variants: {

    extend: {},
  },
  
  plugins: [],
};
