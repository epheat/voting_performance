var socket = io('/voting');


var red_x = 30/3;
var red_y = 250/3;
var green_x = 452/3;
var green_y = 250/3;
var blue_x = 875/3;
var blue_y = 250/3;
var box_width = 375/3;
var box_height = 400/3;
var text_to_display = "null";
var allow_button_presses = true;

// r, g, b "other_weight" values
var others = [0, 0, 0];

function GreenBox(x, y, width, height, other_weight){
  strokeWeight(20)
  stroke(0,255,0,150);
  fill(other_weight,255,other_weight,255);
  rect(x, y, width, height, 15);
}

function RedBox(x, y, width, height, other_weight){
  strokeWeight(20)
  stroke(255,0,0,200);
  fill(255,other_weight,other_weight,255);
  rect(x, y, width, height, 15);
}

function BlueBox(x, y, width, height, other_weight){
  strokeWeight(20)
  stroke(0,0,255,200);
  fill(other_weight,other_weight,255,255);
  rect(x, y, width, height, 15);
}

function setup() {
  createCanvas(1280/3, 720/3);

  textSize(50);
}

var countdown = 10;
function draw() {

  if (countdown == 0) {
    //time's up
    text_to_display = "Voting ended."
    allow_button_presses = false;
  } else {
    text_to_display = "Voting ends in: "+countdown;
  }


  background(0,0,0,255);
  RedBox(red_x, red_y, box_width, box_height, others[0]);
  GreenBox(green_x, green_y, box_width, box_height, others[1]);
  BlueBox(blue_x, blue_y, box_width, box_height, others[2]);

  // render the time remaining
  strokeWeight(5);
  stroke(255, 255, 255);
  fill(153, 60, 100, 50);
  // text(countdown, 1000, 150);

  text(text_to_display, 10, 175/3);

  // reduce the weight of other colors, down to 0
  reduce_others_weight();

}

// reduce the weight of other colors, down to 0
function reduce_others_weight() {
  for (var i=0; i<others.length; i++) {
    if (others[i] > 0) {
      others[i] -= 5;
      if (others[i] < 0)
        others[i] = 0;
    }
  }
}


function touchEnded() {

  if (allow_button_presses) {
    if(mouseX>red_x&&mouseX<(red_x+box_width)&&mouseY>red_y&&mouseY<(red_y+box_height)){
      console.log("clicked on trigger_1");
      socket.emit("red_clicked");
      animate_redbox();
    }

    if(mouseX>green_x&&mouseX<(green_x+box_width)&&mouseY>green_y&&mouseY<(green_y+box_height)){
      console.log("clicked on trigger_2");
      socket.emit("green_clicked");
      animate_greenbox();
    }

    if(mouseX>blue_x&&mouseX<(blue_x+box_width)&&mouseY>blue_y&&mouseY<(blue_y+box_height)){
      console.log("clicked on trigger_3");
      socket.emit("blue_clicked");
      animate_bluebox();
    }
  }
}

function animate_redbox() {
  others[0] = 150;
}
function animate_greenbox() {
  others[1] = 150;
}
function animate_bluebox() {
  others[2] = 150;
}

socket.on('time_reduced', function(data){
  console.log("reduce time to exactly " + data.time);
  countdown = data.time;
})
