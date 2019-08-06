module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    }
  }
}
