import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import config from "./config.json";

import fs from "fs";
import path from "path";

const client = new ExtendedClient();
client.start();

export { client, config };

// client.on("messageCreate", (message) => {
//   if (message.author.bot) return;
//   message.reply({
//     content: `Olá! ${message.author.username}`,
//     allowedMentions: {
//       repliedUser: true,
//     },
//   });
// });
