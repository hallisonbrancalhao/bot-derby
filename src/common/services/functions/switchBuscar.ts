import { CommandInteraction, EmbedBuilder } from "discord.js";
import { getTicket } from "./apiCrefaz";
import { mountEmbed } from "./mountEmbed";

export async function switchBuscar(
  ticketNumber: string,
  interaction: CommandInteraction
) {
  const ticket = await getTicket(ticketNumber);
  const ticketEmbed: EmbedBuilder | null = await mountEmbed(ticket);

  if (!ticketNumber) {
    return interaction.reply({
      content: "É necessario inserir o numero do ticket",
    });
  }

  if (!ticketEmbed) {
    return interaction.reply({
      content: `O ticket ${ticketNumber} nao foi encontrado`,
    });
  }
  await interaction.deferReply({ ephemeral: true });
  interaction.editReply({
    embeds: [ticketEmbed],
  });
}
