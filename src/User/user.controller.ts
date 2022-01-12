import { BasicGuard } from "@/Auth/guards/basic.guard";
import { Features } from "@/Commons/featureRamp/featureRamps.config";
import { FeatureRampsService } from "@/Commons/featureRamp/featureRamps.service";
import { Geolocation } from "@/service/geolocation";
import { sRequest } from "@/utils/sReq";
import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBasicAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly featureRampsService: FeatureRampsService) { }

  @UseGuards(BasicGuard)
  @ApiBasicAuth()
  @Get()
  public async users() {
    return this.userService.findAll()
  }

  @UseGuards(BasicGuard)
  @ApiBasicAuth()
  @Get('zip-code-valid')
  public async zipCode(@Req() req: sRequest) {
    const isZipCodeFeatureEnabled = this.featureRampsService.isFeatureEnabled(Features.ZIP_CODE, req.user.id)
    return {
      zipCodeValid: isZipCodeFeatureEnabled && await Geolocation.isOnNY(req.user.zipCode)
    }
  }
}