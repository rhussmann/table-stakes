import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Handler, Context } from "aws-lambda";
import { Server } from "http";
import { createServer, proxy } from "aws-serverless-express";
import { eventContext } from "aws-serverless-express/middleware";

import { swaggerEndpoint } from "./util/constants";

// @ts-ignore
import "source-map-support/register";

import { AppModule } from "./app.module";

const express = require("express");

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this
// is likely due to a compressed response (e.g. gzip) which has not
// been handled correctly by aws-serverless-express and/or API
// Gateway. Add the necessary MIME types to binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

// Create the Nest.js server and convert it into an Express.js server
async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp)
    );
    nestApp.use(eventContext());
    nestApp.enableCors({ origin: "*" });

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

    const document = SwaggerModule.createDocument(nestApp, options);
    SwaggerModule.setup(swaggerEndpoint, nestApp, document);

    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

// Export the handler : the entry point of the Lambda function
export const handler: Handler = async (event: any, context: Context) => {
  if (event.path === `/${swaggerEndpoint}`) {
    event.path = `/${swaggerEndpoint}/`;
  }

  console.log(`Event: ${JSON.stringify(event)}`);
  cachedServer = await bootstrapServer();
  const response = proxy(cachedServer, event, context, "PROMISE").promise;
  console.log(`Response: ${JSON.stringify(await response)}`);
  return response;
};
