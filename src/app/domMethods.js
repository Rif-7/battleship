const boardSize = 10;

function createBoard(board) {
  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-cordA", i);
      cell.setAttribute("data-cordB", j);
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

function displayModal() {
  const modal = document.querySelector(".new-game-modal");
  modal.style.display = "block";
  const previewBoard = document.querySelector(".preview-board");
  createBoard(previewBoard, 10);
}

function initDom() {
  const startBtn = document.querySelector(".start-btn");
  startBtn.addEventListener("click", displayModal);
  const playerBoard = document.querySelector(".player-board");
  const comBoard = document.querySelector(".com-board");
  createBoard(playerBoard);
  createBoard(comBoard);
}

export { createBoard, initDom };
