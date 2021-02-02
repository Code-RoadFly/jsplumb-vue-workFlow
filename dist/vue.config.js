
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'jsplumb绘制流程图'
        return args
      })
  }
}