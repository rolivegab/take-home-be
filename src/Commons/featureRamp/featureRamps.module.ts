import { Logger, Module } from "@nestjs/common";
import { FeatureRampsService } from "./featureRamps.service";

@Module({
  providers: [Logger, FeatureRampsService],
  exports: [FeatureRampsService],
})
export class FeatureRampsModule {}
