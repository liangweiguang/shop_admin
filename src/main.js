import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入公共样式
import './assets/common.css'
// 引入Element插件
import ElementUI from 'element-ui'
// 引入Element的样式
import 'element-ui/lib/theme-chalk/index.css'
// 安装Element库
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
