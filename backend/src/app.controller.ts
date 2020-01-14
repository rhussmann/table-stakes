import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello/en")
  getHello(): string {
    console.log(`This service ${this.appService}`);
    return this.appService.getHello();
  }

  @Get("hello/fr")
  getBonjour(): string {
    return this.appService.getBonjour();
  }
}