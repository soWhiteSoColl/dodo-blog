const next = require('next')
const http = require('http')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

app.prepare().then(() => {
    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(3000, () => {
        console.log('app is running in http://localhost:3000')
    })
})