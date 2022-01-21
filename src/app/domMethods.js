const boardSize = 10;
const playerBoard = document.querySelector(".player-board");
const comBoard = document.querySelector(".com-board");

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

function addListenerForComBoard(com, cb) {
  const cells = comBoard.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const cordA = cell.getAttribute("data-corda");
    const cordB = cell.getAttribute("data-cordb");
    cell.addEventListener(
      "click",
      () => {
        const result = com.gameBoard.recieveAttack(
          Number(cordA),
          Number(cordB)
        );
        if (result) {
          cell.style.backgroundColor = "red";
        } else {
          cell.style.backgroundColor = "green";
        }
        cb();
      },
      { once: true }
    );
  });
}

function makeComMove(cordA, cordB, result) {
  const cell = playerBoard.querySelector(
    `.cell[data-corda='${cordA}'][data-cordb='${cordB}']`
  );
  if (result) {
    cell.style.backgroundColor = "red";
  } else {
    cell.style.backgroundColor = "green";
  }
}

function initDom() {
  displayModal();

  createBoard(playerBoard);
  createBoard(comBoard);
}

export {
  createBoard,
  initDom,
  hightlightBoard,
  addListenerForComBoard,
  makeComMove,
};
