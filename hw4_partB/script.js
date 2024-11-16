"use strict";

const popUp = document.querySelector(".pop-up");
const popUpBtn = document.querySelector(".pop-up__btnBegin");
const popUpheader = document.querySelector(".pop-up__header");
let panels = "";
let panelCover = "";
const btnNewGame = document.querySelector(".new-game");
const lv1 = document.querySelector(".level1");
const lv2 = document.querySelector(".level2");
const lv3 = document.querySelector(".level3");
const table = document.getElementById("main-table");
const resetGame = document.querySelector(".reset-game");

let randomArr = [];
const insertCell = `<tr>
<td>
  <div class="main-table__panel" draggable="false">
    <img class="panel-cover" src="./img/00.png" alt="" draggable="false">
  </div>
</td>
<td>
  <div class="main-table__panel" draggable="false">
    <img class="panel-cover" src="./img/00.png" alt="" draggable="false">
  </div>
</td>
<td>
  <div class="main-table__panel" draggable="false">
    <img class="panel-cover" src="./img/00.png" alt="" draggable="false">
  </div>
</td>
<td>
  <div class="main-table__panel" draggable="false">
    <img class="panel-cover" src="./img/00.png" alt="" draggable="false">
  </div>
</td>`;
const check = [];
let trackTime = 0;
let gameDuration = 120;
let timeMemorize = 3000;
let totalpanel = 0;

const updateTime = () => {
  trackTime += 1;
  if (trackTime >= gameDuration) {
    popUpheader.textContent = "Lost! Click Pokeball to Play Again";
    popUp.classList.remove("hidden");
    return;
  }
};

const randomize = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const ran = Math.floor(Math.random() * arr.length - 1) + 1;
    [arr[i], arr[ran]] = [arr[ran], arr[i]];
  }
};

const addImage = () => {
  randomize(randomArr);
  for (let i = 0; i < panels.length; i++) {
    panels[i].style.backgroundImage = `url(./img/${randomArr[i]}.png)`;
    panelCover[i].classList.add("hide");
  }
};

const hidePanel = () => {
  for (let i = 0; i < panels.length; i++) {
    panelCover[i].classList.remove("hide");
  }
};

const setNewGame = () => {
  panels.forEach((element) => {
    element.classList.remove("hidden");
  });
};

const game = function () {
  let count = 0;
  for (let i = 0; i < panelCover.length; i++) {
    panelCover[i].addEventListener("click", function clickFunction() {
      check.push(i);
      panelCover[i].classList.add("hide");
      panels[i].classList.toggle("highlight");
      if (
        randomArr[check[0]] === randomArr[check[1]] &&
        panels[check[0]] !== panels[check[1]]
      ) {
        panels[check[0]].classList.add("hidden");
        panels[check[1]].classList.add("hidden");
        count += 2;
      }
      if (check.length === 2) {
        panelCover[check[0]].classList.remove("hide");
        panelCover[check[1]].classList.remove("hide");
        panels[check[0]].classList.remove("highlight");
        panels[check[1]].classList.remove("highlight");
        check.length = 0;
      }
      if (count === panels.length) {
        popUp.classList.remove("hidden");
        return;
      }
    });
  }
};

btnNewGame.addEventListener("click", function () {
  btnNewGame.disabled = true;
  setNewGame();
  addImage();
  setTimeout(hidePanel, timeMemorize);
  game();
});

popUpBtn.addEventListener("click", function () {
  popUp.classList.add("hidden");
  location.reload();
});

lv1.addEventListener("click", function () {
  timeMemorize = 3000;
  randomArr = [0, 0, 1, 1, 2, 2, 3, 3];
  gameDuration = 120;
  lv2.disabled = true;
  lv3.disabled = true;
  btnNewGame.disabled = false;
  panels = document.querySelectorAll(".main-table__panel");
  panelCover = document.querySelectorAll(".panel-cover");
});

lv2.addEventListener("click", function () {
  timeMemorize = 5000;
  randomArr = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  gameDuration = 150;
  lv1.disabled = true;
  lv3.disabled = true;
  btnNewGame.disabled = false;
  table.innerHTML += insertCell;
  panels = document.querySelectorAll(".main-table__panel");
  panelCover = document.querySelectorAll(".panel-cover");
});

lv3.addEventListener("click", function () {
  timeMemorize = 8000;
  randomArr = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
  gameDuration = 180;
  lv1.disabled = true;
  lv2.disabled = true;
  btnNewGame.disabled = false;
  table.innerHTML += insertCell + insertCell;
  panels = document.querySelectorAll(".main-table__panel");
  panelCover = document.querySelectorAll(".panel-cover");
});

resetGame.addEventListener("click", function () {
  location.reload();
});

btnNewGame.disabled = true;
