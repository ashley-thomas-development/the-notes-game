/* Sound array and picker functions for "The Arnold Game"            

/* SOUNDS ARRAYS AND PICKER */

function soundBankPicker() {

    if (Math.ceil(Math.random() * 3) === 1) { 
        player1Sounds = starTrekSounds; 
    } else if (Math.ceil(Math.random() * 3) === 2) { 
        player1Sounds = arnoldSounds; 
    } else { 
        player1Sounds = marioSounds; 
    } 

} 

function forceArnold() { 
    player1Sounds = arnoldSounds; 
} 

function arnoldModeSwitch() { 
    player1Sounds = arnoldBank[arnoldCounter]; 

    if (arnoldCounter == arnoldBank.length - 1) { 
        arnoldCounter = 0; 
    } else { 
        arnoldCounter++; 
    } 

}

$("#forceArnold").on("dblclick", function () { 
    $("#forceArnold").css("color", "red"); 
    arnoldBool = true; 
});

$("#forceArnold").on("click", function () {
    if (player1Sounds == arnoldSounds) {
        arnoldCounter++;
    }

    player1Sounds = arnoldBank[arnoldCounter];
    arnoldBool = false;
    $("#forceArnold").css("color", "var(--darkblue)");

    if (arnoldCounter == arnoldBank.length - 1) {
        arnoldCounter = 0;
    } else {
        arnoldCounter++;
    }

});

var arnoldSounds = [
    "sounds/arnold1/how-are-you.mp3", 
    "sounds/arnold1/howdy.mp3", 
    "sounds/arnold1/idiot.mp3", 
    "sounds/arnold1/sorry-2.mp3", 
    "sounds/arnold1/hasta.mp3", 
] 
 
var arnoldSounds2 = [ 
    "sounds/arnold2/pasta.mp3", 
    "sounds/arnold2/answer-the-question.mp3", 
    "sounds/arnold2/hauser.mp3", 
    "sounds/arnold2/who-are-you.mp3", 
    "sounds/arnold2/drink-bake.mp3", 
]
 
var arnoldSounds3 = [ 
    "sounds/arnold3/boris.mp3", 
    "sounds/arnold3/daddy.mp3", 
    "sounds/arnold3/quaid.mp3", 
    "sounds/arnold3/dont-worry.mp3", 
    "sounds/arnold3/tan.mp3", 
]

var arnoldSounds4 = [
    "sounds/arnold4/1.mp3", 
    "sounds/arnold4/2.mp3", 
    "sounds/arnold4/3.mp3", 
    "sounds/arnold4/4.mp3", 
    "sounds/arnold4/mars.mp3", 
]

var arnoldSounds5 = [
    "sounds/arnold5/i-wrk-alone.mp3",
    "sounds/arnold5/dont-u-understand.mp3",
    "sounds/arnold5/im-a-police-officer.mp3",
    "sounds/arnold5/what-wrong-with-that.mp3",
    "sounds/arnold5/i-was-wrong-i-am-sorry.mp3",
]

// var arnoldSounds6 = [

    
// ]

// var arnoldSounds7 = [

    
// ]

// var arnoldSounds8 = [

    
// ]

// var arnoldSounds9 = [

    
// ]

// var arnoldSounds10 = [

    
// ]


arnoldBank = [arnoldSounds, arnoldSounds2, arnoldSounds3, arnoldSounds4, arnoldSounds5, ];

var marioSounds = [
    "sounds/mario/smb_1-up.wav", 
    "sounds/mario/smb_bump.wav", 
    "sounds/mario/smb_coin.wav", 
    "sounds/mario/smb_fireball.wav", 
    "sounds/mario/smb_gameover.wav", 
]

var starTrekSounds = [
    "sounds/tng/alert03.mp3", 
    "sounds/tng/computerbeep_4.mp3", 
    "sounds/tng/computerbeep_59.mp3", 
    "sounds/tng/computerbeep_42.mp3", 
    "sounds/tng/autodestructsequencearmed_ep.mp3", 
]

                          
/* END of document */