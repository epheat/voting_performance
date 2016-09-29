var socket = io('/voting');


var red_x = 30/3;
var red_y = 250/3;
var green_x = 452/3;
var green_y = 250/3;
var blue_x = 875/3;
var blue_y = 250/3;
var box_width = 375/3;
var box_height = 400/3;

function GreenBox(x, y, width, height){
  strokeWeight(20)
  stroke(0,255,0,150);
  fill(0,255,0,255);
  rect(x, y, width, height, 15);
}

function RedBox(x, y, width, height){
  strokeWeight(20)
  stroke(255,0,0,200);
  fill(255,0,0,255);
  rect(x, y, width, height, 15);
}

function BlueBox(x, y, width, height){
  strokeWeight(20)
  stroke(0,0,255,200);
  fill(0,0,255,255);
  rect(x, y, width, height, 15);
}

function setup() {
  createCanvas(1280/3, 720/3);




  frameRate(1);
  textSize(50);
}

var countdown = 10;
function draw() {
  // countdown--;

  if (countdown == 0) {
    //time's up

    //reset countdown to 10 for next voting block
    countdown = 10;
  }


  background(0,0,0,255);
  RedBox(red_x, red_y, box_width, box_height);
  BlueBox(blue_x, blue_y, box_width, box_height);
  GreenBox(green_x, green_y, box_width, box_height);
  // render the time remaining
  strokeWeight(5);
  stroke(255, 255, 255)
  fill(153, 60, 100, 50);
  // text(countdown, 1000, 150);
  text("Voting ends in: "+countdown, 75/3, 175/3)

}


function touchEnded() {

  if(mouseX>red_x&&mouseX<(red_x+box_width)&&mouseY>red_y&&mouseY<(red_y+box_height)){
    console.log("clicked on trigger_1");
    httpGet('/trigger_1');
  }

  if(mouseX>green_x&&mouseX<(green_x+box_width)&&mouseY>green_y&&mouseY<(green_y+box_height)){
    console.log("clicked on trigger_2");
    httpGet('/trigger_2');
  }

  if(mouseX>blue_x&&mouseX<(blue_x+box_width)&&mouseY>blue_y&&mouseY<(blue_y+box_height)){
    console.log("clicked on trigger_3");
    httpGet('/trigger_3');
  }

}

socket.on('time_reduced', function(data){
  console.log("reduce time to exactly " + data.time);
  countdown = data.time;
})
