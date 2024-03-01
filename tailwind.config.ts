import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['--font-sans', ...fontFamily.sans],
      },
      // Consider moving other customizations like fontSize, backgroundColor, etc., into extend if they are still needed
      // Remove the custom colors definitions to use catppuccin's color palette
    },
    // Optionally, you can further customize the theme here
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-radix'),
    require("@catppuccin/tailwindcss")({
      prefix: false,
      defaultFlavour: "mocha",
    }),
  ],
} satisfies Config
