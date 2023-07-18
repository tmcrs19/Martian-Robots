import { createGrid } from "../Grid";

describe("createGrid", () => {
  let grid: ReturnType<typeof createGrid>;

  beforeEach(() => {
    grid = createGrid(5, 5, 0, 0);
  });

  afterEach(() => {
    grid = null!;
  });

  describe("ifLostHere", () => {
    it("should return true if the position is marked as lost", () => {
      grid.markLost(2, 3, "N");
      expect(grid.ifLostHere(2, 3, "N")).toBe(true);
    });

    it("should return false if the position is not marked as lost", () => {
      expect(grid.ifLostHere(2, 3, "N")).toBe(false);
    });
  });

  describe("markLost", () => {
    it("should mark the position as lost", () => {
      grid.markLost(2, 3, "N");
      expect(grid.ifLostHere(2, 3, "N")).toBe(true);
    });

    it("should mark different positions independently", () => {
      grid.markLost(2, 3, "N");
      expect(grid.ifLostHere(2, 3, "N")).toBe(true);
      expect(grid.ifLostHere(2, 3, "E")).toBe(false);
      expect(grid.ifLostHere(4, 1, "W")).toBe(false);
      grid.markLost(2, 3, "E");
      expect(grid.ifLostHere(2, 3, "E")).toBe(true);
      expect(grid.ifLostHere(2, 3, "N")).toBe(true);
    });
  });

  describe("ifHasRoomToMove", () => {
    it("should return true if there is room to move in the specified direction", () => {
      expect(grid.ifHasRoomToMove(2, 3, "N")).toBe(true);
      expect(grid.ifHasRoomToMove(2, 3, "S")).toBe(true);
      expect(grid.ifHasRoomToMove(2, 3, "E")).toBe(true);
      expect(grid.ifHasRoomToMove(2, 3, "W")).toBe(true);
    });

    it("should return false if there is no room to move in the specified direction", () => {
      expect(grid.ifHasRoomToMove(2, 5, "N")).toBe(false);
      expect(grid.ifHasRoomToMove(2, 0, "S")).toBe(false);
      expect(grid.ifHasRoomToMove(5, 3, "E")).toBe(false);
      expect(grid.ifHasRoomToMove(0, 3, "W")).toBe(false);
    });

    it("should return false if the position is outside the grid boundaries", () => {
      expect(grid.ifHasRoomToMove(6, 3, "N")).toBe(false);
      expect(grid.ifHasRoomToMove(-1, 3, "S")).toBe(false);
      expect(grid.ifHasRoomToMove(3, 6, "E")).toBe(false);
      expect(grid.ifHasRoomToMove(3, -1, "W")).toBe(false);
    });
  });
});
