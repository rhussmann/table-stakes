import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { swaggerEndpoint } from "./util/constants";

// @ts-ignore
import "source-map-support/register";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Table-stakes API")
    .setDescription("The table-stakes API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addServer("http://localhost:3000/", "Localhost")
    .addServer(
      "https://rpdd6m4hh4.execute-api.us-east-1.amazonaws.com/dev/",
      "The deployed server"
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);

  await app.listen(3000);
}
bootstrap();
