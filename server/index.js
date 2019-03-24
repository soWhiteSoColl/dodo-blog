const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

app.prepare().then(() => {
  server.get('/blogs/:blogId', (req, res) => {
    return app.render(req, res, '/blog', { id: req.params.blogId })
  })

  server.get('/*/_dodo/*', (req, res) => {
    req.url = req.url.replace(/.*\/_dodo/, '')
    return handle(req, res)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8082, () => {
    console.log('app is running in http://localhost:8082')
  })
})
