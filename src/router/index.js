import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/layout'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/wx',
    component: Layout,
    redirect: '/wx/wxmenu',
    name:'wx',
    meta: {title: '微信管理'},
    children: [
      {
        path: 'wxmenu',
        name: 'wxmenu',
        component: () => import('@/views/wx/wxmenu'),
        meta: {title: '菜单设置'}
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/wx/index'),
        meta: {title: 'hello', icon: 'hello'}
      },
    ]
  },
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap

})
