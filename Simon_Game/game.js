
var buttonColours = ["red", "blue", "green", "yellow"]; //colours possible in the screen

var gamePattern = [];//array to store the game pattern
var userClickedPattern = [];//tp store the user moves

var started = false ; // var to keep track wheather the game has started or not

var level = 0;//indicate the current level



//check for keypress to start the game
$(document).keypress(function(event) {
  //if game has not previously started call next sequence
  if(!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }
});



//check for click on the colour tile and update the user array 
$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel) {

 
  //if correct move
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //if the most recent one is correct go to next level
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence,1000);
      
    }
  }
  else {

    playSound("wrong");
    //GAME OVER
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
} 


function startOver() {
  //reset all values
  level = 0;
  gamePattern = [];
  started = false;
}



//generate a next sequence
function nextSequence() {

  userClickedPattern = [];//empty the pattern

  //increase the level everytime nextSequence calls
  level++;

  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);
}


//function to play sound according to the color (name)
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//animate the key with 100ms time delay upon a key press
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
    },100);

}

