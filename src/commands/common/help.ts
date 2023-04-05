import { ApplicationCommandType, EmbedBuilder } from "discord.js";

import { Command } from "../../common/types/Command";

export default new Command({
  name: "help",
  description: "Lista os comandos e instruções para conexões.",
  type: ApplicationCommandType.ChatInput,
  run({ interaction }) {
    const embeds = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Central de ajuda - Derby")
      .setDescription("Aqui estão os principais comandos disponíveis:")
      .setFields(
        {
          name: "🔗 Vincular Usuário",
          value: `Para iniciar, use o comando \`/glpi\` para sincronizar sua conta Discord com seu usuário AD/GLPI: \`/glpi seu.nome email@crefaz.com.br\``,
        },
        {
          name: "🎫 Buscar tickets",
          value: `Para Listar os seus tickets, use o comando \`/tickets listar\``,
        },
        {
          name: "🎫 Buscar tickets por técnico",
          value: `Para Listar tickets de um usuário, use o comando \`/tickets tecnico\` e selecione um técnico`,
        },
        {
          name: "🎫 Detalhar um ticket por número do chamado",
          value: `Para detalhar um chamado, use o comando \`/tickets buscar\` e insira o núnero do chamado (⏳EM BREVE)`,
        }
      );
    interaction.reply({
      ephemeral: false,
      embeds: [embeds],
    });
  },
});
