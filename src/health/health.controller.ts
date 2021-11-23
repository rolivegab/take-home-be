import { AuthRequest } from "@/Auth/config/constants";
import { Features } from "@/Commons/featureRamp/featureRamps.config";
import { FeatureRampsService } from "@/Commons/featureRamp/featureRamps.service";
import { Controller, Get, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

@Controller("/health")
@ApiTags("Health")
export class HealthController {
  constructor(private readonly featureRampsService: FeatureRampsService) {}

  @Get()
  async health() {
    return {
      status: "OK",
    };
  }

  @Get("ffs")
  async checkFFs(@Req() authReq: AuthRequest) {
    const takeHomeAssigment = this.featureRampsService.isFeatureEnabled(
      Features.BE_TAKE_HOME_ASSIGMENT.key,
      uuid(),
      { email: authReq.user.email }
    );

    return {
      takeHomeAssigment,
    };
  }
}
