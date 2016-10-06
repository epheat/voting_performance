//Evan Heaton
var express = require('express');
var app = express();
var server = app.listen(8081, function () {
  console.log("Ka-Pow! listening on port 8081");
})
var io = require('socket.io')(server);    //http://socket.io/docs/
app.use(express.static('public'));
var name_spaced_com = io.of('/voting');

name_spaced_com.on('connection', function (socket) {
  console.log("Client ID"+socket.id+" connected");

  // Antiquated way to get a message from the participant
  // app.get('/trigger_1', function(request,response){
  //   // response.json({"status":"success"});
  //   response.sendStatus(200);
  //   console.log("trigger 1 pressed : red");
  //   name_spaced_com.emit('increase_red');
  // })

  socket.on("red_clicked", function() {
    console.log("red_clicked");
    name_spaced_com.emit("increase_red");
  })
  socket.on("green_clicked", function() {
    console.log("green_clicked");
    name_spaced_com.emit("increase_green");
  })
  socket.on("blue_clicked", function() {
    console.log("blue_clicked");
    name_spaced_com.emit("increase_blue");
  })

  socket.on("time_updated", function(data) {
    name_spaced_com.emit('time_updated', data);
    console.log("tick");
  })

})
