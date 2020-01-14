import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constuctor() {}

  public getHello(): string {
    return "Hello World! Nest ";
  }

  public getBonjour(): string {
    return "Bonjour le Monde! Nest ";
  }
}
