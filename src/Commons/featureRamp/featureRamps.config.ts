import { config } from "@/Config/environment";
import { Config } from "@optimizely/optimizely-sdk";

export const optimizelySdkConfig: Config = {
  sdkKey: config.optimizely.sdkKey,
  datafileOptions: {
    autoUpdate: true,
    updateInterval: 1000,
  },
  eventBatchSize: 10,
  eventFlushInterval: 30000,
  logLevel: "error",
};

export enum Features {
  BE_TAKE_HOME_ASSIGMENT = "api_take_home_assignment",
  ZIP_CODE = 'zip_code'
};
