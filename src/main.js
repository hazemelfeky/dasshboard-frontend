import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/global.scss'

// Vuetify
import vuetify from './vuetify'

const app = createApp(App);
app.use(store).use(router).use(vuetify).mount('#app')
console.log('created');