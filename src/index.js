import "./style.css";

class Ship {
  constructor(length) {
    this.body = Array.from({ length: length }).fill(false);
  }

  hit(pos) {
    if (pos > this.body.length - 1) {
      throw new Error("Index out of range");
    }
    this.body[pos] = true;
    return this;
  }

  isSunk() {
    if (this.body.includes(false)) {
      return false;
    }
    return true;
  }
}

export { Ship };
