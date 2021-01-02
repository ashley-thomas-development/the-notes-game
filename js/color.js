/* Color changing functions for Arnold's Game */

/* CHALLENGE CONDITIONS */

function hardMode1() {

    if (currentRound > 5 && Math.ceil(Math.random() * 2) === 1) {
        $(".anim_color-change").on("click", function () {
            $(this).css("backgroundColor", colorGen);
        });
    } else {
        $(".anim_color-change").off("click", function () {
            $(this).css("backgroundColor", colorGen);
        });
    }

}


/* COLOR CHANGING FUNCTIONS AND ASSIGNMENTS */

// Random color generator
function colorGen() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let colorValue = "rgb(" + r + ", " + g + ", " + b + ")";

    return colorValue;
}

// Random color assignment for Hard/Party mode
function colorChgRound() {
    $(".anim_sq-glow").css("backgroundColor", colorGen);
}

// Screen element color change click listeners
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

$("#meter").on("dblclick", function () {
    let elem = $(this);
    colorGrad(elem);
});

$("#header").on("dblclick", function () {
    let elem = $(this);
    colorGrad(elem);
});

// Change color and getComputedStyle during shift
function colorGrad(elem) {
    elem.css("backgroundColor", colorGen);
    var colorShift = setInterval(function () {
        elem.css("backgroundColor", colorGen);
    }, 7000);

    elem.on("click", function () {
        clearInterval(colorShift);
        let x = event.currentTarget;
        let y = getComputedStyle(x, null).getPropertyValue("background-color");
        elem.css("backgroundColor", y);
    });
}


/* COLOR RESET BUTTON */

$(".color-reset-btn").mouseover(function () {
    instructions(6);
});

$(".color-reset-btn").click(function (event) {
    event.stopPropagation();
    $(".color-square1").css("backgroundColor", "red");
    $(".color-square2").css("backgroundColor", "green");
    $(".color-square3").css("backgroundColor", "yellow");
    $(".color-square4").css("backgroundColor", "blue");
    $(".item1").css("backgroundColor", "var(--pink)");
    $(".item3").css("backgroundColor", "var(--lightgrey)");
    $(".item8").css("backgroundColor", "var(--lightgrey)");
    $(".item9").css("backgroundColor", "var(--lightgrey)");
    $(".item11").css("backgroundColor", "var(--lightgrey)");
    if ( arnoldBool == false ) {
        $("#forceArnold").css("color", "var(--theme-blue)");
    }
});


/* PARTY MODE OPTIONS */

const colorSqArray = [$('#sq1-box'), $('#sq2-box'), $('#sq4-box'), $('#sq3-box')];

let partyTimer;
let partyCounter = 0;
let partyState = true;
let interval = 1000;

// Gradually increases rate of change of color squares 
function partyTimerInterval() {

    if (interval <= 2) {
        interval = 1;
        document.getElementById("partyBtn").innerText = "Max Speed!";
    } else if (interval <= 50) {
        interval = interval - 8;
    } else if (interval <= 200) {
        interval = interval - 25;
    } else {
        interval = 1100 - (currentLevel * 100);
    }

}

function partyGameover() {
    interval = 1000;

    if (partyState == false) {
        partyToggle();
    }

}

function partyToggle() {

    if (partyState == true) {
        partyStarted();
        partyState = false;
        document.getElementById("partyBtn").innerText = "Stop Party";
    } else {
        partysOver();
        partyState = true;
        document.getElementById("partyBtn").innerText = "Party Mode";
    }

}

function partyTempoUp() {

    if (partyState == false) {
        partysOver();
        partyTimerInterval();
        partyStarted();
    }

}

function partyShift() {
    colorSqArray[partyCounter].css("backgroundColor", colorGen);

    if (partyCounter === 3) {
        partyCounter = 0;
    } else {
        partyCounter++;
    }

}

function partyStarted() {
    partyTimer = setInterval(partyShift, interval)
}

function partysOver() {
    clearInterval(partyTimer);
}


/* || END of document */