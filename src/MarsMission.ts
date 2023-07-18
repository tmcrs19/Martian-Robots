import { createRobot } from "./Robot";
import { Direction, createGrid } from "./Grid";

function createMarsMission(input: string[]): {
  nextRobot: () => ReturnType<typeof createRobot> | null;
  nextRobotInstructions: () => string;
} {
  let longitudeSize: number;
  let latitudeSize: number;

  if (input.length === 0) {
    throw new Error("No signal from Command");
  }

  const [long, lat] = input.shift()!.split(/\s+/);
  longitudeSize = parseInt(long);
  latitudeSize = parseInt(lat);

  if (isNaN(longitudeSize) || isNaN(latitudeSize)) {
    throw new Error("Grid specification invalid");
  }

  if (longitudeSize > 50 || longitudeSize < 0) {
    throw new Error(`longitudeSize out of bounds ${longitudeSize}`);
  }

  if (latitudeSize > 50 || latitudeSize < 0) {
    throw new Error(`latitudeSize out of bounds ${latitudeSize}`);
  }

  function nextRobot(): ReturnType<typeof createRobot> | null {
    if (!input) {
      throw new Error("No robot specification found");
    }

    if (input.length === 0) {
      return null; // EOF
    } else {
      let line = input.shift()!;
      while (line.match(/^\d+/) === null) {
        line = input.shift()!;
      }
      const [long, lat, dir] = line.split(/\s+/);
      const x = parseInt(long);
      if (x < 0 || x > longitudeSize) {
        throw new Error(`Robot X parameter ${x} out of bounds`);
      }
      const y = parseInt(lat);
      if (y < 0 || y > latitudeSize) {
        throw new Error(`Robot Y parameter ${y} out of bounds`);
      }
      if (!["N", "S", "E", "W"].includes(dir)) {
        throw new Error(`Robot facing parameter ${dir} out of bounds`);
      }
      return createRobot(
        createGrid(longitudeSize, latitudeSize),
        x,
        y,
        dir as Direction
      );
    }
  }

  function nextRobotInstructions(): string {
    const line = input.shift()!;
    if (line.match(/^[LRF]+\s*$/) === null) {
      throw new Error("Invalid robot instructions");
    }
    if (line.length > 100) {
      throw new Error(`Robot instructions too long: ${line.length} > 100`);
    }
    return line;
  }

  return {
    nextRobot,
    nextRobotInstructions,
  };
}

export { createMarsMission };
