/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        black: {
          DEFAULT: '#161616'
        },
        blue: {
          light: '#2F82FF',
          DEFAULT: '#0066FF',
          dark: '#0052CC'
        },
        gray: {
          DEFAULT: '#272727'
        }
      }
    },
  },
  plugins: [],
}

