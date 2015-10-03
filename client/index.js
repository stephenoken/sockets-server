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

function recursiveMessage() {
  rl.question("Send Message ", function(answer) {
    switch (answer) {
      case "TERMINATE": terminate();
        break;

      default:

    }
    // if(answer ==="TERMINATE"){
    //     socket.disconnect();
    //     rl.close();
    //     process.exit();
    // }
    sendMessage(answer);
    console.log("Sent", answer);
    recursiveMessage();
  });
}

function terminate() {
  socket.emit("terminate");
  socket.disconnect();
  process.exit();
}
recursiveMessage();
