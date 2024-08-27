import '@/assets/main.css'
import 'animate.css';
import './permission'
import 'nprogress/nprogress.css'
import { createApp } from 'vue'

import router from '@/router'
import pinia from '@/stores'
// 导入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 图片点击放大
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import App from './App.vue'
// 导入路由

const app = createApp(App)

// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(VueViewer)
app.use(router)
app.use(pinia)
app.mount('#app')
