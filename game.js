var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var score = 0;
var highScore = [];

$(document).keydown(function(){
  if(started === false){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  score = level -1
  if (score > highScore){
    highScore = score;
  }

  $("#level-title").text("Level "+ level);
  $(".score").text("Current Score:" + score);
  $(".high-score").text("High Score:" + highScore);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name){
  var audioPlay = new Audio("./sounds/"+name+".mp3");
         audioPlay.play()
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },75);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
        nextSequence();
        },500);
    }
  }else{
    gameOver();
  }
}

function gameOver() {
    $("body").addClass("game-over");
    console.log("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  
    // Update high score if current score is greater
    startOver();
  }

function overSound(){
  var playOver = new Audio("./sounds/wrong.mp3")
    playOver.play()
}

function startOver(){
  level = 0;
  gamePattern =[];
  started = false;
  score = 0;
}
