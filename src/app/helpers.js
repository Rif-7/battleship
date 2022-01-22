import { hightlightBoard } from "./domMethods";

function shipPositionHandler(ship, player, cords, direction) {
  ship.setPositions(cords, direction);
  const positions = ship.positions;
  ship.positions = [];

  for (let i = 0; i < ship.body.length; i++) {
    const currentCords = positions[i];
    if (player.gameBoard.isShip(currentCords[0], currentCords[1])) {
      alert("There is already a ship there");
      return false;
    }
  }

  ship.positions = positions;

  if (!player.isValidPosition(ship)) {
    ship.positions = [];
    alert("Invalid Position");
    return false;
  }
  return true;
}

function createNewGame(player, resolve) {
  let shipIndex = 0;
  const previewBoard = document.querySelector(".preview-board");
  const setShip = document.querySelector(".set-ship");

  document.querySelector(".ship-name").textContent =
    player.gameBoard.getShips()[shipIndex].name;

  setShip.addEventListener("click", function handler() {
    const cordA = Number(document.getElementById("cordA").value);
    const cordB = Number(document.getElementById("cordB").value);
    const direction = document.getElementById("direction").value;

    const ship = player.gameBoard.getShips()[shipIndex];
    const result = shipPositionHandler(ship, player, [cordA, cordB], direction);
    if (!result) return;

    shipIndex++;
    hightlightBoard(previewBoard, ship.positions);

    if (shipIndex > player.gameBoard.getShips().length - 1) {
      setShip.removeEventListener("click", handler);
      resolve("Success");
      return;
    }
    document.querySelector(".ship-name").textContent =
      player.gameBoard.getShips()[shipIndex].name;
  });
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { shipPositionHandler, getRndInteger, createNewGame };
