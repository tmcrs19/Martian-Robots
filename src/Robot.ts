import { createGrid, Direction } from "./Grid";

type DirectionMap = { [key in Direction]: Direction };

function createRobot(
  grid: ReturnType<typeof createGrid>,
  x: number = 0,
  y: number = 0,
  facing: Direction = "N"
): {
  moveForward: () => boolean | null;
  isLost: () => boolean;
  processInstructions: (list: string) => void;
  getX: () => number;
  getY: () => number;
  getFacing: () => Direction;
} {
  const left: DirectionMap = {
    N: "W",
    W: "S",
    S: "E",
    E: "N",
  };

  const right: DirectionMap = {
    N: "E",
    E: "S",
    S: "W",
    W: "N",
  };

  let lost = false;

  function moveForward(): boolean | null {
    if (lost || grid.ifLostHere(x, y, facing)) {
      return null; // don't move, as have scent here or lost
    } else {
      if (grid.ifHasRoomToMove(x, y, facing)) {
        switch (facing) {
          case "N":
            y++;
            break;
          case "S":
            y--;
            break;
          case "E":
            x++;
            break;
          case "W":
            x--;
            break;
          default:
            return null;
        }
        return true;
      } else {
        lost = true;
        grid.markLost(x, y, facing);
        return false;
      }
    }
  }

  function isLost(): boolean {
    return lost;
  }

  function processInstructions(list: string): void {
    if (list.length === 0) {
      throw new Error("Empty robot instruction string");
    }
    if (!list.match(/^[FRL]+$/)) {
      throw new Error("Invalid robot instructions");
    }
    while (list.length > 0 && !lost) {
      switch (list.charAt(0)) {
        case "F":
          moveForward();
          break;
        case "R":
          turnRight();
          break;
        case "L":
          turnLeft();
          break;
        default:
          throw new Error(`Invalid robot instruction ${list.charAt(0)}`);
      }
      list = list.slice(1);
    }
  }

  function turnLeft(): void {
    if (!lost) {
      facing = left[facing];
    }
  }

  function turnRight(): void {
    if (!lost) {
      facing = right[facing];
    }
  }

  function getX(): number {
    return x;
  }

  function getY(): number {
    return y;
  }

  function getFacing(): Direction {
    return facing;
  }

  return {
    moveForward,
    isLost,
    processInstructions,
    getX,
    getY,
    getFacing,
  };
}

export { createRobot };
