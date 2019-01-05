const withScss = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

const sassConfig = [withScss, {
  cssModules: false,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
}]

const cssConfig = [withCss, {
  cssModules: false
}]

const nextConfig = () => {
  return {
    pageExtensions: ['jsx', 'js', 'tsx'],
  }
}

module.exports = withPlugins([sassConfig, cssConfig, nextConfig])
