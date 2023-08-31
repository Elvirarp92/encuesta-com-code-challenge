/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VBtn: {
      class: 'text-none',
    }
  },

  theme: {
    defaultTheme: 'light',

    themes: {
      light: {
        colors: {
          primary: '#E26D5A',
          secondary: '#4DA1A9',
          success: '#8FC93A',
          warning: '#FFCC33',
          error: '#E26D5A',
          info: '#4DA1A9'
        }
      },

      dark: {
        colors: {
          primary: '#E26D5A'
        }
      }
    },
  },
})
