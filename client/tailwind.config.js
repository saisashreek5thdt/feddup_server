module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 3.2s infinite'
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(1.7, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      }
    },
  },
  variants: {
    extend: {
      animation: ['focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  corePlugins: {
    resize: true
  }
}
