import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import { sendData } from "../../common/services/functions/apiMongoDB";
import { Command } from "../../common/types/Command";
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
  async run({ interaction, options }) {
    const { user } = interaction;
    const usernameGLPI = options.getString("nome");
    const email = options.getString("email");
    console.log(`🤖 ${user.username} usou: /glpi `);

    const body: IUser = {
      usernameGLPI: usernameGLPI!,
      email: email!,
      discordId: user.id!,
    };

    const res = await sendData(body);
    if (res?.status === 201) {
      return interaction.reply({
        ephemeral: true,
        content: `Seu usuário do GLPI agora extá conectado ao seu discord✅`,
      });
    } else {
      return interaction.reply({
        ephemeral: true,
        content: `❌ Sua conta já possui um vínculo ao GLPI`,
      });
    }
  },
});
