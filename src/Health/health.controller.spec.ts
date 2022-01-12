import { HealthController } from "./health.controller";
import { Test, TestingModule } from "@nestjs/testing";

describe("HealthController", () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = module.get(HealthController);
  });

  it("should return 200 at the health method", async () => {
    const result = await healthController.health();
    expect(result.status).toEqual("OK");
  });
});
