function init() {
    console.log('initialising...');
    game = {};
    game.target = [];
    game.guess = [];
    game.rc = 0;
    game.lc = 0;
    game.streak = 0;
    game.wins = 0;
    game.loses = 0;
    game.width = 0;
    game.board = [];

    document.addEventListener('keyup', logkey);

    wordSel();
    generateBoard();
    drawBoard();
    drawKeyboard();
    attachEvents();

    document.querySelector(".Title").innerHTML = "Wordless";
}

function generateBoard() {
    let size = game.width * 6;
    for (i = 0; i < size; i++) {
        let c = {};
        c.id = i;
        c.row = Math.floor(i / game.width);
        c.col = i % game.width;
        game.board.push(c);
    }
    console.log(game.board);
}

function drawBoard() {
    let board = document.querySelector(".board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${game.width}, 1fr)`; //'repeat(' + this.game.size + ', 1fr)';

    game.board.forEach(cell => {
        let el = document.createElement("DIV");
        el.classList.add("grid-item");
        el.classList.add("r" + cell.row);
        el.classList.add("c" + cell.col);
        el.id = cell.id;
        board.append(el);
    });
}

function drawKeyboard() {
    var keyboardel = document.querySelector(".keyboard");
    keyboardel.innerHTML = keyboard;
}

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
    document.querySelector(".Title").addEventListener('click', init);
}

function logkey(e) {
    console.log(e.keyCode);
    console.log(e.keyCode + 3);

    if (e.keyCode == 8 && game.lc > 0) {
        backspace();
    }
    if (e.keyCode == 13 && game.lc == game.width) {
        enter();
    }
    if (e.keyCode >= 65 && e.keyCode <= 90 && game.lc <= game.width - 1) {
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

function enter() {
    var g;
    var nice;
    console.log('check word');
    g = game.guess;
    nice = g.join("");
    if (wordlist.includes(nice.toLowerCase())) {
        colorWord();
        console.log("mazing");
    } else {
        alert("That is not a word!");
    }
}

function wordSel() {
    game.target = targetWords[Math.floor(Math.random() * targetWords.length)];
    game.target = game.target.toUpperCase().split("");
    game.width = game.target.length;
    console.log(game.target);
}

function colorWord() {
    var letterDiv;
    var tword = [];
    tword = Array.from(game.target);
    var gword = [];
    gword = Array.from(game.guess);
    for (i = 0; i <= game.width - 1; i++) {
        letterDiv = document.querySelector(".r" + game.rc + ".c" + i);
        if (tword[i] == gword[i]) {
            letterDiv.classList.add("green");
            colorKey(gword[i], "green");
            gword[i] = "-";
            tword[i] = "_";
        }
    }
    for (j = 0; j <= game.width - 1; j++) {
        letterDiv = document.querySelector(".r" + game.rc + ".c" + j);
        if (tword.includes(gword[j])) {
            letterDiv.classList.add('yellow');
            colorKey(gword[j], "yellow");
            tword.splice(tword.indexOf(gword[j]), 1, "_");
            gword[j] = "-";
        } else if (!letterDiv.classList.contains('green')) {
            letterDiv.classList.add('black');
            colorKey(gword[j], "black");
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
    if (game.rc == 6) {
        loses();
    }
}

function colorKey(letter, color) {
    document.querySelectorAll(".kkey").forEach(kkey => {
        if (kkey.id.substring(0, 1).toUpperCase() == letter) {
            kkey.classList.add(color);
        }
    });
}

function newGame() {
    location.reload();
}

function win() {
    document.querySelector(".Title").innerHTML = "Winnner!";
    game.wins++;
    game.streak++;
}

function loses() {
    game.target.join("")
    alert("You lose. The word was " + game.target.join(""));
    game.loses++;
    game.streak = 0;
}

var keyboard = `
<div class="row-1">
<div class="kkey" id="q-81">Q</div>
<div class="kkey" id="w-87">W</div>
<div class="kkey" id="e-69">E</div>
<div class="kkey" id="r-82">R</div>
<div class="kkey" id="t-84">T</div>
<div class="kkey" id="y-89">Y</div>
<div class="kkey" id="u-85">U</div>
<div class="kkey" id="i-73">I</div>
<div class="kkey" id="o-79">O</div>
<div class="kkey" id="p-80">P</div>
</div>
<div class="row-2">
<div class="kkey" id="a-65">A</div>
<div class="kkey" id="s-83">S</div>
<div class="kkey" id="d-68">D</div>
<div class="kkey" id="f-70">F</div>
<div class="kkey" id="g-71">G</div>
<div class="kkey" id="h-72">H</div>
<div class="kkey" id="j-74">J</div>
<div class="kkey" id="k-75">K</div>
<div class="kkey" id="l-76">L</div>
</div>
<div class="row-3">
<div class="kkey" id="z-90">Z</div>
<div class="kkey" id="x-88">X</div>
<div class="kkey" id="c-67">C</div>
<div class="kkey" id="v-86">V</div>
<div class="kkey" id="b-66">B</div>
<div class="kkey" id="n-78">N</div>
<div class="kkey" id="m-77">M</div>
<div class="kkey" id="back-8">⌫</div>
<div class="kkey" id="enter-13">ENTER</div>
</div>
`

init();