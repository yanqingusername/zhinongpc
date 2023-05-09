'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false, // 是否校验语法
  productionSourceMap: false,
  devServer: {
    port: 8888,
    open: true,
      // proxy: {
      //   '/storemanage': {
      //       target: 'https://monitor.coyotebio-lab.com:8443',
      //       changeOrigin: true,
      //       pathRewrite:{
      //           '^/storemanage': '/storemanage'
      //       }
      //   },
      // }
  
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': resolve('src')
  //     }
  //   }
  // }
}
