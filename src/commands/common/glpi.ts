import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import { Command } from "../../common/types/Command";

export default new Command({
  name: "glpi",
  description: "Sincronizar seu usuário ao GLPI",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "nome",
      description: "Digite seu nome",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run({ interaction, options }) {
    interaction.reply({ ephemeral: true, content: "Vou sincronizar" });
  },
});
