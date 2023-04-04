import { ColorResolvable, EmbedBuilder, User } from "discord.js";
import { Ticket, Tickets } from "../../types/Ticket";

export async function mountTickets(
  tickets: Tickets,
  usernameGLPI: string,
  user: User
) {
  const embeds: EmbedBuilder[] = [];

  const colors: { [key: string]: string } = {
    "1": "#1F79FF",
    "2": "#FFA51F",
    "3": "#FFA51F",
    "4": "#FF3A1F",
    "5": "#1FFF50",
    "6": "#7DFF9A",
  };

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
          .setTitle(`Tickets ${status}`)
          .setDescription(list)
          .setAuthor({
            name: usernameGLPI,
            iconURL: user.avatarURL() || undefined,
          })
      );
    }
  }

  return embeds;
}

// import { ColorResolvable, EmbedBuilder, User } from "discord.js";
// import { Ticket, Tickets } from "../../types/Ticket";

// export async function mountTickets(
//   tickets: Ticket[],
//   usernameGLPI: string,
//   user: User
// ) {
//   const embeds: EmbedBuilder[] = [];

//   const colors: { [key: string]: string } = {
//     "Status 1": "#1F79FF",
//     "Status 2": "#FFA51F",
//     "Status 3": "#FFA51F",
//     "Status 4": "#FF3A1F",
//     "Status 5": "#1FFF50",
//     "Status 6": "#7DFF9A",
//   };

//   const ticketLists: { [key: string]: Ticket[] } = {
//     "Status 1": [],
//     "Status 2": [],
//     "Status 3": [],
//     "Status 4": [],
//     "Status 5": [],
//     "Status 6": [],
//   };

//   tickets.forEach((ticket) => {
//     ticketLists[ticket.status_desc].push(ticket);
//   });

//   for (const [status_desc, ticketList] of Object.entries(ticketLists)) {
//     if (ticketList.length > 0) {
//       const list = ticketList
//         .map(
//           (ticket) =>
//             `🎫 [${ticket.id}](https://chamados.crefaz.com.br/front/ticket.form.php?id=${ticket.id}) - ${ticket.name}`
//         )
//         .join("\n");

//       embeds.push(
//         new EmbedBuilder()
//           .setColor(colors[status_desc] as ColorResolvable)
//           .setTitle(`${status_desc}`)
//           .setDescription(list)
//       );
//     }
//   }

//   return embeds;
// }
