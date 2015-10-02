var io = require('socket.io-client');
var readline = require('readline');
var moment = require('moment');

var socket = io.connect("http://localhost:3000");
socket.on('welcome',function (data) {
  console.log(data);
});
function sendMessage(answer) {
  socket.emit('chat message',{
    message: answer,
    time : moment().format('MMMM Do YYYY, h:mm:ss a')
  });
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var recursiveMessage = function () {
  rl.question("Send Message ", function(answer) {
    if(answer ==="quit")
      rl.close();
    sendMessage(answer);
    console.log("Sent", answer);
    recursiveMessage();
  });
}

recursiveMessage();
// socket.on('event', function(data){
// });
// socket.on('disconnect', function(){});
