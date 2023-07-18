import * as fs from "fs";
import { createRobot } from "./Robot";
import { createMarsMission } from "./MarsMission";

const inputFilePath = "test-data.dat";

let array: string[] = [];
let mission: ReturnType<typeof createMarsMission> | undefined;
let robot: ReturnType<typeof createRobot> | null = null;
let instructions = "";

try {
  array = fs.readFileSync(inputFilePath).toString().split("\n");
  mission = createMarsMission(array);

  robot = mission.nextRobot();
  while (robot !== null) {
    instructions = mission.nextRobotInstructions();

    robot.processInstructions(instructions);

    const isLost = robot.isLost() ? "LOST" : "";
    console.log(
      `${robot.getX()} ${robot.getY()} ${robot.getFacing()} ${isLost}`
    );
    robot = mission.nextRobot();
  }
} catch (error) {
  console.error((error as Error).message);
}
