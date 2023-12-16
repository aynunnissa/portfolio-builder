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
        black: {
          1000: '#0D0D0D',
          900: '#252525',
          800: '#3D3D3D',
          700: '#565656',
          600: '#6E6E6E',
          500: '#868686',
          400: '#9E9E9E',
          300: '#B6B6B6',
          200: '#CFCFCF',
          100: '#E7E7E7',
          primary: '#0D0D0D',
        },
        disabled: {
          text: 'rgba(145, 158, 171, 0.8)',
          background: 'rgba(145, 158, 171, 0.24)'
        },
        surface: {
          gray: 'rgba(250,250,250,255)'
        },
        icon: {
          gray: 'rgba(108, 112, 116, 1)'
        },
        danger: {
          main: '#EC1C24',
          border: '#F58B8F',
          surface: '#FDE3E4',
        },
      }
    },
  },
  plugins: [],
}
export default config
