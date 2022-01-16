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

    function addPosition(cb) {
      for (let i = 0; i < this.body.length; i++) {
        this.positions.push(cb(start[0], start[1], i));
      }
    }

    switch (direction) {
      case "r":
        addPosition.call(this, (a, b, shift) => [a, b + shift]);
        break;
      case "l":
        addPosition.call(this, (a, b, shift) => [a, b - shift]);
        break;
      case "u":
        addPosition.call(this, (a, b, shift) => [a - shift, b]);
        break;
      case "d":
        addPosition.call(this, (a, b, shift) => [a + shift, b]);
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
