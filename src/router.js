// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/Login/Login.vue'
import Home from './components/Home/Home.vue'

// 安装路由
Vue.use(VueRouter)

// 实例路由
const router = new VueRouter({
  // 规则
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 导出路由
export default router
