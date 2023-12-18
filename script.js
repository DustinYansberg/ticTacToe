const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // mid row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left col
  [1, 4, 7], // mid col
  [2, 5, 8], // right col
  [0, 4, 8], // left diagonal
  [2, 4, 6], // right diagonal
];
const WINNING_MESSAGE = () => `Player ${oTurn ? "O" : "X"} Wins!`;
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winning_message_element = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
let oTurn;

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function startGame() {
  oTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
  });
  setBoardHoverClass();
}

startGame();

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(isDraw());
    //todo check for draw somehow
  }
  swapTurns();
  setBoardHoverClass();
}

function isDraw() {
  return [...cellElements].every((cell) => {
    console.log(cell.classList.contains(X_CLASS));
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  oTurn = !oTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    console.log("Draw!");
  } else {
    winning_message_element.innerText = WINNING_MESSAGE();
    document.getElementById("winningMessage").classList.add("show");
    restartButton.addEventListener("click", handleRestartClick);
  }
}

function handleRestartClick(e) {
  document.getElementById("winningMessage").classList.remove("show");
  startGame();
}
