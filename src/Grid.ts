type Direction = "N" | "S" | "E" | "W";

function createGrid(
  maxx: number = 0,
  maxy: number = 0,
  minx: number = 0,
  miny: number = 0
): {
  ifLostHere: (x: number, y: number, direction: Direction) => boolean;
  markLost: (x: number, y: number, direction: Direction) => void;
  ifHasRoomToMove: (x: number, y: number, direction: Direction) => boolean;
} {
  const lostPositions: string[] = [];

  function generateKey(x: number, y: number, direction: Direction): string {
    return `${x}:${y}:${direction}`;
  }

  function ifLostHere(x: number, y: number, direction: Direction): boolean {
    const key = generateKey(x, y, direction);
    return lostPositions.includes(key);
  }

  function markLost(x: number, y: number, direction: Direction): void {
    const key = generateKey(x, y, direction);
    lostPositions.push(key);
  }

  function ifHasRoomToMove(
    x: number,
    y: number,
    direction: Direction
  ): boolean {
    if (x < minx || x > maxx || y < miny || y > maxy) {
      return false;
    } else {
      switch (direction) {
        case "N":
          return y !== maxy;
        case "S":
          return y !== miny;
        case "E":
          return x !== maxx;
        case "W":
          return x !== minx;
        default:
          return false;
      }
    }
  }

  return { ifLostHere, markLost, ifHasRoomToMove };
}

export { createGrid, Direction };
