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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { shipPositionHandler, getRndInteger };
