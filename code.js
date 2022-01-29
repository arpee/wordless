game = {};
game.target = [];
game.guess = [];
game.rc = 0;
game.lc = 0;
var targetWords;
var el;
wordSel();
var colors = [];
document.addEventListener('keyup', logkey);

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
    if (allWords.includes(nice.toLowerCase()) == true) {
        colorWord();
    } else alert("That is not a word!");
}

function wordSel() {
    game.target = targetWords[Math.floor(Math.random() * 202)];
    game.target = game.target.toUpperCase().split("");
    console.log(game.target);
}

var letterDiv;
function colorWord() {
    var tword = game.target.join("");
    for (i = 0; i <= 4; i++) {
        letterDiv = document.querySelector(".r" + game.rc + ".c" + i);
        if (tword[i] == game.guess[i]) {
            letterDiv.classList.add('green');
            tword = tword.replace(game.guess[i], "");
            console.log(tword);
        }
    }
    for (i = 0; i <= 4; i++) {
        letterDiv = document.querySelector(".r" + game.rc + ".c" + i);
        if (tword.includes(game.guess[i])) {
            letterDiv.classList.add('yellow');
            tword = tword.replace(game.guess[i], "");
            console.log(tword);
        }
    }

}