import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AppController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy]
})
export class AppModule {}
