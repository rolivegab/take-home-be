import { config } from "@/Config/environment";
import { WinstonModule } from "nest-winston";
import { WinstonModuleOptions } from "nest-winston/dist/winston.interfaces";
import { utilities as nestWinstonModuleUtilities } from "nest-winston/dist/winston.utilities";
import * as winston from "winston";

const serviceMetadata = {
  service: config.serviceName,
  env: config.env,
  version: config.version,
};

const localConfiguration = {
  level: "silly",
  defaultMeta: serviceMetadata,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        nestWinstonModuleUtilities.format.nestLike()
      ),
    }),
  ],
};

const commonConfiguration = {
  level: "info",
  defaultMeta: serviceMetadata,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
    }),
  ],
};

const loggerOptions: { [env: string]: WinstonModuleOptions } = {
  test: {
    silent: true,
  },
  dev:
    config.datadog.env === "local" ? localConfiguration : commonConfiguration,
  qa: commonConfiguration,
  staging: commonConfiguration,
  production: commonConfiguration,
};

/**
 * Logging config object
 */
export const loggerConfig = WinstonModule.forRoot(loggerOptions[config.env]);
