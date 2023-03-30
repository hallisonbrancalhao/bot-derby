import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
  name: "ping",
  description: "reply with pong",
  type: ApplicationCommandType.ChatInput,
  run({ interaction }) {
    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          custom_id: "test-button",
          label: "Test button",
          style: ButtonStyle.Success,
        }),
      ],
    });

    interaction.reply({
      ephemeral: true,
      content: "Pong! 👌",
      components: [row],
    });
  },
});
