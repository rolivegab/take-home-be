import { BasicGuard } from "@/Auth/guards/basic.guard";
import { Features } from "@/Commons/featureRamp/featureRamps.config";
import { FeatureRampsService } from "@/Commons/featureRamp/featureRamps.service";
import { sRequest } from "@/utils/sReq";
import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBasicAuth, ApiTags } from "@nestjs/swagger";

@Controller("/health")
@ApiTags("Health")
export class HealthController {
  constructor(private readonly featureRampsService: FeatureRampsService) { }

  @Get()
  async health() {
    return {
      status: "OK",
    };
  }

  @Get("ffs")
  @ApiBasicAuth()
  @UseGuards(BasicGuard)
  async checkFFs(@Req() authReq: sRequest) {
    const takeHomeAssigment = this.featureRampsService.isFeatureEnabled(
      Features.BE_TAKE_HOME_ASSIGMENT,
      authReq.user.id,
      { username: authReq.user.username }
    );

    const zipCode = this.featureRampsService.isFeatureEnabled(Features.ZIP_CODE, authReq.user.id, { username: authReq.user.username })

    return {
      takeHomeAssigment,
      zipCode,
    };
  }
}
