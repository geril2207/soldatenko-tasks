const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      'reddel': '#fca5a5',
      'sky': '#38bdf8',
      'white': 'white',
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
