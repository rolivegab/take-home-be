import { sRes, sResponse } from "@/utils/sRes";
import {
  Body,
  Controller, Post, Req, UseGuards
} from "@nestjs/common";
import { ApiBasicAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UniqueConstraintError } from "sequelize";
import { UserSignUpDto } from "../dto/userSignUp.dto";
import { BasicGuard } from "../guards/basic.guard";
import { AuthService } from "../services/auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(BasicGuard)
  @ApiBasicAuth()
  @Post("login")
  public async login(@Req() req: Request) {
    return req.user;
  }

  @Post("sign-up")
  public async signUp(
    @Body() userSignUpDto: UserSignUpDto,
    @sRes() res: sResponse
  ) {
    try {
      return await this.authService.signUp(userSignUpDto);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        res.error200('username already taken')
      } else {
        throw error
      }
    }
  }
}
