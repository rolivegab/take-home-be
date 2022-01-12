import { FeatureRampsModule } from "@/Commons/featureRamp/featureRamps.module";
import { Logger, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from "./user.controller";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    FeatureRampsModule
  ],
  providers: [Logger, UserService],
  controllers: [UserController],
  exports: [
    SequelizeModule.forFeature([User]),
    UserService
  ],
})
export class UserModule { }
