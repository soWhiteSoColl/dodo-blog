const next = require('next')
const express = require('express')

const dev = true
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

app.prepare().then(() => {
    server.get('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(8082, () => {
        console.log('app is running in http://localhost:8082')
    })
})