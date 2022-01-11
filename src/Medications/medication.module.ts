import { config } from "@/Config/environment";
import { HttpModule } from "@nestjs/axios";
import { CacheModule, Logger, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import * as RedisStore from "cache-manager-ioredis";
import { MedicationController } from "./controllers/medication.controller";
import { Medication } from "./models/medication.model";
import { MedicationDetail } from "./models/medicationDetail.model";
import { MedicationSpecification } from "./models/medicationSpecification.model";
import { MedicationService } from "./services/medication.service";
import { MedicationSpecificationService } from "./services/medicationSpecifications.service";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Medication,
      MedicationDetail,
      MedicationSpecification,
    ]),
    HttpModule,
    CacheModule.register({
      store: RedisStore,
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
    }),
  ],
  providers: [Logger, MedicationService, MedicationSpecificationService],
  controllers: [MedicationController],
  exports: [
    SequelizeModule.forFeature([
      Medication,
      MedicationDetail,
      MedicationSpecification,
    ]),
    MedicationService,
    MedicationSpecificationService,
  ],
})
export class MedicationModule {}
