// $(document).ready(function()
// {
// alert("loaded sucessfully");
// });

var buttonColours=["red","blue","green","yello"];
var gamePattern =[];
var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function()
  {
     var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userChosenColour.length-1);
  });
  // $(".btn").keypress(function(event){
  //   nextSequence(event.key);
  // });

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function nextSequence()
{
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

var randomNumber=Math.floor(Math.random()*4);
var randomChoesnColour=buttonColours[randomNumber];

gamePattern.push(randomChoesnColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(userChosenColour);

}
function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");

    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
  }

}
 function startOver()
 {
   level=0;
   gamePattern=[];
   started= false;
 }


// $button = $('#' + nextSequence());
// $("#randomChosenColour").ready(() => {
//     setInterval(() => {
//         $("button").fadeIn();
//         $("button").fadeOut();
//     }, 500);
// });
