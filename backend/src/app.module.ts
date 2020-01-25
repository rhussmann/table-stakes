import { Module } from "@nestjs/common";
import { FactoryProvider } from "@nestjs/common/interfaces";
import * as aws from "aws-sdk";
import { createTransport } from "nodemailer";

import { AppController } from "./app.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { MailerService } from "./mailer.service";

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
    mailerServiceFactory
  ]
})
export class AppModule {}
