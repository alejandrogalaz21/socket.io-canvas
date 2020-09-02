import http from 'http'
import express from 'express'
import socketIo from 'socket.io'

const app = express()
const server = http.Server(app)
const io = socketIo(server)

let lineHistory = []

io.on('connection', function (socket) {
  console.log('new connection')

  for (let i in lineHistory) {
    socket.emit('draw_line', { line: lineHistory[i] })
  }

  socket.on('draw_line', function (data) {
    lineHistory.push(data.line)
    io.emit('draw_line', { line: data.line })
  })

  socket.on('clean_canvas', function () {
    io.emit('clean_canvas', true)
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

server.listen(5000, () => {
  console.log('listening on *:5000')
})
