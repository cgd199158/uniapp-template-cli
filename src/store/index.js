import Vue from 'vue'
import Vuex from 'vuex'
import storeage from '@/common/storage.js'
// import { reqUserInfo, reqDbSetting, reqBudgetBook, reqDictList, reqCityList, reqLogout, reqAllUserList } from '@/apis/sys.js'
Vue.use(Vuex)

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_token']

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync('lifeData')
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {}
    tmp[key] = value
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync('lifeData', tmp)
  }
}

const store = new Vuex.Store({
  state: {
    token: storeage.get('token') || null, // token
    userInfo: storeage.get('userInfo') || null, // 用户信息
    userOrgInfo: null, // 当前用户选择的单位信息
    bookList: [], // 账套信息
    userBookInfo: storeage.get('userBookInfo') || null, // 当前用户的账套信息
    dbSetting: null, // 全局配置信息
    dictList: [], // 字典列表
    cityList: [], // 城市列表
    userList: [], // 选人组件城市列表
  },
  getters: {},
  mutations: {
    $uStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split('.')
      let saveKey = ''
      let len = nameArr.length
      if (nameArr.length >= 2) {
        let obj = state[nameArr[0]]
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]]
        }
        obj[nameArr[len - 1]] = payload.value
        saveKey = nameArr[0]
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value
        saveKey = payload.name
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey])
    },
  },
  actions: {
    login({ state }, data) {
      state.token = data.token
      state.userInfo = data
      storeage.set('token', data.token)
      storeage.set('userInfo', data)
      uni.navigateTo({
        url: '/pages/home/index',
      })
    },
    async loginOut() {
      // await reqLogout()
      // storeage.clear()
      storeage.remove('token')
      storeage.remove('userInfo')
      uni.navigateTo({
        url: '/pages/login/index',
      })
    },
    getUserInfo() {
      // reqUserInfo().then((res) => {
      //   if (res.code === 1) {
      //     const data = res.data
      //     state.userInfo = data
      //     storeage.set('userInfo', data)
      //     const id = data.id
      //     const userOrgInfo = storeage.get(`userOrgInfo-${id}`)
      //     if (userOrgInfo) {
      //       state.userOrgInfo = userOrgInfo
      //     } else {
      //       state.userOrgInfo = data.orgs[0]
      //     }
      //   }
      // })
    },
  },
  modules: {},
})

// 从缓存中取得相同的key进行覆盖操作
let lifeData = uni.getStorageSync('lifeData') || {}
for (let key in lifeData) {
  if (store.state.hasOwnProperty(key)) {
    store.commit('$uStore', {
      name: key,
      value: lifeData[key],
    })
  }
}

export default store
