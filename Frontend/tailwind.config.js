/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    // './node_modules/flyonui/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#020616',
        customText: '#022439',
      }
    },
  },
  plugins: [
    require('tailwindcss-motion'),
  ],
}

