/* Timer, Limit Meter, Level Box, High Scores forp Arnold's Game */

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


/* LIMIT METER */

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


/* LIMIT BREAKS */

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
    meterReset();
}


/* LIMIT BREAK - REPLAY */

function replay() {
    let position = 0;

    function listArnoldPat() {
        sqId = ("sq" + sPat[position]);
        squareActive();
        position++;
    }

    for (let i = 0; i < sPat.length; i++) {
        setTimeout(function () {
            listArnoldPat();
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

    if (coDisplayCheck == "display: block;") {
        limitOn();
        clearCO.css("display", "none");
        replayCO.css("display", "none");
    }

    meterReset();
}


/* LEVEL BOX*/

function levelBox() {
    $(".level-num").addClass("is_level-num-change");

    setTimeout(function () {
        $(".level-num").text(currentLevel);
    }, 500);

    $(".level-num").on("animationend", function () {
        $(this).removeClass("is_level-num-change");
    });
}


/* BOX SCORES */

function highScore() {

    if (currentLevel === 1 && currentRound === 1) {
        player1LastScore = 0;
    }

    if (player1LastScore > player1HighScore) {
        player1HighScore = player1LastScore;
    }

}

function scorePush() {
    $("#player1ScoreBox1").text("Lvl " + player1LastScore);
    $("#player1HighScore").text("Lvl " + player1HighScore);
    pastScores();
}

function pastScores() {
    scoreHist.push(player1LastScore);

    if (scoreHist.length > 1) {
        $("#player1ScoreBox2").text("Lvl " + scoreHist[scoreHist.length - 2]);
    }

    if (scoreHist.length > 2) {
        $("#player1ScoreBox3").text("Lvl " + scoreHist[scoreHist.length - 3]);
    }

    if (scoreHist.length > 3) {
        $("#player1ScoreBox4").text("Lvl " + scoreHist[scoreHist.length - 4]);
    }

    if (scoreHist.length > 4) {
        $("#player1ScoreBox5").text("Lvl " + scoreHist[scoreHist.length - 5]);
    }

}


/* END of document */