import { Injectable } from "@nestjs/common";
import { Connection } from "promise-mysql";

@Injectable()
export class MySqlService {
  constructor(private readonly connection: Connection) {}

  public getConnection = () => this.connection;
}
