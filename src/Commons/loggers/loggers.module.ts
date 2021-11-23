import { Module } from "@nestjs/common";
import { ActivityLogger } from "@/Commons/loggers/activity.logger";
import { ModuleLogger } from "@/Commons/loggers/module.logger";

@Module({
  providers: [ActivityLogger, ModuleLogger],
  exports: [ActivityLogger, ModuleLogger],
})
export class LoggersModule {}
