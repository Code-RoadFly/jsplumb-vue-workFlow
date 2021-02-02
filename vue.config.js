const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/jsplumb-vue-wordFlow',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  productionSourceMap: false
}