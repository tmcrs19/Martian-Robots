import { createRobot } from "../Robot";
import { createGrid } from "../Grid";

describe("Robot", () => {
  let grid: ReturnType<typeof createGrid>;
  let robot: ReturnType<typeof createRobot>;

  beforeEach(() => {
    grid = createGrid(5, 3); // Create a 5x3 grid
    robot = createRobot(grid, 1, 1, "E"); // Set robot initial position and facing direction
  });

  it("should move forward successfully when there is room", () => {
    robot.processInstructions("F");
    expect(robot.getX()).toBe(2);
    expect(robot.getY()).toBe(1);
    expect(robot.getFacing()).toBe("E");
    expect(robot.isLost()).toBe(false);
  });

  it("should turn left successfully", () => {
    robot.processInstructions("L");
    expect(robot.getFacing()).toBe("N");
  });

  it("should turn right successfully", () => {
    robot.processInstructions("R");
    expect(robot.getFacing()).toBe("S");
  });

  it("should get lost if moving beyond grid boundaries", () => {
    robot.processInstructions("FFFFF"); // Move east 5 times
    expect(robot.isLost()).toBe(true);
    expect(robot.getX()).toBe(5);
    expect(robot.getY()).toBe(1);
    expect(robot.getFacing()).toBe("E");
  });

  it("should not move if lost or there is a scent", () => {
    // Mark a scent at (2, 1, "E")
    grid.markLost(2, 1, "E");
    robot.processInstructions("F");
    expect(robot.getX()).toBe(2);
    expect(robot.getY()).toBe(1);
    expect(robot.getFacing()).toBe("E");
    expect(robot.isLost()).toBe(false);
  });

  it("should throw an error for invalid instructions", () => {
    expect(() => robot.processInstructions("A")).toThrowError(
      "Invalid robot instructions"
    );
  });
});
