// router.js
import { RouterMount, createRouter } from 'uni-simple-router'
import storage from '@/common/storage.js'
import store from '@/store/index.js'
import routerData from '../routerData.js'

const router = createRouter({
  encodeURI: false,
  platform: process.env.VUE_APP_PLATFORM,
  routes: routerData,
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
  // const token = storage.get('token')
  // const whiteList = ['/pages/login/index', '/pages/signature/index', '/pages/wxlogin/index']
  // if (token && !whiteList.includes(to.path)) {
  //   store.dispatch('getUserInfo')
  // }
  // if (!token && !whiteList.includes(to.path)) {
  //   next('/pages/login/index')
  // } else {
  //   console.log('next()')
  //   next()
  // }
})
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('跳转结束')
})

export { router, RouterMount }
