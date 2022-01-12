import { UserModule } from "@/User/user.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { BasicStrategy } from "./strategies/basic.strategy";

@Module({
  imports: [
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BasicStrategy,
  ],
})
export class AuthModule { }
