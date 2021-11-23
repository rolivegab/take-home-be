const { env } = process;

export const DEV_ENV = "dev";
export const TEST_ENV = "test";
export const STAGING_ENV = "staging";
export const PRODUCTION_ENV = "production";
export const envs: Array<string> = [
  DEV_ENV,
  TEST_ENV,
  STAGING_ENV,
  PRODUCTION_ENV,
];

if (!envs.includes(env.NODE_ENV)) {
  throw new Error(
    `${env.NODE_ENV} is not valid. Choose a valid environment ${envs}`
  );
}

export const isStaging = env.NODE_ENV === STAGING_ENV;
export const isProd = env.NODE_ENV === PRODUCTION_ENV;
export const isTest = env.NODE_ENV === TEST_ENV;
export const isDev = env.NODE_ENV === DEV_ENV;

export const config = {
  isStaging,
  isProd,
  isTest,
  isDev,
  serviceName: env.DD_APP_NAME || "minded-api",
  version: env.npm_package_version,
  port: Number(env.PORT) || 3000,
  env: env.NODE_ENV,
  vpnIpAddress: env.VPN_IP_ADDRESS,
  db: {
    writeHost: env.MYSQL_WRITE_HOST,
    readHost0: env.MYSQL_READ_HOST_0,
    port: Number(env.MYSQL_PORT) || 3306,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASS,
    database: env.MYSQL_DB,
  },
  sms: {
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
    fromNumber: env.TWILIO_FROM_NUMBER,
  },
  email: {
    apiKey: env.SENDGRID_API_KEY,
    fromAddress: env.SENDGRID_FROM_ADDRESS,
  },

  jwt: {
    secret: env.JWT_SECRET,
    tokenDuration: "1800s",
  },

  passport: {
    sessionSecret: env.SESSION_SECRET,
    sessionExpire: "60m",
  },

  resetPass: {
    domain: env.RESET_PASS_DOMAIN,
  },

  redis: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
    password: env.REDIS_AUTH_PASSWORD,
    ttl: 86400,
  },

  drugSearch: {
    baseUrl: env.DRUG_SEARCH_URL,
  },

  drugBank: {
    baseUrl: env.DRUG_BANK_URL,
    apiKey: env.DRUG_BANK_KEY,
  },

  identityVerification: {
    socureUrl: env.SOCURE_URL,
    socureKey: env.SOCURE_API_KEY,
    correlationScore: env.SOCURE_IDENTITY_CORRELATION_SCORE,
    identityRiskScore: env.SOCURE_IDENTITY_RISK_SCORE,
    sigmaScore: env.SOCURE_SIGMA_SCORE,
  },

  nanoId: {
    alphabet: "0123456789",
    size: 20,
  },

  external: {
    endpointToken: env.MINDED_EXTERNAL_ENDPOINT_TOKEN,
  },

  datadog: {
    apiKey: env.DD_API_KEY,
    appName: env.DD_APP_NAME,
    env: env.DD_ENV || "local",
  },

  optimizely: {
    sdkKey: env.OPTIMIZELY_SDK_KEY,
  },

  emails: {
    cases: {
      RESET_PASSWORD: "RESET_PASSWORD",
      PASSWORD_CHANGED: "PASSWORD_CHANGED",
    },
  },
};
