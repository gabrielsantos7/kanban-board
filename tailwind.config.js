/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#0D1117',
        column: '#161C22'
      },
      container: {
        center: true
      },
      spacing: {
        15: '3.75rem',
        '350px': '350px'
      }
    }
  },
  plugins: []
};
