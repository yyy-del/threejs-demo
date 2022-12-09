import { createApp } from 'vue'

import App from './App.vue'

//引入第三方字体图标库
import '@/assets/font/iconfont.css'

import '@/assets/style/index.scss'

//引入路由
import router from './router'


const app = createApp(App)

app.use(router)
app.mount('#app')
