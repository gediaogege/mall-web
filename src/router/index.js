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
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/admin',
    name:'user',
    meta: {title: '账户管理'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/user/admin'),
        meta: {title: '账户管理'}
      },{
        path: 'role',
        name: 'role',
        component: () => import('@/views/user/role'),
        meta: {title: '角色管理'}
      },{
        path: 'permission',
        name: 'permission',
        component: () => import('@/views/user/permission'),
        meta: {title: '权限管理'}
      }
    ]
  },
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap

})
