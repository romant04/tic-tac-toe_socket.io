const http = require('http')
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT || 5000

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())

server.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})