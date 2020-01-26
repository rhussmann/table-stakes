import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { MySqlService } from "./mysql.service";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly mysql: MySqlService
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("occasions")
  async getOccasions() {
    return Promise.resolve([]);
  }

  @Get("stuff")
  async runSomeSql() {
    const connection = this.mysql.getConnection();
    const response = await connection.query("SELECT * FROM users");
    console.log(`Response: ${JSON.stringify(response)}`);
    return;
  }
}
