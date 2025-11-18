/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fahasa-red': '#C92127',
        'fahasa-yellow': '#F7941E',
        'fahasa-gray-100': '#F5F5F5',
        'fahasa-gray-200': '#E5E5E5',
        'fahasa-gray-600': '#4B5563',
        'fahasa-text': '#1F2937'
      }
    },
  },
  plugins: [],
}
