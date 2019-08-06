import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入公共样式
import './assets/common.css'
// 引入Element插件
import ElementUI from 'element-ui'
// 引入Element的样式
// import 'element-ui/lib/theme-chalk/index.css'

// 处理axios的三个问题
import axios from 'axios'
// 1.基准地址的问题
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 2.axios的引入问题(加到Vue的原型上)
Vue.prototype.$axios = axios
// 3.请求头的token指令的问题 (请求拦截器)
axios.interceptors.request.use(
  function (config) {
    // 添加token
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 安装Element库
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
