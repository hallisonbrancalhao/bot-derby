import { CommandInteraction, EmbedBuilder, User } from "discord.js";
import { getUserGLPI } from "./apiMongoDB";
import { Tickets } from "../../types/Ticket";
import { getAllTickets } from "./apiCrefaz";
import { mountTicketsList } from "./mountTicketsList";

export async function switchListar(
  interaction: CommandInteraction,
  user: User
) {
  const { usernameGLPI } = await getUserGLPI(user.id);
  if (!usernameGLPI) {
    return interaction.reply({
      content:
        "Você ainda não vinculou seu discord ao GLPI, veja mais em `/help`.",
      ephemeral: true,
    });
  }
  const tickets: Tickets = await getAllTickets(usernameGLPI);
  if (tickets.length === 0) {
    return interaction.reply({
      content: "Nenhum ticket encontrado.",
      ephemeral: true,
    });
  }
  const embeds: EmbedBuilder[] = await mountTicketsList(tickets, usernameGLPI);
  await interaction.deferReply({ ephemeral: true });
  interaction.editReply({
    embeds: embeds,
  });
}
