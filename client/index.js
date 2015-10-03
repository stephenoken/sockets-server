var io = require('socket.io-client');
var readline = require('readline');
var moment = require('moment');
var _ = require('lodash');

var socket = io.connect("http://localhost:3000");
socket.on('welcome',function (data) {
  console.log(data);
});

socket.on('helo',function (data) {
  console.log(data);
});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function recursiveMessage() {
  rl.question("",function(response) {
    var command = _.words(response,/[^ ]+/g);
    switch (command[0]) {
      case "KILL_SERVICE": terminate();
        break;
      case "HELO": helo(command);
        break;
      default:

    }
    recursiveMessage();
  });
}

function terminate() {
  socket.emit("terminate");
}

function helo(response) {
  response.shift();
  socket.emit('helo',{
    message: response.join(' '),
    time : moment().format('MMMM Do YYYY, h:mm:ss a')
  });
}
recursiveMessage();
