const withLess = require('@zeit/next-less') 


module.exports = withLess({
  pageExtensions: ['jsx', 'js', 'tsx'],
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    )
    return config
  }
})