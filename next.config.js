const withScss = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

const cssConfig = [withCss, { cssModules: false }]

const sassConfig = [withScss, { cssModules: false }]

const nextConfig = {
  pageExtensions: ['jsx', 'js', 'tsx'],
  webpack: (config, options) => {
    options.defaultLoaders.sass = [
      { loader: 'babel-loader' },
      { loader: 'raw-loader' },
      { loader: 'postcss-loader' },
      { loader: 'sass-loader' }
    ]

    options.defaultLoaders.css = [{ loader: 'babel-loader' }, { loader: 'raw-loader' }, { loader: 'postcss-loader' }]

    config.module.rules.push({
      test: /\.css$/,
      use: options.defaultLoaders.css
    })

    config.module.rules.push({
      test: /.scss$/,
      use: options.defaultLoaders.sass
    })

    return config
  }
}

module.exports = withPlugins([cssConfig, sassConfig, nextConfig])
