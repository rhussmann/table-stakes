import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { MailerService } from "./mailer.service";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailer: MailerService
  ) {}

  @Get("json")
  getJson(): any {
    return {
      it: "is",
      some: "json"
    };
  }

  @ApiBody({
    schema: {
      type: "object",
      properties: {
        username: {
          type: "string",
          example: "john"
        },
        password: {
          type: "string",
          example: "changeme"
        }
      }
    }
  })
  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post("sendEmail")
  async sendEmail() {
    const me = "ricky.hussmann@gmail.com";
    await this.mailer.sendEmail(me, me, "Hello", "This is an email");
  }
}
