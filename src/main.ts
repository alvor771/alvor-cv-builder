import i18n from "./i18n";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import './style.css'
import App from './App.vue'

// Import routes
import { routes } from './router'

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create Pinia store
const pinia = createPinia()

// Create and mount the app
const app = createApp(App)
  .use(i18n)

app.use(router)
app.use(pinia)
app.use(FloatingVue)

app.mount('#app')