// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//使用vuex
import ElementUI from 'element-ui'//使用element-ui
import locale from 'element-ui/lib/locale/lang/zh-CN'
import uicss from 'element-ui/lib/theme-chalk/index.css'
import '@/permission'
import VCharts from 'v-charts'
Vue.config.productionTip = false;
Vue.use(ElementUI,{locale,uicss});
Vue.use(VCharts);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
