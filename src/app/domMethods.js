const playerBoard = document.querySelector(".player-board");
const comBoard = document.querySelector(".com-board");

function createBoard(board, boardSize) {
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

export { createBoard };
