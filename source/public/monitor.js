var socket = io('/voting');     //http://socket.io/docs/
var r_level = 1;
var g_level = 1;
var b_level = 1;

function setup(){
  createCanvas(10000, 4000);
  background(0);


  frameRate(30);

}

var time_remaining = 10;
var break_time = 5;

function draw(){

  if (frameCount % 60 == 0) {
    if (time_remaining > 0) {
      time_remaining--;

      //send time_remaining to server
      socket.emit("time_reduced", {"time": time_remaining});
      console.log("time remaining " + time_remaining);
    } else {
      if (break_time == 0) {
        time_remaining = 10;
        break_time = 5;
      } else {
        break_time--;
      }
    }
  }


  background(0);



  var total_color_weight = r_level+g_level+b_level;
  var red = r_level * 255 / total_color_weight;
  var green = g_level * 255 / total_color_weight;
  var blue = b_level * 255 / total_color_weight;

  fill(red,green,blue,255);
  rect(1000,500,4000,2000);

  fill(255,0,0,255);
  rect(1000,2500,1333,1000);

  fill(0,255,0,255);
  rect(2333,2500,1333,1000);

  fill(0,0,255,255);
  rect(3666,2500,1333,1000);

  textSize(500);
  fill(0,0,0,255);
  text("Prance",1050,3100);

  textSize(400);
  fill(0,0,0,255);
  text("Wiggle",2400,3100)

  textSize(500);
  fill(0,0,0,255);
  text("Jirate",3800,3100)

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
