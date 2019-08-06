// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/Login/Login.vue'
// 设为异步组件（懒加载）
const Home = () => import('./components/Home/Home.vue')
const Users = () => import('./components/Users/Users.vue')
const Roles = () => import('./components/Roles/Roles.vue')
const Rights = () => import('./components/Rights/Rights.vue')
const Categories = () => import('./components/Categories/Categories.vue')
const Goods = () => import('./components/Goods/Goods.vue')
const GoodsAdd = () => import('./components/Goods/GoodsAdd.vue')

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
        { path: '/users/:id?', component: Users },
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
