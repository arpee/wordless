game = {};
game.target = [];
game.guess = [];
game.rc = 0;
game.lc = 0;
game.green = [];
var targetWords;
var el;
wordSel();
var colors = [];
document.addEventListener('keyup', logkey);

function attachEvents() {
    var k = {};
    document.querySelectorAll(".kkey").forEach(kkey => {
        kkey.addEventListener("click", (e) => {
            k.key = e.target.id.split("-")[0];
            k.keyCode = e.target.id.split("-")[1];
            console.log(k);
            logkey(k);
        });
    });
}

attachEvents();

function logkey(e) {
    console.log(e.keyCode);
    console.log(e.keyCode + 3);

    if (e.keyCode == 8) {
        backspace();
    }
    if (e.keyCode == 13 && game.lc == 5) {
        enter();
    }
    if (e.keyCode >= 65 && e.keyCode <= 90 && game.lc <= 4) {
        console.log("addletter");
        addLetter(e.key.toUpperCase());
    }
    console.log(e);
    console.log(e.key.toUpperCase());
}

function addLetter(l) {
    l = l.toUpperCase();
    el = document.querySelector('.r' + game.rc + '.c' + game.lc);
    game.guess.push(l);
    console.log(game.guess);
    el.innerHTML = l;
    game.lc++;
}

function backspace() {
    game.lc--;
    game.guess.pop();
    el = document.querySelector('.r' + game.rc + '.c' + game.lc);
    el.innerHTML = "";
}
var g;
var nice;

function enter() {
    console.log('check word');
    g = game.guess;
    nice = g.join("");
    if (allWords.includes(nice.toLowerCase())) {
        colorWord();
    } else {
        alert("That is not a word!");
    }
}

function wordSel() {
    game.target = targetWords[Math.floor(Math.random() * 202)];
    game.target = game.target.toUpperCase().split("");
    console.log(game.target);
}

var letterDiv;
function colorWord() {
    var tword = [];
    tword = Array.from(game.target);
    var gword = [];
    gword = Array.from(game.guess);
    for (i = 0; i <= 4; i++) {
        letterDiv = document.querySelector(".r" + game.rc + ".c" + i);
        if (tword[i] == gword[i]) {
            letterDiv.classList.add('green');
            gword[i] = "-";
            tword[i] = "_";
        }
    }
    for (j = 0; j <= 4; j++) {
        letterDiv = document.querySelector(".r" + game.rc + ".c" + j);
        if (tword.includes(gword[j])) {
            letterDiv.classList.add('yellow');
            tword[i] = "_";
        }
    }
    if (game.guess.toString() == game.target.toString()) {
        win();
    }
    game.rc++;
    game.lc = 0;
    nice = "";
    g = [];
    game.guess = [];
    if (game.rc == 6){
        loses();
    }
}

function win() {
    alert("Good work! You WIN!");
    
}

function loses() {
    alert("You lossed :( Try again if you want to win");
}