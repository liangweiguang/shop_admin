// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/Login/Login.vue'
import Home from './components/Home/Home.vue'
import Users from './components/Users/Users.vue'
import Roles from './components/Roles/Roles.vue'
import Rights from './components/Rights/Rights.vue'
import Categories from './components/Categories/Categories.vue'
import Goods from './components/Goods/Goods.vue'
import GoodsAdd from './components/Goods/GoodsAdd.vue'

// 安装路由
Vue.use(VueRouter)

// 实例路由
const router = new VueRouter({
  // 规则
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})

// 本地判断登录 （导航守卫）
router.beforeEach((to, from, next) => {
  // 判断是不是去登录登录页
  if (to.path === '/login') {
    next()
  } else {
    // 如果是登录其他页 判断有没有登录
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

// 导出路由
export default router
