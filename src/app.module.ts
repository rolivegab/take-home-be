import { dbConfig } from "@/Config/db";
import { config } from "@/Config/environment";
import { loggerConfig } from "@/Config/logger";
import { HealthModule } from "@/health/health.module";
import { Module, NestModule } from "@nestjs/common";
import { RedisModule } from "nestjs-redis";

const appImports = [
  dbConfig,
  loggerConfig,
  HealthModule,
  RedisModule.forRootAsync({
    useFactory: () => ({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
      keepAlive: config.redis.ttl,
    }),
  }),
];

@Module({
  imports: appImports,
})
export class AppModule implements NestModule {
  configure(): void {
    // Configuration
  }
}
