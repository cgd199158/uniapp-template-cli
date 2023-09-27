const pagesJson = require('./src/pages.json')
const fs = require('fs')

const includes = ['path', 'name', 'meta', 'aliasPath']
const pagesToRouter = () => {
  console.log('将pages.json转成router.js')
  // 获取./src/pages.json文件的数据
  // 获取pagesJson中的pages数据
  const pages = pagesJson.pages
  // 将pages数据转成router.js中的routes数据
  const getPagesRoutes = (pages, rootPath = null) => {
    const routes = []
    for (let i = 0; i < pages.length; i++) {
      const item = pages[i]
      const route = {}
      for (let j = 0; j < includes.length; j++) {
        const key = includes[j]
        let value = item[key]
        if (key === 'path') {
          value = rootPath ? `/${rootPath}/${value}` : `/${value}`
        }
        if (key === 'aliasPath' && i == 0 && rootPath == null) {
          route[key] = route[key] || '/'
        } else if (value !== undefined) {
          route[key] = value
        }
      }
      routes.push(route)
    }
    return routes
  }
  // pages.forEach((page) => {
  //   const route = {
  //     path: page.path,
  //     name: page.name,
  //     redirect: page.redirect,
  //     meta: {
  //       title: page.meta.title,
  //     },
  //   }
  //   routes.push(route)
  // })
  const routes = getPagesRoutes(pages)
  // 将routes数据写入./src/routerData.js文件
  const data = `module.exports = ${JSON.stringify(routes, null, 2)}`
  fs.writeFile('./src/routerData.js', data, (err) => {
    if (err) {
      console.log('写入失败')
    } else {
      console.log('写入成功')
    }
  })
}
module.exports = { pagesToRouter }
