import { Ship } from "./index";

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

test("testing Ship's hit method with wrong indexes", () => {
  const ship = new Ship(3);
  expect(() => ship.hit(5)).toThrow();
});
