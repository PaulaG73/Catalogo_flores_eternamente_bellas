import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@fontsource/bricolage-grotesque/latin-400.css'
import '@fontsource/bricolage-grotesque/latin-500.css'
import '@fontsource/bricolage-grotesque/latin-600.css'
import '@fontsource/bricolage-grotesque/latin-700.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/theme_vino_tinto.css'
import './styles/typography.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(store).use(router).mount('#app')
