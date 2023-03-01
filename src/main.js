import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/global.scss'

// Vuetify
import 'vuetify/styles'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { mdiWindowClose, mdiCheck } from '@mdi/js'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      close: mdiWindowClose,
      check: mdiCheck,
    },
    sets: {
      mdi,
    },
  },
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')
