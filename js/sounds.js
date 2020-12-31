/* Sound array and picker functions for "The Arnold Game"            

/* SOUNDS ARRAYS AND PICKER */

function arnoldBankPicker() {
    player1Sounds = arnoldBank[Math.floor(Math.random() * 14)];
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

    $("#forceArnold").css("color", colorGen);
});

var arnoldSounds = [
    "sounds/arnoldBank1/how-are-u.mp3", 
    "sounds/arnoldBank1/howdy.mp3", 
    "sounds/arnoldBank1/idiot.mp3", 
    "sounds/arnoldBank1/sorry-2.mp3", 
    "sounds/arnoldBank1/hasta.mp3"
] 
 
var arnoldSounds2 = [ 
    "sounds/arnoldBank2/do-it-now.mp3", 
    "sounds/arnoldBank2/answer-the-question.mp3", 
    "sounds/arnoldBank2/answered-immediately.mp3", 
    "sounds/arnoldBank2/i-want-to-ask-you-a-bunch-of-q.mp3",
    "sounds/arnoldBank2/who-is-your-daddy.mp3"
]
 
var arnoldSounds3 = [ 
    "sounds/arnoldBank3/cookies.mp3", 
    "sounds/arnoldBank3/pasta.mp3", 
    "sounds/arnoldBank3/dont-u-understand.mp3", 
    "sounds/arnoldBank3/im-hungry.mp3", 
    "sounds/arnoldBank3/who-told-you-eat-my-cookies.mp3"
]

var arnoldSounds4 = [
    "sounds/arnoldBank4/hello.mp3", 
    "sounds/arnoldBank4/i-hear-you.mp3", 
    "sounds/arnoldBank4/its-me.mp3", 
    "sounds/arnoldBank4/who-are-you.mp3", 
    "sounds/arnoldBank4/i-dont-know-you-i-dont-answer.mp3"
]

var arnoldSounds5 = [
    "sounds/arnoldBank5/boris.mp3",
    "sounds/arnoldBank5/hauser.mp3",
    "sounds/arnoldBank5/quaid-2.mp3",
    "sounds/arnoldBank5/who-is-it-this-time.mp3",
    "sounds/arnoldBank5/get-ready-for-the-big-surprise.mp3"
]

var arnoldSounds6 = [
    "sounds/arnoldBank6/get-your-mother-please.mp3",
    "sounds/arnoldBank6/just-do-it.mp3",
    "sounds/arnoldBank6/plz-get-ur-mother.mp3",
    "sounds/arnoldBank6/stop-whining.mp3",
    "sounds/arnoldBank6/you-think-im-funny.mp3"
]

var arnoldSounds7 = [
    "sounds/arnoldBank7/go-on.mp3",
    "sounds/arnoldBank7/i-dont-know.mp3",
    "sounds/arnoldBank7/whats-going-on1.mp3",
    "sounds/arnoldBank7/why-not.mp3",
    "sounds/arnoldBank7/going-on-right-now.mp3"
]

var arnoldSounds8 = [
    "sounds/arnoldBank8/just-doing-my-job.mp3",
    "sounds/arnoldBank8/im-a-construction-worker.mp3",
    "sounds/arnoldBank8/im-a-police-officer.mp3",
    "sounds/arnoldBank8/im-a-terminator.mp3",
    "sounds/arnoldBank8/first-i-would-like-to-get-to-know-you.mp3"
]

var arnoldSounds9 = [
    "sounds/arnoldBank9/aliens.mp3",
    "sounds/arnoldBank9/disgusting (2).mp3",
    "sounds/arnoldBank9/dont-be-ridiculous.mp3",
    "sounds/arnoldBank9/no-it-is-not-true.mp3",
    "sounds/arnoldBank9/i-was-wrong-i-am-sorry.mp3"
]

var arnoldSounds10 = [
    "sounds/arnoldBank10/no-no-no-no.mp3",
    "sounds/arnoldBank10/no.mp3",
    "sounds/arnoldBank10/oh-no.mp3",
    "sounds/arnoldBank10/stop-it.mp3",
    "sounds/arnoldBank10/i-rather-dont-talk-about-it.mp3"
]

var arnoldSounds11 = [
    "sounds/arnoldBank11/do-you-hear-what-i-said.mp3",
    "sounds/arnoldBank6/stop-whining.mp3",
    "sounds/arnoldBank11/you-lack-discipline.mp3",
    "sounds/arnoldBank11/you.mp3",
    "sounds/arnoldBank11/you-are-mine-now.mp3",
]

var arnoldSounds12 = [
    "sounds/arnoldBank12/da-na-na-na.mp3",
    "sounds/arnoldBank12/hello-cutiepie.mp3",
    "sounds/arnoldBank12/meet-me-halfway.mp3",
    "sounds/arnoldBank12/no-deal.mp3",
    "sounds/arnoldBank12/take-out-the-papers.mp3"
]

var arnoldSounds13 = [
    "sounds/arnoldBank13/just-do-what-i-tell-you.mp3",
    "sounds/arnoldBank13/no-im-not-interested.mp3",
    "sounds/arnoldBank13/whats-2-week-package.mp3",
    "sounds/arnoldBank13/why-would-i-lie-to-you.mp3",
    "sounds/arnoldBank13/part-of-the-delightful-vacation.mp3",
]

var arnoldSounds14 = [
    "sounds/arnoldBank14/dont-worry.mp3",
    "sounds/arnoldBank14/immediately.mp3",
    "sounds/arnoldBank14/douglas-quaid.mp3",
    "sounds/arnoldBank14/yeah.mp3",
    "sounds/arnoldBank14/tan.mp3",
]

arnoldBank = [arnoldSounds, arnoldSounds2, arnoldSounds3, arnoldSounds4, arnoldSounds5, arnoldSounds6, arnoldSounds7, arnoldSounds8, arnoldSounds9, arnoldSounds10, arnoldSounds11, arnoldSounds12, arnoldSounds13, arnoldSounds14 ];

/*

// Potential in future to implement other 90's kid soundbanks such as... 

function soundBankPicker() {

    if (Math.ceil(Math.random() * 3) === 1) { 
        player1Sounds = starTrekSounds; 
    } else if (Math.ceil(Math.random() * 3) === 2) { 
        player1Sounds = arnoldSounds; 
    } else { 
        player1Sounds = marioSounds; 
    } 

} 


var marioSounds = [
    "sounds/mario/smb_1-up.wav", 
    "sounds/mario/smb_bump.wav", 
    "sounds/mario/smb_coin.wav", 
    "sounds/mario/smb_fireball.wav", 
    "sounds/mario/smb_gameover.wav"
]

var starTrekSounds = [
    "sounds/tng/alert03.mp3", 
    "sounds/tng/computerbeep_4.mp3", 
    "sounds/tng/computerbeep_59.mp3", 
    "sounds/tng/computerbeep_42.mp3", 
    "sounds/tng/autodestructsequencearmed_ep.mp3",
]

*/

/* END of document */