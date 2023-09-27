import { BigNumber } from 'bignumber.js'
import _ from 'lodash'
import dayjs from 'dayjs'
import config from '@/common/config.js'
import Nzh from 'nzh'

const install = (Vue) => {
  Vue.prototype.$t = {
    /**
     * 转译模板
     * @param template
     * @param data
     * @returns
     */
    renderTemplate(template, data) {
      const reg = /{{(.*?)}}/g
      const res = template.replace(reg, (item, key) => {
        return data[key.trim()]
      })
      return res
    },
    // 测试加法
    toUpperCase(arg) {
      return arg && arg.toUpperCase()
    },
    addCalc(number1, number2) {
      if (!number1 && number1 != 0) return 0
      if (Array.isArray(number1)) {
        if (number1.length) {
          return Number(BigNumber.sum.apply(null, number1))
        } else {
          return 0
        }
      } else {
        return Number(BigNumber.sum(number1, number2 || 0))
      }
    },
    multiplyCalc(number1, number2) {
      if (!number1) return 0
      if (!number2) return 0
      return Number(new BigNumber(number1).times(number2).toFixed(2))
    },
    // toast
    toast(content, config = {}) {
      uni.showToast({
        icon: 'none',
        title: content,
        duration: 2000,
        ...config,
      })
    },
    // 判断H5是否在微信浏览器中
    isWeiXin() {
      // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase()
      // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
      // eslint-disable-next-line eqeqeq
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    // 获取url所有参数
    getUrlAllParams() {
      // 解决乱码问题
      var url = decodeURI(window.location.href)
      var res = {}
      var url_data = _.split(url, '?').length > 1 ? _.split(url, '?')[1] : null
      if (!url_data) return null
      var params_arr = _.split(url_data, '&')
      _.forEach(params_arr, function (item) {
        var key = _.split(item, '=')[0]
        var value = _.split(item, '=')[1]
        res[key] = value
      })
      return res
    },
    // 预览图片
    previewImage(urls) {
      if (urls && urls.length > 0) {
        const list = urls.map((item) => `${config.baseUrl}${item}`)
        uni.previewImage({
          urls: list,
        })
      }
    },
    // 根据url判断是否为图片
    isImgByUrl(url) {
      if (!url) return false
      const arr = url.split('.')
      const type = arr[arr.length - 1].toLowerCase()
      if (!type) return false
      const isImgType = ['png', 'jpg', 'jpeg', 'gif']
      if (isImgType.indexOf(type) !== -1) return true
      return false
    },
    // 判断字符串是否为json格式
    isJson(str) {
      if (typeof str === 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj === 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          return false
        }
      }
    },
    // 将html中的文字剥离出来
    htmlToText(value) {
      if (!value) return ''
      let result = value
      result = result.replace(/(\n)/g, '')
      result = result.replace(/(\&nbsp;)/g, '')
      result = result.replace(/(\t)/g, '')
      result = result.replace(/(\r)/g, '')
      result = result.replace(/<\/?[^>]*>/g, '')
      result = result.replace(/(\s*)/g, '')
      return result
    },
    // 格式化小时
    formatHour(value) {
      if (!value) return ''
      const min = value * 60
      return Math.floor(min / 60) + '小时' + Math.floor(min % 60) + '分'
    },
    showModal(options, confirmCallBack, cancelCallBack) {
      uni.showModal({
        cancelText: '取消', // 取消按钮的文字
        confirmText: '确认', // 确认按钮文字
        title: config.title,
        cancelColor: '#333',
        confirmColor: '#ff0202',
        ...options,
        success: (res) => {
          if (res.confirm) {
            confirmCallBack && confirmCallBack()
          } else if (res.cancel) {
            cancelCallBack && cancelCallBack()
          }
        },
      })
    },
    randomStringNum(length) {
      var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var result = ''
      for (var i = length; i > 0; --i) {
        result += str[Math.floor(Math.random() * str.length)]
      }
      return result
    },
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
          time = parseInt(time)
        }
        if (typeof time === 'number' && time.toString().length === 10) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
      }
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
    },
    formatTime(date = '', format = 'YYYY-MM-DD') {
      if (!date) return ''
      if (_.isNumber(date)) {
        return dayjs(date * 1000).format(format)
      }
      return dayjs(date).format(format)
    },
    /**
     * 数组格式转树状结构
     * @param   {array}     array
     * @param   {String}    id
     * @param   {String}    pid
     * @param   {String}    children
     * @return  {Array}
     */
    arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
      const data = _.cloneDeep(array)
      const result = []
      const hash = {}
      data.forEach((item, index) => {
        hash[data[index][id]] = data[index]
      })
      data.forEach((item) => {
        const hashVP = hash[item[pid]]
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = [])
          hashVP[children].push(item)
        } else {
          result.push(item)
        }
      })
      return result
    },
    /**
     * 将树形结构转换成列表结构
     * @param {Record<string, any>[]} data
     * @returns
     */
    treeToArray(tree) {
      let result = []
      const change = (data, pid) => {
        for (let i = 0; i < data.length; i++) {
          let d = { id: data[i].id, text: data[i].text, pid: pid }
          result.push(d)
          if (data[i].children && data[i].children.length > 0) {
            change(data[i].children, data[i].id)
          }
        }
      }
      change(tree)
      return result
    },
    /**
     * 安全获取数据的值
     * @param data 数据
     * @param path 路径数据
     * @param defaultValue 默认值
     */
    getValueBySafe(data, path, defaultValue) {
      /**
       * 安全读取数据逻辑
       * res.get('goodsTag.isFreePostage',false)
       * res.get('goodsComments[0].author','匿名')
       */
      if (data) {
        return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => o?.[k], data) || defaultValue
      } else {
        return defaultValue
      }
    },
    getUrlParam(name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      const r = window.location.search.substr(1).match(reg) // 匹配目标参数
      if (r != null) return decodeURIComponent(r[2])
      return null // 返回参数值
    },
    // 处理时间戳
    formatDate(value, format = 'YYYY-MM-DD') {
      if (!value) return ''
      if (_.isNumber(value)) {
        return dayjs(value * 1000).format(format)
      }
      return dayjs(value).format(format)
    },
    toMoney(val) {
      if (_.isString(val) || _.isNumber(val)) {
        return Number(val).toFixed(2)
      }
      return '0.00'
    },
    /**
     * 将金额转换成中文大写
     * @param n 转换的值
     * @returns
     */
    moneyToCN(n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
        return '数据非法' //判断数据是否大于0
      }
      const nzhcn = Nzh.cn
      const result = nzhcn.toMoney(n, {
        outSymbol: false, // 是否去掉前面的货币符号，默认false
      })
      return result
    },
    // 驼峰转下划线
    splitCamel(str) {
      return str
        .replace(/([A-Z])/g, function (s) {
          return '_' + s.toLowerCase()
        })
        .trim()
        .split(' ')
    },
    /**
     * 根据逗号分割字符串,兼容中文逗号和英文逗号
     * @param str 需要裁切的字符串
     * @returns
     */
    strToCommaSplitArr(str) {
      if (!str) return []
      const arr = str.split(/[,|，]/)
      return arr.filter((item) => item)
    },
    // 判断是否是钉钉浏览器
    isDingTalk() {
      const ua = navigator.userAgent.toLowerCase()
      return ua.indexOf('dingtalk') > -1
    },
  }
}

export default {
  install,
}
