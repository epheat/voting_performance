var socket = io('/voting');     //http://socket.io/docs/
var message_state = 0;
var r_level = 1;
var g_level = 1;
var b_level = 1;

function setup(){
  createCanvas(400, 400);
  background(0);

  frameRate(30);

}

var time_remaining = 10;

function draw(){

  if (frameCount % 60 == 0) {
    time_remaining--;
    //send time_remaining to server
    socket.emit("time_reduced", {"time": time_remaining});
    console.log("time remaining " + time_remaining);
  }

  background(0);

  var total_color_weight = r_level+g_level+b_level;
  var red = r_level * 255 / total_color_weight;
  var green = g_level * 255 / total_color_weight;
  var blue = b_level * 255 / total_color_weight;

  fill(red,green,blue,255);
  rect(50,50,300,300);



}

socket.on('increase_red', function(){
  console.log("trigger 1 listener fired");
  r_level++;
})

socket.on('increase_green', function(){
  console.log("trigger 2 listener fired");
  g_level++;
})

socket.on('increase_blue', function(){
  console.log("trigger 3 listener fired");
  b_level++;
})
