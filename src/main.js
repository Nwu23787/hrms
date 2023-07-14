import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.css'//去除浏览器默认样式
import router from '@/router'//导入路由
import store from './store'//导入vuex
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/reset.css'
import '@/styles/normalize.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
