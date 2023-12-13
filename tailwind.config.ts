import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          main: 'rgba(16, 164, 176, 1)',
          light: 'rgba(16, 164, 176, 0.48)'
        },
        text: {
          primary: 'rgba(33, 43, 54, 1)',
          disabled: 'rgba(145, 158, 171, 1)',
          black: 'rgba(21, 27, 38, 1)',
          gray: {
            900: 'rgba(21, 27, 38, 1)',
            800: 'rgba(107, 107, 107, 1)',
            700: 'rgba(113, 121, 132, 1)',
            600: 'rgba(159, 159, 159, 1)'
          }
        },
        disabled: {
          text: 'rgba(145, 158, 171, 0.8)',
          background: 'rgba(145, 158, 171, 0.24)'
        },
        surface: {
          gray: 'rgba(113, 121, 132, 1)'
        },
        icon: {
          gray: 'rgba(108, 112, 116, 1)'
        }
      }
    },
  },
  plugins: [],
}
export default config
