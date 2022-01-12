import {
  Features,
  optimizelySdkConfig,
} from "@/Commons/featureRamp/featureRamps.config";
import { Injectable, Logger } from "@nestjs/common";
import * as optimizelySdk from "@optimizely/optimizely-sdk";
import { Client, UserAttributes } from "@optimizely/optimizely-sdk";
import { get } from "lodash";
import { v4 as uuidV4 } from "uuid";

@Injectable()
export class FeatureRampsService {
  private optimizelyClient: Client;

  constructor(private readonly logger: Logger) {
    optimizelySdk.setLogLevel("info");
    optimizelySdk.setLogger(optimizelySdk.logging.createLogger());

    this.optimizelyClient = optimizelySdk.createInstance(optimizelySdkConfig);
  }

  public isFeatureEnabled(
    feature: string,
    userId?: string,
    attributes?: UserAttributes
  ): boolean {
    const featureStatus = this.optimizelyClient.isFeatureEnabled(
      feature,
      userId ?? uuidV4(),
      attributes
    );
    const featureStatusHumanized = featureStatus ? "ON" : "OFF";

    this.logger.debug(`feature flag ${feature} is ${featureStatusHumanized}`);

    return featureStatus;
  }

  public getFeatureVariable(
    featureKey: string,
    variableKey: string,
    userId: string,
    attributes?: UserAttributes
  ): unknown {
    return this.optimizelyClient.getFeatureVariable(
      featureKey,
      variableKey,
      userId,
      attributes
    );
  }

  /**
   * Returns the Optimizely configuration file.
   *
   * @returns
   */
  public getOptimizelyConfig(): optimizelySdk.OptimizelyConfig | null {
    return this.optimizelyClient.getOptimizelyConfig();
  }

  /**
   * Returns a map of states and whether or not their associated
   * feature flag is turned on or not
   */
  public getStateExpansionFeatureMap(stateList: string[]): {
    [key: string]: boolean;
  } {
    return stateList.reduce((states: any, state) => {
      const feature = get(
        Features,
        `RELEASE_EXPANSION_${state}_STATE.key`,
        false
      );

      // Here we are using a random uuid due to the user doesn't exist until
      // they are eligible to create an account.
      states[state] = feature
        ? this.isFeatureEnabled(feature, uuidV4())
        : false;

      return states;
    }, {});
  }
}
