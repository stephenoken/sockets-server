var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function (req,res) {
  res.send('<h1>Hello World</h1>');
})
io.on('connection',function (socket) {
  socket.emit('welcome',"Hello Client " + socket.id)
  console.log('a user connected');

  socket.on('chat message', function(response){
    console.log(response.time+' message: ' + response.message);
  });

  socket.on('disconnect',function () {
    console.log("a user disconnected");
  })
});

io.on('disconnect',function () {
  console.log('user disconnected');
});
http.listen(3000,function () {
  var host = http.address().address;
  var port = http.address().port;

  console.log('Server listening at http://%s:%s',host,port);
});
