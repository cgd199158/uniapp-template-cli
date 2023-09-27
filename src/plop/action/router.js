const { resolve } = require('path')
const _ = require('lodash')

module.exports = function (data) {
  const pathToName = function (path) {
    const pathArr = path.replace('pages/', '').split('/')
    let resultArr = []
    for (let i = 0; i < pathArr.length; i++) {
      if (i === 0) {
        resultArr.push(pathArr[i])
      } else {
        resultArr.push(_.upperFirst(pathArr[i]))
      }
    }
    return resultArr.join('')
  }

  return {
    type: 'modify',
    path: resolve(__dirname, '../../pages.json'),
    transform: function (resource, data) {
      const { pageType, title } = data
      console.log('初始化resource', resource)
      const jsonData = JSON.parse(resource)
      const path = `pages${data.filePath}/${pageType === 'index' ? 'index' : `${pageType}/index`}`
      const pageIndex = _.findIndex(jsonData.pages, ['path', path])
      if (pageIndex === -1) {
        const data = {
          path: path,
          name: pathToName(path),
          meta: {
            title: title,
          },
          style: {
            navigationStyle: 'custom',
          },
        }
        jsonData.pages.push(data)
      }
      console.log('jsonData', jsonData)
      return JSON.stringify(jsonData, null, 2)
    },
  }
}
