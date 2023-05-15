/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#5964E0',
      
      },
      backgroundImage: {
        header_image: "url('/public/assets/desktop/bg-pattern-header.svg')",
        header_image_mobile: "url('/public/assets/mobile/bg-pattern-header.svg')",
      },
    },
  },
  plugins: [],
};
