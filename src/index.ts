import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import config from "./config.json";
import path from "path";
import { Server } from "./server";

import fs from "fs";
import { connection } from "./structs/database/connect";

const client = new ExtendedClient();
const server = new Server();

client.start();
server.start();

try {
  connection.connect();
  console.log("🔗 GLPI database conection succeeded".green.bgBlack);
} catch (error) {
  console.log("Connection failed".red);
}
export { client, config, connection };

connection.end();
