var socket = io('/voting');     //http://socket.io/docs/
var r_level = 1;
var g_level = 1;
var b_level = 1;

var VOTING_TIME = 10;
var BREAK_TIME = 8;


var verbs = ["annoy","argue","bang","bathe","beg","bounce","charge","choke","command","confuse","crawl","damage","disapprove","drag","drown","exercise","expand","explode","fade","flap","flash","grab","hover","hunt","itch","gyrate","kneel","launch","mourn","multiply","murder","overflow","peck","pinch","prance","prey","punch","race","scare","scream","shiver","strip","surprise","tickle","trot","tumble","twist","vanish","whip","zoom"];
var adverbs = ["awkwardly","bravely","carefully","cautiously","cheerfully","coyly","crazily","daintily","defiantly","dramatically","eagerly","elegantly","fiercely","flirtatiously","foolishly","gently","gleefully","gracefully","happily","hardly","hastily","innocently","irritably","jealously","lazily","loosely","madly","mysterioiusly","naturally","nervously","obnoxiously","painfully","politely","poorly","powerfully","quickly","rapidly","roughly","rudely","shakily","sharply","silently","slowly","strongly","suddenly","tediously","victoriously","wildly"];

var current_verb = "dance";
var current_adverb = "expressively";
var verb_choices = ["prance", "wiggle", "gyrate"];
var adverb_choices = ["slowly", "cautiously", "uncontrollably"];



function setup(){
  createCanvas(1000, 800);
  background(0);


  frameRate(60);

}

var time_remaining = VOTING_TIME;
var voting_time_left_bar_width = 980;
var break_time_left_bar_width = 0;
var break_time = BREAK_TIME;
var phase = 0;

function draw(){

  if (phase == 0) {
    var reduction = 980/VOTING_TIME/60;
    voting_time_left_bar_width-=reduction;
  }
  if (phase == 1) {
    var reduction = 980/BREAK_TIME/60;
    break_time_left_bar_width-=reduction;
  }

  if (frameCount % 60 == 0) {

    if (time_remaining > 1) {
      time_remaining--;

      //send time_remaining to server
      socket.emit("time_updated", {"time": time_remaining});
      console.log("time remaining " + time_remaining);
    } else {
      phase = 1;

      if (break_time == BREAK_TIME) {
        get_winning_action();
        reset_choices();
        break_time_left_bar_width = 980;
        break_time--;
      } else if (break_time > 0) {
        break_time--;
        console.log("break time remaining " + break_time);
      } else {
        phase = 0;

        select_new_choices();
        voting_time_left_bar_width = 980;

        r_level = 1;
        g_level = 1;
        b_level = 1;

        time_remaining = VOTING_TIME;
        break_time = BREAK_TIME;
      }
    }
  }


  background(0);



  var total_color_weight = r_level+g_level+b_level;
  var red = r_level * 255 / total_color_weight;
  var green = g_level * 255 / total_color_weight;
  var blue = b_level * 255 / total_color_weight;


  //Current block & text
  fill(red,green,blue,255);
  rect(10,10,980,500);

  textSize(90);
  fill(255,255,255,255);
  textAlign(CENTER);
  text(current_verb + " " + current_adverb, 500, 255);

  //Time remaining bars
  fill(255,255,255,200);
  rect(10,10,voting_time_left_bar_width,60);
  fill(255,255,255,200);
  rect(10,450, break_time_left_bar_width, 60);


  //Voting blocks & text
  //red voting block
  fill(255,0,0,255);
  rect(10,520,320,270);

  //green voting block
  fill(0,255,0,255);
  rect(340,520,320,270);

  //blue voting block
  fill(0,0,255,255);
  rect(670,520,320,270);

  textSize(40);
  fill(255,255,255,255);
  stroke(0,0,0,255);
  strokeWeight(5);
  textAlign(CENTER);

  text(verb_choices[0],10+320/2,640);
  text(adverb_choices[0],10+320/2,680);

  text(verb_choices[1],340+320/2,640);
  text(adverb_choices[1],340+320/2,680);

  text(verb_choices[2],670+320/2,640);
  text(adverb_choices[2],670+320/2,680);

  strokeWeight(0);

}

function get_winning_action() {
  var highest_votes = Math.max(r_level, g_level, b_level);
  var winning_vote_index;
  if (highest_votes == r_level) {
    winning_vote_index = 0;
  } else if (highest_votes == g_level) {
    winning_vote_index = 1;
  } else {
    winning_vote_index = 2;
  }
  current_verb = verb_choices[winning_vote_index];
  current_adverb = adverb_choices[winning_vote_index];
}

function select_new_choices() {
  for (var i=0; i<3; i++) {
    verb_choices[i] = verbs[getRandomInt(0,verbs.length-1)];
    adverb_choices[i] = adverbs[getRandomInt(0,adverbs.length-1)];
  }
}

function reset_choices() {
  for (var i=0; i<3; i++) {
    verb_choices[i] = "";
    adverb_choices[i] = "";
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
