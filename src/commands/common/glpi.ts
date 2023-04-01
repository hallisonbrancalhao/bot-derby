import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import { Command } from "../../common/types/Command";
import { postData, sendData } from "../../common/services/api";
import { IUser } from "../../common/types/UserTypes";

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
    {
      name: "email",
      description: "Digite seu e-mail",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run({ interaction, options }) {
    const { user } = interaction;
    const usernameGLPI = options.getString("nome");
    const email = options.getString("email");

    const body: IUser = {
      usernameGLPI: usernameGLPI!,
      email: email!,
      discordId: user.id!,
    };

    sendData(body);

    interaction.reply({
      ephemeral: true,
      content: `O usuário ${user} com id: ${user.id} solicitou: ${usernameGLPI}.`,
    });
  },
});
