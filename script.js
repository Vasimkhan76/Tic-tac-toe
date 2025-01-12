const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (boardState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  boardState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add("taken");

  checkForWinner();

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkForWinner() {
  let winner = null;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      winner = boardState[a];
      break;
    }
  }

  if (winner) {
    gameActive = false;
    statusDisplay.textContent = `${winner} Wins!`;
  } else if (!boardState.includes("")) {
    gameActive = false;
    statusDisplay.textContent = "It's a Draw!";
  } else {
    statusDisplay.textContent = `${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.textContent = `${currentPlayer}'s Turn`;

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);
