import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      borderWidth: {
        3: '0.1875rem',
      },
      colors: {
        primary: colors.cyan,
        badger: colors.neutral,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
