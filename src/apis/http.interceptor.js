// common/http.interceptor.js
import http from '@/uni_modules/firstui/fui-request'
import store from '@/store/index.js'

const install = () => {
  //初始化请求配置项
  http.create({
    //接口域名
    host: '/api',
    header: {},
  })
  //请求拦截
  http.interceptors.request.use((config) => {
    return config
  })
  //响应拦截
  http.interceptors.response.use((response) => {
    if (response.statusCode === 200) {
      const data = response.data
      if (data.code === 1) {
        return data
      } else if (data.code === 401) {
        store.dispatch('toAutoLogin')
      } else if (data.code === 403) {
        uni.showToast({
          icon: 'none',
          title: '您的登录信息已过期, 请重新登录~',
          duration: 2000,
        })
        store.dispatch('loginOut')
      } else {
        uni.$emit('z-paging-error-emit') // 全局处理分页接口报错的情况
        uni.showToast({
          icon: 'none',
          title: data.msg || '接口出错啦,请联系管理员处理',
          duration: 2000,
        })
      }
    } else if (response.statusCode === 401) {
      store.dispatch('toAutoLogin')
    } else if (response.statusCode === 402) {
      uni.showToast({
        icon: 'none',
        title: '您的登录信息已过期, 请重新登录~',
        duration: 2000,
      })
      store.dispatch('loginOut')
    } else {
      uni.$emit('z-paging-error-emit') // 全局处理分页接口报错的情况
      uni.showToast({
        icon: 'none',
        title: '系统出错啦,请联系管理员处理',
        duration: 2000,
      })
    }
  })
}

export default {
  install,
}
