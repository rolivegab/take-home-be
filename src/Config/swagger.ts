import { DocumentBuilder } from "@nestjs/swagger";
import { config } from "./environment";

/**
 * Swagger Config
 */

enum MindedSwaggerConfig {
  SWAGGER_TITLE = "Minded BE Project",
  SWAGGER_DESCRIPTION = "Minded BE Project",
  SWAGGER_CONTACT_NAME = "Minded Engineering",
  SWAGGER_CONTACT_URL = "https://tryminded.com",
  SWAGGER_CONTACT_EMAIL = "engineering@tryminded.com",
}

export const swaggerOptions = new DocumentBuilder()
  .setTitle(MindedSwaggerConfig.SWAGGER_TITLE)
  .setDescription(MindedSwaggerConfig.SWAGGER_DESCRIPTION)
  .setVersion(config.version)
  .setContact(
    MindedSwaggerConfig.SWAGGER_CONTACT_NAME,
    MindedSwaggerConfig.SWAGGER_CONTACT_URL,
    MindedSwaggerConfig.SWAGGER_CONTACT_EMAIL
  )
  .addBearerAuth()
  .build();
