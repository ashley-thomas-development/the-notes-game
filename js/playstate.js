/* Playstate functions and stages for Arnold's Game */

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
      sq1Sound.load();
      sq1Sound.play();
      currentAudio = sq1Sound;
      break;

    case "sq2":
      sq2Sound.load();
      sq2Sound.play();
      currentAudio = sq2Sound;
      break;

    case "sq3":
      sq3Sound.load();
      sq3Sound.play();
      currentAudio = sq3Sound;
      break;

    case "sq4":
      sq4Sound.load();
      sq4Sound.play();
      currentAudio = sq4Sound;
      break;

    default:
  }
}


/* PLAYSTATE - INVITE SCREEN */

$(".btn-invite").on("click", function () {
  var playBtn = $(this);
  playBtn.off("click");
  playButtonClickMove(playBtn);
  initializeGame();
});

function playButtonClickMove(playBtn) {
  playBtn.css("left", "-=2");
  playBtn.css("top", "+=3");
  playBtn.css("box-shadow", "-6px 2px 11px 3px var(--black)")

  setTimeout(function () {
    playBtn.css("left", "+=2");
    playBtn.css("top", "-=3");
    playBtn.css("box-shadow", "-8px 5px 11px 3px var(--black)")
  }, 60);

}

function invitePaneFade() {
  $(".ps-backdrop").addClass("is_invite-fade");
  $(".ps-invite-pane").addClass("is_invite-fade");

  setTimeout(function () {
    $(".ps-invite-pane").css("display", "none");
    $(".ps-invite-pane").removeClass("is_invite-fade");
    $(".ps-backdrop").removeClass("is_invite-fade");
    $(".ps-backdrop").css("display", "none");
  }, 2000);

}

function playButtonReset() {
  // resets event listener for invite button 
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
  arnoldsTurn();
}


/* ARNOLD'S TURN */

function arnoldsTurn() {
  let newNumber = Math.ceil(Math.random() * 4);

  // force Arnold to greet you politely
  if (player1Sounds == arnoldSounds && currentLevel == 1 ) {
    newNumber = 1;
  }

  // prevent Arnold from being mean too early in the game
  if (player1Sounds == arnoldSounds && currentLevel < 6 && newNumber === 3) {
    newNumber = 1;
  }

  // prevent 3 consecutive squares from occuring in the pattern
  if ( newNumber == sPat[sPat.length-1] && newNumber == sPat[sPat.length-2] ) {
    arnoldsTurn();
  } else {
    sPat.push(newNumber);
    sqId = "sq" + newNumber;
    squareActive();
    
    setTimeout(function () {
      playerTurn();
    }, 200);
    
  }
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
    if (arnoldBool == true) {
      arnoldModeSwitch();
    }    
    nextTurn();
    meterFill();
  } else if (sPat[sPat.length - (sPat.length - p1Pat.length) - 1] === p1Pat[p1Pat.length - 1]) {

    if (arnoldBool == true) {
      arnoldModeSwitch();
    }

    currentRound++;
    hardMode1();
  } else {
    currentAudio.pause(); // currently not working
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
    message();
  }, 2000);

  setTimeout(function () {
    arnoldsTurn();
    waitAnimate();
  }, 2000 + (Math.ceil(Math.random() * 3) * 1000));

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
  $(".ps-backdrop").css("display", "block");
  $(".ps-death-pane").removeClass("anim_death-pane");
  arnoldBankPicker();
});

function deathScreen() {
  let gameOver = new Audio(player1Sounds[4]);
  setTimeout(function () {
    gameOver.play();
  }, 250);
  $(".ps-death-pane").css("display", "block");
  $(".ps-death-pane").addClass("anim_death-pane");
}


/* END of document */