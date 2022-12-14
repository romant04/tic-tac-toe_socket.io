const http = require('http')
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT || 5000

app.use(cors())

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

let games = []

let players = []

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('join', (name) => {
    players.push({ id: socket.id, name: name })
    const opponent = players.find((player) => player.id !== socket.id)
    console.log(players)
    if (opponent) {
      players = players.filter(
        (player) => player.id !== opponent.id && player.id !== socket.id,
      )

      const random = Math.round(Math.random())

      io.to(opponent.id).emit('found', [
        name,
        random === 1 ? 'X' : 'O',
        opponent.id,
      ])
      io.to(socket.id).emit('found', [
        opponent.name,
        random === 0 ? 'X' : 'O',
        socket.id,
      ])

      games.push({
        players: [{ id: socket.id, name: name }, opponent],
      })
    }
  })

  socket.on('play', (currentBoard) => {
    let game = games.find((game) =>
      game.players.some((x) => x.id === socket.id),
    )

    games.map((x) => {
      console.log(x.players)
    })

    const opponent = game.players.find((x) => x.id != socket.id)

    io.to(opponent.id).emit('played', currentBoard)
  })

  socket.once('disconnect', () => {
    console.log('disconnected ' + socket.id)
    players = players.filter((x) => x.id !== socket.id)
    const game = games.find((game) =>
      game.players.some((x) => x.id === socket.id),
    )

    if (game) {
      const opponent = game.players.find((x) => x.id !== socket.id)
      io.to(opponent.id).emit('left')

      games = games.filter((x) => x != game)
    }
  })
})

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
