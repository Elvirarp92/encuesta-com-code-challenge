/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Directives
import { vue3Debounce } from 'vue-debounce'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app
  .directive('debounce', vue3Debounce({ lock: true }))
  .mount('#app')
