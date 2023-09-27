const _ = require('lodash')
// const addAction = require('./action/add.js');
// const viewAction = require('./action/view.js');
const pageAction = require('./action/page.js')
const apiAction = require('./action/api.js')
const routerAction = require('./action/router.js')
// const routerImportAction = require('./action/routerImport');

module.exports = function (plop) {
  plop.setGenerator('createTemplate', {
    description: '创建新的模板',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: '请输入模块标题(中文标题)',
        validate: (value) => {
          if (!value) return '模块标题必须填写!'
          return true
        },
      },
      {
        type: 'input',
        name: 'filePath',
        message: '请填写模块路径(相对于/pages目录, 以/开头)',
        validate: (value) => {
          if (!value.startsWith('/')) return '模块路径必学以/开头'
          return true
        },
      },
      {
        type: 'confirm',
        name: 'isApi',
        message: '是否要创建api文件',
        default: 'y',
      },
      {
        type: 'list',
        name: 'pageType',
        message: '请选择需要创建的页面类型',
        choices: [
          { value: 'index', name: '列表页面', checked: true },
          { value: 'view', name: '详情页面', checked: false },
          { value: 'form', name: '表单页面', checked: false },
        ],
        validate: (value) => {
          if (!value) return '页面类型必须选择!'
          return true
        },
      },
    ],
    actions: function (data) {
      console.log('data', data)
      const result = []
      if (data.isApi) {
        result.push(apiAction(data))
      }
      result.push(routerAction(data))
      result.push(pageAction(data))
      return result
    },
  })

  // 首字母大写
  plop.setHelper('upperFirst', (txt) => _.upperFirst(txt))
  // 根据路径获取文件名称
  plop.setHelper('moduleNameEN', (path) => {
    const pathArr = path.split('/')
    return pathArr[pathArr.length - 1]
  })
  // 根据路径获取文件名称并且首字母大写
  plop.setHelper('moduleNameENUpper', (path) => {
    const pathArr = path.split('/')
    return _.upperFirst(pathArr[pathArr.length - 1])
  })
  // 根据路径获取文件第一个名称
  plop.setHelper('moduleFirstNameEN', (path) => {
    const pathArr = path.split('/')
    return pathArr[1]
  })
  // 根据路径获取文件第一个名称并且首字母大写
  plop.setHelper('moduleFirstNameENUpper', (path) => {
    const pathArr = path.split('/')
    return _.upperFirst(pathArr[1])
  })
}
