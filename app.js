let gameSeq = [];
let userSeq = [];

let btns = ["red", "purple", "yellow", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on keypress (desktop) OR tap on the heading/body (mobile)
function startGame() {
    if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
}

document.addEventListener("keypress", startGame);

// Tap anywhere on screen to start (mobile support)
document.addEventListener("touchstart", function (e) {
    // Only trigger start if tapping outside the game buttons
    if (!e.target.classList.contains("btn")) {
        startGame();
    }
});

// Also allow clicking the h2 prompt directly
h2.addEventListener("click", startGame);

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! <b>Your Score Was ${level}</b> <br>Press any key or tap to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 170);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
    // Touch support for each button
    btn.addEventListener("touchstart", function (e) {
        e.preventDefault(); // Prevent ghost click on mobile
        btnPress.call(this);
    });
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
