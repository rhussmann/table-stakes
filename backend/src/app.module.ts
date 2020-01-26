import { Module } from "@nestjs/common";
import { FactoryProvider } from "@nestjs/common/interfaces";
import * as aws from "aws-sdk";
import { createTransport } from "nodemailer";
import * as mysql from "promise-mysql";

import { AppController } from "./app.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { MailerService } from "./mailer.service";
import { MySqlService } from "./mysql.service";
import { decryptSecret } from "./util/secrets";
import { config } from "./config/config";

const kms = new aws.KMS({
  region: "us-east-1"
});

const createDecryptor = (encryptedDataKey: string) => {
  return async (encryptedSecret: string) => {
    const decryptResponse = await kms
      .decrypt({
        CiphertextBlob: Buffer.from(encryptedDataKey, "base64")
      })
      .promise();

    return decryptSecret(encryptedSecret, decryptResponse.Plaintext as Buffer);
  };
};

const decryptor = createDecryptor(config.encryptedDataKey);

const mailerServiceFactory: FactoryProvider<MailerService> = {
  provide: MailerService,
  useFactory: () => {
    const sesTransport = createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: "us-east-1"
      })
    });
    return new MailerService(sesTransport);
  }
};

let connection = null;
const mysqlServiceFactory = {
  provide: MySqlService,
  useFactory: async () => {
    if (!connection) {
      const password = await decryptor(config.encryptedDatabasePassword);
      const database = config.databaseName;
      const username = "tablestakes"; // TODO: Needs to be in config

      connection = await mysql.createConnection({
        host: "dt1x76zef52vjk7.cewfhmbupzd2.us-east-1.rds.amazonaws.com", // TODO: Needs to be in config
        user: username,
        database,
        password
      });
    }

    return new MySqlService(connection);
  }
};

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    mailerServiceFactory,
    mysqlServiceFactory
  ]
})
export class AppModule {}
