var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = require('ip');

var port = process.argv[2] || 3000;

app.get('/',function (req,res) {
  res.send('<h1>Hello World</h1>');
});
io.on('connection',function (socket) {
  // console.log("Number of Clients have joined " + io.eio.clientsCount);
  socket.emit('welcome',"Hello Client " + socket.id +
  "\nEnter a command:");
  console.log('a user connected');

  socket.on('helo', function(response){
    console.log(response.time+' message: ' + response.message);
    socket.emit('helo',
    "HELO "+ response.message +
    "\nIP:[" + ip.address() +
    "]\nPORT:[" + port +
    "]\n"
    );
  });

  socket.on('terminate',function () {
    console.log("Ending Service...");
    process.exit();
  });

  socket.on('disconnect',function () {
    console.log("a user disconnected");
  });
});

io.on('disconnect',function () {
  console.log('user disconnected');
});

http.listen(port,function () {
  // var port = http.address().port;
  // http.close();
  console.log('Server listening at http://%s:%s',ip.address(),port);
});
