let menuShow = document.getElementById("menu");
let gameShow = document.getElementById("game");
let playSolo = document.getElementById("playSolo");
let playFriend = document.getElementById("playFriend");
let popup = document.getElementById("popup");
let winnerText = document.getElementById("winner");
let newGameBtn = document.getElementById("newGame");

playFriend.addEventListener("click", () => {
  menuShow.style.display = "none";
  gameShow.style.display = "block";
});

playSolo.addEventListener("click", () => {
  playSolo.style.textDecoration = "line-through";
  alert("Play Solo mode is not available yet.");
});

let backBtn = document.getElementById("back");
let optionBtn = document.querySelectorAll(".btn-option");
let resetBtn = document.getElementById("reset");

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const btnA = optionBtn[a].innerHTML;
    const btnB = optionBtn[b].innerHTML;
    const btnC = optionBtn[c].innerHTML;

    if (btnA && btnA === btnB && btnB === btnC) {
      return btnA;
    }
  }
  return null;
}

optionBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.innerHTML !== "") return; 
    btn.innerHTML = xTurn ? "X" : "O";
    btn.disabled = true;

    count++;

    const winner = checkWinner();

    if (winner) {
      winnerText.innerText = winner;
      popup.style.display = "block";

      optionBtn.forEach((b) => (b.disabled = true));
    } else if (count === 9) {
      winnerText.innerText = "No one";
      popup.style.display = "block";
    } else {
      xTurn = !xTurn;
    }
  });
});

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", () => {
  resetGame();
  popup.style.display = "none";
});

backBtn.addEventListener("click", () => {
  menuShow.style.display = "block";
  gameShow.style.display = "none";
  resetGame();
});

function resetGame() {
  optionBtn.forEach((btn) => {
    btn.innerHTML = "";
    btn.disabled = false;
  });
  xTurn = true;
  count = 0;
  popup.style.display = "none";
}
