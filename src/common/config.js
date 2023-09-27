const CONFIG = {
  // 开发环境配置
  development: {
    baseUrl: 'http://yc.demo.neikongcn.com/api',
    version: '1.0.0',
    title: '宜昌市机关事务服务中心数据融合平台',
  },
  // 生产环境配置
  production: {
    baseUrl: 'http://yc.demo.neikongcn.com/api',
    version: '1.0.0',
    title: '宜昌市机关事务服务中心数据融合平台',
  },
}
export default CONFIG[process.env.NODE_ENV]
