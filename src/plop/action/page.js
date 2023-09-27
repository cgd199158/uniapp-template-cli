const { resolve } = require('path')

module.exports = function (data) {
  const { pageType, filePath } = data
  const path = resolve(__dirname, `../../pages/${filePath}/${pageType === 'index' ? 'index' : `${pageType}/index`}.vue`)
  console.log('path', path)
  const tempatePath = resolve(__dirname, `../template/${pageType}.hbs`)
  console.log('tempatePath', tempatePath)
  return {
    type: 'add',
    path: path,
    templateFile: tempatePath,
    force: true, // 如果文件存在则覆盖
    data: data,
  }
}
