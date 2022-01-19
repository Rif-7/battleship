const boardSize = 10;

function createBoard(board) {
  board.innerHTML = "";
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
  previewBoard.innerHTML = "";
  createBoard(previewBoard, 10);
}

function hightlightBoard(board, cords) {
  for (let i = 0; i < cords.length; i++) {
    const currentCords = cords[i];
    const cell = board.querySelector(
      `.cell[data-corda='${currentCords[0]}'][data-cordb='${currentCords[1]}']`
    );
    cell.classList.add("highlighted");
  }
}

function initDom() {
  displayModal();
}

export { createBoard, initDom, hightlightBoard };
