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

  app.get('/trigger_1', function(request,response){
    // response.json({"status":"success"});
    response.sendStatus(200);
    console.log("trigger 1 pressed : red");
    name_spaced_com.emit('increase_red');
  })

  app.get('/trigger_2', function(request,response){
    // response.json({"status":"success"});
    response.sendStatus(200);
    console.log("trigger 2 pressed : green");
    name_spaced_com.emit('increase_green');
  })

  app.get('/trigger_3', function(request,response){
    // response.json({"status":"success"});
    response.sendStatus(200);
    console.log("trigger 3 pressed : blue");
    name_spaced_com.emit('increase_blue');
  })

})
