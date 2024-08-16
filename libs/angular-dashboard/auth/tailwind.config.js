const {createGlobPatternsForDependencies} = require('@nx/angular/tailwind');
const {join} = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
      colors: {
        primary: {
          ...colors.indigo,
          DEFAULT: colors.indigo[ 600 ],
        },
        accent: {
          ...colors.slate,
          DEFAULT: colors.slate[ 800 ],
        },
        warn: {
          ...colors.red,
          DEFAULT: colors.red[ 600 ],
        },
        'on-warn': {
          500: colors.red[ '50' ],
        },
      },
    },
  },
  plugins: [],
};
