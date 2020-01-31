import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ApiBody, ApiBearerAuth } from "@nestjs/swagger";

interface Occasion {
  id: string;
  name: string;
  date: string;
}

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

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

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("occasions/:id")
  getOccasion(@Param("id") id: string): Occasion {
    return {
      id,
      name: "The event",
      date: new Date().toISOString()
    };
  }
}
