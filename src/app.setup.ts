import { config } from "@/config/environment";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import flash from "connect-flash";
import connectRedis from "connect-redis";
import session from "express-session";
import helmet from "helmet";
import { Redis } from "ioredis";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { REDIS_CLIENT } from "nestjs-redis/dist/redis.constants";
import passport from "passport";
import requestIp from "request-ip";
import { AppModule } from "./app.module";

/**
 * All the application setup should live here.
 * This function is also used to setup the application when running e2e tests.
 *
 * @param {INestApplication} app
 */
export function setupApplication(app: INestApplication): INestApplication {
  const loggerProvider = app.get(WINSTON_MODULE_NEST_PROVIDER);
  const redisProvider = app.get(REDIS_CLIENT);
  const redisClient: Redis = redisProvider.clients.get(
    redisProvider.defaultKey
  );
  const RedisStore = connectRedis(session);

  app.useLogger(loggerProvider);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: [
      // Patient UI
      "http://localhost:8080",
      "https://app-dev.tryminded.com",
      "https://app-stage.tryminded.com",
      "https://app.tryminded.com",
      // Admin UI
      "http://localhost:8081",
      "https://admin-dev.tryminded.com",
      "https://admin-stage.tryminded.com",
      "https://admin.tryminded.com",
    ],
    credentials: true,
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
  });

  app.use(helmet());
  app.use(requestIp.mw());
  app.use(
    session({
      secret: config.passport.sessionSecret,
      resave: true,
      cookie: {
        maxAge: 60 * 60 * 1000 * 6,
      },
      saveUninitialized: true,
      store: new RedisStore({ client: redisClient }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app;
}
