import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        purple: {
          300: '#e0e7fe',
          500: '#3e38a7',
          600: '#5046e4',
        }
      },
      spacing: {},
    },
  },
  plugins: [],
};

export default config;
