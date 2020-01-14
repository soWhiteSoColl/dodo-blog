const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()
const PORT = 8085

app.prepare().then(() => {
  server.get('/blogs/:blogId', (req, res) => {
    return app.render(req, res, '/blog', { id: req.params.blogId })
  })

  server.get('/sw.js', (req, res) => {
    req.url = '/static/lib/sw.js'
    return handle(req, res)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8085, () => {
    console.log(`app is running in http://localhost:${PORT}`) // eslint-disable-line
  })
})
