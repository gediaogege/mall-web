import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/components/HelloWorld')
  }, {
    path: '/login',
    component: () => import('@/views/login')
  }
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap

})
