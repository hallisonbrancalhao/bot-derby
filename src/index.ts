export * from "colors";
import config from "./config.json";

import { Server } from "./common/backend/server";
import { ExtendedClient } from "./common/ExtendedClient";
import { CronJobs } from "./job";
import { Gpt } from "./common/text/gpt";

const connections = require("./common/connections/");
const client = new ExtendedClient();
const server = new Server();
const cron = new CronJobs();
const gpt = new Gpt();

server.start();
client.start();
connections.connect();
cron.run();
gpt.start();

export { client, config, server, connections };
