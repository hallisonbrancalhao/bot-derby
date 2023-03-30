import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import config from "./config.json";
import path from "path";

import fs from "fs";
import { connection } from "./structs/database/connect";

const client = new ExtendedClient();
client.start();

try {
  connection.connect();
  console.log("🔗 Database connection succeeded".green);
} catch (error) {
  console.log("Connection failed".red);
}
export { client, config, connection };

connection.end();
