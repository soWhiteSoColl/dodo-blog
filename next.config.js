const withScss = require('@zeit/next-sass') 
const withCss = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [
    withScss,
    {
      pageExtensions: ['jsx', 'js', 'tsx'],
      cssModules: false,
      lessLoaderOptions: {
        javascriptEnabled: true
      }
    }
  ],
  [
    withCss,
    {
      cssModules: false
    }
  ],
])