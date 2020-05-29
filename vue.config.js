const path = require('path')

module.exports = {

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/golbal.less')]
    }
  }
}
