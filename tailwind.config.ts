import type { Config } from 'tailwindcss';

const colors = {
  blue: {
    '50': '#ecfaff',
    '100': '#d4f2ff',
    '200': '#b2eaff',
    '300': '#7ddfff',
    '400': '#40caff',
    '500': '#14aaff',
    '600': '#0088ff',
    '700': '#0070ff',
    '800': '#005bcd',
    '900': '#064184',
    '950': '#0a3061',
  },
  red: {
    '50': '#ffeff0',
    '100': '#ffdbdd',
    '200': '#ffbec2',
    '300': '#ff9096',
    '400': '#ff515b',
    '500': '#ff1b28',
    '600': '#ff000e',
    '700': '#de000c',
    '800': '#b7000a',
    '900': '#84050c',
    '950': '#530005',
  },
  green: {
    '50': '#f0ffe5',
    '100': '#ddffc7',
    '200': '#bbff95',
    '300': '#8dff57',
    '400': '#66f625',
    '500': '#44dd05',
    '600': '#30b100',
    '700': '#268405',
    '800': '#23690b',
    '900': '#1f590e',
    '950': '#0b3201',
  },
  teal: {
    '50': '#effefb',
    '100': '#c7fff5',
    '200': '#90ffec',
    '300': '#50f8df',
    '400': '#1de4ce',
    '500': '#04c8b6',
    '600': '#00a195',
    '700': '#05847c',
    '800': '#096661',
    '900': '#0d5450',
    '950': '#003333',
  },
  yellow: {
    '50': '#fdffe5',
    '100': '#faffbb',
    '200': '#f9ff7a',
    '300': '#feff2e',
    '400': '#fff100',
    '500': '#ffd500',
    '600': '#e6a400',
    '700': '#b67300',
    '800': '#965800',
    '900': '#844a05',
    '950': '#4a2400',
  },
  purple: {
    '50': '#fcf3ff',
    '100': '#f8e3ff',
    '200': '#f2ccff',
    '300': '#e8a5ff',
    '400': '#db6bff',
    '500': '#cd34ff',
    '600': '#c00dff',
    '700': '#ab00f1',
    '800': '#9005c4',
    '900': '#630584',
    '950': '#520077',
  },
};

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: colors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/forms')],
};

export default config;
