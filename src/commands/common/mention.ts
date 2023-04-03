import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  Collection,
} from "discord.js";

import { Command } from "../../common/types/Command";

export default new Command({
  name: "mencionar",
  type: ApplicationCommandType.User,
  run({ interaction }) {
    if (!interaction.isUserContextMenuCommand()) return;

    const mention = interaction.targetMember;

    interaction.reply({ content: `${interaction.user} mencionou ${mention}` });
  },
});
