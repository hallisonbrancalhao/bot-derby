export * from "colors";
import config from "./config.json";
import path from "path";
import fs from "fs";

import { Server } from "./common/backend/server";
import { ExtendedClient } from "./common/ExtendedClient";

const connections = require("./common/connections/");
const client = new ExtendedClient();
const server = new Server();

client.start();
server.start();
connections.connect();

export { client, config, server, connections };
