import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'

/* === 自動跟隨系統深淺色：給 <html> 加/移除 .dark === */
const mql = window.matchMedia('(prefers-color-scheme: dark)')
const apply = (isDark: boolean) => {
  document.documentElement.classList.toggle('dark', isDark)
}
apply(mql.matches)
mql.addEventListener('change', e => apply(e.matches))


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
