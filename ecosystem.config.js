module.exports = {
  apps: [
    {
      name: 'dodo-blog',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
