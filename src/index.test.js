import { Ship, gameBoard } from "./index";

test("creating Ship object", () => {
  const ship = new Ship(4);
  expect(ship.body.length).toEqual(4);
});

test("testing Ship's hit method", () => {
  const ship = new Ship(3);
  ship.hit(0);
  expect(ship.body).toEqual([true, false, false]);
});

test("testing Ships's isSunk method", () => {
  const ship = new Ship(2);
  ship.hit(0);
  expect(ship.isSunk()).toBe(false);
  ship.hit(1);
  expect(ship.isSunk()).toBe(true);
});

test("testing Ship's hit method handling wrong indexes", () => {
  const ship = new Ship(3);
  expect(() => ship.hit(5)).toThrow();
});

test("testing Ship's setPositions function", () => {
  const ship = new Ship(2);
  ship.setPositions([0, 0], "r");
  expect(ship.positions).toEqual([
    [0, 0],
    [0, 1],
  ]);
  ship.setPositions([1, 1], "u");
  expect(ship.positions).toEqual([
    [1, 1],
    [0, 1],
  ]);
});

test("testing isShip function", () => {
  const ship = new Ship(2);
  ship.setPositions([0, 0], "r");
  const board = gameBoard();
  board.addShip(ship);
  expect(board.isShip(69, 69)).toBeFalsy();
  expect(board.isShip(0, 0)).toBeTruthy();
  expect(board.isShip(0, 1)).toEqual({
    shipIndex: 0,
    position: 1,
  });
});

test("testing recieveAttack handling hits", () => {
  const ship = new Ship(2);
  ship.setPositions([1, 1], "l");
  const board = gameBoard();
  board.addShip(ship);
  board.recieveAttack(1, 0);
  expect(ship.body).toEqual([false, true]);
  board.recieveAttack(1, 1);
  expect(ship.body).toEqual([true, true]);
});

test("testing recieveAttack handling missed shots", () => {
  const board = gameBoard();
  board.recieveAttack(1, 1);
  expect(board.getMissedShots()).toEqual([[1, 1]]);
});
