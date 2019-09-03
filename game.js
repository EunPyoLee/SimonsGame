var level = 0;
var gamePattern = [];
var userClickedpattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var initSwitch = false;

$(document).keypress(function() {
  if (!initSwitch) {
    $("#level-title").text("Level " + level);
    nextSequence();
    initSwitch = true;
  }

});

function nextSequence() {
  userClickedpattern = [];
  ++level;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosencolor = buttonColors[randomNumber];
  gamePattern.push(randomChosencolor);
  $("#" + randomChosencolor).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosencolor);

}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedpattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedpattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedpattern[currentLevel] === gamePattern[currentLevel]){
    if(currentLevel === (level - 1)){
      setTimeout(function(){
        nextSequence();}, 1000);
    }
  }
  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
function startOver(){
  initSwitch = false;
  level = 0;
  gamePattern = [];
}
