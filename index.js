var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function (req,res) {
  res.send('<h1>Hello World</h1>');
})
io.on('connection',function (socket) {
  console.log('a user connected');
});

http.listen(3000,function () {
  var host = http.address().address;
  var port = http.address().port;

  console.log('Server listening at http://%s:%s',host,port);
});
