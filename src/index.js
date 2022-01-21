import "./style.css";
import { createBoard, initDom, hightlightBoard } from "./app/domMethods";

class Ship {
  constructor(length, name = "ship") {
    this.name = name;
    this.body = Array.from({ length: length }).fill(false);
    this.positions = [];
  }

  hit(pos) {
    if (pos > this.body.length - 1) {
      throw new Error("Index out of range");
    }
    this.body[pos] = true;
    return this;
  }

  setPositions(start, direction) {
    this.positions = [];

    function _addPosition(cb) {
      for (let i = 0; i < this.body.length; i++) {
        this.positions.push(cb(start[0], start[1], i));
      }
    }

    switch (direction) {
      case "r":
        _addPosition.call(this, (a, b, shift) => [a, b + shift]);
        break;
      case "l":
        _addPosition.call(this, (a, b, shift) => [a, b - shift]);
        break;
      case "u":
        _addPosition.call(this, (a, b, shift) => [a - shift, b]);
        break;
      case "d":
        _addPosition.call(this, (a, b, shift) => [a + shift, b]);
        break;
      default:
        throw Error("Invaid direction specified");
    }
  }

  isSunk() {
    if (this.body.includes(false)) {
      return false;
    }
    return true;
  }
}

class Player {
  constructor() {
    this.gameBoard = gameBoard();
  }

  addShips() {
    this.gameBoard.addShip(new Ship(2, "Small Ship"));
    this.gameBoard.addShip(new Ship(3, "Medium Ship"));
    this.gameBoard.addShip(new Ship(4, "Large Ship"));
  }

  isValidPosition(ship) {
    const boardSize = this.gameBoard.boardSize;
    const lastIndex = ship.positions.at(-1);
    if (
      lastIndex[0] >= boardSize ||
      lastIndex[1] >= boardSize ||
      lastIndex[0] < 0 ||
      lastIndex[1] < 0
    ) {
      return false;
    }
    return true;
  }
}

class Com extends Player {
  makeRandomChoice() {
    const freeIndex = this.gameBoard.getFreeIndexes();
    if (!freeIndex.length) {
      return null;
    }
    const index = Math.floor(Math.random() * freeIndex.length);
    const choice = freeIndex[index];
    this.gameBoard.editFreeIndex(index);
    return choice;
  }

  positionShipRandomly(ship) {
    const direction = ["r", "l", "u", "d"][Math.floor(Math.random() * 4)];
    const boardSize = this.gameBoard.boardSize;
    const shipSize = ship.body.length;
    let cordA;
    let cordB;
    switch (direction) {
      case "r":
        cordA = getRndInteger(0, boardSize - 1);
        cordB = getRndInteger(0, boardSize - shipSize);
        break;
      case "l":
        cordA = getRndInteger(0, boardSize - 1);
        cordB = getRndInteger(shipSize, boardSize - 1);
        break;
      case "u":
        cordA = getRndInteger(shipSize, boardSize - 1);
        cordB = getRndInteger(0, boardSize - 1);
        break;
      case "d":
        cordA = getRndInteger(0, boardSize - shipSize);
        cordB = getRndInteger(0, boardSize - 1);
        break;
      default:
        throw Error("Invaid direction");
    }
    ship.setPositions([cordA, cordB], direction);
  }
}

function gameBoard() {
  const ships = [];
  const missedShots = [];
  const boardSize = 10;
  const freeIndexes = createFreeIndexes();

  const getMissedShots = () => missedShots;
  const getFreeIndexes = () => freeIndexes;
  const getShips = () => ships;

  function editFreeIndex(index) {
    freeIndexes.splice(index, 1);
  }

  function addShip(ship) {
    ships.push(ship);
  }

  function createFreeIndexes() {
    const indexes = [];
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        indexes.push([i, j]);
      }
    }
    return indexes;
  }

  function recieveAttack(cordA, cordB) {
    const containsShip = isShip(cordA, cordB);
    if (containsShip) {
      ships[containsShip.shipIndex].hit(containsShip.position);
      return true;
    }
    missedShots.push([cordA, cordB]);
    return false;
  }

  function isShip(cordA, cordB) {
    for (let i = 0; i < ships.length; i++) {
      const currentShip = ships[i];
      if (!currentShip.positions.length) {
        continue;
      }
      for (let j = 0; j < currentShip.body.length; j++) {
        const currentCords = currentShip.positions[j];
        if (currentCords[0] === cordA && currentCords[1] === cordB) {
          return { shipIndex: i, position: j };
        }
      }
    }
    return false;
  }

  function checkIfAllShipsSank() {
    return ships.every((ship) => ship.isSunk());
  }

  return {
    isShip,
    addShip,
    recieveAttack,
    getMissedShots,
    getFreeIndexes,
    editFreeIndex,
    getShips,
    boardSize,
  };
}

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
      document.querySelector(".done").style.display = "block";
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

function gameLoop() {
  const player = new Player();
  player.addShips();
  const com = new Com();
  com.addShips();

  initDom();
  const userSelection = new Promise(function (resolve) {
    createNewGame(player, resolve);
  });
  userSelection.then(function (result) {
    console.log(result);
  });
  com.set;
}

document.addEventListener("DOMContentLoaded", function () {
  gameLoop();

  const doneBtn = document.querySelector(".done");
  doneBtn.addEventListener("click", () => {
    const modal = document.querySelector(".new-game-modal");
    modal.style.display = "none";
  });
});

export { Ship, Com, Player, gameBoard };
