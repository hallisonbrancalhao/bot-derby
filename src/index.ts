export * from "colors";
import config from "./config.json";
import path from "path";
import fs from "fs";

import { Server } from "./common/backend/server";
import { ExtendedClient } from "./common/ExtendedClient";
import { CronJobs } from "./job";

const connections = require("./common/connections/");
const client = new ExtendedClient();
const server = new Server();
const cron = new CronJobs();

server.start();
client.start();
connections.connect();
cron.run();

export { client, config, cron, server, connections };
