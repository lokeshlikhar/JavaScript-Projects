let gameSeq = [];
let userSeq = [];
let allScore = [];

let started = false;
let level = 0;

document.addEventListener("keypress", function () {
  setTimeout(() => {
    if (started == false) {
      started = true;
      levelUp();
    }
  }, 150);
});

let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  if (started == false) {
    return;
  }
  let btn = this;

  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over !  Your score was  <b>${
      level - 1
    } </b> <br> press key to start new game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    let score = level - 1;
    allScore.push(score);
    reset();
  }
}
let newp = document.createElement("p");
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  let highScore = Math.max(...allScore);

  newp.innerText = `HighScore is ${highScore}`;
  newp.classList.add("p");
  document.body.appendChild(newp);
}
