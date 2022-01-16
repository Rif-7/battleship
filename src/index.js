import "./style.css";

class Ship {
  constructor(length) {
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

  makeRandomChoice() {
    const cordA = Math.floor(Math.random() * this.gameBoard.boardSize + 1);
    const cordB = Math.floor(Math.random() * this.gameBoard.boardSize + 1);
    return [cordA, cordB];
  }
}

function gameBoard() {
  const ships = [];
  const missedShots = [];
  const boardSize = 10;

  function addShip(ship) {
    ships.push(ship);
  }

  const getMissedShots = () => missedShots;

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

  return { isShip, addShip, recieveAttack, getMissedShots, boardSize };
}

export { Ship, gameBoard };
