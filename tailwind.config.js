/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F5F7FC',
        brand: {
          blue: '#0033C2',
          'blue-light': '#2C5AE8',
          gold: '#FFAF02',
          black: '#0B0B0C',
          mist: '#F5F7FC',
        },
        content: {
          primary: '#0B0B0C',
          secondary: '#5B5B60',
          muted: 'rgba(11,11,12,0.5)',
        },
        ui: {
          line: 'rgba(11,11,12,0.09)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 20px 44px rgba(0,51,194,0.1)',
        'card-hover': '0 14px 34px rgba(255,175,2,0.12)',
        'nav-node': '0 0 8px rgba(255,175,2,0.7)',
      }
    },
  },
  plugins: [],
}
