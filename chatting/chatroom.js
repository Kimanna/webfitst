

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client.html');
});

var count=1;
io.on('connection', function (socket) {
  console.log('user connected: ', socket.id);
  var name = "user" + count++;
  io.to(socket.id).emit('change name', name);

  socket.on('disconnect', function() {
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name, text) {
    var msg = name +' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

http.listen(3000, function() {
  console.log('server on')
});


// const PORT = 3000 || process.env.PORT;

// app.listen(PORT, function(){
//   console.log(`Server running on port${PORT}`);
// });