/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#0460D8',
      secondary: '#009EF7',
      gray: '#949DB2',
      black: '#012048',
      red: '#E55444',
      green: '#2BB855',
      white: '#FFFFFF'
    },
    container: {
      center: true
    }
  },
  plugins: []
};
