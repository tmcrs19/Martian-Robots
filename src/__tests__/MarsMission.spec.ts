import { createMarsMission } from "../MarsMission";

describe("MarsMission", () => {
  it("should correctly create Mars mission with input", () => {
    const input = [
      "5 3",
      "1 1 E",
      "RFRFRFRF",
      "",
      "3 2 N",
      "FRRFLLFFRRFLL",
      "",
      "0 2 W",
      "LLFFFLFLFL",
    ];
    const expectedRobots = [
      { x: 1, y: 1, facing: "E", isLost: false },
      { x: 3, y: 3, facing: "N", isLost: true },
      { x: 2, y: 3, facing: "S", isLost: false },
    ];

    const mission = createMarsMission(input);
    let robot = mission.nextRobot();

    let j = 0;
    while (robot !== null) {
      let instructions = mission.nextRobotInstructions();
      let expectedRobot = expectedRobots[j];

      robot.processInstructions(instructions);

      const isLost = robot.isLost() ? "LOST" : "";
      expect(
        `${robot.getX()} ${robot.getY()} ${robot.getFacing()} ${isLost}`
      ).toBe(
        `${expectedRobot.x} ${expectedRobot.y} ${expectedRobot.facing} ${isLost}`
      );

      j++;
      robot = mission.nextRobot();
    }
  });
});
