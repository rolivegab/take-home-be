import { FeatureRampsModule } from "@/Commons/featureRamp/featureRamps.module";
import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";

@Module({
  imports: [FeatureRampsModule],
  controllers: [HealthController],
})
export class HealthModule {}
