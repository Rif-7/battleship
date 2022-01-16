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
    if (direction === "r") {
      for (let i = 0; i < this.body.length; i++) {
        this.positions.push([start[0], start[1] + i]);
      }
    } else if (direction === "l") {
      for (let i = 0; i < this.body.length; i++) {
        this.positions.push([start[0], start[1] - i]);
      }
    } else if (direction === "u") {
      for (let i = 0; i < this.body.length; i++) {
        this.positions.push([start[0] - i, start[1]]);
      }
    } else if (direction === "d") {
      for (let i = 0; i < this.body.length; i++) {
        this.positions.push([start[0] + i, start[1]]);
      }
    }
  }

  isSunk() {
    if (this.body.includes(false)) {
      return false;
    }
    return true;
  }
}

function gameBoard() {
  const ships = [];

  function addShip(ship) {
    ships.push(ship);
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
  return { isShip, addShip };
}

export { Ship, gameBoard };
