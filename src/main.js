import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {gsap} from 'gsap'
import {CSSPlugin} from 'gsap/CSSPlugin'

gsap.registerPlugin(CSSPlugin)

createApp(App)
  .use(store).use(router)
  .mount('#app')
