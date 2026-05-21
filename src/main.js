import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@fontsource/comic-neue/latin-400.css'
import '@fontsource/comic-neue/latin-700.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/theme.css'
import './styles/typography.css'
import './styles/responsive.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(store).use(router).mount('#app')
