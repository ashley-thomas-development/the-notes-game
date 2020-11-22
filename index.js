/* --- --- --- --- JavaScript for Simon's Game --- --- --- --- */

/* LIST OF VARIABLES AND ARRAYS */

let p1Pat = [];
let sPat = [];
let sqId = "";
let id = "";
let player1LastScore = 0;
let player1HighScore = 0;
let currentLevel = 1;
let currentRound = 1;
let scoreHist = [];
let currentAudio = "";
let player1LimitMeter = 0;
let player1Sounds = [];
let time = 0;
let meter = 0;
let turnLength = "";
let counter = "";


/* SOUNDS ARRAY AND PICKER */

function soundBankPicker() {
  if (Math.ceil(Math.random() * 3) === 1) {
    player1Sounds = starTrekSounds;
  } else if (Math.ceil(Math.random() * 3) === 2) {
    player1Sounds = arnoldSounds;
  } else {
    player1Sounds = marioSounds;
  }
}

var starTrekSounds = [
  "sounds/alert03.mp3",
  "sounds/computerbeep_4.mp3",
  "sounds/computerbeep_59.mp3",
  "sounds/computerbeep_42.mp3",
  "sounds/autodestructsequencearmed_ep.mp3",
]

var arnoldSounds = [
  "sounds/how-are-you.mp3",
  "sounds/howdy.mp3",
  "sounds/idiot.mp3",
  "sounds/sorry-2.mp3",
  "sounds/hasta.mp3",
]

var marioSounds = [
  "sounds/smb_1-up.wav",
  "sounds/smb_bump.wav",
  "sounds/smb_coin.wav",
  "sounds/smb_fireball.wav",
  "sounds/smb_gameover.wav",
]


/* SQUARE ANIMATION AND SOUND */

function squareActive() {
  $("#" + sqId + "-box").addClass("anim_sq-pulse");
  setTimeout(function () {
    $("#" + sqId + "-box").removeClass("anim_sq-pulse");
  }, 200);
  var sq1Sound = new Audio(player1Sounds[0]);
  var sq2Sound = new Audio(player1Sounds[1]);
  var sq3Sound = new Audio(player1Sounds[2]);
  var sq4Sound = new Audio(player1Sounds[3]);

  
  switch (sqId) {
    case "sq1":
      currentAudio = sq1Sound;
      sq1Sound.load();
      sq1Sound.play();
      break;

    case "sq2":
      currentAudio = sq2Sound;
      sq2Sound.load();
      sq2Sound.play();
      break;

    case "sq3":
      currentAudio = sq3Sound;
      sq3Sound.load();
      sq3Sound.play();

      break;

    case "sq4":
      currentAudio = sq4Sound;
      sq4Sound.load();
      sq4Sound.play();

      break;

    default:
  }
}



/* ------ GAME STAGES ------ */

/* INVITE SCREEN */

$(".btn-invite").on("click", function () {
  var playBtn = $(this);
  playBtn.off("click");
  playButtonClickMove(playBtn);
  initializeGame();
});

function playButtonClickMove(playBtn) {
  playBtn.css("left", "-=2");
  playBtn.css("top", "+=3");
  playBtn.css("box-shadow", "-6px 2px 15px var(--black), -6px 2px 6px 3px var(--black)")
  setTimeout(function () {
    playBtn.css("left", "+=2");
    playBtn.css("top", "-=3");
    playBtn.css("box-shadow", "-8px 5px 15px var(--black), -8px 5px 6px 3px var(--black)")
  }, 60);
}

function invitePaneFade() {
  $(".ps-invite-pane").addClass("is_invite-fade");
  setTimeout(function () {
    $(".ps-invite-pane").css("display", "none");
    $(".ps-invite-pane").removeClass("is_invite-fade");
  }, 2000);
}

function playButtonReset() {
  $(".btn-invite").on("click", function () {
    var playBtn = $(this);
    playBtn.off("click");
    playButtonClickMove(playBtn);
    initializeGame();
  });
}

/* START GAME */
function initializeGame() {
  invitePaneFade();
  soundBankPicker();
  setTimeout(function () {
    levelBox();
  }, 1700);
  currentLevel = 1;
  setTimeout(function () {
    instructions(2);
  }, 1000);
  setTimeout(function () {
    beginGame();
    playButtonReset();
  }, 4000);
}

function beginGame() {
  p1Pat = [];
  sPat = [];
  colorGrad($(".meter-fill-bar"));
  simonsTurn();
}


/* SIMON'S TURN */

function simonsTurn() {
  let newNumber = Math.ceil(Math.random() * 4);
  if (player1Sounds == arnoldSounds && currentLevel < 5 && newNumber === 3) {
    newNumber = 1;
  }
  sPat.push(newNumber);
  sqId = "sq" + newNumber;
  squareActive();
  setTimeout(function () {
    playerTurn();
  }, 200);
  
  
}


/* PLAYER'S TURN */

function playerTurn() {
  limitListenersOn();
  timerStart();
  $(".color-square1").on("click", function () {
    id = 1;
    squareClicked(id);
  });

  $(".color-square2").on("click", function () {
    id = 2;
    squareClicked(id);
  });

  $(".color-square3").on("click", function () {
    id = 3;
    squareClicked(id);
  });

  $(".color-square4").on("click", function () {
    id = 4;
    squareClicked(id);
  });

  function squareClicked(id) {
    sqId = ("sq" + id);
    p1Pat.push(id);
    squareActive();
    patCheck();
  }
}


/* PLAYER PATTERN VERIFICATION */

function patCheck() {
  if (sPat[sPat.length - (sPat.length - p1Pat.length) - 1] === p1Pat[p1Pat.length - 1] && p1Pat.length === sPat.length) {
    player1LastScore = p1Pat.length;
    timerStop();
    nextTurn();
    meterFill();
  } else if (sPat[sPat.length - (sPat.length - p1Pat.length) - 1] === p1Pat[p1Pat.length - 1]) {
    currentRound++;
    message();
    hardMode();
  } else {
    currentAudio.pause();
    gameOver();
  }
}


/* NEXT TURN */

function nextTurn() {
  $("#instructions-pop").removeClass("anim_instruct-pop");
  playerTurnEnd();
  currentLevel++;
  partyTempoUp();
  levelBox();
  currentRound = 1;
  instructions(1);
  setTimeout(function () {
    message(1);
  }, 2500);
  setTimeout(function () {
    simonsTurn();
    waitAnimate();
  }, 3000 + (Math.ceil(Math.random() * 4) * 1000));
}


function playerTurnEnd() {
  p1Pat = [];
  $(".color-square1").off("click");
  $(".color-square2").off("click");
  $(".color-square3").off("click");
  $(".color-square4").off("click");
  $(".meter-btn").off("click");
}

/* GAME OVER */

function gameOver() {
  timerStop();
  playerTurnEnd();
  partyGameover();
  carryOverState();
  deathScreen();
  highScore();
  scorePush();
  currentRound = 1;
  p1Pat = [];
  sPat = [];
  levelBox();
}


/* DEATH SCREEN */

$(".btn-death").click(function () {
  $(".ps-death-pane").css("display", "none");
  $(".ps-invite-pane").css("display", "block");
  $(".ps-death-pane").removeClass("anim_death-pane");
});

function deathScreen() {
  let gameOver = new Audio(player1Sounds[4]);
  gameOver.play();
  $(".ps-death-pane").css("display", "block");
  $(".ps-death-pane").addClass("anim_death-pane");
}

/* TIMER */

function timerStart() {
  time = 0;
  counter = setInterval(function () {
    time++;
    $(".meter-timer").text(time);
  }, 1000);
}

function timerStop() {
  turnLength = time;
  clearInterval(counter);
  $(".meter-timer").text("0");
}

/* METER AND LIMITBREAKS */

let clearBtn = $(".meter-btn-clear");
let replayBtn = $(".meter-btn-replay");
let clearCO = $(".meter-btn-clear-co");
let replayCO = $(".meter-btn-replay-co");

function currentGameLimitClick() {
  $(".meter-btn").css("display", "none");
  meterReset();
}

function carryOverClick() {
  clearCO.css("display", "none");
  replayCO.css("display", "none");
  clearBtn.addClass("is_active");
  replayBtn.addClass("is_active");
  meter = 0;
}

function limitOn() {
  clearBtn.css("display", "block");
  replayBtn.css("display", "block");
  clearBtn.addClass("is_active");
  replayBtn.addClass("is_active");
}

function meterReset() {
  meter = 0;
  $(".meter-fill-bar").css("height", "0");
}

function meterFill() {
  if (turnLength < currentLevel) {
    meter = meter + ((currentLevel - turnLength) - 1);
  }
  let x = (meter * 5);
  let y = "calc(" + x + "% - 20px)";
  $(".meter-fill-bar").css("height", y);

  let displayCheck = replayBtn.attr("style");

  if (meter >= 20 && displayCheck == "display: block;") {
    clearCO.css("display", "block");
    replayCO.css("display", "block");
    clearBtn.removeClass("is_active");
    replayBtn.removeClass("is_active");
  } else if (meter >= 20) {
    limitOn();
    instructions(3);
  }
}

/* LIMIT BREAK - REPLAY */

function replay() {
  let position = 0;

  function listSimonPat() {
    sqId = ("sq" + sPat[position]);
    squareActive();
    position++;
  }

  for (let i = 0; i < sPat.length; i++) {
    setTimeout(function () {
      listSimonPat();
    }, i * 1000);
  }
}

/* LIMIT BREAK - LISTENERS */
function limitListenersOn() {

clearBtn.click(function () {
  currentGameLimitClick();
  p1Pat = [];
  time = 0;
  instructions(4);
});

replayBtn.click(function () {
  currentGameLimitClick();
  replay();
  instructions(5);
});

clearCO.click(function () {
  carryOverClick();
  p1Pat = [];
  time = 0;
  instructions(4);
});

replayCO.click(function () {
  carryOverClick();
  replay();
  instructions(5);
});

}

/* CARRY-OVER LIMIT CHECK */

function carryOverState() {
  let coDisplayCheck = replayCO.attr("style");
  
  if (coDisplayCheck == "display: block;" ) {
    limitOn();
    clearCO.css("display", "none");
    replayCO.css("display", "none");    
  }
  meterReset();
}


/* ------ EVENTS AND VARIABLES ------ */

/* LEVEL, BOX SCORES, SCORE PUSH */

function levelBox() {
  $(".level-num").addClass("is_level-num-change");
  setTimeout(function () {
    $(".level-num").text(currentLevel);

  }, 500);
  $(".level-num").on("animationend", function () {
    $(this).removeClass("is_level-num-change");
  });
}

function highScore() {
  if (currentLevel === 1 && currentRound === 1) {
    player1LastScore = 0;
  }
  if (player1LastScore > player1HighScore) {
    player1HighScore = player1LastScore;
  }
}

function scorePush() {
  $("#player1ScoreBox1").text("Level " + player1LastScore);
  $("#player1HighScore").text("Level " + player1HighScore);
  pastScores();
}

function pastScores() {
  scoreHist.push(player1LastScore);
  if (scoreHist.length > 1) {
    $("#player1ScoreBox2").text("Level " + scoreHist[scoreHist.length - 2]);
  }
  if (scoreHist.length > 2) {
    $("#player1ScoreBox3").text("Level " + scoreHist[scoreHist.length - 3]);
  }
  if (scoreHist.length > 3) {
    $("#player1ScoreBox4").text("Level " + scoreHist[scoreHist.length - 4]);
  }
  if (scoreHist.length > 4) {
    $("#player1ScoreBox5").text("Level " + scoreHist[scoreHist.length - 5]);
  }
}


/* MESSAGE PANE */

function message(number) {

  switch (number) {
    case 1:
      $("#messages-pop").text("Wait for it ...");
      $("#messages-pop").css("opacity", "1");
      break;
    default:
  }

  if (currentRound > 5) {
    if (Math.ceil(Math.random() * 8) === 1) {
      $("#messages-pop").text("Oh, sorry bout that ...");
      msgAnimate();
      colorChgRound();
    }
  }

  if (currentRound === 10) {
    $("#messages-pop").text("Round 10!");
    msgAnimate();
  }

  if (currentRound === 15) {
    $("#messages-pop").text("You're Amazing!");
    msgAnimate();
  }

  if (currentRound === 20) {
    $("#messages-pop").text("Are you psychic?");
    msgAnimate();
  }

  if (currentRound === 25) {
    $("#messages-pop").text("You really should go do something else ...");
    msgAnimate();
  }

}

/* ONSCREEN TEXT ANIMATIONS */

function waitAnimate() {
  $("#messages-pop").addClass("anim_wait-pop");
  $("#messages-pop").on("animationend", function () {
    $(this).css("opacity", "0");
    $(this).removeClass("anim_wait-pop");
  });
}

function msgAnimate() {
  $("#messages-pop").addClass("anim_msg-pop");
  $("#messages-pop").on("animationend", function () {
    $(this).removeClass("anim_msg-pop");
  });
}

function instructFade() {
  $("#instructions-pop").addClass("anim_instruct-pop");
  $("#instructions-pop").on("animationend", function () {
    $(this).removeClass("anim_instruct-pop");
  });
}

/* INSTRUCTION PANE */

function instructions(number) {

  switch (number) {
    case 1:
      $("#instructions-pop").text("Next Level!");
      instructFade();
      break;

    case 2:
      $("#instructions-pop").text("Get Ready Milly!");
      instructFade();
      break;

    case 3:
      $("#instructions-pop").text("Choose carefully!");
      instructFade();
      break;

    case 4:
      $("#instructions-pop").text("Clear your pattern");
      instructFade();
      break;

    case 5:
      $("#instructions-pop").text("Follow closely ...");
      instructFade();
      break;

    case 6:
      $("#instructions-pop").text("Stop them first!");
      instructFade();
      break;

    default:
  }

}


clearBtn.mouseover(function () {
  instructions(4);
});
replayBtn.mouseover(function () {
  instructions(5);
});
clearCO.mouseover(function () {
  instructions(4);
});
replayCO.mouseover(function () {
  instructions(5);
});

/* CHALLENGE CONDITIONS */

function hardMode() {
  if (currentRound > 5 && Math.ceil(Math.random() * 2) === 1) {
    $(".color").on("click", function () {
      $(this).css("backgroundColor", colorGen);
    });
  } else {
    $(".color").off("click", function () {
      $(this).css("backgroundColor", colorGen);
    });
  }
}


/* RANDOM COLOR GENERATOR */

function colorGen() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let colorValue = "rgb(" + r + ", " + g + ", " + b + ")";
  return colorValue;
}


/* COLOR CHANGING FUNCTIONS AND ASSIGNMENTS */

function colorChgRound() {
  $(".anim_color-change").css("backgroundColor", colorGen);
}

$("#scores").on("dblclick", function () {
  let elem = $(this);
  colorGrad(elem);
});

$("#options").on("dblclick", function () {
  let elem = $(this);
  colorGrad(elem);
});

$("#level").on("dblclick", function () {
  let elem = $(this);
  colorGrad(elem);
});

$("#fill-bar").on("dblclick", function () {
  let elem = $(this);
  colorGrad(elem);
});

$("#header").on("dblclick", function () {
  let elem = $(this);
  colorGrad(elem);
});

function colorGrad(elem) {
  elem.css("backgroundColor", colorGen);
  var colorShift = setInterval(function () {
    elem.css("backgroundColor", colorGen);
  }, 8000);

  elem.on("click", function () {
    clearInterval(colorShift);
    let x = event.currentTarget;
    let y = getComputedStyle(x, null).getPropertyValue("background-color");
    console.log(y);
    elem.css("backgroundColor", y);
  });
}


/* COLOR RESET */

$(".color-reset-btn").mouseover(function () {
  instructions(6);
});


$(".color-reset-btn").click(function () {
  $(".color-square1").css("backgroundColor", "red");
  $(".color-square2").css("backgroundColor", "green");
  $(".color-square3").css("backgroundColor", "yellow");
  $(".color-square4").css("backgroundColor", "blue");
  $(".item1").css("backgroundColor", "var(--pink)");
  $(".item3").css("backgroundColor", "var(--lightgrey)");
  $(".item8").css("backgroundColor", "var(--lightgrey)");
  $(".item9").css("backgroundColor", "var(--lightgrey)");
  $(".item11").css("backgroundColor", "var(--lightgrey)");
});


/* COLOR SQUARE PARTY MODE */

const colorSqArray = [$('#sq1-box'), $('#sq2-box'), $('#sq4-box'), $('#sq3-box')];

let partyTimer;
let partyCounter = 0;
let partyTog = true;
let interval = 1000;

function partyTimerInterval() {
  if ( interval <= 2 ) {
    interval = 1;
    document.getElementById("partyBtn").innerText = "Max Speed!";
  } else if ( interval <= 50 ) {
    interval = interval - 8;
  } else if (interval <= 200 ) {
    interval = interval - 25;
  } else {
  interval = 1100 - (currentLevel * 100);
  }
}

function partyGameover() {
    interval = 1000;
    if (partyTog == false ) {
    partyToggle();
    }
}

function partyToggle() {
  if ( partyTog == true ) {
    partyStarted();
    partyTog = false;
    document.getElementById("partyBtn").innerText = "Too Much?";
  } else {
    partysOver();
    partyTog = true;
    document.getElementById("partyBtn").innerText = "Party On!";
  }
}

function partyTempoUp() {
  if ( partyTog == false ) {
    partysOver();
    partyTimerInterval();
    partyStarted();
  }
}



function partyShift() {
  colorSqArray[partyCounter].css("backgroundColor", colorGen);
  if ( partyCounter === 3) {
    partyCounter = 0;
  } else {
    partyCounter++;
  }
}

function partysOver() {
  clearInterval(partyTimer);
}

function partyStarted() {
  partyTimer = setInterval(partyShift, interval)
}