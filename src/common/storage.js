/**
 * Storage标准封装
 */
const BASE_KEY = 'db'

const myStorage = {
  // 存储
  set(key, value) {
    try {
      uni.setStorageSync(BASE_KEY + '-' + key, JSON.stringify(value))
    } catch (err) {
      return null
    }
  },
  // 取出数据
  get(key) {
    try {
      const value = JSON.parse(uni.getStorageSync(BASE_KEY + '-' + key))
      if (value === null || value === undefined || value === '') {
        return null
      }
      return JSON.parse(uni.getStorageSync(BASE_KEY + '-' + key))
    } catch (err) {
      return null
    }
  },
  // 删除数据
  remove(key) {
    uni.removeStorageSync(BASE_KEY + '-' + key)
  },
  // 清空缓存
  clear() {
    uni.clearStorageSync()
  },
}
export default myStorage
