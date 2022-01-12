import "dotenv/config.js";
import { AppModule } from "@/app.module";
import { setupApplication } from "@/app.setup";
import { config } from "@/Config/environment";
import { swaggerOptions } from "@/Config/swagger";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  setupApplication(app);

  // Disable swagger ui for the production and testing environments
  if (config.isDev || config.isStaging) {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup("api", app, document, {
      swaggerOptions: {
        persistAuthorization: true
      }
    });
  }

  await app.listen(3000);
}

bootstrap();
