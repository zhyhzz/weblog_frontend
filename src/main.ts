import '@/assets/main.css'
import 'animate.css';
import './permission'
import 'nprogress/nprogress.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'

// 导入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
// 导入路由

const app = createApp(App)

// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(router)

app.mount('#app')
