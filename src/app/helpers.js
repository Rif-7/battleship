import { hightlightBoard } from "./domMethods";

function shipPositionHandler(ship, player, cords, direction) {
  ship.setPositions(cords, direction);
  const positions = ship.positions;
  ship.positions = [];

  for (let i = 0; i < ship.body.length; i++) {
    const currentCords = positions[i];
    if (player.gameBoard.isShip(currentCords[0], currentCords[1])) {
      return false;
    }
  }

  ship.positions = positions;

  if (!player.isValidPosition(ship)) {
    ship.positions = [];
    return false;
  }
  return true;
}

function createNewGame(player, resolve) {
  let shipIndex = 0;
  const previewBoard = document.querySelector(".preview-board");
  const playerShips = player.gameBoard.getShips();
  let currentShip = playerShips[shipIndex];
  let direction = "r";
  let highlightedCells = [];
  const shipNoInfo = document.querySelector(".ship-no");

  document.querySelector(".change-direction").addEventListener("click", () => {
    direction = direction === "r" ? "d" : "r";
  });

  shipNoInfo.textContent = `1/${playerShips.length}`;

  const cells = previewBoard.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const cordA = Number(cell.getAttribute("data-corda"));
    const cordB = Number(cell.getAttribute("data-cordb"));
    cell.addEventListener("mouseover", () => {
      const positions = currentShip.getPositions([cordA, cordB], direction);
      if (
        !player.checkPosition(positions.at(-1)) ||
        !shipPositionHandler(currentShip, player, [cordA, cordB], direction)
      ) {
        return;
      }
      hightlightBoard(previewBoard, positions);
      highlightedCells = [cell];
      for (let i = 1; i < positions.length; i++) {
        const currentCords = positions[i];
        const nextCell = previewBoard.querySelector(
          `.cell[data-corda='${currentCords[0]}'][data-cordb='${currentCords[1]}']`
        );
        if (nextCell) {
          highlightedCells.push(nextCell);
        }
      }
    });

    cell.addEventListener("mouseout", () => {
      highlightedCells.forEach((cell) => {
        cell.classList.remove("highlighted");
      });
      highlightedCells = [];
    });

    cell.addEventListener("click", () => {
      if (shipPositionHandler(currentShip, player, [cordA, cordB], direction)) {
        hightlightBoard(previewBoard, currentShip.positions, "selected");
        highlightedCells = [];
        shipIndex++;
        shipNoInfo.textContent = `${shipIndex + 1}/${playerShips.length}`;
        if (shipIndex > playerShips.length - 1) {
          resolve("success");
          return;
        }
        currentShip = playerShips[shipIndex];
      }
    });
  });
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { shipPositionHandler, getRndInteger, createNewGame };
