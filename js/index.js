var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];

var gameRun = false;

const yellowAudio = new Audio("sounds/yellow.mp3");
const blueAudio = new Audio("sounds/blue.mp3");
const greenAudio = new Audio("sounds/green.mp3");
const redAudio = new Audio("sounds/red.mp3");
const wrongAudio = new Audio("sounds/wrong.mp3");

var userpress;

var lvl = 0;

function restartgame() {
  wrongAudio.play();
  $("h1").html("Game Over, Press Any Key To Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  gameRun = false;
  gamePattern = [];
  userPattern = [];
  lvl = 0;
}

function playSoundAndAnimate(chosenColor) {
  if (chosenColor == "green") {
    $("#green").addClass("pressed");
    greenAudio.play();
  } else if (chosenColor == "red") {
    $("#red").addClass("pressed");
    redAudio.play();
  } else if (chosenColor == "yellow") {
    $("#yellow").addClass("pressed");
    yellowAudio.play();
  } else if (chosenColor == "blue") {
    $("#blue").addClass("pressed");
    blueAudio.play();
  }

  var delayInMilliseconds = 100; //1 second

  setTimeout(function () {
    $("#blue").removeClass("pressed");
    $("#yellow").removeClass("pressed");
    $("#red").removeClass("pressed");
    $("#green").removeClass("pressed");
  }, delayInMilliseconds);
}

function nextSequence() {
  userPattern = [];
  lvl++;
  $("h1").html("Level " + lvl);
  var randomNum = Math.floor(Math.random() * 4);
  console.log(randomNum);

  var randomChosenColor = buttonColours[randomNum];

  gamePattern.push(randomChosenColor);

  playSoundAndAnimate(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userPattern[currentLevel]) {
    console.log("success");
    if (userPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    restartgame();
  }
}

$(".btn").click(function (event) {
  if (gameRun == true) {
    userpress = event.target.id;
    userPattern.push(userpress);
    console.log(userPattern);

    playSoundAndAnimate(userpress);
    checkAnswer(userPattern.length - 1);
  }
});

$("body").keypress(function () {
  if (gameRun == false) {
    gameRun = true;
    nextSequence();
  }
});
