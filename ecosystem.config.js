module.exports = {
  apps: [
    {
      name: 'blog-web',
      script: './server',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
