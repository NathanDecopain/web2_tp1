import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import {router} from "./router/router.js";

// Load environment variables
// Pinia setup
const pinia = createPinia()

// Initialize Vue App
const app = createApp(App)
app
    .use(pinia)
    .use(router)
    .mount('#app')
