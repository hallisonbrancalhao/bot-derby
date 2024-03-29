import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  Collection,
} from "discord.js";

import { Command } from "../../common/types/Command";

export default new Command({
  name: "ping",
  description: "reply with pong",
  type: ApplicationCommandType.ChatInput,
  run({ interaction }) {
    console.log(`🤖 ${interaction.user.username} usou: /ping `);
    interaction.reply({ ephemeral: true, content: "👌pong" });
  },
});
