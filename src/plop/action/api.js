const { resolve } = require('path')

module.exports = function (data) {
  const { filePath } = data
  let path = filePath
  if (filePath.endsWith('view') || filePath.endsWith('form') || filePath.endsWith('index')) {
    path = path.replace('/index', '')
    path = path.replace('/form', '')
    path = path.replace('/view', '')
  }
  return {
    type: 'add',
    path: resolve(__dirname, `../../apis/modules${path}.js`),
    templateFile: resolve(__dirname, '../template/api.hbs'),
    force: true, // 如果文件存在则覆盖
    data: data,
  }
}
