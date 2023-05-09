import { ColorResolvable, EmbedBuilder } from "discord.js";
import { Ticket, Tickets } from "../../types/Ticket";
import { colors } from "../../utils/colors";

export async function mountTicketsList(tickets: Tickets, usernameGLPI: string) {
  const embeds: EmbedBuilder[] = [];

  const ticketLists: { [key: string]: Ticket[] } = {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
  };

  tickets.forEach((ticket) => {
    ticketLists[ticket.status].push(ticket);
  });

  for (const [status, ticketList] of Object.entries(ticketLists)) {
    if (ticketList.length > 0) {
      const list = ticketList
        .map(
          (ticket) =>
            `🎫 [${ticket.id}](https://chamados.crefaz.com.br/front/ticket.form.php?id=${ticket.id}) - ${ticket.name}`
        )
        .join("\n");

      embeds.push(
        new EmbedBuilder()
          .setColor(colors[status] as ColorResolvable)
          .setTitle(`${ticketList[0].status_desc}`)
          .setDescription(list)
      );
    }
  }

  return embeds;
}
